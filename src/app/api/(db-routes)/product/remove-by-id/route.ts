import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest) => {
  const productId = req.nextUrl.searchParams.get("id");

  const product = await prisma.product.delete({
    where: {
      id: productId as string,
    },
  });

  return NextResponse.json(product);
};
