import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: Category = await req.json();

  const category = await prisma.category.create({
    data: {
      ...data,
    },
  });
  return NextResponse.json(category);
};
