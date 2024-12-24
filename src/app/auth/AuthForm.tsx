import { Button, Input } from "antd";
import { type FormEvent, useState } from "react";

interface AuthFormProps<T> {
  title: string;
  onSubmit: (data: T) => Promise<void>;
  fields: {
    name: keyof T;
    label: string;
    type?: "text" | "email" | "password";
  }[];
  submitButtonText: string;
  loading: boolean;
}
export function AuthForm<T>({
  title,
  onSubmit,
  fields,
  submitButtonText,
  loading,
}: AuthFormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>({});
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof T,
  ) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData as T);
  };
  return (
    <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
      <h2 className="mb-6 block text-xl font-bold text-gray-700">{title}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        {fields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              {field.label}
            </label>
            <Input
              type={field.type || "text"}
              placeholder={field.label}
              value={formData[field.name] as string}
              onChange={(e) => handleInputChange(e, field.name)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              required
            />
          </div>
        ))}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full"
        >
          {submitButtonText}
        </Button>
      </form>
    </div>
  );
}
