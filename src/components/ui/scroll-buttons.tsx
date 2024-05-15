"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC } from "react";

interface IProps {
  items?: any[];
}

export const ScrollButtons: FC<IProps> = ({ items }) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));

  const handlePageUp = () => {
    if (items && page < items?.length - 1) {
      setPage((page) => page + 1);
    }
  };

  const handlePageDown = () => {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  };

  return (
    <div className="flex items-center gap-5 select-none">
      <button
        className={cn(
          "text-white/50 border-white/50 hover:text-white hover:border-white border rounded-full p-2 text-center transition-all duration-300",
          {
            "cursor-default hover:border-white/50 hover:text-white/50":
              page === 0,
          }
        )}
      >
        <ChevronDown onClick={handlePageDown} />
      </button>

      <button
        className={cn(
          "text-white/50 border-white/50 hover:text-white hover:border-white border rounded-full p-2 text-center transition-all duration-300",
          {
            "cursor-default hover:border-white/50 hover:text-white/50":
              items && page === items?.length - 1,
          }
        )}
      >
        <ChevronUp onClick={handlePageUp} />
      </button>
    </div>
  );
};
