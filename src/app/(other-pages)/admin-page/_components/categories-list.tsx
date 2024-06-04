"use client";

import { CategoryService } from "@/actions/category-service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { FC, useState } from "react";
import { AddCategoryModal } from "./add-category-modal/add-category-modal";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const CategoriesList: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data: categories } = useQuery({
    queryKey: ["categories-all"],
    queryFn: CategoryService.getAll,
  });

  return (
    <div className="flex items-center gap-4">
      <AddCategoryModal open={open} setOpen={setOpen} />
      <div className="grid grid-cols-4 items-center">
        {categories?.map((category, idx) => (
          <div key={category.id} className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <Image
                src={category.img}
                alt={category.name}
                width={1000}
                height={1000}
                className="w-[400px] h-[400px] rounded-full"
              />
              <div
                onClick={() => setOpen(true)}
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
      </div>
    </div>
  );
};
