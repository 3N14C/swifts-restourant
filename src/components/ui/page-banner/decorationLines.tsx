"use client";

import { useInView, animated } from "@react-spring/web";
import { FC } from "react";

export const DecorationLines: FC = () => {
  const [refLeftLine, springLeftLine] = useInView(() => ({
    from: { opacity: 0, x: -100 },
    to: {
      opacity: 1,
      x: 0,
    },
  }));
  const [refRightLine, springRightLine] = useInView(() => ({
    from: { opacity: 0, x: 100 },
    to: {
      opacity: 1,
      x: 0,
    },
  }));
  const [refDot, springDot] = useInView(() => ({
    from: { opacity: 0, x: 0 },
    to: {
      opacity: 1,
      x: 0,
    },
  }));

  return (
    <div className="flex items-center gap-5">
      <animated.div
        ref={refLeftLine}
        style={springLeftLine}
        className="flex items-center"
      >
        <div className="w-20 h-[1px] bg-white" />
        <div className="w-1 h-1 bg-white rounded-full" />
      </animated.div>

      <animated.div
        ref={refDot}
        style={springDot}
        className="border border-white rounded-full w-4 h-4"
      />

      <animated.div
        ref={refRightLine}
        style={springRightLine}
        className="flex items-center"
      >
        <div className="w-1 h-1 bg-white rounded-full" />
        <div className="w-20 h-[1px] bg-white" />
      </animated.div>
    </div>
  );
};
