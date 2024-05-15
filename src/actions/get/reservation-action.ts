import { axiosInstanse } from "@/config/axios-config";
import { Reservation } from "@prisma/client";

export const getReservations = async () => {
  const response = await axiosInstanse.get<Reservation[]>("reservations");

  return response.data;
};
