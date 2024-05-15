"use client";

import { getAllCategories } from "@/actions/get/menu-category-actions";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { FC, useEffect } from "react";

interface IProps {}

export const CategoryPaggination: FC<IProps> = ({}) => {
  const [categoryId, setCategoryId] = useQueryState("categoryId", {
    defaultValue: "desserts",
  });
  const { data: categories } = useQuery({
    queryKey: ["category-paggination"],
    queryFn: async () => {
      return await getAllCategories();
    },
  });

  const handleChooseCategory = (id: string) => {
    if (id !== categoryId) {
      setCategoryId(id);
    }
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {categories?.map((category, idx) => (
        <div
          key={category.id}
          onClick={() => handleChooseCategory(category.id)}
          className={cn("w-2 h-2 bg-gray-500 rounded-full cursor-pointer", {
            "bg-[#8b705e] cursor-default": categoryId === category.id,
          })}
        />
      ))}
    </div>
  );
};
