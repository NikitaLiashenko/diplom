import { Session, User } from "next-auth";
import { UpdateSession } from "next-auth/react";

export const updateUserSession = async (updatedUser: Partial<User>, update: UpdateSession, session: Session | null) => {
    await update({
        ...session,
        user: {
            ...session?.user,
            ...updatedUser,
        }
    });
}