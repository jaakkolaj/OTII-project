"use client"
import { LoginForm } from "@/app/(auth)/login/components/login-form"
import { useState } from "react";
import { loginUser } from "@/app/services/userService";

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
      const user = {
          email,
          password
      }
      const response = await loginUser(user);
      console.log(response);
      // User's token is stored in localstorage in client side.
      localStorage.setItem('token', response.token);
      } catch (error) {
      console.log(error);
      };
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm 
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}
