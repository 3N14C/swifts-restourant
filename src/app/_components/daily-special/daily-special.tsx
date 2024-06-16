"use client";

import { getProducts } from "@/actions/get/menu-products-action";
import { MenuItemsLoader } from "@/components/ui/loader-data/menu-item-loader";
import { MenuItem } from "@/components/ui/menu-item";
import { ScrollButtons } from "@/components/ui/scroll-buttons";
import { Title } from "@/components/ui/title";
import { animated, useInView } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { FC, useEffect } from "react";

interface IProps {}

export const DailySpecial: FC<IProps> = ({}) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  // const [refLine, springLine] = useInView(() => ({
  //   from: { opacity: 0, width: 0 },
  //   to: { opacity: 1, width: 80 },
  // }));
  // const [refText, springText] = useInView(
  //   () => ({
  //     from: { opacity: 0, x: 0 },
  //     to: { opacity: 1, x: 0 },
  //   }),
  //   {
  //     rootMargin: "-90px 0px 40px 0px",
  //   }
  // );

  useEffect(() => {
    setPage(0);
  }, [page]);

  const {
    data: products,
    isLoading,
    isFetching,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["menu-prodcuts", page],
    queryFn: () => getProducts(page, 3),
  });

  return (
    <div className="relative">
      <Image
        src={"/img/bg-daily-special.jpg"}
        alt="decorate"
        width={1000}
        height={1000}
        className="w-full lg:h-full h-[600px]"
      />

      <div className="absolute top-1/2 left-10 -translate-y-1/2">
        <div className="flex items-start gap-20">
          <Image
            src={"/img/product-decorate.jpg"}
            alt="decorate"
            width={700}
            height={700}
            className={"lg:block hidden"}
          />

          <div className="">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <animated.p
                  // ref={refText}
                  // style={springText}
                  className="text-lg uppercase text-[#6f4e37] font-semibold"
                >
                  шеф рекомендует
                </animated.p>

                <div className="flex items-center">
                  <animated.div
                    // ref={refLine}
                    // style={springLine}
                    className="h-[1px] bg-[#6f4e37]"
                  />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6f4e37]" />
                </div>
              </div>

              <Title title="предложение дня" color="text-white" />
            </div>

            <div>
              <div className="flex flex-col gap-5 mt-16">
                {(isLoading || isFetching || isPending) &&
                  Array.from({ length: 3 }).map((_, idx) => (
                    <MenuItemsLoader key={idx} />
                  ))}
                {!isLoading &&
                  !isFetching &&
                  !isPending &&
                  products?.map((product, idx) => (
                    <MenuItem
                      idx={idx + 1}
                      key={product.id}
                      product={product}
                    />
                  ))}
              </div>
            </div>

            <div className="mt-12">
              <ScrollButtons items={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const DailySpecial = () => {
//   const {
//     data: products,
//     isLoading,
//     isFetching,
//     isPending,
//     refetch,
//   } = useQuery({
//     queryKey: ["menu-prodcutssssss"],
//     queryFn: () => getProducts('0', "3"),
//   });

//   return (
//     <div
//       className="
//     "
//     >
//       AYE
//       <div className="">
//         {products?.map((product) => (
//           <div key={product.id} className="">
//             <p>{product.categoryId}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
