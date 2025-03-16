"use server";

import { ValidationError } from "@/error";
import { db } from "@/lib/db";
import { updateUserInSession } from "@/lib/session-util";
import { FillProfileSchema, FillProfileSchemaType } from "@/schemas/index";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { currentUser } from "./auth";
import { createOrUpdateWeightRecord } from "./weight";

export const fillProfile = async (values: FillProfileSchemaType) => {
  const user = await currentUser();
  const fillProfileSchemaValid = FillProfileSchema.safeParse(values);
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  if (!fillProfileSchemaValid.success) {
    console.error(fillProfileSchemaValid.error.format());
    throw new ValidationError(locale, messages);
  }

  const { weight, height, gender, activityLevel, birthDate, goal } = fillProfileSchemaValid.data;

  await db.user.update({
    where: { id: user.id },
    data: {
      weight,
      height,
      gender,
      activityLevel,
      birthDate,
      goal
    },
  });

  createOrUpdateWeightRecord(fillProfileSchemaValid.data);

  const updatedUser = await updateUserInSession(values);

  return { updatedUser, success: t("FillProfilePage.successMessage") };
};
