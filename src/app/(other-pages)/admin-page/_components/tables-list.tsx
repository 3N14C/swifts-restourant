"use client";

import { TableService } from "@/actions/table-service";
import { ReservationCard } from "@/app/_components/ui/reservation-place-card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Plus, Users } from "lucide-react";
import { FC, useState } from "react";
import { AddTableModal } from "./table-modals/add-table-modal";
import Image from "next/image";
import { TableStatusReservation } from "@/app/_components/ui/table-reservation-status";
import { useInView, animated } from "@react-spring/web";
import { UpdateTableModal } from "./table-modals/update-table-modal";

export const TablesList: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateTable, setUpdateTable] = useState<[boolean, string]>([
    false,
    "",
  ]);

  const [ref, spring] = useInView(
    () => ({
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
    }),
    {
      rootMargin: "0px 0px 20px 0px",
    }
  );

  const { data: tables } = useQuery({
    queryKey: ["all-tables"],
    queryFn: TableService.getAll,
  });

  return (
    <div className="flex items-center gap-4">
      <AddTableModal open={open} setOpen={setOpen} />
      <UpdateTableModal open={updateTable} setOpen={setUpdateTable} />
      <div className="grid grid-cols-4 items-center">
        {tables?.map((table, idx) => (
          <div
            key={table.id}
            className="flex items-center gap-4 max-w-fit"
          >
            <animated.div
              ref={ref}
              style={spring}
              className={cn("relative", {
                "cursor-pointer": table.status !== "closed",
              })}
            >
              <div className="relative max-w-fit">
                <div
                  className={cn(
                    "w-[275px] rounded-lg px-4 py-3 transition-all duration-300 border-2 border-[#8b705e]",
                    {}
                  )}
                >
                  <div className="">
                    <TableStatusReservation table={table} />
                  </div>

                  <div className="flex items-center justify-center h-[215px] text-[#8b705e]">
                    <Image
                      src={"/svg/tables/table.svg"}
                      alt="table"
                      width={1000}
                      height={1000}
                      className="w-[150px] h-[150px] object-contain"
                      onClick={() => setUpdateTable([true, table.id])}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="">
                      <p className="text-[#8b705e] font-semibold text-lg">
                        №{table.tableNumber} <span className="text-[#8b705e]">стол</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="text-[#8b705e]" />
                      <p className="text-[#8b705e] font-semibold">
                        {table.countGuests}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
            <div className="">
              <div
                onClick={() => setOpen(true)}
                className={cn(
                  "hidden bg-zinc-300 p-4 rounded-full cursor-pointer hover:scale-105 transition-all duration-300",
                  {
                    "inline-block": tables.length - 1 === idx,
                  }
                )}
              >
                <Plus />
              </div>
            </div>
          </div>
        ))}
        <div
          onClick={() => setOpen(true)}
          className={cn(
            "hidden bg-zinc-300 p-4 rounded-full cursor-pointer hover:scale-105 transition-all duration-300",
            {
              "inline-block": tables?.length === 0,
            }
          )}
        >
          <Plus />
        </div>
      </div>
    </div>
  );
};
