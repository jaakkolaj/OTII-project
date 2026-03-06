"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { editJobPostingById } from "@/app/services/jobPostingService";
import type { CreateJobPostingInput } from "@/app/types/jobPosting";
import { requireAuth } from "@/lib/require-auth";
import { UnauthorizedError } from "@/lib/errors";

export type EditPostingFormState = {
  error: string;
} | null;

const getFieldValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export async function updateJobPostingAction(
  _prevState: EditPostingFormState,
  formData: FormData,
): Promise<EditPostingFormState> {
  
  return requireAuth(async () => {
    const jobId = getFieldValue(formData, "id");

    if (!jobId) {
      return { error: "Missing job posting id." };
    }

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

    await editJobPostingById(jobId, payload);
    

    revalidatePath("/job_postings");
    revalidatePath(`/job_postings/${jobId}`);
    redirect("/job_postings");
  });
}
