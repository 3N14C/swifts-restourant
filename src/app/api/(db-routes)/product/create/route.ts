import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: Product = await req.json();

  const product = await prisma.product.create({
    data: {
      ...data,
    },
  });

  return NextResponse.json(product);
};
