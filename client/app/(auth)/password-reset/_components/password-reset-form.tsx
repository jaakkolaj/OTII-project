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
import { useLanguage } from "@/lib/language-provider";

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(requestPasswordResetAction, null);
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.resetPassword.title')}</CardTitle>
        <CardDescription>
          {t('auth.resetPassword.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state?.success ? (
          <div className="space-y-3 text-center">
            <p className="text-green-600">{state?.message}</p>
            <FieldDescription>
              {t('auth.resetPassword.returnToSignIn')} <a href="/login">{t('auth.resetPassword.signIn')}</a>.
            </FieldDescription>
          </div>
        ) : (
          <form action={formAction} className="space-y-4" noValidate>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t('auth.resetPassword.email')}</FieldLabel>
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
                  text={t('auth.resetPassword.submit')}
                  loadingText={t('auth.resetPassword.loading')}
                  className="w-full"
                />
                <FieldDescription className="text-center">
                  {t('auth.resetPassword.rememberedPassword')} <a href="/login">{t('auth.resetPassword.signIn')}</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
