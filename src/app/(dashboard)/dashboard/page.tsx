import React from "react";
import WalletGraph from "./randa/WalletGraph";
import UserGraph from "./randa/UserGraph";
import UserBubbleGraph from "./randa/UserBubbleGraph";
import DashboardMetrics from "./DashboardMetrics";

const Dashboard = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-10 pb-8">
        {/* Metrics */}
        <DashboardMetrics />

        {/* Wallet */}
        <WalletGraph dashboard />

        <div className="flex items-start justify-between w-full gap-4">
          <div className="w-[40%]">
            <UserBubbleGraph />
          </div>
          {/* Users */}
          <UserGraph dashboard />
        </div>

        {/* Revenue */}
        {/* <RevenueGraph /> */}

        {/* Orders */}
        {/* <OrderGraph dashboard /> */}
      </div>
    </>
  );
};

export default Dashboard;
