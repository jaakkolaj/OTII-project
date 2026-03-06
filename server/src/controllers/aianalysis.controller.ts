import { Request, Response } from "express";
import prisma from "../prisma";
import { analyzeTextWithAI } from "../services/ai.service";
import { aiAnalysisQueue } from "../queues/aiAnalysis.queue";

const isUuid = (id: string) => 
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)

export const aianalysis = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { jobPostingId } = req.params;

    // Varmistetaan, että jobPostingId on validi UUID-merkkijono
    if (typeof jobPostingId !== "string" || !isUuid(jobPostingId)) {
      return res.status(400).json({
        error: "Virheellinen jobPostingId. ID:n on oltava validi UUID-merkkijono.",
      });
    }

    // Lisätään redis queueen
    const job = await aiAnalysisQueue.add(
      "analyze-job-posting",
      { jobPostingId },
      { jobId: `ai-analysis-${jobPostingId}-${Date.now()}` }
    );

    return res.status(200).json({
      message: "Analyysi käynnistetty",
      jobId: job.id
    });
  } catch (error: any) {
    console.error("Virhe analyysiä tehdessä", error.message);
    res.status(500).json({ error: "Palvelinvirhe analyysin alustuksessa" });
  }
};

export const getAiAnalysisStatus = async (req: Request, res: Response) => {
  try {
    const { jobPostingId } = req.params;

    if (typeof jobPostingId !== "string") {
      return res.status(400).json({ error: "Virheellinen jobPostingId" });
    }

    const totalCandidates = await prisma.candidate.count({
      where: { job_posting_id: jobPostingId },
    });

    const analyzedCandidates = await prisma.aIAnalysis.count({
      where: { job_posting_id: jobPostingId },
    });

    const status =
      totalCandidates > 0 && analyzedCandidates >= totalCandidates
        ? "completed"
        : "processing";

    return res.json({
      status,
      totalCandidates,
      analyzedCandidates,
    });
  } catch (error: any) {
    console.error("Status haku epäonnistui:", error.message);
    return res.status(500).json({ error: "Sisäinen palvelinvirhe" });
  }
};

// Hakee yhden jobPostingin kaikki aiAnalyysit
export const getAiAnalysesByJobPostingId = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

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

// Hae analyysi ehdokkaan ID:n perusteella
export const getAnalysisById = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

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
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
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

// Poista kaikki analyysit yhdelle jobPostingille
export const deleteAllAnalysesByJobPostingId = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { jobPostingId } = req.params;
  
  if (typeof jobPostingId !== "string" || !isUuid(jobPostingId)) {
    return res.status(400).json({
      error: "Virheellinen jobPostingId. ID:n on oltava validi UUID-merkkijono.",
    });
  }

  try {
    const result = await prisma.aIAnalysis.deleteMany({
      where: {
        job_posting_id: jobPostingId,
      },
    });

    res.status(200).json({
      message: "Kaikki analyysit poistettu",
      deleted_count: result.count,
    });
  } catch (error) {
    res.status(500).json({
      error: "Virhe analyysien poistamisessa",
      details: error instanceof Error ? error.message : "Tuntematon virhe",
    });
  }
};
