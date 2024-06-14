"use client";

import { cn } from "@/lib/utils";
import { useInView, animated } from "@react-spring/web";
import { Marck_Script } from "next/font/google";
import Image from "next/image";
import { FC } from "react";
import CountUp from "react-countup";

interface IProps {
  number: number;
  img: string;
  name: string;
}

const mark = Marck_Script({ subsets: ["cyrillic"], weight: ["400"] });

export const StatisticCard: FC<IProps> = ({ number, img, name }) => {

  return (
    <animated.div className="">
      <CountUp end={number} duration={5}>
        {({ countUpRef }) => (
          <div className="flex flex-col gap-3 items-center">
            <div className={cn(mark.className, "flex items-center")}>
              <span
                className={cn("text-6xl font-bold text-[#6f4e37]")}
                ref={countUpRef}
              />
              <p className="text-2xl">/{name}</p>
            </div>

            <div className="h-[1px] w-1/2 bg-gray-400" />

            <Image
              src={img}
              alt={name}
              width={1000}
              height={1000}
              className="w-40 h-40"
            />
          </div>
        )}
      </CountUp>
    </animated.div>
  );
};
