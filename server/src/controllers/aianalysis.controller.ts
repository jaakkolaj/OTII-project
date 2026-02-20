import { Request, Response } from "express";
import prisma from "../prisma";
import { analyzeTextWithAI } from "../services/ai.service";

const isUuid = (id: string) => 
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)

export const aianalysis = async (req: Request, res: Response) => {
  try {
    const { jobPostingId } = req.params;

    // Varmistetaan, että jobPostingId on validi UUID-merkkijono
    if (typeof jobPostingId !== "string" || !isUuid(jobPostingId)) {
      return res.status(400).json({
        error: "Virheellinen jobPostingId. ID:n on oltava validi UUID-merkkijono.",
      });
    }

    //Haetaan kaikki ehdokkaat, joilla ei ole vielä analyysia tässä työpaikassa
    const candidates = await prisma.candidate.findMany({
      where: {
        job_posting_id: jobPostingId,
        ai_analyses: { none: {} },
      },
      include: {
        documents: true,
        job_posting: true,
      },
    });
    
    if (candidates.length === 0) {
      return res
        .status(200)
        .json({ message: "Ei uusia analysoitavia ehdokkaita." });
    }

    const results = [];

    //Käydään läpi jokainen kandidaatti sen cv ja kutsutaan AI service
    //TODO: for looppauksen sijasta voi olla parempi hyödyntä jonoa
    for (const candidate of candidates) {
      const cvText = candidate.documents[0]?.extracted_text;
      const jobRequirements = candidate.job_posting.requirements;

      //Jos cv teksti ei ole tyhjä
      if (cvText) {
        try {
          const aiResult = await analyzeTextWithAI(cvText, jobRequirements);

          // Varmistetaan, että score on aina välillä 0 - 100
          const safeScore = Math.min(Math.max(aiResult.score, 0), 100);
          
      
          //päivitetään tietokantaan kandidaatin tiedot ja luodaan aiAnalyysi
          await prisma.$transaction([
            prisma.candidate.update({
              where: { id: candidate.id },
              data: { name: aiResult.name, email: aiResult.email },
            }),
            prisma.aIAnalysis.create({
              data: {
                candidate_id: candidate.id,
                job_posting_id: candidate.job_posting_id,
                skills: aiResult.skills,
                years_experience: aiResult.years_experience,
                education_level: aiResult.education_level,
                keyword_matches: aiResult.keyword_matches,
                strengths: aiResult.strengths,
                weaknesses: aiResult.weaknesses,
                summary: aiResult.summary,
                score: safeScore,
                raw_ai_response: aiResult as any,
              },
            }),
          ]);
          results.push({ id: candidate.id, status: "success" });
        } catch (error: any) {
          console.error(
            `Analyysi epäonnistui ehdokkaalle ${candidate.id}:`,
            error.message,
          );
          results.push({
            id: candidate.id,
            status: "error",
            error: error.message,
          });
        }
      }
    }
    res.status(200).json({
      message: "Analyysiprosessi valmis",
      processed_count: results.length,
      details: results,
    });
  } catch (error: any) {
    console.error("Virhe analyysiä tehdessä", error.message);
    res.status(500).json({ error: "Palvelinvirhe analyysin alustuksessa" });
  }
};

// Hakee yhden jobPostingin kaikki aiAnalyysit
export const getAiAnalysesByJobPostingId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { jobPostingId } = req.params;
    if (typeof jobPostingId !== "string") {
      return res.status(400).json({
        error:
          "Virheellinen jobPostingId. ID:n on oltava yksittäinen merkkijono.",
      });
    }

    // Haetaan kaikki analyysit yhdestä jobPostingista
    const aiAnalyses = await prisma.aIAnalysis.findMany({
      where: {
        job_posting_id: jobPostingId,
      },
    });

    // Käydään kaikki analyysit läpi ja lisätään niihin kandidaatin nimi ja email
    // Muodostetaan uusi analyysi objekti ja lähetetään se
    const aiAnalysesWithName = await Promise.all(
      aiAnalyses.map(async (analysis) => {
        const candidate = await prisma.candidate.findUnique({
          where: {
            id: analysis.candidate_id,
          },
        });

        return {
          ...analysis,
          name: candidate?.name ?? null,
          email: candidate?.email ?? null,
        };
      }),
    );

    return res.status(200).json(aiAnalysesWithName);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Testi routti analyysin luontiin
export const createAnalysis = async (req: Request, res: Response) => {
  // Testauksessa postmaniin syötetään manuaalisesti job_posting_id ja candidate_id
  const {
    candidate_id,
    job_posting_id,
    skills,
    years_experience,
    education_level,
    keyword_matches,
    strengths,
    weaknesses,
    summary,
    score,
    raw_ai_response,
  } = req.body;

  try {
    const aiAnalysis = await prisma.aIAnalysis.create({
      data: {
        candidate_id,
        job_posting_id,
        skills,
        years_experience,
        education_level,
        keyword_matches,
        strengths,
        weaknesses,
        summary,
        score,
        raw_ai_response,
      },
    });
    res.status(200).json({ message: aiAnalysis });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Hae analyysi ehdokkaan ID:n perusteella
export const getAnalysisById = async (req: Request, res: Response) => {
  const { analysisId } = req.params;
  if (typeof analysisId !== "string") {
    return res.status(400).json({
      error:
        "Virheellinen jobPostingId. ID:n on oltava yksittäinen merkkijono.",
    });
  }

  try {
    const aiAnalysis = await prisma.aIAnalysis.findUnique({
      where: {
        id: analysisId,
      },
    });
    res.status(200).json(aiAnalysis);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// Poista analyysin ID:n perusteella
export const deleteAnalysis = async (req: Request, res: Response) => {
  const { analysisId } = req.params;
  if (typeof analysisId !== "string") {
    return res.status(400).json({ message: "Virheellinen AI Analyysin ID" });
  }

  const aiAnalysis = await prisma.aIAnalysis.findUnique({
    where: {
      id: analysisId,
    },
  });

  if (!aiAnalysis) {
    return res.status(404).json({ message: "AI analyysiä ei löytynt!" });
  }

  try {
    await prisma.aIAnalysis.delete({ where: { id: analysisId } });
    res.status(200).json({ message: "Analyysi poistettu" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
