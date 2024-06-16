"use client";

import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import Image from "next/image";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalTableMap: FC<IProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Карта столиков</DialogTitle>
          <DialogDescription>
            Здесь можно посмотреть расположение столиков
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <Image
            src={"/img/table-map.png"}
            alt="карта столиков"
            width={1000}
            height={1000}
            className="rounded-md"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
