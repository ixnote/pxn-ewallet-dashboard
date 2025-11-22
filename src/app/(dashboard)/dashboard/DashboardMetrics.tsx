"use client";

import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingBag,
  DollarSign,
  Wallet,
} from "lucide-react";
import React from "react";
import { useDashboardMetrics } from "@/hooks/useDashboard";
import Spinner from "@/components/spinner/Spinner";

const DashboardMetrics = () => {
  const { data: metricsData, isLoading, error } = useDashboardMetrics();

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="w-full flex gap-8 items-center justify-evenly">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-[25%] rounded-lg p-4 flex flex-col gap-4 items-start bg-brand-white shadow-lg"
          >
            <div className="w-full h-20 flex items-center justify-center">
              <Spinner />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !metricsData?.results) {
    return (
      <div className="w-full flex gap-8 items-center justify-evenly">
        <div className="w-full rounded-lg p-4 bg-red-50 border border-red-200 text-red-600 text-center">
          Failed to load metrics. Please try again.
        </div>
      </div>
    );
  }

  const metrics = metricsData.results;
  const isPositiveIncrease = (value: number) => value >= 0;

  return (
    <div className="w-full flex gap-8 items-center justify-evenly">
      {/* Total Users */}
      <span className="w-[25%] rounded-lg p-4 flex flex-col gap-4 items-start bg-brand-white shadow-lg">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-brand-main" />
          <span className="text-brand-main text-sm font-medium">
            Total Users
          </span>
        </div>
        <span className="flex flex-col gap-2">
          <span className="text-brand-dark text-xl font-bold">
            {formatNumber(metrics.users.totalUsers)}
          </span>
          <span className="flex items-center gap-2">
            <span
              className={`flex gap-1 items-center text-xs px-2 py-1 rounded ${
                isPositiveIncrease(metrics.users.percentageIncrease)
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600"
              }`}
            >
              {formatPercentage(metrics.users.percentageIncrease)}
              {isPositiveIncrease(metrics.users.percentageIncrease) ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
            </span>
            <span className="text-brand-ash text-xs">
              {metrics.users.newUsers} new users
            </span>
          </span>
        </span>
      </span>

      {/* Total Orders */}
      <span className="w-[25%] rounded-lg p-4 flex flex-col gap-4 items-start bg-brand-white shadow-lg">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-brand-main" />
          <span className="text-brand-main text-sm font-medium">
            Total Orders
          </span>
        </div>
        <span className="flex flex-col gap-2">
          <span className="text-brand-dark text-xl font-bold">
            {formatNumber(metrics.orders.totalOrders)}
          </span>
          <span className="flex items-center gap-2">
            <span
              className={`flex gap-1 items-center text-xs px-2 py-1 rounded ${
                isPositiveIncrease(metrics.orders.percentageIncrease)
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600"
              }`}
            >
              {formatPercentage(metrics.orders.percentageIncrease)}
              {isPositiveIncrease(metrics.orders.percentageIncrease) ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
            </span>
            <span className="text-brand-ash text-xs">
              {metrics.orders.newOrders} new orders
            </span>
          </span>
        </span>
      </span>

      {/* Total Revenue */}
      <span className="w-[25%] rounded-lg p-4 flex flex-col gap-4 items-start bg-brand-white shadow-lg">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-brand-main" />
          <span className="text-brand-main text-sm font-medium">
            Total Revenue
          </span>
        </div>
        <span className="flex flex-col gap-2">
          <span className="text-brand-dark text-xl font-bold">
            {formatCurrency(metrics.totalRevenue)}
          </span>
          <span className="text-brand-ash text-xs">All-time revenue</span>
        </span>
      </span>

      {/* Total Wallet Balance */}
      <span className="w-[25%] rounded-lg p-4 flex flex-col gap-4 items-start bg-brand-white shadow-lg">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-brand-main" />
          <span className="text-brand-main text-sm font-medium">
            Wallet Balance
          </span>
        </div>
        <span className="flex flex-col gap-2">
          <span className="text-brand-dark text-xl font-bold">
            {formatCurrency(metrics.totalWalletBalance)}
          </span>
          <span className="text-brand-ash text-xs">Total wallet balance</span>
        </span>
      </span>
    </div>
  );
};

export default DashboardMetrics;
