"use client";

import { navbar } from "@/constants/navbar";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

interface IProps {
  textColor?: string;
}

export const Navbar: FC<IProps> = ({ textColor }) => {
  const pathname = usePathname();
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="lg:flex items-center gap-20 col-span-4">
      {navbar.map((item) => (
        <div
          key={item.id}
          className={cn("relative", textColor, {
            "lg:text-white text-black": !textColor,
          })}
        >
          <Link
            onMouseEnter={() => setHover(item.id)}
            onMouseLeave={() => setHover(null)}
            href={item.href}
            className={cn("text-lg uppercase", {})}
          >
            {item.name}
          </Link>
          <div
            className={cn(
              "h-0.5 bg-[#6f4e37] opacity-0 transition-all duration-300",
              {
                "opacity-100 scale-x-1":
                  pathname === item.href || hover === item.id,
                "scale-x-0": pathname !== item.href && hover !== item.id,
              }
            )}
          />
        </div>
      ))}
    </div>
  );
};
