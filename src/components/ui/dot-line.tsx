"use client";

import { cn } from "@/lib/utils";
import { useInView, animated } from "@react-spring/web";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  dotClassName?: string;
  lineClassName?: string;

  paddingLeft?: string;
  paddingRight?: string;
}

export const DotLines: FC<IProps> = ({
  children,
  className,
  childrenClassName,
  dotClassName,
  lineClassName,

  paddingLeft,
  paddingRight,
}) => {
  const [refLeftLine, springLeftLine] = useInView(() => ({
    from: { opacity: 0, width: 0 },
    to: { opacity: 1, width: 180 },
  }));
  const [refRightLine, springRightLine] = useInView(() => ({
    from: { opacity: 0, width: 0 },
    to: { opacity: 1, width: 180 },
  }));
  const [refText, springText] = useInView(() => ({
    from: { opacity: 0, x: 0 },
    to: { opacity: 1, x: 0 },
  }));

  return (
    <div className={cn(className, "lg:text-[44px] text-3xl flex items-center")}>
      <div
        className={cn("absolute hidden lg:block", paddingLeft, {
          "-left-40": !paddingLeft,
        })}
      >
        <div className="flex items-center">
          <div
            className={cn("rounded-full", dotClassName, {
              "w-3 h-3 bg-white": !dotClassName,
            })}
          />
          <animated.div
            ref={refLeftLine}
            style={springLeftLine}
            className={cn("h-1 rounded-full", lineClassName, {
              "bg-white": !lineClassName,
            })}
          />
        </div>
      </div>

      <animated.div
        ref={refText}
        style={springText}
        className={cn("font-light w-full text-center", childrenClassName)}
      >
        {children}
      </animated.div>

      <div
        className={cn("absolute hidden lg:block", paddingRight, {
          "-right-40": !paddingRight,
        })}
      >
        <div className="flex items-center">
          <animated.div
            ref={refRightLine}
            style={springRightLine}
            className={cn("h-1 rounded-full", lineClassName, {
              "bg-white": !lineClassName,
            })}
          />
          <div
            className={cn("rounded-full", dotClassName, {
              "w-3 h-3 bg-white": !dotClassName,
            })}
          />
        </div>
      </div>
    </div>
  );
};
