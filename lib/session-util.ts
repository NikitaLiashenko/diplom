'use server';

import { auth } from "@/auth";
import { AuthError, User } from "next-auth";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const updateUserInSession = async (updatedUser: Partial<User>) => {
    const session = await auth();
    const locale = await getLocale();
    const messages = await getMessages();
    const t = createTranslator({ locale, messages });
    if (!session) {
        throw new AuthError(t("Error.noSession"));
    }

    Object.assign(session.user, updatedUser);

    return session.user;
}
