"use client";

import { FC, useEffect, useState } from "react";
import { StatisticCard } from "./statistic-card";

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
    </div>
  );
};
