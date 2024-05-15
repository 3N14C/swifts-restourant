"use client";

import { createReservation } from "@/actions/post/create-reservation";
import { Button } from "@/app/_components/ui/button";
import { reservationHours } from "@/lib/reservation-hours";
import { cn } from "@/lib/utils";
import { createReservationSchema } from "@/zod-schemas/post-reservation.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "lucia";
import { FC, useState } from "react";
import "react-responsive-modal/styles.css";
import { toast } from "sonner";
import { z } from "zod";
import { Calendar } from "../calendar";
import { Dialog, DialogContent } from "../dialog";
import { Table } from "@prisma/client";
import { TTableWithReservation } from "@/types/table-types";
import {
  getMinReservationTime,
  parseDate,
} from "@/functions/minReservationTime";
import { ScrollArea } from "../scroll-area";
import { useRouter } from "next/navigation";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  tableId: string | null;
  table: TTableWithReservation;
}

export const ModalReservation: FC<IProps> = ({
  open,
  setOpen,
  tableId,
  table,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [focus, setFocus] = useState<string | null>(null);
  const { minTime } = getMinReservationTime(table, date!);
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-reservation"],
    mutationFn: async (data: z.infer<typeof createReservationSchema>) => {
      return await createReservation(data);
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const { data: user } = useQuery<User | null>({
    queryKey: ["user-session"],
  });

  const handleCreateReservation = async (
    data: z.infer<typeof createReservationSchema>
  ) => {
    if (!date) return toast.error("Выберите дату");
    if (!focus) return toast.error("Выберите время");
    try {
      await mutateAsync(data);
      toast.success("Забронировано");
      setOpen(false);
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-center">
        <ScrollArea className="h-[600px] lg:h-full">
          <div className="flex lg:flex-row flex-col lg:items-start items-center gap-4">
            <Calendar
              mode="single"
              className="bg-[#8b705e] w-fit rounded-lg"
              selected={date}
              onSelect={setDate}
            />

            <div className="">
              <p>Выберите время:</p>

              <div className="grid grid-cols-3 items-center gap-5 mt-3">
                {table?.reservation.find(
                  (reservation) =>
                    reservation.reservationDate === date?.toLocaleDateString()
                )
                  ? reservationHours
                      .filter((hours) => hours.time < minTime!)
                      .map((hours) => (
                        <div
                          onClick={() => setFocus(hours.time)}
                          key={hours.id}
                          className={cn(
                            "border rounded-lg p-3 hover:bg-zinc-200 transition duration-300 cursor-pointer",
                            {
                              "bg-zinc-200": focus === hours.time,
                            }
                          )}
                        >
                          {hours.time}
                        </div>
                      ))
                  : reservationHours.map((hours) => (
                      <div
                        onClick={() => setFocus(hours.time)}
                        key={hours.id}
                        className={cn(
                          "border rounded-lg p-3 hover:bg-zinc-200 transition duration-300 cursor-pointer",
                          {
                            "bg-zinc-200": focus === hours.time,
                          }
                        )}
                      >
                        {hours.time}
                      </div>
                    ))}
              </div>
            </div>
          </div>

          <Button
            onClick={async () =>
              await handleCreateReservation({
                time: focus,
                date: date?.toLocaleDateString()!,
                tableId: tableId!,
                userId: user?.id,
              })
            }
            variant="solid"
            className="mt-5"
          >
            {isPending ? `Бронирование...` : "Забронировать"}
          </Button>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
