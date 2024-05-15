"use client";

import { FC } from "react";
import { Parallax } from "react-scroll-parallax";
import { MainBanner } from "./main-banner";

export const VideoIntroduce: FC = () => {
  return (
    <Parallax speed={-20} scale={[1.2, 0.8]}>
      <div className="relative">
        <video
          src="/videos/restaurant-dishes-cut.mp4"
          autoPlay={true}
          loop={true}
          controls={false}
          muted={true}
          playsInline={true}
          className="w-screen h-screen object-cover -z-40"
        />

        <div className="absolute top-0 w-full z-20 text-white">
          <MainBanner />
        </div>
      </div>
    </Parallax>
  );
};