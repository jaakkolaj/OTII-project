import { Navbar } from "@/app/(landing)/_components/navbar";
import { LoginForm } from "@/app/(auth)/login/_components/login-form";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
