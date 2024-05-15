"use client";

import { TCategoryByIdWithProducts } from "@/types/category-types";
import { Category, Prisma } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { CategoryPaggination } from "./category-paggination";
import { MenuItem } from "@/components/ui/menu-item";
import { CategoryMenuItem } from "./category-menu-item";

interface IProps {
  category: TCategoryByIdWithProducts;
}

export const CategorySlider: FC<IProps> = ({ category }) => {
  return (
    <div className="flex lg:flex-row flex-col items-center gap-10">
      <div className="flex flex-col items-center">
        <Image
          src={category.img}
          alt={category.name}
          width={1000}
          height={1000}
          className="w-[400px] h-[400px]"
        />

        <div className="flex flex-col items-center gap-3">
          <p
            className="text-5xl uppercase img-text tracking-widest font-extrabold"
            style={{ backgroundImage: `url('${category.img}')` }}
          >
            {category.name}
          </p>

          <CategoryPaggination />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 items-center gap-y-3">
        {category.products?.map((product) => (
          <CategoryMenuItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
