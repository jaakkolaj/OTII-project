import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email("Invalid email address").max(255, "Email must be less than 255 characters"),
    password: z.string().min(5, "Password must be at least 5 characters"),
     /*  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"), */
    passwordRepeat: z.string()
  })
  .refine((data) => data.password === data.passwordRepeat, {
    path: ["passwordRepeat"],
    message: "Passwords do not match",
  });

export type RegisterInput = z.infer<typeof registerSchema>;
