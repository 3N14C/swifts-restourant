import { axiosInstanse } from "@/config/axios-config";
import { Product } from "@prisma/client";

export const ProductService = {
  getAll: async () => {
    const response = await axiosInstanse.get<Product[]>("product/get-all");

    return response.data;
  },

  create: async (data: Omit<Product, "id">) => {
    const response = await axiosInstanse.post<Product>("product/create", data);

    return response.data;
  },

  updateById: async ({
    data,
    id,
  }: {
    data: Omit<Product, "id" | 'categoryId'>;
    id: string;
  }) => {
    const response = await axiosInstanse.patch<Product>(
      `product/update-by-id`,
      data,
      {
        params: { id },
      }
    );

    return response.data;
  },

  removeById: async ({ id }: { id: string }) => {
    const response = await axiosInstanse.delete<Product>(
      `product/remove-by-id`,
      {
        params: { id },
      }
    );

    return response.data;
  },

  getById: async ({ id }: { id: string }) => {
    const response = await axiosInstanse.get<Product>(`product/get-by-id`, {
      params: { id },
    });

    return response.data;
  },
};
