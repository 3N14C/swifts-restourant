"use client";

import { CategoryService } from "@/actions/category-service";
import { ProductService } from "@/actions/product-service";
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

export const UpdateProductModal: FC<IProps> = ({ open, setOpen }) => {
  const { data: product } = useQuery({
    queryKey: ["product-by-id", open[1]],
    queryFn: () => ProductService.getById({ id: open[1] }),
  });

  const schema = z.object({
    name: z.string().min(1, "Неверное название"),
    img: z.string().min(1, "Неверная ссылка на изображение"),
    price: z.string().min(1, "Неверная цена"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      name: product?.name ?? "",
      img: product?.img ?? "",
      price: product?.price.toString() ?? "",
    },
  });

  const { mutateAsync: updateProduct, isPending: isUpdatePending } =
    useMutation({
      mutationFn: ProductService.updateById,
      onSuccess: () => {
        toast.success("Блюдо обновлено");
        setOpen([false, ""]);
      },
    });

  const { mutateAsync: removeProduct, isPending: isRemovePending } =
    useMutation({
      mutationFn: ProductService.removeById,
      onSuccess: () => {
        toast.success("Блюдо удалено");
        setOpen([false, ""]);
      },
    });

  const handleUpdateProduct = async (data: z.infer<typeof schema>) => {
    await updateProduct({
      id: open[1],
      data: {
        ...data,
        price: +data.price
      }
    });
  };

  const handleRemoveProduct = async () => {
    await removeProduct({ id: open[1] });
  };

  return (
    <Dialog open={open[0]} onOpenChange={() => setOpen([false, ""])}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменить блюдо</DialogTitle>
          <DialogDescription>
            Здесь вы можете изменить поля блюда или удалить блюдо.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleUpdateProduct)}
          className="flex flex-col gap-4"
        >
          <div className="">
            <p className="text-sm">Название</p>
            <Input {...register("name")} placeholder="Название блюда" />
          </div>

          <div className="">
            <p className="text-sm">Изображение</p>
            <Input {...register("img")} placeholder="Ссылка на изображение" />
          </div>

          <div className="">
            <p className="text-sm">Цена</p>
            <Input {...register("price")} placeholder="Стоимость блюда" />
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
            onClick={handleRemoveProduct}
            disabled={isUpdatePending || isRemovePending}
          >
            {isRemovePending ? <Loader2 className="animate-spin" /> : "Удалить"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
