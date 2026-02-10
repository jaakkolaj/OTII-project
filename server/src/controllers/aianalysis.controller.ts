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


  // Hae analyysi ehdokkaan ID:n perusteella
  export const getAnalysisById = async (req: Request, res: Response) => {

  };

  // Poista analyysi
  export const deleteAnalysis = async (req: Request, res: Response) => {
   
  };

  // Hae analyysi tulokset
  export const getAnalysisResults = async (req: Request, res: Response) => {
};

