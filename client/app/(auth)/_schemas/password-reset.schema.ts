import { z } from "zod";

export const passwordResetRequestSchema = z.object({
  email: z
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
});

export const passwordResetSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z.string().min(5, "Password must be at least 5 characters"),
    passwordRepeat: z.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    path: ["passwordRepeat"],
    message: "Passwords do not match",
  });

export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
