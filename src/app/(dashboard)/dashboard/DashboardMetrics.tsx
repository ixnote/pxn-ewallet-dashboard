import { ArrowUpRight } from "lucide-react";
import React from "react";

const DashboardMetrics = () => {
  return (
    <div className="w-full flex gap-8 items-center justify-evenly">
      <span className="w-[25%] rounded-lg p-4 flex flex-col gap-4 items-start bg-brand-white shadow-lg">
        <span className="text-brand-main text-sm">Total Users</span>
        <span className="flex flex-col gap-2">
          <span className="text-brand-dark text-xl font-bold">15.3k</span>
          <span className="flex items-center gap-2">
            <span className="flex gap-1 items-center text-xs bg-green-200 text-green-600 px-2">
              28.4%
              <ArrowUpRight />
            </span>
            <span className="text-brand-ash text-sm">vs last 30 days</span>
          </span>
        </span>
      </span>
      <span className="w-[25%] rounded-lg p-4 flex flex-col gap-4 items-start bg-brand-white shadow-lg">
        <span className="text-brand-main text-sm">Total Users</span>
        <span className="flex flex-col gap-2">
          <span className="text-brand-dark text-xl font-bold">15.3k</span>
          <span className="flex items-center gap-2">
            <span className="flex gap-1 items-center text-xs bg-green-200 text-green-600 px-2">
              28.4%
              <ArrowUpRight />
            </span>
            <span className="text-brand-ash text-sm">vs last 30 days</span>
          </span>
        </span>
      </span>
      <span className="w-[25%] rounded-lg p-4 flex flex-col gap-4 items-start bg-brand-white shadow-lg">
        <span className="text-brand-main text-sm">Total Users</span>
        <span className="flex flex-col gap-2">
          <span className="text-brand-dark text-xl font-bold">15.3k</span>
          <span className="flex items-center gap-2">
            <span className="flex gap-1 items-center text-xs bg-green-200 text-green-600 px-2">
              28.4%
              <ArrowUpRight />
            </span>
            <span className="text-brand-ash text-sm">vs last 30 days</span>
          </span>
        </span>
      </span>
      <span className="w-[25%] rounded-lg p-4 flex flex-col gap-4 items-start bg-brand-white shadow-lg">
        <span className="text-brand-main text-sm">Total Users</span>
        <span className="flex flex-col gap-2">
          <span className="text-brand-dark text-xl font-bold">15.3k</span>
          <span className="flex items-center gap-2">
            <span className="flex gap-1 items-center text-xs bg-green-200 text-green-600 px-2">
              28.4%
              <ArrowUpRight />
            </span>
            <span className="text-brand-ash text-sm">vs last 30 days</span>
          </span>
        </span>
      </span>
    </div>
  );
};

export default DashboardMetrics;
