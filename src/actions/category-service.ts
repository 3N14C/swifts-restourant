import { axiosInstanse } from "@/config/axios-config";
import { Category } from "@prisma/client";

export const CategoryService = {
  getAll: async () => {
    const response = await axiosInstanse.get<Category[]>("menu-categories");

    return response.data;
  },

  create: async (data: Omit<Category, "id">) =>
    (await axiosInstanse.post<Category>("category/create", data)).data,
};
