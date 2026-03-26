"use server";
import { revalidatePath } from "next/cache";
import { createJobPosting } from "@/app/services/jobPostingService";
import { requireAuth } from "@/lib/auth/require-auth";
import { z } from "zod";
import { FormState } from "@/lib/forms/types";
import { JobPostingSchema, type CreateJobPostingInput } from "@/app/(main)/job_postings/_schemas/jobposting.schema";


// Server action to handle the creation of a new job posting. It validates the form data,
// creates the job posting if the user is authenticated, and revalidates the job postings page.
export async function createJobPostingAction(
  _prevState: FormState<CreateJobPostingInput>,
  formData: FormData,
): Promise<FormState<CreateJobPostingInput>> {
  // Convert FormData to a plain object and validate it against the schema.
  const unValidatedData = Object.fromEntries(formData);
  const validated = JobPostingSchema.safeParse(unValidatedData);

  // If validation fails, flatten the errors and return them to be displayed in the UI.
  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return { errors: fieldErrors, success: false, fields: unValidatedData };
  }
  // Call the service to create the job posting, ensuring the user is authenticated.
  await requireAuth(() => createJobPosting(validated.data));
  revalidatePath("/job_postings");
  return { success: true };
}
