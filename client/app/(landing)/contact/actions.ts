"use server"

import { Resend } from "resend";
import { contactSchema } from "./_lib/schema";
import { FormState } from "@/lib/form-utils";
import { fi } from "zod/v4/locales";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

 export type ContactFormState = {
        name?: string;
        email?: string;
        subject?: string;
        message?: string;
    };
 
export async function sendContactEmail(
    prevState: FormState<ContactFormState> | null,
    formData: FormData
): Promise<FormState<ContactFormState>> {
    const raw = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
    };

    const validated = contactSchema.safeParse(raw);

    if (!validated.success) {
        return {
            success: false,
            message: "Please fix the errors below.",
            errors: z.flattenError(validated.error).fieldErrors,
            fields: raw
        };
    }

    const { name, email, subject, message } = validated.data;

    try {
        await resend.emails.send({
            from: "RankWise AI <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL!,
            subject: `[Contact] ${subject}`,
            html: `
                <h2>New contact message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        return { success: true, message: "Message sent successfully!" };
    } catch {
        return { success: false, message: "Failed to send message. Please try again." };
    }
}