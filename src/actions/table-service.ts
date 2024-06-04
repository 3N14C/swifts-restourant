import { axiosInstanse } from "@/config/axios-config";
import { TTableWithReservation } from "@/types/table-types";
import { Table } from "@prisma/client";

export const TableService = {
  create: async (data: Omit<Table, "id" | 'createdAt' | 'status'>) => {
    const response = await axiosInstanse.post<Table>("tables/create", data);

    return response.data;
  },

  getAll: async () => {
    const response =
      await axiosInstanse.get<TTableWithReservation[]>("tables");

    return response.data;
  },
};
