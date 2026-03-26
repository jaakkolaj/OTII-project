"use server";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/require-auth";
import { z } from "zod";
import { FormState } from "@/lib/forms/types";
import { JobPostingSchema, type CreateJobPostingInput } from "@/app/(main)/job_postings/_schemas/jobposting.schema";
import { editJobPostingById } from "@/app/services/jobPostingService";

// Server action to handle editing an existing job posting.
export async function editJobPostingAction(
  jobId: string,
  _prevState: FormState<CreateJobPostingInput>,
  formData: FormData,
): Promise<FormState<CreateJobPostingInput>> {
  
  const unValidatedData = Object.fromEntries(formData);
  const validated = JobPostingSchema.safeParse(unValidatedData);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return { errors: fieldErrors, success: false, fields: unValidatedData };
  }

  await requireAuth(() => editJobPostingById(jobId, validated.data));
  revalidatePath("/job_postings");
  return { success: true };
}
