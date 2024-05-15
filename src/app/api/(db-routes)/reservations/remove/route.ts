import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
) => {
  const { searchParams } = new URL(req.url);
  const reservationId = searchParams.get("reservationId");

  const reservation = await prisma.reservation.delete({
    where: {
      id: reservationId!,
    },
  });

  return NextResponse.json({
    reservation,
    message: "Reservation deleted successfully",
  });
};
