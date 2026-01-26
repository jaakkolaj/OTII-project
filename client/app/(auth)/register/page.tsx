"use client"
import { SignupForm } from "@/app/(auth)/register/components/signup-form"
import { useState } from "react"
import { createUser } from "@/app/services/userService"

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(password != passwordRepeat) {
          return console.log("Passwords are not the same")
        }
        try {
        const user = {
            email,
            password
        }
        const response = await createUser(user);
        console.log(response);
        } catch (error) {
        console.log(error);
        };
    };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm 
          email={email}
          password={password}
          passwordRepeat={passwordRepeat}
          onEmailChange={setEmail}
          onPasswordRepeatChange={setPasswordRepeat}
          onPasswordChange={setPassword}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}
