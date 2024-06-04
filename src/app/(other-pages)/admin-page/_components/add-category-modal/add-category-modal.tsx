"use client";

import { CategoryService } from "@/actions/category-service";
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
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCategoryModal: FC<IProps> = ({ open, setOpen }) => {
  const schema = z.object({
    name: z.string().min(1, "Неверное название"),
    img: z.string().min(1, "Неверная ссылка на изображение"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: CategoryService.create,
    onSuccess: () => toast.success("Категория добавлена"),
  });

  const handleOnSubmit = async (data: z.infer<typeof schema>) => {
    await mutateAsync({
      ...data,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить категорию</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-2"
        >
          <Input
            className="border-primary"
            {...register("name")}
            placeholder="Название"
          />
          <Input
            className="border-primary"
            {...register("img")}
            placeholder="Ссылка на изображение"
          />

          <Button disabled={isPending} type="submit">
            {isPending ? <Loader2 className="animate-spin" /> : "Добавить"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
