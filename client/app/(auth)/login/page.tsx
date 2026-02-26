// src/app/(auth)/login/page.tsx
"use client";

import { LoginForm } from "./components/login-form";
import { useState } from "react";
import { loginUser } from "@/app/services/userService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { MeshGradient } from "@/components/ui/meshgradient";
import { ReviewsCarousel } from "@/components/ui/reviewcarousel";
import { useFormError } from "@/hooks/use-form-error";
import { ApiError } from "@/lib/api";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    generalError,
    setError,
    clearError,
    clearFieldError,
    getFieldError,
  } = useFormError();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearError();
    setIsLoading(true);

    try {
      const user = { email, password };
      await loginUser(user);

      toast.success("Login successful!", {
        description: "Redirecting you to the dashboard...",
      });

      setTimeout(() => router.push("/"), 1000);
    } catch (error) {
      // Käsittele virhe
      if (axios.isAxiosError(error) && error.response?.data) {
        // Jos on ApiError muodossa
        const apiError = error.response.data as ApiError;
        setError(apiError);

        // Näytä myös toast
        toast.error("Login failed", {
          description: apiError.message,
        });
      } else {
        // Yleinen virhe
        const message = axios.isAxiosError(error)
          ? error.response?.data?.message ??
            error.response?.data?.error ??
            "Login failed. Please try again."
          : "An unexpected error occurred.";

        setError({
          status: "error",
          statusCode: 500,
          message,
        });

        toast.error("Login failed", { description: message });
      }

      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSignUp = () => {
    router.push("/register");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <MeshGradient />

      <div className="absolute inset-0 flex items-center z-[1]">
        <ReviewsCarousel />
      </div>

      <div className="relative z-[2] flex flex-col items-center">
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