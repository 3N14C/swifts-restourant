"use client";

import { getCurrentUser } from "@/actions/user/currentUser";
import { cn } from "@/lib/utils";
import { useModal } from "@/store/modal-state-store";
import { TTableWithReservation } from "@/types/table-types";
import { animated, useInView } from "@react-spring/web";
import { Lock, Users } from "lucide-react";
import { FC, useState } from "react";
import { TableStatusReservation } from "./table-reservation-status";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Button } from "./button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { User } from "lucia";

interface IProps {
  table: TTableWithReservation;
  idx: number;
}

export const ReservationCard: FC<IProps> = ({ table, idx }) => {
  const pathname = usePathname();
  const { data: user } = useQuery<User | null>({
    queryKey: ["user-session"],
  });
  const { setOpen, setTable } = useModal();
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);
  const [ref, spring] = useInView(
    () => ({
      from: { opacity: 0, y: idx * 50 },
      to: { opacity: 1, y: 0 },
    }),
    {
      rootMargin: "0px 0px 20px 0px",
    }
  );

  const handleOpenModal = async () => {
    if (user) {
      setOpen(true);
      setTable(table);
    }
    if (!user) {
      router.push(`/auth/sign-in?from=${pathname}`);
    }
  };

  return (
    <animated.div
      ref={ref}
      style={spring}
      className={cn("relative", {
        "cursor-pointer": table.status !== "closed",
      })}
    >
      <div
        onMouseEnter={() => setHover(table.id)}
        onMouseLeave={() => setHover(null)}
        className="relative max-w-fit"
      >
        <div
          className={cn(
            "w-[275px] rounded-lg px-4 py-3 transition-all duration-300 border-2 border-[#8b705e]",
            {
              "lg:filter lg:blur-sm": hover === table.id,
            }
          )}
        >
          <div className="">
            <TableStatusReservation table={table} />
          </div>

          <div className="flex items-center justify-center h-[215px] text-[#8b705e]">
            <Image
              src={"/svg/tables/table.svg"}
              alt="table"
              width={1000}
              height={1000}
              className="w-[150px] h-[150px] object-contain"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="">
              <p className="text-[#8b705e] font-semibold text-lg">
                №{idx} <span className="text-[#8b705e]">стол</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Users className="text-[#8b705e]" />
              <p className="text-[#8b705e] font-semibold">
                {table.countGuests}
              </p>
            </div>
          </div>
        </div>

        {table.status === "closed" ? (
          <div
            className={cn(
              "hidden opacity-0 lg:flex flex-col cursor-default select-none z-40 items-center justify-center gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 w-full h-full",
              {
                "opacity-100": hover === table.id,
              }
            )}
          >
            <Lock className="text-[#8b705e]" size={30} />
            <p className="text-[#8b705e] font-semibold">
              В текущее время столик занят
            </p>
          </div>
        ) : (
          <div
            className={cn(
              "hidden opacity-0 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full transition-all duration-300 lg:flex flex-col gap-4 items-center",
              {
                "opacity-100": hover === table.id,
              }
            )}
          >
            <Button variant="solid" onClick={handleOpenModal}>
              Забронировать
            </Button>
            <button className="bg-white text-[#8b705e] font-semibold px-4 py-2 rounded-lg border-2 border-[#8b705e] w-full hover:bg-[#f3f3f3] transition duration-300">
              Позвонить нам
            </button>
          </div>
        )}

        {table.status === "open" && (
          <div
            className={cn(
              "lg:hidden select-none flex flex-col gap-4 items-center mt-3"
            )}
          >
            <button
              className="bg-[#8b705e] text-white font-semibold px-4 py-2 rounded-lg border-2 border-[#8b705e] w-full hover:bg-[#a88873] transition duration-300"
              onClick={handleOpenModal}
            >
              Забронировать
            </button>
            <button className="bg-white text-[#8b705e] font-semibold px-4 py-2 rounded-lg border-2 border-[#8b705e] w-full hover:bg-[#f3f3f3] transition duration-300">
              Позвонить нам
            </button>
          </div>
        )}
      </div>
    </animated.div>
  );
};
