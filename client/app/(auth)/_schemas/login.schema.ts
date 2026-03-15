import { z } from "zod";

export const loginSchema = z.object({
    email: z.email().toLowerCase().max(255, "Email must be less than 255 characters"),
    password: z.string().min(5, "Password must be at least 5 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;