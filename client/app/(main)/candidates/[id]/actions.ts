"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/require-auth";
import {
  updateCandidateStatus,
  createNote,
  deleteNote,
} from "@/app/services/candidateService";
import type { CandidateStatus } from "../../resumeAnalyzer/types";

export async function updateCandidateStatusAction(
  candidateId: string,
  status: CandidateStatus,
) {
  await requireAuth(async () => {
    await updateCandidateStatus(candidateId, status);
    revalidatePath(`/candidates/${candidateId}`);
  });
}

export async function createNoteAction(candidateId: string, content: string) {
  await requireAuth(async () => {
    await createNote(candidateId, content);
    revalidatePath(`/candidates/${candidateId}`);
  });
}

export async function deleteNoteAction(candidateId: string, noteId: string) {
  await requireAuth(async () => {
    await deleteNote(candidateId, noteId);
    revalidatePath(`/candidates/${candidateId}`);
  });
}
