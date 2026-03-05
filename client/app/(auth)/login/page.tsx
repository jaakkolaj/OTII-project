"use client"
import { LoginForm } from "@/app/(auth)/login/components/login-form"
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

      setTimeout(() => router.push('/'), 1000);

    } catch (error) {
      // Axios error — kaiva backendisi palauttama message suoraan
      if (axios.isAxiosError(error)) {

        const status = error.response?.status;
        const message = error.response?.data?.message;

        switch (status) {
          case 400:
                toast.error('Invalid input', { description: message ?? 'Please check your details.' });
                break;
            case 401:
                toast.error('Login failed', { description: message ?? 'Invalid email or password.' });
                break;
            case 403:
                toast.error('Access denied', { description: message ?? 'You do not have permission.' });
                break;
            case 404:
                toast.error('Not found', { description: message ?? 'Resource not found.' });
                break;
            case 409:
                toast.error('Conflict', { description: message ?? 'This resource already exists.' });
                break;
            default:
                toast.error('Something went wrong', { description: 'Please try again later.' });
                break;

         }
    } else {
        toast.error('Unexpected error', { description: 'Please try again later.' });
    }

    setPassword('');
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
        />
      </div>
    </div>
  );
}
