"use client";

import { cn } from "@/lib/utils";
import { useInView, animated } from "@react-spring/web";
import { Marck_Script } from "next/font/google";
import { FC } from "react";

const mark = Marck_Script({ subsets: ["cyrillic"], weight: ["400"] });

interface IProps {
  title: string;
  color?: string;
  titleSize?: string;
  className?: string
}

export const Title: FC<IProps> = ({ title, color, titleSize, className }) => {
  const [ref, spring] = useInView(
    () => ({
      from: { opacity: 0, y: -100 },
      to: { opacity: 1, y: 0 },
    }),
    {
      rootMargin: "0px 0px 20px 0px",
    }
  );

  return (
    <div className="">
      <animated.p
        ref={ref}
        style={spring}
        className={cn(
          "font-bold text-2xl lg:text-start text-center capitalize",
          color,
          mark.className,
          titleSize,
          className,
          {
            "lg:text-5xl ": !titleSize,
          }
        )}
      >
        {title}
      </animated.p>
    </div>
  );
};
