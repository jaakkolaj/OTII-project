"use client";

import { LockKeyhole } from "lucide-react";
import { FormEvent, useRef, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { changePasswordAction } from "@/app/(main)/profile/actions";
import { toast } from "sonner";
import { useLanguage } from "@/lib/language-provider";

export function SecuritySettings() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await changePasswordAction(formData);

      if (!result.success) {
        toast.error(t('profile.security.passwordChangeFailed'), {
          description: result.message,
        });
        return;
      }

      toast.success(t('profile.security.passwordUpdated'), {
        description: result.message,
      });
      formRef.current?.reset();
    });
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <LockKeyhole className="h-4 w-4 text-muted-foreground" />
          </span>
          {t('profile.security.title')}
        </CardTitle>
        <CardDescription>
          {t('profile.security.description')}
        </CardDescription>
      </CardHeader>
      <form ref={formRef} onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <Field>
            <FieldLabel htmlFor="current-password">{t('profile.security.currentPassword')}</FieldLabel>
            <Input
              id="current-password"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="new-password">{t('profile.security.newPassword')}</FieldLabel>
            <Input
              id="new-password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
            />
            <FieldDescription>{t('profile.security.passwordHelp')}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">{t('profile.security.confirmPassword')}</FieldLabel>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
            />
          </Field>
        </CardContent>
        <CardFooter className="justify-end gap-2 border-t">
          <Button type="submit" size="sm" disabled={isPending}>
            {isPending ? t('profile.security.updating') : t('profile.security.update')} 
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
