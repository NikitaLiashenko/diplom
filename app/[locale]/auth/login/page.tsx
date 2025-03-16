import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  return {
    title: t("LoginPage.metaTitle"),
    description: t("LoginPage.metaDescription"),
  }
}

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;