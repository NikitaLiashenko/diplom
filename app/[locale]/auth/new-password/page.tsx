import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Metadata } from "next";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  return {
    title: t("NewPasswordPage.metaTitle"),
    description: t("NewPasswordPage.metaDescription"),
  }
}

const NewPasswordPage = () => {
  return (
    <NewPasswordForm />
  );
}

export default NewPasswordPage;