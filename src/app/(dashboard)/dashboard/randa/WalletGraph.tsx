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

const walletData = [
  { month: "Jan", income: 7200, profit: 3200 },
  { month: "Feb", income: 8900, profit: 4300 },
  { month: "Mar", income: 11350, profit: 5700 },
  { month: "Apr", income: 9800, profit: 6100 },
  { month: "May", income: 14500, profit: 7600 },
  { month: "Jun", income: 16300, profit: 8700 },
  { month: "Jul", income: 19800, profit: 9400 },
  { month: "Aug", income: 22000, profit: 10200 },
  { month: "Sep", income: 24300, profit: 12000 },
  { month: "Oct", income: 28000, profit: 13500 },
  { month: "Nov", income: 30000, profit: 14800 },
  { month: "Dec", income: 32700, profit: 16000 },
];

type WalletGraphProps = {
  dashboard?: boolean;
};

const WalletGraph = ({ dashboard }: WalletGraphProps) => {
  return (
    <>
      <div className="w-full flex flex-col gap-10">
        {/* Wallet */}
        <div className="bg-brand-white rounded-lg p-4 flex flex-col gap-4 shadow-lg">
          {/* bottom */}
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex justify-between items-center">
              {/* Top left */}
              <div className="flex flex-col items-start">
                <span className="text-brand-main text-sm">
                  WALLET TRANSACTION
                </span>
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
                  <span className="text-brand-ash">In-Wallet Transactions</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#00C2FF]/70 rounded-full"></span>
                  <span className="text-brand-ash">
                    Cross-Wallet Transactions
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Chart */}
          {dashboard ? (
            <>
              <div className="w-full h-80 mt-4 flex items-center gap-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={walletData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorIncome"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#E69600"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#E69600"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorProfit"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#00C2FF"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#00C2FF"
                          stopOpacity={0}
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
                      name="In-Wallet Transactions"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke="#00C2FF"
                      fillOpacity={0.3}
                      fill="url(#colorProfit)"
                      name="Cross-Wallet Transactions"
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
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={walletData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorIncome"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#E69600"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#E69600"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorProfit"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#00C2FF"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#00C2FF"
                          stopOpacity={0}
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
                      name="In-Wallet Transactions"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke="#00C2FF"
                      fillOpacity={0.3}
                      fill="url(#colorProfit)"
                      name="Cross-Wallet Transactions"
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

export default WalletGraph;
