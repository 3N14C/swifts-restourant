import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest) => {
  const categoryId = req.nextUrl.searchParams.get("id");

  const category = await prisma.category.delete({
    where: {
      id: categoryId as string,
    },
  });

  return NextResponse.json(category);
};
