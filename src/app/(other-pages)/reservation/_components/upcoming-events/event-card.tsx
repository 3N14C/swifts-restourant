"use client";

import { determinePluralDay } from "@/functions/determinePluralDay";
import { determinePluralFood } from "@/functions/determinePluralFood";
import { determinePluralGuests } from "@/functions/determinePluralGuests";
import { cn } from "@/lib/utils";
import { Event } from "@prisma/client";
import { useInView, animated } from "@react-spring/web";
import { Neucha } from "next/font/google";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  event: Event;
  idx: number;
}

const neucha = Neucha({ subsets: ["cyrillic"], weight: ["400"] });

export const EventCard: FC<IProps> = ({ event, idx }) => {
  const day = determinePluralDay(+event.durationDays);
  const food = determinePluralFood(+event.countFood);
  const geust = determinePluralGuests(+event.countGuests);
  const startDateTime = new Date(event.startDateTime).toLocaleDateString(
    "ru-RU",
    {
      month: "long",
    }
  );

  const [refEventCard, springEventCard] = useInView(() => ({
    from: {
      opacity: 0,
      y: 100,
    },
    to: {
      opacity: 1,
      y: 0,
    },
  }), {rootMargin: "40px 0px 20px 0px"});

  return (
    <animated.div
      ref={refEventCard}
      style={springEventCard}
      className={cn(
        "shadow-[1px_1px_16px_1px] shadow-[rgba(0,0,0,0.25)] hover:shadow-[rgba(0,0,0,0.5)] transition-shadow duration-300",
        neucha.className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex flex-col items-center border-r border-[#e4e4e4] px-4 mt-2"
          )}
        >
          <p className="text-[#6f4e37] text-5xl font-bold">
            {new Date(event.startDateTime).toLocaleDateString("ru-RU", {
              day: "numeric",
            })}
          </p>

          <p className="text-[#6f4e37] text-2xl font-bold">
            {/* {new Date(event.startDateTime).toLocaleDateString("ru-RU", {
              month: "long",
            })} */}
            {startDateTime.slice(0, startDateTime.length - 1)}я
          </p>
        </div>

        <p className="text-xl font-semibold capitalize">{event.name}</p>
      </div>

      <div className="relative">
        <Image
          src={event.img}
          alt={event.name}
          width={1000}
          height={1000}
          className="w-full"
        />

        <div className="bg-[#6f4e37]/80 text-center absolute -bottom-8 w-3/5 left-1/2 -translate-x-1/2">
          <div className="py-5 px-3 flex items-center justify-evenly">
            <p className="text-white text-2xl font-bold">
              {event.durationDays}
              <span className="text-sm font-light">/{day}</span>
            </p>

            <p className="text-white text-2xl font-bold">
              {event.countFood}
              <span className="text-sm font-light">/{food}</span>
            </p>

            <p className="text-white text-2xl font-bold">
              {event.countGuests}
              <span className="text-sm font-light">/{geust}</span>
            </p>
          </div>
        </div>
      </div>
    </animated.div>
  );
};
