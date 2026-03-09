import prisma from "../prisma";
import { analyzeTextWithAI } from "./ai.service";
import { redis } from "../config/redis";

export const analyzeCandidatesForJobPosting = async (jobPostingId: string) => {
  // Fetch candidates that do not yet have an analysis in this job posting.
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

  const results: {
    id: string;
    status: "success" | "error" | "skipped";
    error?: string;
  }[] = [];

  try {
    // Process candidates one by one and stop if cancel flag is set.
    for (const candidate of candidates) {
      const cancel = await redis.get(`cancel-analysis:${jobPostingId}`);
      if (cancel === "true") {
        break;
      }

      const cvText = candidate.documents[0]?.extracted_text;
      const jobRequirements = candidate.job_posting.requirements;

      if (!cvText) {
        results.push({
          id: candidate.id,
          status: "skipped",
        });
        continue;
      }

      try {
        const aiResult = await analyzeTextWithAI(cvText, jobRequirements);
        const safeScore = Math.min(Math.max(aiResult.score, 0), 100);

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
          `Analysis failed for candidate ${candidate.id}:`,
          error.message,
        );
        results.push({
          id: candidate.id,
          status: "error",
          error: error.message,
        });
      }
    }
  } finally {
    // Clear cancellation flag when this run finishes.
    await redis.del(`cancel-analysis:${jobPostingId}`);
  }

  return results;
};
