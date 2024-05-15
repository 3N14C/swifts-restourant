import { Reservation } from "@/app/_components/reservation";
import { PageBanner } from "@/components/ui/page-banner/page-banner";
import { NextPage } from "next";
import { UpcomingEvents } from "./_components/upcoming-events/upcoming-events";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <PageBanner
        pageTitle="Бронирование"
        bottomText="Забронируйте столик в один клик и закажите блюда"
      />

      <div className="lg:max-w-[1300px] lg:mx-auto mt-40">
        <Reservation />

        <div className="mt-40">
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default Page;
