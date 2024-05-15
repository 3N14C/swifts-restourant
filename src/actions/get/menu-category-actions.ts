import { axiosInstanse } from "@/config/axios-config";
import { TCategoryByIdWithProducts } from "@/types/category-types";

export const getAllCategories = async () => {
  const response =
    await axiosInstanse.get<TCategoryByIdWithProducts[]>("menu-categories");

  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await axiosInstanse.get<TCategoryByIdWithProducts>(
    `menu-categories/${id}`
  );

  return response.data;
};
