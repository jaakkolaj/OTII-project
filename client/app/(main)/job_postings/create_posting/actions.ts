"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createJobPosting } from "@/app/services/jobPostingService";
import type { CreateJobPostingInput } from "@/app/types/jobPosting";
import { requireAuth } from "@/lib/require-auth";
import { UnauthorizedError } from "@/lib/errors";
import { z } from "zod";

//TODO 
// - Lisää validointi zodilla
// - Lisää error handling ja näytä virheilmoitus UI:ssa

export type CreatePostingFormState = {
  error: string;
} | null;

const getFieldValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};
export async function createJobPostingAction(
  _prevState: CreatePostingFormState,
  formData: FormData,
): Promise<CreatePostingFormState> {

  return requireAuth(async () => {
    const payload: CreateJobPostingInput = {
      title: getFieldValue(formData, "title"),
      department: getFieldValue(formData, "department"),
      location: getFieldValue(formData, "location"),
      employmentType: getFieldValue(formData, "employmentType") || "full-time",
      seniority: getFieldValue(formData, "seniority") || "mid",
      description: getFieldValue(formData, "description"),
      requirements: getFieldValue(formData, "requirements"),
      salaryRange: getFieldValue(formData, "salaryRange"),
      closingDate: getFieldValue(formData, "closingDate"),
    };

    if (!payload.title || !payload.description) {
      return { error: "Title and description are required." };
    }
    
    await createJobPosting(payload);

    revalidatePath("/job_postings");
    redirect("/job_postings");
  });
}
