import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest, ctx: any) => {
  const { params } = ctx;

  const response = await prisma.product.findMany({
    where: {
      categoryId: params.productCategoryId,
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json(response);
};
