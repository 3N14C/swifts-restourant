import { axiosInstanse } from "@/config/axios-config";
import { Reservation } from "@prisma/client";

export const ReservationService = {
  removeById: async({ reservationId }: {reservationId: string}) => {
    const response = await axiosInstanse.delete<Reservation>(`reservations/remove`, {
      params: { reservationId },
    });

    return response.data;
  },
};