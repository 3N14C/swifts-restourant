"use client";

import { signUp } from "@/actions/auth/sign-up";
import { Input } from "@/app/(other-pages)/_components/input";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaskEventDetail, useMask } from "@react-input/mask";
import { Link } from "next-view-transitions";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const FormRegisterPage: FC = () => {
  const schema = z.object({
    username: z
      .string()
      .min(3, "Имя пользователя должно содержать более 3 символов"),
    email: z.string().email("Неверная электронная почта"),
    password: z.string().min(6, "Пароль должен содержать более 6 символов"),
    phone: z.string().min(1, "Неверный номер телефона").optional(),
  });
  const [message, setMessage] = useState<MaskEventDetail | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      phone: "",
    },
    resolver: zodResolver(schema),
  });

  const inputPhoneRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: {
      _: /\d/,
    },
    showMask: true,
    onMask: (value) => {
      setMessage(value.detail);
      console.log(value);
    },
  });

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(
          async (data) =>
            await signUp(
              data.email,
              `+7${message?.input}`,
              data.username,
              data.password
            )
        )}
        className="flex flex-col items-center justify-center gap-5 max-w-fit mx-auto"
      >
        <div className="">
          <Input
            {...register("username")}
            type={"text"}
            placeholder={"Имя пользователя"}
            className={cn({
              "border-red-500 transition duration-300 placeholder:text-red-300":
                errors.username,
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="">
          <input
            {...register("phone")}
            type={"text"}
            ref={inputPhoneRef}
            className={cn(
              "border border-[#6f4e37] rounded-lg px-4 py-2 w-full focus:outline-none focus-visible:outline-none"
            )}
          />
          {message?.input && !message.isValid ? (
            <p className="text-red-500">Неверный номер телефона</p>
          ) : (
            errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )
          )}
        </div>

        <div className="">
          <Input
            {...register("email")}
            type={"email"}
            placeholder={"Электронный адрес"}
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

        <Button variant="border" onClick={() => {}} className="w-full">
          Создать аккаунт
        </Button>
      </form>
    </div>
  );
};
