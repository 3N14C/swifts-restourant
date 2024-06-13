import { axiosInstanse } from "@/config/axios-config";
import { Category } from "@prisma/client";

export const CategoryService = {
  getAll: async () => {
    const response = await axiosInstanse.get<Category[]>("menu-categories");

    return response.data;
  },

  create: async (data: Omit<Category, "id">) =>
    (await axiosInstanse.post<Category>("category/create", data)).data,

  updateById: async ({data, id}:  {data: Omit<Category, 'id'>, id: string}) => {
    const response = await axiosInstanse.patch<Category>(
      `category/update-by-id`,
      data,
      {
        params: { id },
      }
    );

    return response.data;
  },

  removeById: async ({ id }: { id: string }) => {
    const response = await axiosInstanse.delete<Category>(`category/remove-by-id`, {
      params: { id },
    });

    return response.data;
  },

  getById: async ({id}: {id: string}) => {
    const response = await axiosInstanse.get<Category>(`category/get-by-id`, {
      params: { id },
    })

    return response.data
  }
};
