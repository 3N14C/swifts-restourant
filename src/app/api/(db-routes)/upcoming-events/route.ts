import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const response = await prisma.event.findMany({
    where: {
      startDateTime: {
        gte: new Date(),
      },
    },
  });

  return NextResponse.json(response);
};
