"use server";

import type { FormState } from "@/lib/forms/types";
import { createUser } from "@/app/services/userService";
import { redirect } from "next/navigation";
import { registerSchema, type RegisterInput } from "../_schemas/register.schema";
import { z } from "zod";

export async function registerAction(
  _prevState: FormState<RegisterInput>,
  formData: FormData,
): Promise<FormState<RegisterInput>> {
  
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const passwordRepeat = formData.get("passwordRepeat")?.toString() || "";

  const validated = registerSchema.safeParse({ email, password, passwordRepeat });

  if (!validated.success) {
    return {
      fields: { email },
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }
  try {
    await createUser({ email: validated.data.email, password: validated.data.password });
  } catch {
    return {
      message: "An error occurred while creating your account. Email might be already in use",
      fields: { email },
    };
  }
  redirect("/login");
}
