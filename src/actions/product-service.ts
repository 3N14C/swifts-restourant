import { axiosInstanse } from "@/config/axios-config";
import { Product } from "@prisma/client";

export const ProductService = {
  getAll: async () => {
    const response = await axiosInstanse.get<Product[]>("product/get-all");

    return response.data;
  },

  create: async (data: Omit<Product, 'id'>) => {
    const response = await axiosInstanse.post<Product>("product/create", data);

    return response.data;
  },
};
