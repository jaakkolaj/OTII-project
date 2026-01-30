import { LoginForm } from "@/app/(auth)/login/components/login-form";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { useState } from "react";


function TestWrapper({ onSubmit = jest.fn() }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(<TestWrapper onSubmit={handleSubmit}/>);
        expect(screen.getByPlaceholderText('m@example.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('loggs in user', async () => {
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(<TestWrapper onSubmit={handleSubmit}/>);

        const inputEmail = screen.getByPlaceholderText('m@example.com');
        const inputPassword = screen.getByPlaceholderText('Password');
        
        await userEvent.type(inputEmail, "test@admin.com");
        await userEvent.type(inputPassword, "secret");
        await userEvent.click(screen.getByText("Login"));

        expect(inputEmail).toHaveValue("test@admin.com");
        expect(inputPassword).toHaveValue("secret");
        expect(handleSubmit).toHaveBeenCalled();
    });
});