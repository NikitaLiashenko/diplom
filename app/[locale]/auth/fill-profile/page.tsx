import { FillProfileForm } from "@/components/auth/fill-profile/fill-profile-form";
import { Metadata } from "next";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  return {
    title: t("FillProfilePage.metaTitle"),
    description: t("FillProfilePage.metaDescription"),
  }
}

const FillProfilePage = () => {
  return (
    <div>
      <FillProfileForm />
    </div>
  );
}

export default FillProfilePage;