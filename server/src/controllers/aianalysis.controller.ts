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

    //Analysoidaan jokainen cv seuraavaksi
    //kutsutaan ai service
    //const aiResult = await analyzeTextWithAI();

  } catch (error) {}
};

// Hakee yhden jobPostingin kaikki aiAnalyysit
export const getAiAnalysesByJobPostingId = async (req: Request, res: Response) => {
  try {
    const { jobPostingId } = req.params;
    if (typeof jobPostingId !== "string") {
      return res.status(400).json({
        error:
          "Virheellinen jobPostingId. ID:n on oltava yksittäinen merkkijono.",
      });
    }

    const aiAnalyses = await prisma.aIAnalysis.findMany({
      where: {
        job_posting_id: jobPostingId
      }
    });

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
          email: candidate?.email ?? null
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
  const { candidate_id, 
    job_posting_id, 
    skills, 
    years_experience, 
    education_level,
    keyword_matches,
    strengths,
    weaknesses,
    summary,
    raw_ai_response
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
        raw_ai_response
      }
    });
    res.status(200).json({ message: aiAnalysis })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}


  // Hae analyysi ehdokkaan ID:n perusteella
  export const getAnalysisById = async (req: Request, res: Response) => {

  };

  // Poista analyysi
  export const deleteAnalysis = async (req: Request, res: Response) => {
   
  };

  // Hae analyysi tulokset
  export const getAnalysisResults = async (req: Request, res: Response) => {
};

