import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Marck_Script } from "next/font/google";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  product: Product;
}

const mark = Marck_Script({ subsets: ["cyrillic"], weight: ["400"] });

export const CategoryMenuItem: FC<IProps> = ({ product }) => {
  return (
    <div className={cn("flex flex-col items-center", mark.className)}>
      <Image
        src={product.img}
        alt={product.name}
        width={1000}
        height={1000}
        className="w-20 h-20"
      />

      <p className="text-black text-xl max-w-[300px] text-center">
        {product.name}
      </p>
      <p className="text-[#6f4e37] text-3xl">
        {product.price.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
          maximumFractionDigits: 1,
        })}
      </p>
    </div>
  );
};
