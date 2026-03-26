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
import { resetPasswordAction } from "../actions";

interface NewPasswordFormProps {
  token: string;
}

export function NewPasswordForm({ token }: NewPasswordFormProps) {
  const [state, formAction] = useActionState(resetPasswordAction, null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
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
            <input type="hidden" name="token" value={token} />
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">New Password</FieldLabel>
                <Input id="password" name="password" type="password" />
                <FieldError errors={state?.errors?.password} />
              </Field>
              <Field>
                <FieldLabel htmlFor="passwordRepeat">Confirm Password</FieldLabel>
                <Input
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                />
                <FieldError errors={state?.errors?.passwordRepeat} />
              </Field>
              <Field>
                <FieldError>{state?.message}</FieldError>
                <FormSubmitButton
                  text="Reset Password"
                  loadingText="Resetting"
                  className="w-full"
                />
              </Field>
            </FieldGroup>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
