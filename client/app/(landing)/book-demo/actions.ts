"use server"

import { Resend } from "resend";
import { bookDemoSchema } from "./_lib/schema";
import { FormState } from "@/lib/form-utils";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export type BookDemoFormState = {
    name?: string;
    email?: string;
    message?: string;
};

export async function sendBookDemoEmail(
    prevState: FormState<BookDemoFormState>,
    formData: FormData
): Promise<FormState<BookDemoFormState>> {
    const raw = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
    };

    const validated = bookDemoSchema.safeParse(raw);

    if (!validated.success) {
        return {
            success: false,
            message: "Please fix the errors below.",
            errors: z.flattenError(validated.error).fieldErrors,
            fields: raw,
        };
    }

    const { name, email, message } = validated.data;

    try {
        await resend.emails.send({
            from: "RankWise AI <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL!,
            subject: `[Book a Demo] New demo request from ${name}`,
            html: `
                <h2>New Book a Demo request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        return { success: true, message: "Demo request sent successfully!" };
    } catch {
        return { success: false, message: "Failed to send request. Please try again." };
    }
}
