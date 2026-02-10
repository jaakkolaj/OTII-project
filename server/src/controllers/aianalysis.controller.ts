import { Request, Response } from "express";
import prisma from "../prisma";
import { analyzeTextWithAI } from "../services/ai.service";

export const aianalysis = async (req: Request, res: Response) => {
  try {
    const { jobPostingId } = req.params;

    if (typeof jobPostingId !== "string") {
      return res.status(400).json({
        error:
          "Virheellinen jobPostingId. ID:n on oltava yksittäinen merkkijono.",
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
                score: aiResult.score,
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
      details: results
    });
  } catch (error: any) {
    console.error("Virhe analyysiä tehdessä", error.message);
    res.status(500).json({ error: "Palvelinvirhe analyysin alustuksessa" });
  }
};

// Hae analyysi ehdokkaan ID:n perusteella
export const getAnalysisById = async (req: Request, res: Response) => {};

// Poista analyysi
export const deleteAnalysis = async (req: Request, res: Response) => {};

// Hae analyysi tulokset
export const getAnalysisResults = async (req: Request, res: Response) => {};
