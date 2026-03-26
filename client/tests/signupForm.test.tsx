import { SignupForm } from "@/app/(auth)/register/_components/signup-form";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('SignupForm', () => {
    it('renders form fields', () => {
        render(<SignupForm />)
        expect(screen.getByPlaceholderText('m@example.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    });

    it('allows users to type in all fields', async () => {
        render(<SignupForm />)
        
        const inputEmail = screen.getByPlaceholderText('m@example.com');
        const inputPassword = screen.getByPlaceholderText('Password');
        const inputPaswordRepeat = screen.getByPlaceholderText('Confirm password');
        
        await userEvent.type(inputEmail, "test@admin.com");
        await userEvent.type(inputPassword, "secret");
        await userEvent.type(inputPaswordRepeat, 'secret');

        expect(inputEmail).toHaveValue("test@admin.com");
        expect(inputPassword).toHaveValue("secret");
        expect(inputPaswordRepeat).toHaveValue('secret');
    });
});