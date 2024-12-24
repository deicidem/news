"use client";

import { useState } from "react";
import { AuthForm } from "./AuthForm";
import { signIn } from "next-auth/react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type LoginFormSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const handleLogin = async (data: LoginFormSchema) => {
    setLoading(true);
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthForm
      title="Авторизация"
      onSubmit={handleLogin}
      fields={[
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Пароль", type: "password" },
      ]}
      submitButtonText="Войти"
      loading={loading}
    />
  );
}
