import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  return {
    title: t("RegisterPage.metaTitle"),
    description: t("RegisterPage.metaDescription"),
  }
}

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;