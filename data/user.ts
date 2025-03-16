import { db } from "@/lib/db";
import { getSession } from "next-auth/react";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
}

export const getUserIdFromSession = async () => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("User is not authenticated");
    }

    return session.user.id;
  } catch (error) {
    console.error("Error fetching user ID from session:", error);
    return null;
  }
}

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId
      }
    });
    return account;
  } catch (err) {
    return null;
  }
};
