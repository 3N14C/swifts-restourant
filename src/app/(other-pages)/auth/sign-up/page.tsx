import { NextPage } from "next";
import { FormRegisterPage } from "./_components/form-register-page";
import { PageBanner } from "@/components/ui/page-banner/page-banner";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <PageBanner pageTitle="Регистрация" bottomText="Создать учетную запись" />

      <div className="lg:max-w-[1300px] lg:mx-auto mt-10">
        <FormRegisterPage />
      </div>
    </div>
  );
};

export default Page;
