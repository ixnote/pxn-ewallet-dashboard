"use client";

import React from "react";
import WalletGraph from "./WalletGraph";
import UserGraph from "./UserGraph";

const page = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-10 pb-8">
        {/* Revenue */}
        {/* <RevenueGraph /> */}

        {/* Wallet */}
        <WalletGraph />

        {/* Users */}
        <UserGraph />

        {/* Orders */}
        {/* <OrderGraph /> */}
      </div>
    </>
  );
};

export default page;
