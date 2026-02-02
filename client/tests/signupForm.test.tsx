import { SignupForm } from "@/app/(auth)/register/components/signup-form";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useState } from "react";

// Wrapper hallitsee tilaa ja validointia testejä varten
function TestWrapper({ onSubmit = jest.fn() }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Tarkistetaan, että salasanat täsmäävät
        if (password !== passwordRepeat) {
            setError("Passwords are not the same!");
            return;
        }

        setError("");
        onSubmit(e);
    };

    return (
        <SignupForm 
            email={email}
            error={error}
            password={password} 
            passwordRepeat={passwordRepeat}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onPasswordRepeatChange={setPasswordRepeat}
            onSubmit={handleSubmit}
        />
    );
}

describe('SignupForm', () => {

    it('renders form fields', () => {
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(<TestWrapper onSubmit={handleSubmit}/>);

        // Tarkistetaan, että lomakekentät näkyvät
        expect(screen.getByPlaceholderText('m@example.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('confirm-password')).toBeInTheDocument();
    });

    it('submits signup form', async () => {
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(<TestWrapper onSubmit={handleSubmit}/>);

        const inputEmail = screen.getByPlaceholderText('m@example.com');
        const inputPassword = screen.getByPlaceholderText('Password');
        const inputPasswordRepeat = screen.getByPlaceholderText('confirm-password');

        // Kirjoitetaan kenttiin ja klikataan submit
        await userEvent.type(inputEmail, "test@admin.com");
        await userEvent.type(inputPassword, "secret");
        await userEvent.type(inputPasswordRepeat, "secret");
        await userEvent.click(screen.getByText("Create Account"));

        // Varmistetaan arvot ja submit kutsu
        expect(inputEmail).toHaveValue("test@admin.com");
        expect(inputPassword).toHaveValue("secret");
        expect(inputPasswordRepeat).toHaveValue("secret");
        expect(handleSubmit).toHaveBeenCalled();
    });

    it('throws error if passwords are not the same', async () => {
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(<TestWrapper onSubmit={handleSubmit}/>);

        const inputEmail = screen.getByPlaceholderText('m@example.com');
        const inputPassword = screen.getByPlaceholderText('Password');
        const inputPasswordRepeat = screen.getByPlaceholderText('confirm-password');

        // Syötetään eri salasanat
        await userEvent.type(inputEmail, "test@admin.com");
        await userEvent.type(inputPassword, "secret");
        await userEvent.type(inputPasswordRepeat, "secretsecret");
        await userEvent.click(screen.getByText("Create Account"));

        // Varmistetaan virheilmoitus näkyvissä
        const errorMsg = screen.getByText("Passwords are not the same!");
        expect(errorMsg).toBeInTheDocument();
    });
});
