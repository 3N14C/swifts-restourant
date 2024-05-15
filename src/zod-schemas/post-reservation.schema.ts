import { z } from "zod";

export const createReservationSchema = z.object({
  date: z.string(),
  time: z.string().nullable(),
  tableId: z.string(),
  userId: z.string().optional(),
});
