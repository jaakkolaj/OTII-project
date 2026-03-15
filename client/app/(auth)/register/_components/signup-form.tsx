"use client";

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
import { useActionState } from "react";
import { registerAction } from "@/app/(auth)/register/actions";

export function SignupForm() {
  const [state, formAction] = useActionState(registerAction, null);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
              <FieldError>{state?.errors?.email}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
    
              <FieldError>{state?.errors?.password}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="passwordRepeat">Confirm Password</FieldLabel>
              <Input
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
                placeholder="Confirm password"
              />
              <FieldError>{state?.errors?.passwordRepeat}</FieldError>
            </Field>
            <Field>
              <FieldError>{state?.message}</FieldError>
              <FormSubmitButton text="Create Account" loadingText="Creating account" />
              <FieldDescription className="px-6 text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
