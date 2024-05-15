"use client";

import { cn } from "@/lib/utils";
import { Marck_Script } from "next/font/google";
import Image from "next/image";
import { FC, useEffect } from "react";
import { DotLines } from "./dot-line";
import { useSpring, animated, useInView } from "@react-spring/web";

const mark = Marck_Script({ subsets: ["cyrillic"], weight: ["400"] });

export const MainBanner: FC = () => {
  const [refLeftText, springLeftText] = useInView(() => ({
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0 },
  }));
  const [refRightText, springRightText] = useInView(() => ({
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0 },
  }));
  const [refImg, springImg] = useInView(() => ({
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0 },
  }));
  const [refTitle, springTitle] = useInView(() => ({
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0 },
  }));
  const [refSubTitle, springSubTitle] = useInView(() => ({
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0 },
  }));

  return (
    <div className={cn("flex items-center justify-center h-screen")}>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex justify-center items-baseline gap-5",
            mark.className
          )}
        >
          <animated.p
            ref={refLeftText}
            style={springLeftText}
            className="font-light lg:text-[40px] text-2xl"
          >
            Премиум
          </animated.p>
          <animated.div ref={refImg} style={springImg}>
            <Image
              src={"/svg/cloche-fill.svg"}
              alt="logo"
              width={1000}
              height={1000}
              className="lg:w-[200px] lg:h-[200px] w-[100px] h-[100px]"
            />
          </animated.div>
          <animated.p
            ref={refRightText}
            style={springRightText}
            className="font-light lg:text-[40px] text-2xl"
          >
            Качество
          </animated.p>
        </div>

        <div className="flex flex-col items-center relative">
          <animated.p
            ref={refTitle}
            style={springTitle}
            className="uppercase text-[64px] font-bold"
          >
            свежие блюда
          </animated.p>
          <DotLines className={cn("capitalize", mark.className)} childrenClassName="">
            <animated.p ref={refSubTitle} style={springSubTitle}>
              элитный ресторан
            </animated.p>
          </DotLines>
        </div>
      </div>
    </div>
  );
};
