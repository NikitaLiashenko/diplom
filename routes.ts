/**
  * An array of routes that are accessible to the public
  * These routes do not require authentication
  * @type {string[]}
 */
export const publicRoutes = [
  /^\/$/,
  /^\/[a-z]{2}$/,
  /^auth\/new-verification/
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  /^\/auth\/login$/,
  /^\/[a-z]{2}\/auth\/login$/,
  /^\/auth\/register$/,
  /^\/[a-z]{2}\/auth\/register$/,
  /^\/auth\/error$/,
  /^\/[a-z]{2}\/auth\/error$/,
  /^\/auth\/reset$/,
  /^\/[a-z]{2}\/auth\/reset$/,
  /^\/auth\/new-password$/,
  /^\/[a-z]{2}\/auth\/new-password$/,
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 authentication purposes
 * @type {string}
 */
export const API_AUTH_PREFIX = "/api/auth";

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile";

export const FILL_PROFILE_REDIRECT = "/auth/fill-profile";
export const LOGIN_PAGE_REDIRECT = "/auth/login";
