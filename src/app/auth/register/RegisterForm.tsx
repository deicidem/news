"use client";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { z } from "zod";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterFormSchema = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleRegister = async (values: RegisterFormSchema) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // const error = await response.json();
        messageApi.error("Ошибка регистрации.");
        console.error("Registration failed");
      } else {
        messageApi.success("Регистрация успешна!");
        console.log("Registration successful!");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      messageApi.error("Ошибка регистрации.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
      {contextHolder}
      <h2 className="mb-6 block text-xl font-bold text-gray-700">
        Регистрация
      </h2>
      <Form onFinish={handleRegister} layout="vertical">
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите ваше имя" }]}
        >
          <Input placeholder="Имя" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Введите Email" }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item className="!mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
        <Form.Item className="!mb-0">
          <Link className="flex justify-center" href="/auth/login">
            Войти
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
