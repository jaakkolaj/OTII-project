"use server";
import { revalidatePath } from "next/cache";
import { createJobPosting } from "@/app/services/jobPostingService";
import { requireAuth } from "@/lib/require-auth";
import { z } from "zod";
import { FormState } from "@/lib/form-utils";
import { FormStatus } from "react-dom";
import { CreateJobPostingInput } from "@/app/types/jobPosting";

// Zod schema for validating the form data
const createJobPostingSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  department: z.string().optional(),
  location: z.string().optional(),
  employmentType: z
    .enum(["full-time", "part-time", "contract", "internship"])
    .optional(),
  seniority: z.enum(["junior", "mid", "senior", "lead"]).optional(),
  salaryRange: z.string().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  requirements: z.string().optional(),
  closingDate: z.string().optional(),
});

// Server action to handle the creation of a new job posting. It validates the form data,
// creates the job posting if the user is authenticated, and revalidates the job postings page.
export async function createJobPostingAction(
  _prevState: FormState<CreateJobPostingInput>,
  formData: FormData,
): Promise<FormState<CreateJobPostingInput>> {
  // Convert FormData to a plain object and validate it against the schema.
  const unValidatedData = Object.fromEntries(formData);
  const validated = createJobPostingSchema.safeParse(unValidatedData);

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
