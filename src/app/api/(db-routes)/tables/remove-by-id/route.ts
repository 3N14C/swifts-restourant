import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest) => {
    const tableId = req.nextUrl.searchParams.get("id");

    const table = await prisma.table.delete({
        where: {
            id: tableId as string
        }
    })

    return NextResponse.json(table)
}