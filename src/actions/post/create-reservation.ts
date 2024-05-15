import { axiosInstanse } from "@/config/axios-config";
import { createReservationSchema } from "@/zod-schemas/post-reservation.schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createReservation = async (
  data: z.infer<typeof createReservationSchema>
) => {
  const response = await axiosInstanse.post("reservations/create", data);

  return response.data;
};
