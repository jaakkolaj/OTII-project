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
import { loginAction } from "../actions";

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, null);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password below to login to your account
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
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="/password-reset"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </Field>
            <Field>
              <FieldError>{state?.message}</FieldError>
              <FormSubmitButton text="Login" loadingText="Logging in" />
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="register">Sign up</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
