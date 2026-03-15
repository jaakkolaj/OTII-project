import "server-only";
import { cookies } from "next/headers";

const SESSION_COOKIE = "access_token";
const DEFAULT_SESSION_MAX_AGE = 60 * 60;

type SessionOptions = {
  maxAge?: number;
};

export async function createSession(token: string, options: SessionOptions = {}) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: options.maxAge ?? DEFAULT_SESSION_MAX_AGE,
  });
}

export async function updateSession(token: string, options: SessionOptions = {}) {
  await createSession(token, options);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
