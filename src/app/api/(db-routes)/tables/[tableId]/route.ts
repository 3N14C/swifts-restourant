import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PATCH = async (req: Request, ctx: any) => {
  const { status } = await req.json();
  const { params } = ctx;

  const table = await prisma.table.update({
    where: {
      id: params.tableId,
    },
    data: {
      status: status,
    },
  });

  return NextResponse.json(table);
};
