import { ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from '@/error';
import {
  API_AUTH_PREFIX,
  DEFAULT_LOGIN_REDIRECT,
  FILL_PROFILE_REDIRECT,
  LOGIN_PAGE_REDIRECT,
  authRoutes,
  publicRoutes,
} from "@/routes";
import NextAuth, { Session } from "next-auth";
import createMiddleWare from "next-intl/middleware";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import { routing } from "./i18n/routing";
import { isBodyStatsFilled } from "./lib/calories-calculator-util";

const { auth } = NextAuth(authConfig);

const intlMiddleware = createMiddleWare(routing);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userInfo = req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = publicRoutes.some((route) => route.test(nextUrl.pathname));
  const isAuthRoute = authRoutes.some((route) => route.test(nextUrl.pathname));

  const response = intlMiddleware(req);
  if (isApiAuthRoute) {
    return undefined;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return response;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN_PAGE_REDIRECT, nextUrl));
  }

  if (
    isLoggedIn &&
    !isPublicRoute &&
    !isProfileComplete(userInfo) &&
    !nextUrl.pathname.endsWith(FILL_PROFILE_REDIRECT)
  ) {
    return Response.redirect(new URL(FILL_PROFILE_REDIRECT, nextUrl));
  } else if (
    nextUrl.pathname.endsWith(FILL_PROFILE_REDIRECT) &&
    isProfileComplete(userInfo)
  ) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return response;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)', '/(uk|en)/:path*'],
};

const isProfileComplete = (session: Session | null) => {
  return !!session?.user && isBodyStatsFilled(session.user);
};
