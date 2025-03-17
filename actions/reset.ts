"use server";

import { getUserByEmail } from "@/data/user";
import { NotFoundError, ValidationError } from "@/error";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema, ResetSchemaType } from "@/schemas";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const reset = async (values: ResetSchemaType) => {
  const validatedFields = ResetSchema.safeParse(values);
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  try {
    if (!validatedFields.success) {
      console.error(validatedFields.error.format());
      throw new ValidationError(locale, messages);
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      console.error(t("Error.emailNotFound"), email);
      throw new NotFoundError(locale, messages, "emailNotFound");
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );

    return { success: t("ResetPage.successMessage") };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message as string };
    }
    return { error: t("Error.unknownError") as string };
  }
} 