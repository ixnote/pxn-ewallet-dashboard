"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", income: 5000, profit: 10000 },
  { month: "Feb", income: 8000, profit: 12000 },
  { month: "Mar", income: 10005, profit: 75435 },
  { month: "Apr", income: 15000, profit: 20000 },
  { month: "May", income: 20000, profit: 22000 },
  { month: "Jun", income: 15000, profit: 21000 },
  { month: "Jul", income: 25000, profit: 29000 },
  { month: "Aug", income: 36000, profit: 34000 },
  { month: "Sep", income: 40000, profit: 28000 },
  { month: "Oct", income: 44000, profit: 21000 },
  { month: "Nov", income: 47000, profit: 23000 },
  { month: "Dec", income: 50000, profit: 25000 },
];

const RevenueGraph = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-10">
        {/* Revenue */}
        <div className="bg-brand-white rounded-lg p-4 flex flex-col gap-4 shadow-lg">
          {/* top */}
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex justify-between items-center">
              {/* Top left */}
              <div className="flex flex-col items-start">
                <span className="text-brand-main text-sm">REVENUE</span>
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
              <div className="w-full flex gap-8 items-center">
                <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-main text-brand-main">
                  <span>27.6k</span>
                  <span>Total Transactions</span>
                </span>
                <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                  <span>3.2k</span>
                  <span>Completed</span>
                </span>
                <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                  <span>1.2k</span>
                  <span>Profit</span>
                </span>
                <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                  <span>1.7k</span>
                  <span>Failed</span>
                </span>
              </div>
              <div className="flex gap-6 items-center justify-end text-sm w-full">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#E69600]/70 rounded-full"></span>
                  <span className="text-brand-ash">Income</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#00C2FF]/70 rounded-full"></span>
                  <span className="text-brand-ash">Profit</span>
                </span>
              </div>
            </div>
          </div>

          {/* top Chart */}
          <div className="w-full h-80 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E69600" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#E69600" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00C2FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8b909a" }}
                />
                <YAxis
                  tickFormatter={(value) => `${value / 1000}k`}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8b909a" }}
                />
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Tooltip />
                {/* <Legend /> */}
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#E69600"
                  fillOpacity={0.3}
                  fill="url(#colorIncome)"
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#00C2FF"
                  fillOpacity={0.3}
                  fill="url(#colorProfit)"
                  name="Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevenueGraph;
