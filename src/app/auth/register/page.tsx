import Form from "@/components/Form";
import { getPageSession } from "@/lib/sess";
import { Button, Input } from "antd";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getPageSession();

  if (session) redirect("/dashboard");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-4">Регистрация</h1>
        <Form action="/api/auth/register">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Логин
            </label>
            <Input
              autoComplete="username"
              size="large"
              name="username"
              id="username"
              className="w-full "
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Пароль
            </label>
            <Input
              autoComplete="new-password"
              size="large"
              type="password"
              name="password"
              id="password"
              className="w-full "
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              E-mail
            </label>
            <Input
              autoComplete="email"
              size="large"
              type="email"
              name="email"
              id="email"
              className="w-full "
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-600">
              Телефон
            </label>
            <Input
              autoComplete="tel"
              size="large"
              type="phone"
              name="phone"
              id="phone"
              className="w-full "
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              ФИО
            </label>
            <Input
              autoComplete="name"
              size="large"
              type="name"
              name="fio"
              id="name"
              className="w-full "
            />
          </div>
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            className="w-full"
          >
            Продолжить
          </Button>
        </Form>
        <p className="mt-4 text-center">
          Есть аккаунт?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
