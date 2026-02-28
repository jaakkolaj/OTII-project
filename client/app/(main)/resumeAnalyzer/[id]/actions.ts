"use server";

import { revalidatePath } from "next/cache";
import { runAiAnalysis, deleteAllAiAnalysisByJobPostingId } from "@/app/services/aiAnalysisService";

// Server action to trigger AI analysis for all candidates of a specific job posting.
export async function runAnalysisAction(jobId: string) {
  await runAiAnalysis(jobId);
  revalidatePath(`/aiAnalysis/${jobId}`);
}
// Server action to delete all AI analyses for a specific job posting.
export async function deleteAllAnalysisAction(jobId: string) {
  await deleteAllAiAnalysisByJobPostingId(jobId);
  revalidatePath(`/aiAnalysis/${jobId}`);
}
