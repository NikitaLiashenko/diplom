import { auth } from "@/auth";
import ScrollToTop from "@/components/Helper/ScrollToTop";
import ResponsiveNav from "@/components/Home/NavBar/ResponsiveNav";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  return {
    title: t("Common.title"),
    description: t("Common.description"),
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const session = await auth();
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider messages={messages}>
        <>
          <ResponsiveNav />
          {children}
          <Toaster />
          <ScrollToTop />
        </>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
