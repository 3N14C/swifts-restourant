import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const page = searchParams.get("page");
  const take = searchParams.get("take");

  const response = await prisma.product.findMany({
    take: take ? +take : 3,
    skip: page ? +page * 3 : 0,
  });

  return NextResponse.json(response);
};
