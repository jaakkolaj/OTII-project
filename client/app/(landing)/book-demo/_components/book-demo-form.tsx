"use client"

import { useActionState, useEffect, useState } from "react";
import { sendBookDemoEmail, BookDemoFormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "usehooks-ts";

const STORAGE_KEY = "book-demo-form-draft";

export function BookDemoForm() {
    const [state, action, isPending] = useActionState(sendBookDemoEmail, null);

    const [savedData, setSavedData] = useLocalStorage<Partial<BookDemoFormState>>(STORAGE_KEY, {
        name: "",
        email: "",
        message: "",
    });

    const [formData, setFormData] = useState<Partial<BookDemoFormState>>(savedData);

    useEffect(() => {
        setFormData(savedData);
    }, [savedData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updated = { ...formData, [name]: value };
        setFormData(updated);
        setSavedData(updated);
    };

    useEffect(() => {
        if (state?.success) {
            setSavedData({ name: "", email: "", message: "" });
        }
    }, [state?.success, setSavedData]);

    if (state?.success) {
        return (
            <Card className="bg-transparent border border-white/20 backdrop-blur-xl shadow-xl text-white">
                <CardHeader>
                    <CardTitle>Request sent!</CardTitle>
                    <CardDescription>{state.message}</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="bg-transparent border border-white/20 backdrop-blur-xl shadow-xl text-white">
            <CardHeader>
                <CardTitle>Book a Demo</CardTitle>
                <CardDescription>
                    Fill out this form and we will contact you shortly to schedule a demo.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action} noValidate>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
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
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
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
                            <FieldLabel htmlFor="message">Message</FieldLabel>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Tell us what kind of demo and use case you want..."
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
                                {isPending ? "Sending..." : "Send Request"}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
