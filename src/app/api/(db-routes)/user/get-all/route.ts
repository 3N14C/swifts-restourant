import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const users = await prisma.user.findMany({
    include: {
      reservations: true,
    },
  });

  return NextResponse.json(users);
};
