"use client";

import { useRouter } from "@/i18n/routing";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect",
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
} : LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(DEFAULT_LOGIN_REDIRECT)
  }

  if (mode === "modal") {
    return (
      <span>
        TODO: Implement modal
      </span>
    )
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}