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

export function SecuritySettings() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await changePasswordAction(formData);

      if (!result.success) {
        toast.error("Password change failed", {
          description: result.message,
        });
        return;
      }

      toast.success("Password updated", {
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
          Security
        </CardTitle>
        <CardDescription>
          Update your password and keep account access secure.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <Field>
            <FieldLabel htmlFor="current-password">Current password</FieldLabel>
            <Input
              id="current-password"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="new-password">New password</FieldLabel>
            <Input
              id="new-password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
            />
            <FieldDescription>Use at least 6 characters.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
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
            {isPending ? "Updating..." : "Update password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
