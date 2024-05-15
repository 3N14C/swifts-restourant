"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Title } from "@/components/ui/title";
import { reservationHours } from "@/lib/reservation-hours";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Marck_Script } from "next/font/google";
import { FC, useState } from "react";

interface IProps {
  open: boolean;
  time: Date | string | number | undefined;
}

const mark = Marck_Script({ subsets: ["cyrillic"], weight: ["400"] });

export const TimePickerPopover: FC<IProps> = ({ time, open }) => {
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  if (open)
    return (
      <div className="flex flex-col justify-center items-center gap-10 max-w-fit mx-auto">
        <Title
          title={`выберите время на ${moment(time).format("DD.MM.YYYY")}`}
        />

        <ScrollArea className="h-[200px]  w-full">
          <div className="px-10 flex flex-col gap-10">
            {reservationHours.map(({ time, id }) => (
              <div key={id} className="cursor-pointer max-w-fit mx-auto">
                <p
                  className={cn(
                    "text-6xl font-bold text-center",
                    mark.className
                  )}
                >
                  {time}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
};
