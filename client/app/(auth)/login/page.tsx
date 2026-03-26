"use client"
import { LoginForm } from "@/app/(auth)/login/_components/login-form"
import { useState } from "react";
import { loginUser } from "@/app/services/userService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const user = { email, password };
      await loginUser(user);

      toast.success('Login successful!', {
        description: 'Redirecting you to the dashboard...',
      });

      router.push('/home')

    } catch (error) {
      // Axios error — kaiva backendisi palauttama message suoraan
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message ?? error.response?.data?.error ?? 'Login failed. Please try again.'
        : 'An unexpected error occurred.';

      toast.error('Login failed', { description: message });
      setPassword('');

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
