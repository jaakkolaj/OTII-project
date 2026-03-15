"use server";

import { z } from "zod";
import type { FormState } from "@/lib/forms/types";
import {
  passwordResetRequestSchema,
  passwordResetSchema,
  type PasswordResetInput,
  type PasswordResetRequestInput,
} from "@/app/(auth)/_schemas/password-reset.schema";

export async function requestPasswordResetAction(
  _prevState: FormState<PasswordResetRequestInput>,
  formData: FormData,
): Promise<FormState<PasswordResetRequestInput>> {
  const email = formData.get("email")?.toString() || "";

  const validated = passwordResetRequestSchema.safeParse({ email });
  if (!validated.success) {
    return {
      fields: { email },
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  // TODO: Replace with real API call to trigger password reset email.
  return {
    success: true,
    message:
      "If an account exists for this email, a reset link has been sent.",
  };
}

export async function resetPasswordAction(
  _prevState: FormState<PasswordResetInput>,
  formData: FormData,
): Promise<FormState<PasswordResetInput>> {
  const token = formData.get("token")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const passwordRepeat = formData.get("passwordRepeat")?.toString() || "";

  const validated = passwordResetSchema.safeParse({
    token,
    password,
    passwordRepeat,
  });
  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  // TODO: Replace with real API call to finalize password reset.
  return {
    success: true,
    message: "Your password has been successfully reset.",
  };
}
