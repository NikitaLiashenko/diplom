"use server";

import { ForbiddenError, NotFoundError, ValidationError } from "@/error";
import { isBodyStatsFilled } from "@/lib/calories-calculator-util";
import { db } from "@/lib/db";
import { updateUserInSession } from "@/lib/session-util";
import {
    AddUserWeightSchema,
    AddUserWeightSchemaType,
    EditUserProfileSchema,
    EditUserProfileSchemaType
} from "@/schemas";
import { isSameDay } from "date-fns";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { currentUser } from "./auth";
import { createOrUpdateWeightRecord } from "./weight";

export const increaseRequestsAmount = async () => {
    const user = await currentUser();
    const defaultLimit = Number(process.env.OPENAI_DEFAULT_LIMIT);
    const locale = await getLocale();
    const messages = await getMessages();
    const t = createTranslator({ locale, messages });

    const userFromDb = await db.user.findUnique({
        where: {
            id: user.id
        }
    });

    if (!userFromDb) {
        console.error(t("Error.emailNotFound"), user.id);
        throw new NotFoundError(locale, messages, "emailNotFound");
    }

    if (!userFromDb.openaiRequestsCheckDay || !isSameDay(userFromDb.openaiRequestsCheckDay, new Date())) {
        userFromDb.openaiRequestsCheckDay = new Date();
        userFromDb.openaiRequestsToday = Number(defaultLimit) - 1;
    }

    if (isSameDay(userFromDb.openaiRequestsCheckDay, new Date())) {
        userFromDb.openaiRequestsToday = userFromDb.openaiRequestsToday as number - 1;
    }

    if (userFromDb.openaiRequestsToday && userFromDb.openaiRequestsToday < 0) {
        console.error(t("Error.requestLimit"));
        throw new ForbiddenError(locale, messages, "requestLimit");
    }

    await db.user.updateMany({
        where: {
            id: userFromDb.id,
        },
        data: {
            ...userFromDb
        }
    });
}

export const editUserProfile = async (values: EditUserProfileSchemaType) => {
    const user = await currentUser();
    const locale = await getLocale();
    const messages = await getMessages();
    const t = createTranslator({ locale, messages });

    const editUserProfilSchemaValid = EditUserProfileSchema.safeParse(values);

    if (!editUserProfilSchemaValid.success) {
        console.error(editUserProfilSchemaValid.error.format());
        throw new ValidationError(locale, messages);
    }

    await db.user.updateMany({
        where: {
            id: user.id
        },
        data: {
            ...editUserProfilSchemaValid.data
        }
    });

    if (isBodyStatsFilled(user)) {
        createOrUpdateWeightRecord({
            ...editUserProfilSchemaValid.data,
            weight: user.weight!
        });
    }

    const updatedUser = await updateUserInSession(values);

    return { updatedUser, success: t("FillProfilePage.successMessage") };
}

export const addUserWeight = async (values: AddUserWeightSchemaType) => {
    const user = await currentUser();
    const locale = await getLocale();
    const messages = await getMessages();
    const t = createTranslator({ locale, messages });

    const addUserWeightSchemaValid = AddUserWeightSchema.safeParse(values);

    if (!addUserWeightSchemaValid.success) {
        console.error(addUserWeightSchemaValid.error.format());
        throw new ValidationError(locale, messages);
    }

    await db.user.updateMany({
        where: {
            id: user.id
        },
        data: {
            ...addUserWeightSchemaValid.data
        }
    })

    if (isBodyStatsFilled(user)) {
        createOrUpdateWeightRecord({
            birthDate: user.birthDate!,
            gender: user.gender!,
            activityLevel: user.activityLevel!,
            goal: user.goal!,
            height: user.height!,
            ...addUserWeightSchemaValid.data
        });
    }

    const updatedUser = await updateUserInSession(values);
    return { updatedUser, success: t("FillProfilePage.successMessage") };
}
