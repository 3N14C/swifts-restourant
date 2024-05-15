import { NextPage } from "next";
import { FormLoginPage } from "./_components/form-login-page";
import { PageBanner } from "@/components/ui/page-banner/page-banner";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="">
      <PageBanner pageTitle="Вход" bottomText="Вход в свою учетную запись" />
      <div className="lg:max-w-[1300px] lg:mx-auto mt-10">
        <FormLoginPage />
      </div>
    </div>
  );
};

export default Page;
