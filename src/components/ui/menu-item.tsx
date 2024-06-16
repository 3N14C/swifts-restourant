"use client";

import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useInView, animated } from "@react-spring/web";
import { Marck_Script } from "next/font/google";
import Image from "next/image";
import { FC } from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  idx: number;
}

const mark = Marck_Script({ subsets: ["cyrillic"], weight: ["400"] });

export const MenuItem: FC<IProps> = ({ product, idx }) => {
  const [ref, spring] = useInView(
    () => ({
      from: { opacity: 0, y: -100 },
      to: { opacity: 1, y: 0 },
    }),
    {
      rootMargin: "0px 0px 20px 0px",
    }
  );

  return (
    <animated.div ref={ref} style={spring} className="flex items-center gap-5">
      <Image
        src={product.img}
        alt="product-decorate"
        width={1000}
        height={1000}
        className="rounded-full w-14 h-14 object-cover"
      />

      <div className="flex items-start lg:w-full gap-5">
        <div className="flex flex-col items-start lg:w-full w-[200px]">
          <p
            className={cn(
              mark.className,
              "text-white font-bold capitalize lg:text-2xl text-lg tracking-tighter"
            )}
          >
            {product?.name}
          </p>
        </div>

        <p className={cn(mark.className, "text-[#6f4e37] text-3xl")}>
          {product?.price.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            maximumFractionDigits: 1,
          })}
        </p>
      </div>
    </animated.div>
  );
};
