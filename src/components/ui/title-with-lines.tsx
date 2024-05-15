"use client";

import { useInView, animated } from "@react-spring/web";
import { FC } from "react";

interface IProps {
  title: string;
}

export const TitleWithLines: FC<IProps> = ({ title }) => {
  const [refLine, springLine] = useInView(() => ({
    from: { opacity: 0, width: 0 },
    to: { opacity: 1, width: 80 },
  }));
  const [refText, springText] = useInView(() => ({
    from: { opacity: 0, x: 0 },
    to: { opacity: 1, x: 0 },
  }));
  const [refAdaptiveLine, springAdaptiveLine] = useInView(() => ({
    from: { opacity: 0, width: 0 },
    to: { opacity: 1, width: 40 },
  }));

  return (
    <div className="flex items-center gap-10">
      <div className="flex items-center">
        <div className="w-1.5 h-1.5 bg-[#6f4e37] rounded-full" />
        <animated.div
          ref={refLine}
          style={springLine}
          className="h-0.5 bg-[#6f4e37] rounded-full hidden lg:block"
        />
        <animated.div
          ref={refAdaptiveLine}
          style={springAdaptiveLine}
          className="h-0.5 bg-[#6f4e37] rounded-full lg:hidden"
        />
      </div>

      <animated.p
        ref={refText}
        style={springText}
        className="lg:text-lg text-[#6f4e37] uppercase lg:text-start text-center"
      >
        {title}
      </animated.p>

      <div className="flex items-center">
        <animated.div
          ref={refLine}
          style={springLine}
          className="h-0.5 bg-[#6f4e37] rounded-full hidden lg:block"
        />
        <animated.div
          ref={refAdaptiveLine}
          style={springAdaptiveLine}
          className="h-0.5 bg-[#6f4e37] rounded-full lg:hidden"
        />
        <div className="w-1.5 h-1.5 bg-[#6f4e37] rounded-full" />
      </div>
    </div>
  );
};
