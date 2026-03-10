"use server";

import { revalidatePath } from "next/cache";
import { changeEmail, changePassword } from "@/app/services/userSettingsService";
import { requireAuth } from "@/lib/require-auth";

export type ChangePasswordActionResult = {
  success: boolean;
  message: string;
};

export async function changePasswordAction(
  formData: FormData
): Promise<ChangePasswordActionResult> {
  const currentPassword = String(formData.get("currentPassword") ?? "").trim();
  const newPassword = String(formData.get("newPassword") ?? "").trim();
  const confirmPassword = String(formData.get("confirmPassword") ?? "").trim();

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, message: "Please fill all password fields." };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  if (newPassword.length < 6) {
    return {
      success: false,
      message: "New password must be at least 6 characters long.",
    };
  }

  try {
    await requireAuth(() => changePassword(currentPassword, newPassword));
    revalidatePath("/profile");
    return { success: true, message: "Your password was changed successfully." };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Password change failed.";
    return { success: false, message };
  }
}

export type ChangeEmailActionResult = {
  success: boolean;
  message: string;
};

export async function changeEmailAction(
  formData: FormData
): Promise<ChangeEmailActionResult> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { success: false, message: "Email is required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Invalid email format." };
  }

  try {
    await requireAuth(() => changeEmail(email));
    revalidatePath("/profile");
    return { success: true, message: "Your email was changed successfully." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email change failed.";
    return { success: false, message };
  }
}
