import { Header } from "@/components/header/header";
import { MobileHeader } from "@/mobile/header/header-mobile";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="">
      <div className="lg:max-w-[1300px] lg:mx-auto">
        <div className="lg:block hidden">
          <Header absolute />
        </div>

        <div className="block lg:hidden">
          <MobileHeader />
        </div>
      </div>

      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
