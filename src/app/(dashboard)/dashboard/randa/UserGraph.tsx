"use client";

import { ArrowUpRight, Bike, Store, User } from "lucide-react";
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUsers, useUserStatistics } from "@/hooks/useUsers";
import Spinner from "@/components/spinner/Spinner";

type UserGraphProps = {
  dashboard?: boolean;
};

const UserGraph = ({ dashboard }: UserGraphProps) => {
  // Fetch all users with a large page size to get historical data
  const { data: usersData, isLoading: usersLoading } = useUsers({
    role: "",
    page: 1,
    pageSize: 1000, // Fetch a large number to get enough data for the chart
    search: "",
    status: "",
    createdAtStart: "",
    id: "",
  });

  // Fetch user statistics for totals
  const { data: userStats } = useUserStatistics();

  // Process users data to group by month and role
  const userBarData = useMemo(() => {
    if (!usersData?.data?.users) {
      return [];
    }

    const users = usersData.data.users;
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize data structure for last 12 months
    const now = new Date();
    const last12Months: {
      month: string;
      consumers: number;
      riders: number;
      vendors: number;
    }[] = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last12Months.push({
        month: monthNames[date.getMonth()],
        consumers: 0,
        riders: 0,
        vendors: 0,
      });
    }

    // Group users by month and role
    users.forEach((user) => {
      if (!user.createdAt) return;

      const userDate = new Date(user.createdAt);
      const monthIndex = userDate.getMonth();
      const year = userDate.getFullYear();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();

      // Only include users from the last 12 months
      const monthsAgo = (currentYear - year) * 12 + (currentMonth - monthIndex);
      if (monthsAgo < 0 || monthsAgo > 11) return;

      const dataIndex = 11 - monthsAgo;
      if (dataIndex < 0 || dataIndex >= last12Months.length) return;

      // Determine user role
      if (user.roles.includes("storeOwner")) {
        last12Months[dataIndex].vendors++;
      } else if (user.roles.includes("rider")) {
        last12Months[dataIndex].riders++;
      } else if (user.roles.includes("customer")) {
        last12Months[dataIndex].consumers++;
      }
    });

    // Calculate cumulative totals (users created up to that month)
    const cumulativeData: typeof last12Months = [];
    last12Months.forEach((month, index) => {
      const prevMonth = index > 0 ? cumulativeData[index - 1] : null;
      cumulativeData.push({
        month: month.month,
        consumers: (prevMonth?.consumers || 0) + month.consumers,
        riders: (prevMonth?.riders || 0) + month.riders,
        vendors: (prevMonth?.vendors || 0) + month.vendors,
      });
    });

    return cumulativeData;
  }, [usersData]);

  if (usersLoading) {
    return (
      <div className="w-full flex flex-col gap-10">
        <div className="bg-white rounded-lg p-4 w-full flex flex-col gap-8 shadow-lg">
          <div className="flex items-center justify-center h-[300px]">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
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
                      {userStats?.data?.totalUsers?.toLocaleString() || 0}
                    </span>
                    <span className="flex gap-1 items-center text-xs bg-green-200 text-green-600 px-2">
                      {userStats?.data?.newUsers || 0} new
                      <ArrowUpRight />
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full flex gap-8 items-center">
                    <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-main text-brand-main">
                      <span>
                        {userStats?.data?.totalUsers
                          ? userStats.data.totalUsers >= 1000
                            ? `${(userStats.data.totalUsers / 1000).toFixed(
                                1
                              )}k`
                            : userStats.data.totalUsers
                          : 0}
                      </span>
                      <span>Total Users</span>
                    </span>
                    <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                      <span>
                        {userStats?.data?.activeUsers
                          ? userStats.data.activeUsers >= 1000
                            ? `${(userStats.data.activeUsers / 1000).toFixed(
                                1
                              )}k`
                            : userStats.data.activeUsers
                          : 0}
                      </span>
                      <span>Active Users</span>
                    </span>
                    <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                      <span>
                        {userStats?.data?.suspendedUsers
                          ? userStats.data.suspendedUsers >= 1000
                            ? `${(userStats.data.suspendedUsers / 1000).toFixed(
                                1
                              )}k`
                            : userStats.data.suspendedUsers
                          : 0}
                      </span>
                      <span>Suspended Users</span>
                    </span>
                    <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                      <span>
                        {userStats?.data?.bannedUsers
                          ? userStats.data.bannedUsers >= 1000
                            ? `${(userStats.data.bannedUsers / 1000).toFixed(
                                1
                              )}k`
                            : userStats.data.bannedUsers
                          : 0}
                      </span>
                      <span>Banned Users</span>
                    </span>
                    <span className="transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer border-brand-ash/80 text-brand-ash/80 hover:text-brand-main">
                      <span>
                        {userStats?.data?.newUsers
                          ? userStats.data.newUsers >= 1000
                            ? `${(userStats.data.newUsers / 1000).toFixed(1)}k`
                            : userStats.data.newUsers
                          : 0}
                      </span>
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
            <BarChart
              data={
                userBarData.length > 0
                  ? userBarData
                  : [{ month: "No data", consumers: 0, riders: 0, vendors: 0 }]
              }
              barCategoryGap="20%"
            >
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
