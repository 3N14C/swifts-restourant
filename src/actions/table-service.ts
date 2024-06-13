import { axiosInstanse } from "@/config/axios-config";
import { TTableWithReservation, TableWithUserReservation } from "@/types/table-types";
import { Table } from "@prisma/client";

export const TableService = {
  create: async (data: Omit<Table, "id" | "createdAt" | "status">) => {
    const response = await axiosInstanse.post<Table>("tables/create", data);

    return response.data;
  },

  getAll: async () => {
    const response = await axiosInstanse.get<TTableWithReservation[]>("tables");

    return response.data;
  },

  getById: async ({ id }: { id: string }) => {
    const response = await axiosInstanse.get<TableWithUserReservation>(
      `tables/get-by-id`,
      {
        params: { id },
      }
    );

    return response.data;
  },

  updateById: async ({
    data,
    id,
  }: {
    data: Omit<Table, "id" | "status" | "img" | 'createdAt'>;
    id: string;
  }) => {
    const response = await axiosInstanse.patch<Table>(
      `tables/update-by-id`,
      data,
      {
        params: { id },
      }
    );

    return response.data;
  },

  removeById: async ({ id }: { id: string }) => {
    const response = await axiosInstanse.delete<Table>(`tables/remove-by-id`, {
      params: { id },
    });

    return response.data;
  },
};
