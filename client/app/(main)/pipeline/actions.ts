"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/require-auth";
import { updateCandidateStatus } from "@/app/services/candidateService";
import type { CandidateStatus } from "../resumeAnalyzer/types";

export async function updatePipelineCandidateStatusAction(
  candidateId: string,
  status: CandidateStatus,
) {
  await requireAuth(async () => {
    await updateCandidateStatus(candidateId, status);
    revalidatePath("/pipeline");
  });
}
