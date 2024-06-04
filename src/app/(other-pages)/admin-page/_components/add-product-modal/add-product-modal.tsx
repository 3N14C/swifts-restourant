"use client";

import { CategoryService } from "@/actions/category-service";
import { ProductService } from "@/actions/product-service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddProductModal: FC<IProps> = ({ open, setOpen }) => {
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const { data: categories } = useQuery({
    queryKey: ["category-all"],
    queryFn: CategoryService.getAll,
  });

  const schema = z.object({
    name: z.string().min(1, "Неверное название"),
    price: z.string().min(1, "Неверная цена"),
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
    mutationFn: ProductService.create,
    onSuccess: () => toast.success("Продукт добавлен в список меню"),
  });

  const handleOnSubmit = async (data: z.infer<typeof schema>) => {
    if (!categoryId) return toast.error("Выберите категорию");

    await mutateAsync({
      ...data,
      categoryId,
      price: +data.price
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить продукт в список меню</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-5">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="">
              <Input
                className="border-primary"
                {...register("name")}
                placeholder="Название"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="">
              <Input
                className="border-primary"
                {...register("price")}
                placeholder="Цена"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="">
              <Input
                className="border-primary"
                {...register("img")}
                placeholder="Ссылка на изображение"
              />
              {errors.img && (
                <p className="text-red-500">{errors.img.message}</p>
              )}
            </div>

            <Button disabled={isPending} type="submit">
              {isPending ? <Loader2 /> : "Добавить"}
            </Button>
          </form>

          <div className="">
            {categories?.map((category) => (
              <div key={category.id} className="">
                <Image
                  src={category.img}
                  alt={category.name}
                  width={1000}
                  height={1000}
                  className={cn(
                    "w-[100px] h-[100px] rounded-full cursor-pointer",
                    {
                      "border-b border-[#8b705e]": categoryId === category.id,
                    }
                  )}
                  onClick={() => setCategoryId(category.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
