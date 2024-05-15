"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewTransitions } from "next-view-transitions";
import { FC } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

interface IProps {
  children: React.ReactNode;
}

export const Providers: FC<IProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <ViewTransitions>
          <ParallaxProvider>{children}</ParallaxProvider>
        </ViewTransitions>
      </QueryClientProvider>
      <Toaster />
    </div>
  );
};
