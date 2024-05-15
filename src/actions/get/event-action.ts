import { axiosInstanse } from "@/config/axios-config";
import { Event } from "@prisma/client";

export const getEvents = async () => {
  const response = await axiosInstanse.get<Event[]>("upcoming-events");

  return response.data;
};
