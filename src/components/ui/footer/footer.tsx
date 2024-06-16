"use client";

import { openHours } from "@/lib/open-hours";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { FC } from "react";
import { Logo } from "../logo";
import { Title } from "../title";
import { SocialCard } from "./social-card";

const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const MobileFooter: FC = () => {
  return (
    <div className="bg-[url('/img/footer-bg.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="">
        <div className="px-5 py-3 flex flex-col items-start gap-5">
          <Logo textColor="text-white" />

          {/* <p className="text-white/50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A officia,
            perferendis et quam cum doloribus cumque eligendi culpa debitis
            nostrum ipsa consequuntur quidem ad quod repellat cupiditate. Et,
            hic magnam.
          </p> */}

          <div className="h-[1px] w-full bg-white/50" />

          <div className="flex flex-col">
            <SocialCard
              color="white"
              size={20}
              icon="MapPin"
              text={"г. Москва, ул. Ленина, 1"}
            />
            <SocialCard
              color="white"
              size={20}
              icon="Phone"
              text={["(617)-276", "(502)-102"]}
            />
            <SocialCard
              color="white"
              size={20}
              icon="Mail"
              text="example@mail.ru"
            />
          </div>
        </div>

        <div className="relative text-white">
          <Image
            src={"/img/ft-res-bg.jpg"}
            width={500}
            height={500}
            alt=""
            className=""
          />

          <div className="absolute top-2 w-full px-6">
            <div className="flex flex-col items-center justify-center border-2 border-white p-10">
              <Title title="открытие ресторана" titleSize="lg:text-4xl" />

              <div className="w-full flex flex-col gap-5 mt-5">
                {openHours.map((day) => (
                  <div
                    key={day.id}
                    className="flex items-center justify-between"
                  >
                    <p className="text-lg font-semibold">{day.name}</p>
                    <p className="text-lg text-black">{day.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Footer: FC = () => {
  return (
    <div className="">
      <div className="bg-[url('/img/footer-bg.jpg')] hidden lg:block">
        <div className="lg:max-w-[1300px] lg:mx-auto py-20 text-white flex items-start justify-between w-full">
          <div className="lg:max-w-[800px] flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <Logo />
              {/* <div className="">Social Media</div> */}
            </div>

            {/* <p className="text-white/50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              officia, perferendis et quam cum doloribus cumque eligendi culpa
              debitis nostrum ipsa consequuntur quidem ad quod repellat
              cupiditate. Et, hic magnam.
            </p> */}

            <div className="h-[1px] w-full bg-white/50" />

            <div className="flex items-center gap-20">
              <SocialCard icon="MapPin" text={"г. Москва, ул. Ленина, 1"} />
              <SocialCard icon="Phone" text={["(617)-276", "(502)-102"]} />
              <SocialCard icon="Mail" text="example@mail.ru" />
            </div>
          </div>

          <div className="relative -top-32">
            <Image
              src={"/img/ft-res-bg.jpg"}
              alt="logo"
              width={1000}
              height={1000}
              className="w-[400px] h-[700px] object-cover"
            />

            <div className="absolute top-2 w-full px-6">
              <div className="flex flex-col items-center justify-center border-2 border-white p-10">
                <Title title="открытие ресторана" titleSize="lg:text-4xl" />

                <div className="w-full flex flex-col gap-5 mt-5">
                  {openHours.map((day) => (
                    <div
                      key={day.id}
                      className="flex items-center justify-between"
                    >
                      <p className="text-lg font-semibold">{day.name}</p>
                      <p className="text-lg text-black">{day.time}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <Title
                    title="свяжитесь с нами"
                    titleSize="lg:text-4xl mt-10"
                  />
                  <p
                    className={cn(
                      "text-black font-bold text-4xl",
                      roboto.className
                    )}
                  >
                    (617)-276
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden block">
        <MobileFooter />
      </div>
    </div>
  );
};
