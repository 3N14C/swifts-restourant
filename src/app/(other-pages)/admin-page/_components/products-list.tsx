"use client";

import { ProductService } from "@/actions/product-service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { FC, useState } from "react";
import { AddProductModal } from "./product-modals/add-product-modal";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UpdateProductModal } from "./product-modals/update-product-modal";

export const ProductsList: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState<
    [boolean, string]
  >([false, ""]);

  const { data: products } = useQuery({
    queryKey: ["product-all"],
    queryFn: ProductService.getAll,
  });

  console.log(products?.length);

  return (
    <div className="flex items-center gap-4">
      <AddProductModal open={open} setOpen={setOpen} />
      <UpdateProductModal
        open={openUpdateCategory}
        setOpen={setOpenUpdateCategory}
      />
      <div className="grid grid-cols-4 items-center">
        {products?.map((product, idx) => (
          <div key={product.id} className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <Image
                src={product.img}
                alt={product.name}
                width={1000}
                height={1000}
                className="w-[300px] h-[200px] rounded-full cursor-pointer"
                onClick={() => setOpenUpdateCategory([true, product.id])}
              />
              <div
                onClick={() => setOpen(true)}
                className={cn(
                  "hidden bg-zinc-300 p-4 rounded-full cursor-pointer",
                  {
                    "inline-block": products?.length - 1 === idx,
                  }
                )}
              >
                <Plus className="" />
              </div>
            </div>
            <p className="text-2xl">{product.name}</p>
          </div>
        ))}

        <div
          onClick={() => setOpen(true)}
          className={cn("bg-zinc-300 p-4 rounded-full cursor-pointer", {
            'hidden': products && products.length >= 1,
          })}
        >
          <Plus className="" />
        </div>
      </div>
    </div>
  );
};
