import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { getAccountByUserId, getUserByEmail, getUserById } from "@/data/user";
import { LoginSchema } from "@/schemas/index";
import { Gender, Goal } from "@prisma/client";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (!token.sub) return token;
      const existingAccount = await getAccountByUserId(
        token.sub
      );
      token.isOAuth = !!existingAccount;
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.emailVerified = user.emailVerified;
        token.weight = user.weight;
        token.height = user.height;
        token.gender = user.gender;
        token.birthDate = user.birthDate;
        token.activityLevel = user.activityLevel;
        token.goal = user.goal;
      }

      if (trigger === "update") {
        return { ...token, ...session.user }
      }

      return token;
    },
    async session({ session, token, }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.email = token.email as string;
      }
      if (session.user) {
        session.user.name = token.name as string;
        session.user.emailVerified = token.emailVerified as (Date & false) | (Date & true);
        session.user.weight = token.weight as number;
        session.user.height = token.height as number;
        session.user.gender = token.gender as Gender;
        session.user.birthDate = token.birthDate as Date;
        session.user.activityLevel = token.activityLevel as number;
        session.user.goal = token.goal as Goal;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig