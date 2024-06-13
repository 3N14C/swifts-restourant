import prisma from "@/lib/prisma";
import { Category, Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PATCH = async (req: NextRequest) => {
  const data: Product = await req.json();
  const productId = req.nextUrl.searchParams.get("id");
  const product = await prisma.product.update({
    where: {
      id: productId as string,
    },
    data,
  });

  return NextResponse.json(product);
};
