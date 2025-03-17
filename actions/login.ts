"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { ValidationError } from "@/error";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginSchemaType } from "@/schemas/index";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const login = async (loginSchemaValues: LoginSchemaType) => {
  const loginShemaValid = LoginSchema.safeParse(loginSchemaValues);
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  if (!loginShemaValid.success) {
    console.error(loginShemaValid.error.format());
    throw new ValidationError(locale, messages);
  }

  const { email, password } = loginShemaValid.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      redirect: false,
    });
    return { ok: true, redirectUrl: DEFAULT_LOGIN_REDIRECT }

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: t("Error.credentials") }
        default:
          return { error: t("Error.unknownError") }
      }
    }
    console.error(error);
    throw error;
  }
};