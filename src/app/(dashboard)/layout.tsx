"use client";

import "@/app/globals.css";
import NavBar from "@/components/NavBar";
import SideNavBar from "@/components/SideNavBar";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full overflow-x-hidden">
        <SideNavBar />
        <div className="flex flex-col w-full relative h-screen bg-brand-ashbg overflow-y-scroll">
          <NavBar />
          <div className="w-full p-8 font-geist-sans text-brand-dark h-[calc(100vh-80px)]">
            {children}
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}
