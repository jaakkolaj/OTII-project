"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface ResetPasswordFormProps {
  onSubmit?: (email: string) => Promise<void>
}

export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      if (onSubmit) {
        await onSubmit(email)
      } else {
        
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (!email.includes("@")) {
          throw new Error("Please enter a valid email address")
        }
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your email and we’ll send you a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <p className="text-green-600 text-center">
            Check your email! A reset link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
              )}

              <Field>
                <Button type="submit" className="w-full">
                  {"Send reset link"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
