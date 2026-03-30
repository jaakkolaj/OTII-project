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
import { useLanguage } from "@/lib/language-provider";
import Link from "next/link";

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, null);
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.login.title')}</CardTitle>
        <CardDescription>
          {t('auth.login.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4" noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">{t('auth.login.email')}</FieldLabel>
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
                <FieldLabel htmlFor="password">{t('auth.login.password')}</FieldLabel>
                <a
                  href="/password-reset"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  {t('auth.login.forgotPassword')}
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t('auth.login.passwordPlaceholder')}
              />
            </Field>
            <Field>
              <FieldError>{state?.message}</FieldError>
              <FormSubmitButton text={t('auth.login.submit')} loadingText={t('auth.login.loading')} />
              <FieldDescription className="text-center">
                {t('auth.login.noAccount')} <a href="register">{t('auth.login.signUp')}</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
