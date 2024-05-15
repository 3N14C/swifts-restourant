"use client";

import { FC, Fragment } from "react";
import { Skeleton } from "../skeleton";

export const ReservationLoader: FC = () => {
  return (
    <div className="">
      <Skeleton className="w-[275px] h-[300px] bg-zinc-200" />
    </div>
  );
};
