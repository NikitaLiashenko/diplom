import { ResetForm } from "@/components/auth/reset-form";
import { Metadata } from "next";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  return {
    title: t("ResetPage.metaTitle"),
    description: t("ResetPage.metaDescription"),
  }
}

const ResetPage = () => {
  return (
    <ResetForm />
  );
}

export default ResetPage;