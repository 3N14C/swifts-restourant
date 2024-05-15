import { axiosInstanse } from "@/config/axios-config";
import { TTableWithReservation } from "@/types/table-types";
import { Table } from "@prisma/client";

export const getAllTables = async () => {
  const response = await axiosInstanse.get<TTableWithReservation[]>("tables");

  return response.data;
};
