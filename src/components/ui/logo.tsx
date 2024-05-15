import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  textColor?: string;
}

export const Logo: FC<IProps> = ({ textColor }) => {
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <Image
          src={"/svg/swift-logo.svg"}
          alt="logo"
          width={1000}
          height={1000}
          className="lg:w-[50px] lg:h-[50px] w-10 h-10"
        />
        <p className={cn("lg:text-xl text-sm font-bold uppercase", textColor)}>
          стрижи
        </p>
      </div>
    </div>
  );
};
