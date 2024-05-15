import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const response = await prisma.category.findMany({
    include: {
      products: true,
    },
  });

  return NextResponse.json(response);
};
