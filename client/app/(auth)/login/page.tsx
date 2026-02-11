"use client"
import { LoginForm } from "@/app/(auth)/login/components/login-form"
import { useState } from "react";
import { loginUser } from "@/app/services/userService";
import { useRouter } from "next/navigation";
import { parseApiError, getUserFriendlyMessage } from "@/lib/utils/apiErrors";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/ui/toast";

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const user = {
        email,
        password
      };
      
      const response = await loginUser(user);
      console.log('Login successful:', response);
      
      // Show success message
      toast.success('Login successful! Redirecting...');
      
      // Redirect after a short delay to show the success message
      setTimeout(() => {
        router.push('/');
      }, 1000);

    } catch (error) {
      console.error('Login error:', error);
      
      // Parse the error and get user-friendly message
      const apiError = parseApiError(error);
      const userMessage = getUserFriendlyMessage(apiError);
      
      // Show error toast
      toast.error(userMessage);
      
      // Optional: Clear password field on error for security
      setPassword('');
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
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
    </>
  );
}