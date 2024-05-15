import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { date, time, tableId, userId } = await req.json();

  const reservation = await prisma.reservation.create({
    data: {
      reservationDate: date,
      reservationTime: time,
      table: {
        connect: {
          id: tableId,
        },
      },
      userId: userId,
    },
  });
  return NextResponse.json(reservation);
};
