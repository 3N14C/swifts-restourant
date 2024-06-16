"use client";

import { TableService } from "@/actions/table-service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddTableModal: FC<IProps> = ({ open, setOpen }) => {
  const schema = z.object({
    countGuests: z.string().min(1, "Неверное количество гостей"),
    // img: z.string().min(1, "Неверная ссылка на изображение"),
    tableNumber: z.string().min(1, "Неверный номер столика"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: TableService.create,
    onSuccess: () => toast.success("Столик добавлен"),
  });

  const handleOnSubmit = async (data: z.infer<typeof schema>) => {
    await mutateAsync({
      ...data,
      countGuests: +data.countGuests,
      img: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Доабвить столик</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-3"
        >
          <div className="">
            <Input
              className="border-primary"
              {...register("countGuests")}
              placeholder="кол-во гостей"
            />
            {errors.countGuests && (
              <p className="text-red-500">{errors.countGuests.message}</p>
            )}
          </div>

          {/* <div className="">
            <Input className="border-primary" {...register("img")} placeholder="Ссылка на изображение" />
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div> */}

          <div className="">
            <Input
              className="border-primary"
              {...register("tableNumber")}
              placeholder="Введите номер столика"
            />
            {errors.tableNumber && (
              <p className="text-red-500">{errors.tableNumber.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            Добавить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
