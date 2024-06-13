import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const tableId = req.nextUrl.searchParams.get("id");

  const table = await prisma.table.findUnique({
    where: {
      id: tableId as string,
    },

    include: {
        reservation: {
            include: {
                user: true
            }
        }
    }
  });

  return NextResponse.json(table);
};
