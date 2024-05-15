"use client";

import { login } from "@/actions/auth/login";
import { Input } from "@/app/(other-pages)/_components/input";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const FormLoginPage: FC = () => {
  const searchParams = useSearchParams();
  const schema = z.object({
    email: z.string().email("Неверная электронная почта"),
    password: z.string().min(6, "Пароль должен содержать более 6 символов"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(
          async (data) =>
            await login(
              data.email,
              data.password,
              searchParams.get("from") || "/"
            )
        )}
        className="flex flex-col items-center justify-center gap-5 max-w-fit mx-auto"
      >
        <div className="">
          <Input
            {...register("email")}
            type={"email"}
            placeholder={"email"}
            className={cn({
              "border-red-500 transition duration-300 placeholder:text-red-300":
                errors.email,
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="">
          <div className="">
            <Input
              {...register("password")}
              type="password"
              placeholder="*****"
              className={cn({
                "border-red-500 transition duration-300 placeholder:text-red-300":
                  errors.password,
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <span>
            Нет аккаунта?{" "}
            <Link
              href={"/auth/sign-up"}
              className="text-[#6f4e37] hover:text-[#ca9169] transition duration-300 cursor-pointer"
            >
              Регистрация
            </Link>
          </span>
        </div>

        <Button variant="border" className="w-full">
          Войти
        </Button>
      </form>
    </div>
  );
};
