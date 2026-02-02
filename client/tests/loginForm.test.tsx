import { LoginForm } from "@/app/(auth)/login/components/login-form"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"
import { useState } from "react"

// Wrapper, joka hallitsee lomakkeen tilaa testejä varten
function TestWrapper({ onSubmit = jest.fn() }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <LoginForm 
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={onSubmit}
        />
    )
}

describe('LoginForm', () => {

    it('renders form fields', () => {
        const handleSubmit = jest.fn((e) => e.preventDefault())
        render(<TestWrapper onSubmit={handleSubmit}/>)

        // Tarkistetaan, että lomakekentät näkyvät
        expect(screen.getByPlaceholderText('m@example.com')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    })

    it('logs in user', async () => {
        const handleSubmit = jest.fn((e) => e.preventDefault())
        render(<TestWrapper onSubmit={handleSubmit}/>)

        const inputEmail = screen.getByPlaceholderText('m@example.com')
        const inputPassword = screen.getByPlaceholderText('Password')

        // Kirjoitetaan kenttiin ja klikataan login
        await userEvent.type(inputEmail, "test@admin.com")
        await userEvent.type(inputPassword, "secret")
        await userEvent.click(screen.getByText("Login"))

        // Varmistetaan, että kenttien arvot päivittyivät
        expect(inputEmail).toHaveValue("test@admin.com")
        expect(inputPassword).toHaveValue("secret")

        // Tarkistetaan, että onSubmit-funktio kutsuttiin
        expect(handleSubmit).toHaveBeenCalled()
    })
})
