import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { aiAnalysisQueue } from "../queues/aiAnalysis.queue";
import { redis } from "../config/redis";
import { AuthenticationError, NotFoundError, ServerError, ValidationError } from "../utils/errors";

const isUuid = (id: string) => 
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)

export const aianalysis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new AuthenticationError("Unauthorized"));
    }

    const { jobPostingId } = req.params;

    // Varmistetaan, että jobPostingId on validi UUID-merkkijono
    if (typeof jobPostingId !== "string" || !isUuid(jobPostingId)) {
      return next(new ValidationError("Incorrect jobPostingId"));
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
    return next(new ServerError("Server error with starting analysis"));
  }
};

export const cancelAiAnalysis = async (req: Request, res: Response, next: NextFunction) => {
  const { jobPostingId } = req.params;

  if (typeof jobPostingId !== "string" || !isUuid(jobPostingId)) {
    return next(new ValidationError("Incorrect jobPostingId"))
  }

  try {
    // Worker lukee tämän flagin jokaisen kandidaatin välissä ja keskeyttää prosessin.
    await redis.set(`cancel-analysis:${jobPostingId}`, "true", "EX", 3600);

    // Poistetaan myös jonossa odottavat tämän jobPostingin analyysityöt.
    const jobs = await aiAnalysisQueue.getJobs([
      "waiting",
      "delayed",
      "prioritized",
      "paused",
    ]);

    for (const job of jobs) {
      if (job.data?.jobPostingId === jobPostingId) {
        await job.remove();
      }
    }

    return res.json({ message: "Analysis cancellation requested" });
  } catch (error: any) {
    return next(new ServerError("Error in closing analysis"));
  }
};

export const getAiAnalysisStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobPostingId } = req.params;

    if (typeof jobPostingId !== "string") {
      return next(new ValidationError("Incorrect jobPostingId"));
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
    return next(new ServerError("Server Error with getting status"));
  }
};

// Hakee yhden jobPostingin kaikki aiAnalyysit
export const getAiAnalysesByJobPostingId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AuthenticationError("Unauhtorized"));
    }

    const { jobPostingId } = req.params;
    if (typeof jobPostingId !== "string") {
      return next(new ValidationError("Incorrect jobPostingID"));
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
          status: candidate?.status ?? "NEW",
        };
      }),
    );

    return res.status(200).json(aiAnalysesWithName);
  } catch (error) {
    return next(new ServerError("Server error with getting analyses"));
  }
};

// Hae analyysi ehdokkaan ID:n perusteella
export const getAnalysisById = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AuthenticationError("Unauhtorized"));
  }

  const { analysisId } = req.params;
  if (typeof analysisId !== "string") {
    return next(new ValidationError("Incorrect jobPostingID"));
  }

  try {
    const aiAnalysis = await prisma.aIAnalysis.findUnique({
      where: {
        id: analysisId,
      },
    });
    res.status(200).json(aiAnalysis);
  } catch (error) {
    return next(new ServerError("Server error with getting analysis"));
  }
};

// Poista analyysin ID:n perusteella
export const deleteAnalysis = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AuthenticationError("Unauthorized"));
  }
  const { analysisId } = req.params;
  if (typeof analysisId !== "string") {
    return next(new ValidationError("Incorrect jobPostingID"));
  }

  const aiAnalysis = await prisma.aIAnalysis.findUnique({
    where: {
      id: analysisId,
    },
  });

  if (!aiAnalysis) {
    return next(new NotFoundError("AI analysis not found"));
  }

  try {
    await prisma.aIAnalysis.delete({ where: { id: analysisId } });
    res.status(200).json({ message: "Analyysi poistettu" });
  } catch (error) {
    return next(new ServerError("Server error with deleting analysis"));
  }
};

// Poista kaikki analyysit yhdelle jobPostingille
export const deleteAllAnalysesByJobPostingId = async (req: Request, res: Response, next:  NextFunction) => {
  if (!req.user) {
    return next(new AuthenticationError("Unauthorized"));
  }

  const { jobPostingId } = req.params;
  
  if (typeof jobPostingId !== "string" || !isUuid(jobPostingId)) {
    return next(new ValidationError("Incorrect jobPostingID"));
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
    return next(new ServerError("Server error with deleting analyses"));
  }
};