"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "solid" | "border";
}

export const Button: FC<IProps> = ({
  children,
  className,
  onClick,
  variant,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn('text-center', className, {
        "bg-[#8b705e] text-white font-semibold px-4 py-2 rounded-lg border-2 border-[#8b705e] w-full hover:bg-[#a88873] transition duration-300":
          variant === "solid",
        "bg-white text-[#8b705e] font-semibold px-4 py-2 rounded-lg border-2 border-[#8b705e] w-full hover:bg-[#f3f3f3] transition duration-300":
          variant === "border",
      })}
    >
      {children}
    </button>
  );
};
