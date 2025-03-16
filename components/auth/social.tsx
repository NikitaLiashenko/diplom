"use client"

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";

export const Social = () => {
  const t = useTranslations("LoginPage");
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div>      
      <Separator className="mb-4" />
      <div className="flex items-center w-full gap-x-2">
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => onClick("google")}
        >
          <FcGoogle className="h-5 w-5 mr-2" />
          <span className="text-sm">{t("Social.google")}</span>
        </Button>
      </div>
    </div>
  )
}