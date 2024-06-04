import prisma from "@/lib/prisma";
import { Table } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: Table = await req.json();

  const table = await prisma.table.create({
    data: {
      ...data,
    },
  });

  return NextResponse.json(table);
};
