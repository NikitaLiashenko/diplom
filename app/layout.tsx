import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weight tracking app",
  description: "We need to write description here",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="custom-scrollbar bg-color">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
          {children}
        </>
      </body>
    </html>
  );
}
