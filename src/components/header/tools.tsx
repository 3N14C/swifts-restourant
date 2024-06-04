"use client";

import { logout } from "@/actions/auth/logout";
import { getCurrentUser } from "@/actions/user/currentUser";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { animated, useSpring } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import { Loader2, LogOut, ShoppingCart, User, UserCogIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

export const Tools: FC = () => {
  const pathname = usePathname();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user-session"],
    queryFn: async () => {
      const { user } = await getCurrentUser();
      return user;
    },
  });
  const [open, setOpen] = useState<boolean>(false);
  const [spring, api] = useSpring(
    () => ({
      from: { opacity: 0, y: -30 },
    }),
    [open]
  );

  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      api.start({
        to: { opacity: 1, y: 0 },
      });
    } else {
      api.start({
        to: { opacity: 0, y: -30 },
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : user ? (
        <div className="">
          <User onClick={handleOpen} className="cursor-pointer" />
        </div>
      ) : (
        <Button
          onClick={() => {}}
          variant={pathname === "/" ? "solid" : "border"}
          className=""
        >
          <Link href={"/auth/sign-in"}>Вход</Link>
        </Button>
      )}
      <div className="relative">
        <animated.div
          style={spring}
          className={cn(
            "absolute -z-40 bg-white/50 border border-zinc-300 rounded-lg w-[200px] h-[90px] right-1/4 top-5",
            {
              "z-50": open,
            }
          )}
        >
          <div className="flex flex-col gap-5">
            {user?.role === "ADMIN" && (
              <Link
                href={"/admin-page"}
                className="flex items-center gap-3 cursor-pointer z-60"
              >
                <UserCogIcon className="text-[#6f4e37]" />
                <p>Админ-панель</p>
              </Link>
            )}

            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={async () => await logout()}
            >
              <LogOut className="text-[#6f4e37]" />
              <p>Выход</p>
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};
