"use client";

// import { getMinReservationDate } from "@/functions/minReservationTime";
import { cn } from "@/lib/utils";
import { TTableWithReservation } from "@/types/table-types";
import moment from "moment";
import { FC } from "react";

interface IProps {
  table: TTableWithReservation;
  // date: Date | undefined;
}

export const TableStatusReservation: FC<IProps> = ({ table }) => {
  const currentDate = moment().format("DD.MM.YYYY");
  const currentTime = moment().format("HH:mm");

  // const { minDate, minTime } = getMinReservationDate(table);

  // console.log("@currentDate", currentDate);
  // console.log("@currentTime", currentTime);
  // console.log("@minTime", minTime);
  // console.log("@minDate", minDate);

  if (table.status === 'closed')
    return (
      <div className="flex items-center justify-between w-full">
        <p className="text-[#35333a] capitalize font-light bg-[#8b705e]/30 rounded-lg px-3 py-1">
          забронирован
        </p>

        <div
          className={cn(
            "bg-red-500 w-2 h-2 rounded-full shadow-inner animate-pulse"
          )}
        />
      </div>
    );

  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-[#35333a] capitalize font-light bg-[#8b705e]/30 rounded-lg px-3 py-1">
        Свободен
      </p>

      <div
        className={cn(
          "bg-green-500 w-2 h-2 rounded-full shadow-inner animate-pulse"
        )}
      />
    </div>
  );
};
