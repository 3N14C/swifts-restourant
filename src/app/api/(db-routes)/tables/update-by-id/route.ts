import prisma from "@/lib/prisma";
import { Table } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PATCH = async (req: NextRequest) => {
    const data: Table = await req.json()

    const tableId = req.nextUrl.searchParams.get("id")

    const table = await prisma.table.update({
        where: {
            id: tableId as string
        },
        data
    })

    return NextResponse.json(table)
}