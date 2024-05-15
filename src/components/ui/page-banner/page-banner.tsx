"use client";

import { cn } from "@/lib/utils";
import { Kosugi_Maru, Marck_Script, Neucha, Rancho } from "next/font/google";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { DecorationLines } from "./decorationLines";
import { useInView, animated } from "@react-spring/web";

const neucha = Neucha({ subsets: ["cyrillic"], weight: ["400"] });

interface IProps {
  pageTitle: string;
  bottomText: string;
}

export const PageBanner: FC<IProps> = ({ pageTitle, bottomText }) => {
  const [refTitle, springTitle] = useInView(() => ({
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0 },
  }));
  const [refBottomText, springBottomText] = useInView(
    () => ({
      from: { opacity: 0, y: 100 },
      to: { opacity: 1, y: 0 },
    }),
    { rootMargin: "40px 0px -20px 0px" }
  );

  return (
    <div className="bg-[url('/img/page-banner.jpg')] h-[300px] flex flex-col gap-4 items-center justify-center">
      <animated.p
        ref={refTitle}
        style={springTitle}
        className={cn(
          "font-bold lg:text-6xl text-4xl uppercase text-white tracking-widest",
          neucha.className
        )}
      >
        {pageTitle}
      </animated.p>

      <div className="">
        <DecorationLines />
      </div>

      <animated.p
        ref={refBottomText}
        style={springBottomText}
        className="text-white font-light text-sm"
      >
        {bottomText}
      </animated.p>
    </div>
  );
};
