"use client";

import { getEvents } from "@/actions/get/event-action";
import { Title } from "@/components/ui/title";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { EventCard } from "./event-card";
import { EventLoader } from "@/components/ui/loader-data/event-loader";
import { cn } from "@/lib/utils";

export const UpcomingEvents: FC = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const response = await getEvents();

      return response;
    },
  });

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-5">
        <Title title="запланированные мероприятия" />
        <div className="">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-[#6f4e37] rounded-full" />
            <div className="w-20 h-[1px] bg-[#6f4e37] rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#6f4e37] rounded-full" />
          </div>
        </div>

        <div
          className={cn("grid items-center gap-20", {
            "lg:grid-cols-2": events && events.length >= 2,
          })}
        >
          {isLoading &&
            Array.from({ length: 2 }).map((_, idx) => (
              <EventLoader key={idx} />
            ))}
          {events?.map((event, idx) => (
            <EventCard key={event.id} event={event} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};
