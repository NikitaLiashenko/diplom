import { ErrorCard } from "@/components/auth/error-card";
import { Metadata } from "next";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });
  
  return {
    title: t("ErrorCardPage.metaTitle"),
    description: t("ErrorCardPage.metaDescription"),
  }
}

const AuthErrorPage = () => {
  return (
    <ErrorCard />
  );
};

export default AuthErrorPage;