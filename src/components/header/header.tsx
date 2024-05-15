"use client";

import { FC } from "react";
import { Navbar } from "./navbar";
import { Logo } from "../ui/logo";
import { Tools } from "./tools";
import { useInView, animated } from "@react-spring/web";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
  absolute?: boolean;
  textColor?: string;
}

export const Header: FC<IProps> = ({ absolute = false, textColor }) => {
  const [ref, spring] = useInView(() => ({
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0 },
  }));

  return (
    <div
      className={cn("lg:py-8 z-40", {
        absolute: absolute,
      })}
    >
      <animated.div
        // ref={ref}
        // style={spring}
        className={cn("lg:flex items-center gap-40", textColor, {
          "text-white": !textColor,
        })}
      >
        <Logo />

        <div className="">
          <div className="lg:block hidden">
            <Navbar textColor={textColor} />
          </div>

          <div className="block lg:hidden">
            <Menu className="text-black" />
          </div>
        </div>

        <Tools />
      </animated.div>
    </div>
  );
};
