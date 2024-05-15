import { MainBanner } from "@/components/ui/main-banner";
import { VideoIntroduce } from "@/components/ui/video-introduce";
import { NextPage } from "next";
import { DailySpecial } from "../_components/daily-special/daily-special";
import { OurMenu } from "../_components/our-menu/our-menu";
import { Reservation } from "../_components/reservation";
import { StatisticBanner } from "../_components/statistic-banner/statistic-banner";
import { validateRequest } from "@/auth";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  return (
    <div className="">
      <div className="lg:block hidden">
        <VideoIntroduce />
      </div>

      <div className="visible lg:hidden relative">
        <video
          src="/videos/restaurant-dishes-cut.mp4"
          autoPlay={true}
          loop={true}
          controls={false}
          muted={true}
          playsInline={true}
          className="w-screen h-screen object-cover -z-40"
        />

        <div className="absolute top-0 text-white w-full text-center">
          <MainBanner />
        </div>
      </div>

      <div className="mt-[400px] lg:max-w-[1300px] lg:mx-auto">
        <Reservation />
      </div>

      <div className="mt-40">
        <DailySpecial />
      </div>

      <div className="mt-40 lg:max-w-[1300px] lg:mx-auto ">
        <OurMenu />
      </div>

      <div className="mt-40 lg:max-w-[1300px] lg:mx-auto">
        <StatisticBanner />
      </div>
    </div>
  );
};

export default Page;
