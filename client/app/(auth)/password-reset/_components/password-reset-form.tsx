"use client";

import { useActionState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FormSubmitButton from "@/components/ui-build/formSubmitButton";
import { requestPasswordResetAction } from "../actions";

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(requestPasswordResetAction, null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state?.success ? (
          <div className="space-y-3 text-center">
            <p className="text-green-600">{state?.message}</p>
            <FieldDescription>
              Return to <a href="/login">sign in</a>.
            </FieldDescription>
          </div>
        ) : (
          <form action={formAction} className="space-y-4" noValidate>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  defaultValue={state?.fields?.email}
                />
                <FieldError errors={state?.errors?.email} />
              </Field>
              <Field>
                <FieldError>{state?.message}</FieldError>
                <FormSubmitButton
                  text="Send reset link"
                  loadingText="Sending reset link"
                  className="w-full"
                />
                <FieldDescription className="text-center">
                  Remembered your password? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
