"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (
  email: string,
  phone: string,
  username: string,
  password: string
) => {
  if (typeof email !== "string" || !email.includes("@")) {
    return {
      error: "Invalid email",
    };
  }

  if (typeof password !== "string" || password.length < 6) {
    return {
      error: "Invalid password",
    };
  }

  const user = await prisma.user.create({
    data: {
      email,
      password,
      username,
      phone: phone,
    },
  });

  const session = await lucia.createSession(user.id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
};
