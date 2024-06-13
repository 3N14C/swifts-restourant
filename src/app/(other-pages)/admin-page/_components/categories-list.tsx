"use client";

import { CategoryService } from "@/actions/category-service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { FC, useState } from "react";
import { AddCategoryModal } from "./category-modals/add-category-modal";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UpdateCategoryModal } from "./category-modals/update-category-modal";

export const CategoriesList: FC = () => {
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState<
    [boolean, string]
  >([false, ""]);

  const { data: categories } = useQuery({
    queryKey: ["categories-all"],
    queryFn: CategoryService.getAll,
  });

  return (
    <div className="flex items-center gap-4">
      <AddCategoryModal open={openAddCategory} setOpen={setOpenAddCategory} />
      <UpdateCategoryModal
        open={openUpdateCategory}
        setOpen={setOpenUpdateCategory}
      />
      <div className="grid grid-cols-4 items-center">
        {categories?.map((category, idx) => (
          <div key={category.id} className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <Image
                src={category.img}
                alt={category.name}
                width={1000}
                height={1000}
                className="w-[200px] h-[200px] rounded-full cursor-pointer"
                onClick={() => setOpenUpdateCategory([true, category.id])}
              />
              <div
                onClick={() => setOpenAddCategory(true)}
                className={cn(
                  "hidden bg-zinc-300 p-4 rounded-full cursor-pointer hover:scale-105 transition-all duration-300",
                  {
                    "inline-block": categories.length - 1 === idx,
                  }
                )}
              >
                <Plus className="" />
              </div>
            </div>
            <p className="text-2xl">{category.name}</p>
          </div>
        ))}

        <div
          onClick={() => setOpenAddCategory(true)}
          className={cn(
            "hidden bg-zinc-300 p-4 rounded-full cursor-pointer hover:scale-105 transition-all duration-300",
            {
              "inline-block": categories?.length === 0,
            }
          )}
        >
          <Plus className="" />
        </div>
      </div>
    </div>
  );
};
