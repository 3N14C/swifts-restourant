"use server";

import { axiosInstanse } from "@/config/axios-config";
import { Product } from "@prisma/client";

export const getProducts = async (page: string | null, take: string | null) => {
  const response = await axiosInstanse<Product[]>("menu-products", {
    params: {
      page: page || 0,
      take: take || 3,
    },
  });

  return response.data;
};

export const getSameProducts = async (
  page: string | null,
  take: string | null
) => {};

export const getProductsByCategoryId = async (id: string) => {
  const response = await axiosInstanse.get<Product[]>(`menu-products/${id}`);

  return response.data;
};
