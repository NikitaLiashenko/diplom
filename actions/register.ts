"use server";

import bcrypt from "bcrypt";

import { getUserByEmail } from "@/data/user";
import { ValidationError } from "@/error";
import { db } from "@/lib/db";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/index";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const register = async (values: RegisterSchemaType) => {
  const registerSchemaValid = RegisterSchema.safeParse(values);
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  if (!registerSchemaValid.success) {
    console.error(registerSchemaValid.error.format());
    throw new ValidationError(locale, messages);
  }

  const { email, password, name } = registerSchemaValid.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    console.error(t("Error.emailInUseServer"), existingUser);
    throw new ValidationError(locale, messages, "emailInUseClient");
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: t("RegisterPage.successMessage") };
};