"use server";

import { revalidatePath } from "next/cache";
import { runAiAnalysis, deleteAllAiAnalysisByJobPostingId } from "@/app/services/aiAnalysisService";
import { requireAuth } from "@/lib/require-auth";

// Server action to trigger AI analysis for all candidates of a specific job posting.
export async function runAnalysisAction(jobId: string) {
  await requireAuth(async () => {
    await runAiAnalysis(jobId);
    revalidatePath(`/resumeAnalyzer/${jobId}`);
  });
}
// Server action to delete all AI analyses for a specific job posting.
export async function deleteAllAnalysisAction(jobId: string) {
  await requireAuth(async () => {
    await deleteAllAiAnalysisByJobPostingId(jobId);
    revalidatePath(`/resumeAnalyzer/${jobId}`);
  });
}
