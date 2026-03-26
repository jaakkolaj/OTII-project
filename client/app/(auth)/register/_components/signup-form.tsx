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
import { useLanguage } from "@/lib/language-provider";

export function SignupForm() {
  const [state, formAction] = useActionState(registerAction, null);
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.register.title')}</CardTitle>
        <CardDescription>
          {t('auth.register.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4" noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">{t('auth.register.email')}</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                defaultValue={state?.fields?.email}
              />
              <FieldDescription>
                {t('auth.register.emailDescription')}
              </FieldDescription>
              <FieldError>{state?.errors?.email}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">{t('auth.register.password')}</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t('auth.register.passwordPlaceholder')}
              />

              <FieldError>{state?.errors?.password}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="passwordRepeat">{t('auth.register.confirmPassword')}</FieldLabel>
              <Input
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
                placeholder={t('auth.register.confirmPasswordPlaceholder')}
              />
              <FieldError>{state?.errors?.passwordRepeat}</FieldError>
            </Field>
            <Field>
              <FieldError>{state?.message}</FieldError>
              <FormSubmitButton text={t('auth.register.submit')} loadingText={t('auth.register.loading')} />
              <FieldDescription className="px-6 text-center">
                {t('auth.register.haveAccount')} <a href="/login">{t('auth.register.signIn')}</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
