import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const take = searchParams.get("take");

  const response = await prisma.product.findMany({
    take: take ? +take : 3,
    skip: page ? +page * 3 : 0,
  });

  return NextResponse.json(response);
};
