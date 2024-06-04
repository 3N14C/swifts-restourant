"use client";

import { TableService } from "@/actions/table-service";
import { ReservationCard } from "@/app/_components/ui/reservation-place-card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { FC, useState } from "react";
import { AddTableModal } from "./add-table-modal/add-table-modal";

export const TablesList: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data: tables } = useQuery({
    queryKey: ["all-tables"],
    queryFn: TableService.getAll,
  });

  return (
    <div className="flex items-center gap-4">
      <AddTableModal open={open} setOpen={setOpen} />
      <div className="grid grid-cols-4 items-center">
        {tables?.map((table, idx) => (
          <div key={table.id} className="flex items-center gap-4">
            <ReservationCard table={table} idx={idx} />
            <div className="">
              <div
                onClick={() => setOpen(true)}
                className={cn(
                  "hidden bg-zinc-300 p-4 rounded-full cursor-pointer hover:scale-105 transition-all duration-300",
                  {
                    "inline-block": tables.length - 1 === idx,
                    // "inline-block": tables.length === 0,
                  }
                )}
              >
                <Plus />
              </div>
            </div>
          </div>
        ))}

        {/* <div
          onClick={() => setOpen(true)}
          className={cn(
            "inline-block bg-zinc-300 p-4 rounded-full cursor-pointer hover:scale-105 transition-all duration-300",
            {
              // "inline-block": tables.length - 1 === idx,
              // "inline-block": tables.length === 0,
            }
          )}
        >
          <Plus /> */}
        {/* </div> */}
      </div>
    </div>
  );
};
