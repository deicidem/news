"use client";

import { useState } from "react";
import { AuthForm } from "./AuthForm";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});
type RegisterFormSchema = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const handleRegister = async (data: RegisterFormSchema) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        // const error = await response.json();
        console.error("Registration failed:");
      } else {
        console.log("Registration successful!");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthForm
      title="Регистрация"
      onSubmit={handleRegister}
      fields={[
        { name: "name", label: "Имя", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Пароль", type: "password" },
      ]}
      submitButtonText="Зарегистрироваться"
      loading={loading}
    />
  );
}
