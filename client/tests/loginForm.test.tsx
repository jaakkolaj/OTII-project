import { LoginForm } from "@/app/(auth)/login/components/login-form";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

describe('LoginForm', () => {
    it('renders form fields', () => {
        render(
            <LoginForm 
                email="" 
                password="" 
                onEmailChange={jest.fn()}
                onPasswordChange={jest.fn()}
                onSubmit={jest.fn()}
            />
        );
        expect(screen.getByPlaceholderText('m@example.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });
});