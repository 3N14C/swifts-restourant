"use client";

import { CategoryService } from "@/actions/category-service";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: [boolean, string];
  setOpen: React.Dispatch<React.SetStateAction<[boolean, string]>>;
}

export const UpdateCategoryModal: FC<IProps> = ({ open, setOpen }) => {
  const { data: category } = useQuery({
    queryKey: ["category-by-id", open[1]],
    queryFn: () => CategoryService.getById({ id: open[1] }),
  });

  const schema = z.object({
    name: z.string().min(1, "Неверное название"),
    img: z.string().min(1, "Неверная ссылка на изображение"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      name: category?.name ?? "",
      img: category?.img ?? "",
    },
  });

  const { mutateAsync: updateCategory, isPending: isUpdatePending } =
    useMutation({
      mutationFn: CategoryService.updateById,
      onSuccess: () => {
        toast.success("Категория обновлена");
        setOpen([false, ""]);
      },
    });

  const { mutateAsync: removeCategory, isPending: isRemovePending } =
    useMutation({
      mutationFn: CategoryService.removeById,
      onSuccess: () => {
        toast.success("Категория удалена");
        setOpen([false, ""]);
      },
    });

  const handleUpdateCategory = async (data: z.infer<typeof schema>) => {
    await updateCategory({
      id: open[1],
      data,
    });
  };

  const handleRemoveCategory = async () => {
    await removeCategory({ id: open[1] });
  };

  return (
    <Dialog open={open[0]} onOpenChange={() => setOpen([false, ""])}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменить категорию</DialogTitle>
          <DialogDescription>
            Здесь вы можете изменить поля категории или удалить категорию.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleUpdateCategory)}
          className="flex flex-col gap-4"
        >
          <div className="">
            <p className="text-sm">Название</p>
            <Input {...register("name")} placeholder="Название категории" />
          </div>

          <div className="">
            <p className="text-sm">Изображение</p>
            <Input {...register("img")} placeholder="Ссылка на изображение" />
          </div>

          <Button type="submit" disabled={isUpdatePending || isRemovePending}>
            {isUpdatePending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Изменить"
            )}
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleRemoveCategory}
            disabled={isUpdatePending || isRemovePending}
          >
            {isRemovePending ? <Loader2 className="animate-spin" /> : "Удалить"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
