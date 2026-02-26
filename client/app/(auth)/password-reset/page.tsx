"use client"

import { ResetPasswordForm } from "@/app/(auth)/password-reset/components/password-reset-form"

export default function ResetPasswordPage() {
  
  const handleReset = async (email: string) => {
    
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (!email.includes("@")) {
      throw new Error("Invalid email")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <ResetPasswordForm onSubmit={handleReset} />
    </div>
  )
}
