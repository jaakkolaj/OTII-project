"use server";

import { revalidatePath } from "next/cache";
import {
  runAiAnalysis,
  deleteAllAiAnalysisByJobPostingId,
  cancelAiAnalysis,
} from "@/app/services/aiAnalysisService";
import { requireAuth } from "@/lib/require-auth";
import { getMappedCandidates } from "./data";

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

// Server action to cancel ongoing AI analysis for a specific job posting.
export async function cancelAnalysisAction(jobId: string) {
  await requireAuth(async () => {
    await cancelAiAnalysis(jobId);
    revalidatePath(`/resumeAnalyzer/${jobId}`);
  });
}

// Server action to get currently analyzed candidates during polling.
export async function getAnalyzedCandidatesAction(
  jobId: string,
  jobTitle: string,
) {
  return requireAuth(async () => getMappedCandidates(jobId, jobTitle));
}
