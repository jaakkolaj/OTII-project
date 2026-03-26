"use server";

import { LoginInput, loginSchema } from "../_schemas/login.schema";
import { loginUser } from "@/app/services/userService";
import { z } from "zod";
import type { FormState } from "@/lib/forms/types";
import { createSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";


// Server action for handling login form submission. Validates input, attempts login, and manages session creation.
export async function loginAction(
  _prevState: FormState<LoginInput>,
  formData: FormData,
): Promise<FormState<LoginInput>> {

  const email = formData.get("email")?.toString() || "";
  const password = formData.get('password')?.toString() || "";

  const validated = loginSchema.safeParse({ email, password });
  
  if (!validated.success) {
    return {message:"Invalid email or password", fields: { email: email} };
  }
  try {
    const result = await loginUser(validated.data);
    await createSession(result.token);

  } catch {
    return {
      message: "Invalid email or password.",
      fields: { email: email }
    };
  }
  redirect("/home");
}
