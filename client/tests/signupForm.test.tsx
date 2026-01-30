import { SignupForm } from "@/app/(auth)/register/components/signup-form";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useState } from "react";

function TestWrapper({ onSubmit = jest.fn() }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
    )
}

describe('SignupForm', () => {
    it('renders form fields', () => {
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(<TestWrapper onSubmit={handleSubmit}/>)
        expect(screen.getByPlaceholderText('m@example.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('confirm-password')).toBeInTheDocument();
    });

    it('submits signup form', async () => {
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(<TestWrapper onSubmit={handleSubmit}/>)
        
        const inputEmail = screen.getByPlaceholderText('m@example.com');
        const inputPassword = screen.getByPlaceholderText('Password');
        const inputPaswordRepeat = screen.getByPlaceholderText('confirm-password');
        
        await userEvent.type(inputEmail, "test@admin.com");
        await userEvent.type(inputPassword, "secret");
        await userEvent.type(inputPaswordRepeat, 'secret');
        await userEvent.click(screen.getByText("Create Account"));

        expect(inputEmail).toHaveValue("test@admin.com");
        expect(inputPassword).toHaveValue("secret");
        expect(inputPaswordRepeat).toHaveValue('secret');
        expect(handleSubmit).toHaveBeenCalled();
    });

    it('Throw error if passwords are not the same', async () => {
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(<TestWrapper onSubmit={handleSubmit}/>)
        
        const inputEmail = screen.getByPlaceholderText('m@example.com');
        const inputPassword = screen.getByPlaceholderText('Password');
        const inputPaswordRepeat = screen.getByPlaceholderText('confirm-password');
        
        await userEvent.type(inputEmail, "test@admin.com");
        await userEvent.type(inputPassword, "secret");
        await userEvent.type(inputPaswordRepeat, 'secretsecret');
        await userEvent.click(screen.getByText("Create Account"));

        const errorMsg = screen.getByText("Passwords are not the same!");
        expect(errorMsg).toBeInTheDocument();
    });
});