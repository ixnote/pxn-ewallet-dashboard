"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
} from "recharts";
import { useUserStatistics } from "@/hooks/useUsers";
import Spinner from "@/components/spinner/Spinner";

// Normalize radius
const minRadius = 60;
const maxRadius = 110;

export default function BubbleClusterChart() {
  // Fetch statistics for each role
  const { data: customerStats, isLoading: customerLoading } =
    useUserStatistics("customer");
  const { data: riderStats, isLoading: riderLoading } =
    useUserStatistics("rider");
  const { data: vendorStats, isLoading: vendorLoading } =
    useUserStatistics("storeOwner");

  const isLoading = customerLoading || riderLoading || vendorLoading;

  // Extract total users for each role
  const users = [
    {
      name: "Consumers",
      value: customerStats?.data?.totalUsers || 0,
      fill: "#0F5D8C",
    },
    {
      name: "Vendors",
      value: vendorStats?.data?.totalUsers || 0,
      fill: "#00CFFF",
    },
    {
      name: "Riders",
      value: riderStats?.data?.totalUsers || 0,
      fill: "#E19800",
    },
  ];

  // Filter out users with 0 value and ensure we have at least some data
  const validUsers = users.filter((u) => u.value > 0);

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-4 w-full flex flex-col gap-8 shadow-lg">
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col items-start">
              <span className="text-brand-main text-sm">USERS</span>
              <span className="text-brand-ash text-sm">LAST 12 MONTHS</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-[350px]">
          <Spinner />
        </div>
      </div>
    );
  }

  // Normalize radius based on max value
  const maxValue = Math.max(...validUsers.map((u) => u.value));
  const scaled = validUsers.map((user) => {
    const radius =
      (user.value / maxValue) * (maxRadius - minRadius) + minRadius;
    return { ...user, radius };
  });

  // Clustered layout: slightly overlapping or tightly packed
  const clusteredData = scaled.map((user, index) => {
    // Position bubbles in a triangular pattern
    const positions = [
      { x: 3.5, y: 12.5 }, // Center
      { x: 6.5, y: 10 }, // Right
      { x: 4.5, y: 6.5 }, // Left
    ];
    return {
      ...user,
      x: positions[index % positions.length].x,
      y: positions[index % positions.length].y,
      z: user.radius,
    };
  });
  return (
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
      </div>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart>
            <XAxis type="number" dataKey="x" hide />
            <YAxis type="number" dataKey="y" hide />
            <ZAxis type="number" dataKey="z" range={[minRadius, maxRadius]} />
            <Tooltip />
            <Scatter
              data={clusteredData}
              shape={(props: {
                cx?: number;
                cy?: number;
                z?: number;
                payload?: { fill?: string; name?: string; value?: number };
              }) => {
                const {
                  cx = 0,
                  cy = 0,
                  z: r = 0,
                  payload: payloadData,
                } = props;
                return (
                  <g>
                    <circle cx={cx} cy={cy} r={r} fill={payloadData?.fill} />
                    <text
                      x={cx}
                      y={cy - 6}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={12}
                    >
                      {payloadData?.name}
                    </text>
                    <text
                      x={cx}
                      y={cy + 12}
                      textAnchor="middle"
                      fill="#fff"
                      fontWeight="bold"
                      fontSize={16}
                    >
                      {payloadData?.value && payloadData.value >= 1000
                        ? `${(payloadData.value / 1000).toFixed(1)}k`
                        : payloadData?.value}
                    </text>
                  </g>
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
