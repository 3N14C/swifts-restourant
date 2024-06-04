"use client";

import { ProductService } from "@/actions/product-service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { FC, useState } from "react";
import { AddProductModal } from "./add-product-modal/add-product-modal";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ProductsList: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data: products } = useQuery({
    queryKey: ["product-all"],
    queryFn: ProductService.getAll,
  });

  return (
    <div className="flex items-center gap-4">
      <AddProductModal open={open} setOpen={setOpen} />
      <div className="grid grid-cols-4 items-center">
        {products?.map((product, idx) => (
          <div key={product.id} className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <Image
                src={product.img}
                alt={product.name}
                width={1000}
                height={1000}
                className="w-[300px] h-[200px] rounded-full"
              />
              <div
                onClick={() => setOpen(true)}
                className={cn(
                  "hidden bg-zinc-300 p-4 rounded-full cursor-pointer", {
                    'inline-block': products?.length - 1 === idx
                  }
                )}
              >
                <Plus className="" />
              </div>
            </div>
            <p className="text-2xl">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
