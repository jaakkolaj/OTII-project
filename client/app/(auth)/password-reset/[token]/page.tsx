import { NewPasswordForm } from "../components/new-password-form"

interface PageProps {
  params: {
    token: string
  }
}

export default function NewPasswordPage({ params }: PageProps) {
  const { token } = params

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <NewPasswordForm token={token} />
    </div>
  )
}