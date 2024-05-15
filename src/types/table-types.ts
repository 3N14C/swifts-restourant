import { Prisma } from "@prisma/client";

export type TTableWithReservation = Prisma.TableGetPayload<{
  include: {
    reservation: {
      include: {
        table: true
      }
    };
  };
}>;
