import { z } from "zod";


export const JobPostingSchema = z.object({
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
