"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (
  email: string,
  password: string,
  callbackUrl?: string
) => {
  if (typeof email !== "string" || email.length < 3) {
    return {
      error: "Недопустимое имя пользователя",
    };
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 72
  ) {
    return {
      error: "Недопустимый пароль",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
  });

  if (!existingUser) {
    return {
      error: "Пользователь не существует",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect(callbackUrl || "/");
};
