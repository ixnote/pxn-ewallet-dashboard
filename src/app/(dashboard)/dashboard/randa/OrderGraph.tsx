"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const orderData = [
  { month: "Jan", total: 0 },
  { month: "Feb", total: 18000 },
  { month: "Mar", total: 12000 },
  { month: "Apr", total: 30000 },
  { month: "May", total: 45000 },
  { month: "Jun", total: 46000 },
  { month: "Jul", total: 48000 },
  { month: "Aug", total: 32000 },
  { month: "Sep", total: 25000 },
  { month: "Oct", total: 31000 },
  { month: "Nov", total: 37000 },
  { month: "Dec", total: 27000 },
];

type OrderGraphProps = {
  dashboard?: boolean;
};

const OrderGraph = ({ dashboard }: OrderGraphProps) => {
  return (
    <>
      <div className="w-full flex flex-col gap-10">
        {/* Orders */}
        <div className="bg-white rounded-lg p-4 w-full flex flex-col gap-8 shadow-lg">
          {/* top */}
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex justify-between items-center">
              {/* Top left */}
              <div className="flex flex-col items-start">
                <span className="text-brand-main text-sm">ORDERS</span>
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
            <div
              className={`flex items-end justify-between ${
                dashboard && "w-[65%]"
              }`}
            >
              <div className="w-full flex gap-8 items-center">
                <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-main text-brand-main">
                  <span>27.6k</span>
                  <span>Total Orders</span>
                </span>
                <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                  <span>3.2k</span>
                  <span>Confirmed Orders</span>
                </span>
                <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                  <span>1.2k</span>
                  <span>Processing Orders</span>
                </span>
                <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                  <span>1.7k</span>
                  <span>Pending Orders</span>
                </span>
                <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                  <span>3.4k</span>
                  <span>Canceled Orders</span>
                </span>
              </div>
              <div
                className={`${
                  dashboard ? "hidden" : "flex"
                } gap-6 items-center justify-end text-sm w-full`}
              >
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

          {dashboard ? (
            <>
              <div className="w-full h-80 mt-4 flex items-center gap-2">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={orderData}>
                    <defs>
                      <linearGradient
                        id="colorOrders"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#F5A300"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="#F5A300"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8b909a" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value / 1000}k`}
                      tick={{ fill: "#8b909a" }}
                    />
                    <Tooltip
                      formatter={(value) => `${value.toLocaleString()}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#F5A300"
                      strokeWidth={2}
                      fill="url(#colorOrders)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="relative w-[45%] overflow-x-auto border-brand-ash/30 border-l-[0.3px] sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-sm font-normal text-brand-ash uppercase">
                      <tr className="border-b border-brand-ash/20">
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Percentage
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Trend
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                        <td className="px-6 py-4">Deposit</td>
                        <td className="px-6 py-4">35%</td>
                        <td className="px-6 py-4">N12,300</td>
                        <td className="px-6 py-4">
                          <TrendingUp className="text-green-400" />{" "}
                        </td>
                      </tr>
                      <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                        <td className="px-6 py-4">Deposit</td>
                        <td className="px-6 py-4">35%</td>
                        <td className="px-6 py-4">N12,300</td>
                        <td className="px-6 py-4">
                          <TrendingUp className="text-green-400" />{" "}
                        </td>
                      </tr>
                      <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                        <td className="px-6 py-4">Deposit</td>
                        <td className="px-6 py-4">35%</td>
                        <td className="px-6 py-4">N12,300</td>
                        <td className="px-6 py-4">
                          <TrendingUp className="text-green-400" />{" "}
                        </td>
                      </tr>
                      <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                        <td className="px-6 py-4">Deposit</td>
                        <td className="px-6 py-4">35%</td>
                        <td className="px-6 py-4">N12,300</td>
                        <td className="px-6 py-4">
                          <TrendingDown className="text-red-400" />{" "}
                        </td>
                      </tr>
                      <tr className="text-sm font-normal bg-brand-white">
                        <td className="px-6 py-4 text-brand-main uppercase">
                          Deposit
                        </td>
                        <td className="px-6 py-4 text-brand-main uppercase">
                          35%
                        </td>
                        <td className="px-6 py-4 text-brand-main uppercase">
                          N12,300
                        </td>
                        <td className="px-6 py-4 text-brand-main"> </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-80 mt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={orderData}>
                    <defs>
                      <linearGradient
                        id="colorOrders"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#F5A300"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="#F5A300"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8b909a" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value / 1000}k`}
                      tick={{ fill: "#8b909a" }}
                    />
                    <Tooltip
                      formatter={(value) => `${value.toLocaleString()}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#F5A300"
                      strokeWidth={2}
                      fill="url(#colorOrders)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderGraph;
