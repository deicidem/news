"use client";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogin = async (values: LoginFormSchema) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        console.log(result);
        messageApi.error("Неверный email или пароль");
      }
    } catch (error) {
      console.error("Login error", error);
      messageApi.error("Ошибка входа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
      {contextHolder}
      <h2 className="mb-6 block text-xl font-bold text-gray-700">
        Авторизация
      </h2>
      <Form onFinish={handleLogin} layout="vertical">
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
            Войти
          </Button>
        </Form.Item>
        <Form.Item className="!mb-0">
          <Link className="flex justify-center" href="/auth/register">
            Зарегистрироваться
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
