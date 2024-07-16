import "server-only";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/validate_lucia_user";
import { cache } from "react";
import { AuthenticationError } from "../use-cases/errors";
import { UserId } from "@/use-cases/types";

export const getCurrentUser = cache(async () => {
  const session = await validateRequest();
  if (!session.user) {
    return undefined;
  }
  return session.user;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};

export async function setSession(userId: UserId) {
  console.log("user id session",userId)
  const session = await lucia.createSession(Number(userId), {});
  console.log("session ", session)
  const sessionCookie = lucia.createSessionCookie(session.id);
  console.log(sessionCookie, "sesioncooke")
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
