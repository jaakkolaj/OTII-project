"use client"
import { SignupForm } from "@/app/(auth)/register/_components/signup-form"
import { useState } from "react"
import { createUser } from "@/app/services/userService"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== passwordRepeat) {
      toast.error("Registration failed", {
        description: "Passwords do not match.",
      })
      return
    }
    setIsLoading(true)
    try {
      const user = { email, password }
      await createUser(user)

      toast.success("Account created!", {
        description: "Redirecting you to login...",
      })

      setTimeout(() => router.push("/login"), 1000)

    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message ??
          error.response?.data?.error ??
          "Registration failed. Please try again."
        : "An unexpected error occurred."

      toast.error("Registration failed", {
        description: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm
          email={email}
          password={password}
          passwordRepeat={passwordRepeat}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onPasswordRepeatChange={setPasswordRepeat}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}