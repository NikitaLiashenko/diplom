"use server";

import bcrypt from "bcryptjs";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NotFoundError, ValidationError } from "@/error";
import { db } from "@/lib/db";
import { NewPasswordSchema, NewPasswordSchemaType } from "@/schemas";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from 'next-intl/server';

export const newPassword = async (
  values: NewPasswordSchemaType,
  token?: string | null,
) => {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  try {
    if (!token) {
      throw new ValidationError(locale, messages, "missingToken");
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new ValidationError(locale, messages);
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      throw new ValidationError(locale, messages, "invalidToken");
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      throw new ValidationError(locale, messages, "expiredToken");
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      throw new NotFoundError(locale, messages, "emailNotFound");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    });

    return { success: t("NewPasswordPage.successMessage") };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message as string };
    }
    return { error: t("Error.unknownError") as string };
  }
};