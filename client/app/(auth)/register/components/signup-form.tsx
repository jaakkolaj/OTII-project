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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface SignupFormProps extends Omit<React.ComponentProps<"div">, 'onSubmit'> {
  email: string;
  password: string;
  passwordRepeat: string;
  error?: string;
  onEmailChange?: (email: string) => void;
  onPasswordChange?: (password: string) => void;
  onPasswordRepeatChange?: (passwordRepeat: string) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function SignupForm({ 
  email,
  password,
  passwordRepeat,
  error,
  onEmailChange,
  onPasswordChange,
  onPasswordRepeatChange,
  onSubmit,
  ...props
}: SignupFormProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => onEmailChange?.(e.target.value)}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input 
              id="password" 
              type="password" 
              placeholder="Password"
              required 
              value={password}
              onChange={(e) => onPasswordChange?.(e.target.value)}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input 
              id="confirm-password" 
              type="password" 
              placeholder="confirm-password"
              required 
              value={passwordRepeat}
              onChange={(e) => onPasswordRepeatChange?.(e.target.value)}
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              {error && (
                <div id="errorMsg" className="text-red-600 text-sm mb-2 text-center">
                  {error}
                </div>
              )}
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
