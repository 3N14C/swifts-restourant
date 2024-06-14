"use client";

import { FC, useEffect, useState } from "react";
import { StatisticCard } from "./statistic-card";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
import { Marck_Script } from "next/font/google";
import Image from "next/image";

const mark = Marck_Script({ subsets: ["cyrillic"], weight: ["400"] });

export const StatisticBanner: FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid lg:grid-cols-4 items-center lg:gap-0">
      <StatisticCard name="блюд" number={103} img="/img/dishes-png.png" />
      <StatisticCard
        name="посетителей"
        number={2389}
        img="/img/dishes-png.png"
      />
      <StatisticCard name="наград" number={20} img="/img/dishes-png.png" />
      <StatisticCard
        name="часов работы"
        number={2589}
        img="/img/dishes-png.png"
      />

      {/* <CountUp end={2389} duration={5}>
        {({ countUpRef }) => (
          <div className="flex flex-col gap-3 items-center">
            <div className={cn(mark.className, "flex items-center")}>
              <span
                className={cn("text-6xl font-bold text-[#6f4e37]")}
                
              >2389</span>
              <p className="text-2xl">fdsf</p>
            </div>

            <div className="h-[1px] w-1/2 bg-gray-400" />

            <Image
              src={"/img/dishes-png.png"}
              alt={"fds"}
              width={1000}
              height={1000}
              className="w-40 h-40"
            />
          </div>
        )}
      </CountUp> */}
    </div>
  );
};
