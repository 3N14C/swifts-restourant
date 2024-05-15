import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, ctx: any) => {
  const { params } = ctx;

  const response = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
    include: {
      products: {
        take: 8,
      },
    },
  });

  return NextResponse.json(response);
};
