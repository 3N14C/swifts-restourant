"use client";

import { FC } from "react";
import { Skeleton } from "../skeleton";

export const MenuItemsLoader: FC = () => {
  return <Skeleton className="bg-[#6f4e37] w-[400px] h-[50px]" />;
};
