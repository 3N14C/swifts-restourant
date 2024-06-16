"use client";

import { TableService } from "@/actions/table-service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReservationService } from "@/actions/reservation-service";
import { Checkbox } from "@/components/ui/checkbox";

interface IProps {
  open: [boolean, string];
  setOpen: React.Dispatch<React.SetStateAction<[boolean, string]>>;
}

export const UpdateTableModal: FC<IProps> = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const {
    mutateAsync: removeReservation,
    isPending: isRemoveReservationPending,
  } = useMutation({
    mutationFn: ReservationService.removeById,
    onSuccess: () => {
      toast.success("Бронь удалена");
      queryClient.fetchQuery({ queryKey: ["get-table-by-id"] });
    },
  });

  const { data: table } = useQuery({
    queryKey: ["get-table-by-id", open[1]],
    queryFn: () => TableService.getById({ id: open[1] }),
  });

  const schema = z.object({
    countGuests: z.string().min(1, "Неверное количество гостей"),
    tableNumber: z.string().min(1, "Неверный номер столика"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      countGuests: table?.countGuests.toString() ?? "",
      tableNumber: table?.tableNumber.toString() ?? "",
    },
  });

  const { mutateAsync: updateTable, isPending: isUpdatePending } = useMutation({
    mutationFn: TableService.updateById,
    onSuccess: () => {
      toast.success("Столик обновлен");
      setOpen([false, ""]);
    },
  });

  const { mutateAsync: removeTable, isPending: isRemovePending } = useMutation({
    mutationFn: TableService.removeById,
    onSuccess: () => {
      toast.success("Столик удален");
      setOpen([false, ""]);
    },
  });

  const handleUpdateTable = async (data: z.infer<typeof schema>) => {
    await updateTable({
      id: open[1],
      data: {
        ...data,
        countGuests: +data.countGuests,
      },
    });
  };

  const handleRemoveTable = async () => {
    await removeTable({ id: open[1] });
  };

  const handleRemoveReservation = async (reservationId: string) => {
    await removeReservation({ reservationId });
  };

  return (
    <Dialog open={open[0]} onOpenChange={() => setOpen([false, ""])}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование столика</DialogTitle>
          <DialogDescription>
            Здесь вы можете редактировать информацию о столике или удалить
            столик
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-14">
          <form
            onSubmit={handleSubmit(handleUpdateTable)}
            className="flex flex-col gap-4"
          >
            <div className="">
              <p className="text-sm">Количество гостей</p>
              <Input
                {...register("countGuests")}
                placeholder="Количество гостей"
              />
            </div>

            <div className="">
              <p className="text-sm">Номер столика</p>
              <Input
                {...register("tableNumber")}
                placeholder="Номер столика"
              />
            </div>

            <Button type="submit" disabled={isUpdatePending || isRemovePending}>
              {isUpdatePending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Изменить"
              )}
            </Button>

            <Button
              onClick={handleRemoveTable}
              type="button"
              variant={"destructive"}
              disabled={isUpdatePending || isRemovePending}
            >
              {isRemovePending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Удалить"
              )}
            </Button>
          </form>

          <div className="">
            <div className="flex items-center gap-4">
              <p>Брони на столик:</p>
              <div className="flex items-center text-sm gap-2">
                <Checkbox onClick={() => setIsChecked(!isChecked)} checked={isChecked} />
                <p>Сегодня</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <TooltipProvider>
                {isChecked ? (
                  <>
                    {table?.reservation
                      .filter(
                        (reservation) =>
                          reservation.reservationDate ===
                          new Date().toLocaleDateString()
                      )
                      .map((reservation) => (
                        <Tooltip key={reservation.id}>
                          <TooltipTrigger>
                            <div className="flex items-center justify-between gap-2 border border-[#E5E7EB] p-2 rounded-lg cursor-default">
                              <p className="text-sm">
                                {reservation.reservationDate}
                              </p>
                              <p>-</p>
                              <p className="text-sm">
                                {reservation.reservationTime}
                              </p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent asChild>
                            <Button
                              disabled={
                                isRemoveReservationPending ||
                                isRemovePending ||
                                isUpdatePending
                              }
                              variant={"destructive"}
                              onClick={() =>
                                handleRemoveReservation(reservation.id)
                              }
                            >
                              {isRemoveReservationPending ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                "Снять бронь"
                              )}
                            </Button>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                  </>
                ) : (
                  <>
                    {table?.reservation.map((reservation) => (
                      <Tooltip key={reservation.id}>
                        <TooltipTrigger>
                          <div className="flex items-center justify-between gap-2 border border-[#E5E7EB] p-2 rounded-lg cursor-default">
                            <p className="text-sm">
                              {reservation.reservationDate}
                            </p>
                            <p>-</p>
                            <p className="text-sm">
                              {reservation.reservationTime}
                            </p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="">
                            <p className="mb-2">{reservation.user?.phone}</p>
                            <Button
                              disabled={
                                isRemoveReservationPending ||
                                isRemovePending ||
                                isUpdatePending
                              }
                              variant={"destructive"}
                              onClick={() =>
                                handleRemoveReservation(reservation.id)
                              }
                            >
                              {isRemoveReservationPending ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                "Снять бронь"
                              )}
                            </Button>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </>
                )}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
