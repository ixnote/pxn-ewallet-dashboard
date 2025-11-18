"use client";

import { ArrowUpRight, Bike, Store, User } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const userBarData = [
  { month: "Jan", consumers: 23000, riders: 8000, vendors: 7000 },
  { month: "Feb", consumers: 24000, riders: 8500, vendors: 7500 },
  { month: "Mar", consumers: 23500, riders: 8200, vendors: 7300 },
  { month: "Apr", consumers: 23800, riders: 8100, vendors: 7200 },
  { month: "May", consumers: 24000, riders: 8000, vendors: 7100 },
  { month: "Jun", consumers: 24200, riders: 8400, vendors: 7200 },
  { month: "Jul", consumers: 24100, riders: 8600, vendors: 7400 },
  { month: "Aug", consumers: 24300, riders: 8800, vendors: 7600 },
  { month: "Sep", consumers: 24500, riders: 8500, vendors: 7700 },
  { month: "Oct", consumers: 24400, riders: 8400, vendors: 7800 },
  { month: "Nov", consumers: 24600, riders: 8300, vendors: 7900 },
  { month: "Dec", consumers: 24700, riders: 8200, vendors: 8000 },
];

type UserGraphProps = {
  dashboard?: boolean;
};

const UserGraph = ({ dashboard }: UserGraphProps) => {
  return (
    <>
      <div className="w-full flex flex-col gap-10">
        {/* Users */}
        <div className="bg-white rounded-lg p-4 w-full flex flex-col gap-8 shadow-lg">
          {/* top */}
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex justify-between items-center">
              {/* Top left */}
              <div className="flex flex-col items-start">
                <span className="text-brand-main text-sm">USERS</span>
                <span className="text-brand-ash text-sm">LAST 12 MONTHS</span>
              </div>

              {/* top right */}
              <div className="flex items-center gap-4">
                <span className="group border-1 border-brand-main rounded-lg px-4 cursor-pointer text-sm font-normal flex items-center text-brand-main gap-2 h-8 hover:bg-brand-main">
                  <span className="group-hover:text-brand-white">Filter</span>
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#115D8B] group-hover:fill-brand-white"
                  >
                    <path d="M0.299805 9.9498V8.2998H5.7998V9.9498H0.299805ZM0.299805 5.8248V4.1748H10.1998V5.8248H0.299805ZM0.299805 1.6998V0.0498047H15.6998V1.6998H0.299805Z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* sub-top */}
            <div className="flex items-end justify-between">
              {dashboard ? (
                <>
                  <div className="flex items-center gap-4">
                    <span className="text-brand-dark text-xl font-bold">
                      N9.2M
                    </span>
                    <span className="flex gap-1 items-center text-xs bg-green-200 text-green-600 px-2">
                      28.4%
                      <ArrowUpRight />
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full flex gap-8 items-center">
                    <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-main text-brand-main">
                      <span>27.6k</span>
                      <span>Total Users</span>
                    </span>
                    <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                      <span>3.2k</span>
                      <span>Active Users</span>
                    </span>
                    <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                      <span>1.2k</span>
                      <span>Suspended Users</span>
                    </span>
                    <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                      <span>1.7k</span>
                      <span>Banned Users</span>
                    </span>
                    <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                      <span>1.7k</span>
                      <span>New Users</span>
                    </span>
                  </div>
                </>
              )}

              <div className="flex gap-6 items-center justify-end text-sm w-full">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#14467B] rounded-full"></span>{" "}
                  <span className="text-brand-ash flex items-end gap-2">
                    Consumers <User />
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#F5A300] rounded-sm"></span>{" "}
                  <span className="text-brand-ash flex items-end gap-2">
                    Riders <Bike />
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#00BFF3] rounded-sm"></span>{" "}
                  <span className="text-brand-ash flex items-end gap-2">
                    Vendors <Store />
                  </span>
                </span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userBarData} barCategoryGap="20%">
              <XAxis
                dataKey="month"
                tick={{ fill: "#8b909a" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
                tick={{ fill: "#8b909a" }}
              />
              <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
              <Bar
                dataKey="consumers"
                fill="#14467B"
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="riders"
                fill="#F5A300"
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="vendors"
                fill="#00BFF3"
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default UserGraph;
