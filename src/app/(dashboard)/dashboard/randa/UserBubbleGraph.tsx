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

const users = [
  { name: "Consumers", value: 39500, fill: "#0F5D8C" },
  { name: "Vendors", value: 11200, fill: "#00CFFF" },
  { name: "Riders", value: 3400, fill: "#E19800" },
];

// Normalize radius
const minRadius = 60;
const maxRadius = 110;
// const minRadius = 40;
// const maxRadius = 90;
const maxValue = Math.max(...users.map((u) => u.value));
const scaled = users.map((user) => {
  const radius = (user.value / maxValue) * (maxRadius - minRadius) + minRadius;
  return { ...user, radius };
});

// Clustered layout: slightly overlapping or tightly packed
const clusteredData = [
  { ...scaled[0], x: 3.5, y: 12.5, z: scaled[0].radius }, // Center bubble // dark blue
  { ...scaled[1], x: 6.5, y: 10, z: scaled[1].radius }, // Right bubble  // light blue
  { ...scaled[2], x: 4.5, y: 6.5, z: scaled[2].radius }, // Left bubble  // orange
];
// const clusteredData = [
//   { ...scaled[0], x: 100, y: 100, z: scaled[0].radius }, // Center bubble
//   { ...scaled[1], x: 150, y: 130, z: scaled[1].radius }, // Right bubble
//   { ...scaled[2], x: 70, y: 150, z: scaled[2].radius }, // Left bubble
// ];

export default function BubbleClusterChart() {
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
              shape={({ cx, cy, z: r, payload }) => (
                <g>
                  <circle cx={cx} cy={cy} r={r} fill={payload.fill} />
                  <text
                    x={cx}
                    y={cy - 6}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={12}
                  >
                    {payload.name}
                  </text>
                  <text
                    x={cx}
                    y={cy + 12}
                    textAnchor="middle"
                    fill="#fff"
                    fontWeight="bold"
                    fontSize={16}
                  >
                    {(payload.value / 1000).toFixed(1)}k
                  </text>
                </g>
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
