import { SignupForm } from "@/app/(auth)/register/components/signup-form";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

describe('LoginForm', () => {
    it('renders form fields', () => {
        render(
            <SignupForm 
                email="" 
                password="" 
                passwordRepeat=""
                onEmailChange={jest.fn()}
                onPasswordChange={jest.fn()}
                onPasswordRepeatChange={jest.fn()}
                onSubmit={jest.fn()}
            />
        );
        expect(screen.getByPlaceholderText('m@example.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('confirm-password')).toBeInTheDocument();
    });
});