"use client";

import { FC } from "react";
import { Skeleton } from "../skeleton";

export const EventLoader: FC = () => {
  return <Skeleton className="bg-zinc-200 w-[600px] h-[400px]" />;
};
