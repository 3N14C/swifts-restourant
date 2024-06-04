import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const data: User = await req.json();
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");

  const user = await prisma.user.update({
    where: {
      id: userId as string,
    },
    data,
  });
  
  return NextResponse.json(user);
};
