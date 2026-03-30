"use client"

import { useActionState, useEffect, useState } from "react";
import { sendContactEmail, ContactFormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { stat } from "fs";
import { email } from "zod";
import { useLocalStorage } from "usehooks-ts";
import { useLanguage } from "@/lib/language-provider";
const STORAGE_KEY = "contact-form-draft";



export function ContactForm() {
    const [state, action, isPending] = useActionState(sendContactEmail, null);
    const { t } = useLanguage();
    // initialize stored draft with empty strings so inputs remain controlled
    const [savedData, setSavedData] = useLocalStorage<Partial<ContactFormState>>(STORAGE_KEY, {
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    // keep a local copy of form values so we can both control the inputs and
    // mirror them into localStorage on every change. using `defaultValue` and
    // an effect based on `state` was the reason the draft never re‑appeared when
    // reloading the page – only `name` used `savedData`, the others read from
    // `state?.fields` which is undefined until after a submission.
    const [formData, setFormData] = useState<Partial<ContactFormState>>(savedData);

    useEffect(() => {
        // if localStorage changes (e.g. on first render) update our state
        setFormData(savedData);
    }, [savedData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const updated = { ...formData, [name]: value };
        setFormData(updated);
        setSavedData(updated);
    };

    // clear the draft when the message is sent successfully
    useEffect(() => {
        if (state?.success) {
            setSavedData({ name: "", email: "", subject: "", message: "" });
        }
    }, [state?.success, setSavedData]);

    if (state?.success) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{t('contact.successTitle')}</CardTitle>
                    <CardDescription>{state.message}</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('contact.title')}</CardTitle>
                <CardDescription>
                    {t('contact.description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action} noValidate>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">{t('contact.name')}</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder={t('contact.namePlaceholder')}
                                required
                                disabled={isPending}
                                value={formData.name || ""}
                                onChange={handleChange}
                            />
                            {state?.errors?.name && (
                                <FieldDescription className="text-destructive">{state.errors.name[0]}</FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="email">{t('contact.email')}</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder={t('contact.emailPlaceholder')}
                                required
                                disabled={isPending}
                                value={formData.email || ""}
                                onChange={handleChange}
                            />
                            {state?.errors?.email && (
                                <FieldDescription className="text-destructive">{state.errors.email[0]}</FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="subject">{t('contact.subject')}</FieldLabel>
                            <Input
                                id="subject"
                                name="subject"
                                placeholder={t('contact.subjectPlaceholder')}
                                required
                                disabled={isPending}
                                value={formData.subject || ""}
                                onChange={handleChange}
                            />
                            {state?.errors?.subject && (
                                <FieldDescription className="text-destructive">{state.errors.subject[0]}</FieldDescription>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="message">{t('contact.message')}</FieldLabel>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder={t('contact.messagePlaceholder')}
                                rows={5}
                                required
                                disabled={isPending}
                                value={formData.message || ""}
                                onChange={handleChange}
                            />
                            {state?.errors?.message && (
                                <FieldDescription className="text-destructive">{state.errors.message[0]}</FieldDescription>
                            )}
                        </Field>

                        {state?.message && !state.success && (
                            <p className="text-sm text-destructive">{state.message}</p>
                        )}

                        <Field>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? t('contact.sending') : t('contact.submit')}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}