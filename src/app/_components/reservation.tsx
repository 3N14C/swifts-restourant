"use client";

import { getAllTables } from "@/actions/get/table-action";
import { ReservationLoader } from "@/components/ui/loader-data/reservation-loader";
import { ModalReservation } from "@/components/ui/modal/modal-reservation";
import { Title } from "@/components/ui/title";
import { TitleWithLines } from "@/components/ui/title-with-lines";
import { cn } from "@/lib/utils";
import { useModal } from "@/store/modal-state-store";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { ReservationCard } from "./ui/reservation-place-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { ModalTableMap } from "@/components/ui/modal/modal-table-map";

interface IProps {}

export const Reservation: FC<IProps> = ({}) => {
  const { open, setOpen, table } = useModal();
  const [openMap, setOpenMap] = useState<boolean>(false);

  const { data: tables, isLoading } = useQuery({
    queryKey: ["tables", open],
    queryFn: async () => {
      return await getAllTables();
    },
  });

  return (
    <div className="">
      <ModalReservation
        open={open}
        setOpen={setOpen}
        tableId={table?.id!}
        table={table!}
      />
      <ModalTableMap open={openMap} setOpen={setOpenMap} />
      <div className="relative flex flex-col justify-center items-center gap-5 w-full">
        <TitleWithLines title="записная книга" />
        <div className=""></div>
        <Title title="забронируйте столик" color="text-[#29272e]" />
        <div className="flex flex-col items-center">
          <Button
            variant={"link"}
            className="text-xl"
            onClick={() => setOpenMap(true)}
          >
            Карта столиков
          </Button>
          <ArrowUp className="animate-bounce opacity-50" />
        </div>
      </div>
      <div
        className={cn(
          `mt-10 grid lg:gap-y-5 gap-y-14 lg:grid-cols-4 items-center justify-items-center`,
          {
            "lg:grid-cols-4": tables && tables.length >= 4,
            "lg:grid-cols-3": tables && tables.length === 3,
            "lg:grid-cols-2": tables && tables.length === 2,
          }
        )}
      >
        {isLoading &&
          Array.from({ length: 4 }).map((_, idx) => (
            <ReservationLoader key={idx} />
          ))}
        {tables?.map((table, idx) => (
          <ReservationCard key={table.id} idx={idx + 1} table={table} />
        ))}
      </div>
    </div>
  );
};
