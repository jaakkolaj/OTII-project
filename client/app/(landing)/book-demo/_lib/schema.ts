import { z } from "zod";

export const bookDemoSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export type BookDemoFormData = z.infer<typeof bookDemoSchema>;
