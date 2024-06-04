import { Title } from "@/components/ui/title";
import { NextPage } from "next";
import { ProductsList } from "./_components/products-list";
import { CategoriesList } from "./_components/categories-list";
import { TablesList } from "./_components/tables-list";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="lg:max-w-[1300px] lg:mx-auto">
      <div className="mt-10 flex flex-col gap-10">
        <div className="">
          <Title title="Список категорий" />
          <CategoriesList />
        </div>

        <div className="">
          <Title title="Список блюд" />
          <div className="mt-5">
            <ProductsList />
          </div>
        </div>

        <div className="">
          <Title title="Список столиков" />
          <div className="mt-5">
            <TablesList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
