import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await prisma.table.findMany({
    include: {
      reservation: true
    }
  });

  return NextResponse.json(response);
};
