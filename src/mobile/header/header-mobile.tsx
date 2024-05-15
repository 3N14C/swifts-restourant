"use client";

import { Navbar } from "@/components/header/navbar";
import { Tools } from "@/components/header/tools";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useSpring, animated } from "@react-spring/web";
import { Menu, X } from "lucide-react";
import { FC, useState } from "react";

interface IProps {}

export const MobileHeader: FC<IProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [spring, api] = useSpring(
    () => ({
      from: { opacity: 0, x: -100 },
    }),
    [open]
  );
  const [springBg, apiBg] = useSpring(
    () => ({
      from: { opacity: 0, background: "transparent" },
    }),
    [open]
  );

  const handleOpen = () => {
    api.start({ to: { opacity: 1, x: 0 } });
    apiBg.start({ to: { opacity: 100, background: "rgba(0, 0, 0, 0.5)" } });
    setOpen(true);
  };

  const handleClose = () => {
    api.start({
      to: { opacity: 0, x: -100 },
      onRest: () => setOpen(false),
    });
    apiBg.start({ to: { opacity: 0, background: "transparent" } });
  };

  return (
    <div className="relative">
      <animated.div
        style={springBg}
        className={cn("", {
          "inset-0 z-50": open,
        })}
      />
      <div className="flex items-center justify-between absolute w-full z-50 text-white p-4">
        <div className="">
          <Menu onClick={handleOpen} />

          {open && (
            <animated.div
              style={spring}
              className="bg-white w-[70%] fixed top-0 h-screen left-0 z-50"
            >
              <div className="text-black px-4 py-5">
                <X className="text-[#8b705e]" onClick={handleClose} />

                <div className="max-w-fit mt-5">
                  <Navbar />
                </div>
              </div>
            </animated.div>
          )}
        </div>

        <Logo />

        <Tools />
      </div>
    </div>
  );
};
