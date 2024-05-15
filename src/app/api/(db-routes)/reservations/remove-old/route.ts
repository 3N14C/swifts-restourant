import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const reservations = await prisma.reservation.deleteMany({
    where: {
      reservationDate: {
        lt: oneDayAgo,
      },
    },
  });

  return NextResponse.json(reservations);
};
