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

export type TableWithUserReservation = Prisma.TableGetPayload<{
  include: {
    reservation: {
      include: {
        user: true
      }
    }
  }
}>