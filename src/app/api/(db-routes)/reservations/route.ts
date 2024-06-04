import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const response = await prisma.reservation.findMany({});

  return NextResponse.json(response);
};
