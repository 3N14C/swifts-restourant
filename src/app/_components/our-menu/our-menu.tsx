"use client";

import { DotLines } from "@/components/ui/dot-line";
import { Title } from "@/components/ui/title";
import { FC, useEffect } from "react";
import { CategorySlider } from "./category-slider";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getCategoryById,
} from "@/actions/get/menu-category-actions";
import { TCategoryByIdWithProducts } from "@/types/category-types";
import { useQueryState } from "nuqs";
import { TitleWithLines } from "@/components/ui/title-with-lines";

export const OurMenu: FC = () => {
  const [categoryId] = useQueryState("categoryId", {
    defaultValue: "desserts",
  });

  const { data: category, refetch } = useQuery({
    queryKey: ["category-by-id"],
    queryFn: async () => {
      return await getCategoryById(categoryId);
    },
  });

  useEffect(() => {
    refetch();
  }, [categoryId, refetch]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-5 items-center">
        <div className="relative">
          <TitleWithLines title="наше меню" />
        </div>
        <Title title="вкусная и привлекательная цена" />
      </div>

      <div className="">
        <CategorySlider
          category={category || ({} as TCategoryByIdWithProducts)}
        />
      </div>
    </div>
  );
};
