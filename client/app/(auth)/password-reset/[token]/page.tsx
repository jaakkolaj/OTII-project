import { NewPasswordForm } from "@/app/(auth)/password-reset/_components/new-password-form";

type PageProps = {
  params: {
    token: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <NewPasswordForm token={params.token} />
      </div>
    </div>
  );
}
