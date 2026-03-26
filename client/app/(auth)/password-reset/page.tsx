import { ResetPasswordForm } from "@/app/(auth)/password-reset/_components/password-reset-form";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-sm">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
