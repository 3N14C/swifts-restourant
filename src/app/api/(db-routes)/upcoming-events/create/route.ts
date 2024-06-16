import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: Event = await req.json();

  const event = await prisma.event.create({
    data: {
      ...data,
    },
  });

  return NextResponse.json({
    event,
    message: "Event created successfully",
  });
};
