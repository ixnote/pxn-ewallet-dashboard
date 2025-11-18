"use client";
import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Bike, User, Store } from "lucide-react";
import Image from "next/image";
import user_image from "@/assets/images/user/user_avr.png";
import Customer from "./Customer";
import Rider from "./Rider";
import Vendor from "./Vendor";
import {
  useUser,
  useSuspendUser,
  useBanUser,
  useActivateUser,
} from "@/hooks/useUsers";
import Spinner from "@/components/spinner/Spinner";

const OneUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selected, setSelected] = useState("Customer");

  // Fetch user data
  const { data: userData, isLoading, error } = useUser(id || "");

  // Mutations for user actions
  const suspendUser = useSuspendUser();
  const banUser = useBanUser();
  const activateUser = useActivateUser();

  const toggleOptions = [
    { label: "Customer", icon: <User size={16} /> },
    { label: "Rider", icon: <Bike size={16} /> },
    { label: "Vendor", icon: <Store size={16} /> },
  ];

  const gotoUsers = () => {
    router.push(`/dashboard/users`);
  };

  // Action handlers
  const handleSuspend = () => {
    if (id) {
      suspendUser.mutate(id);
    }
  };

  const handleBan = () => {
    if (id) {
      banUser.mutate(id);
    }
  };

  const handleActivate = () => {
    if (id) {
      activateUser.mutate(id);
    }
  };

  // Utility functions
  const getUserRoleIcon = (roles: string[]) => {
    if (roles.includes("storeOwner"))
      return <Store className="text-brand-main" />;
    if (roles.includes("rider")) return <Bike className="text-brand-main" />;
    if (roles.includes("customer")) return <User className="text-brand-main" />;
    return <User className="text-brand-main" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return (
          <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600 text-base font-normal">
            Active
          </span>
        );
      case "suspended":
        return (
          <span className="px-2 py-1 rounded-xl bg-yellow-200 text-yellow-600 text-base font-normal">
            Suspended
          </span>
        );
      case "banned":
        return (
          <span className="px-2 py-1 rounded-xl bg-red-200 text-red-600 text-base font-normal">
            Banned
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-xl bg-gray-200 text-gray-600 text-base font-normal">
            Inactive
          </span>
        );
    }
  };

  const getKycStatus = (
    kycLevel: number,
    isBankVerified: boolean,
    isPhoneVerified: boolean
  ) => {
    if (kycLevel >= 2 && isBankVerified && isPhoneVerified) {
      return (
        <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600 text-base font-normal">
          Verified
        </span>
      );
    } else if (kycLevel >= 1) {
      return (
        <span className="px-2 py-1 rounded-xl bg-yellow-200 text-yellow-600 text-base font-normal">
          Pending
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded-xl bg-red-200 text-red-600 text-base font-normal">
          Not Started
        </span>
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  if (!id) {
    return <div>No user ID provided</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Error loading user: {error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-brand-main/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const user = userData?.data;

  return (
    <>
      <div className="grid gap-4 pb-8">
        {/* top */}
        <span
          className="group max-w-[103px] px-4 py-1 border border-[#D9D9D9] flex items-center gap-3 rounded-3xl cursor-pointer hover:bg-brand-ash/30"
          onClick={() => gotoUsers()}
        >
          <ArrowLeft className="text-xs text-[#8B909A] group-hover:text-brand-main" />
          <span className="text-sm text-[#8B909A] group-hover:text-brand-main">
            Users
          </span>
        </span>
        {/* mid */}
        <div className="bg-brand-graybg rounded-xl p-8 flex items-start justify-between gap-4">
          {/* mid left */}
          <div className="w-[38%] grid grid-cols-3 gap-4">
            <div className="col-span-1 flex items-center justify-center">
              <Image src={user_image} alt="avr" />
            </div>
            <div className="col-span-2 flex flex-col gap-3 items-start justify-start">
              <span className="text-lg font-semibold text-brand-dark">
                {user?.firstName} {user?.lastName}
              </span>
              <div className="w-full flex items-center justify-between gap-4">
                <span className="text-base font-normal text-brand-ash">
                  WALLET BALANCE
                </span>
                <span className="text-base font-normal text-brand-dark">
                  {formatCurrency(user?.walletBalance || 0)}
                </span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <span className="text-base font-normal text-brand-ash">
                  STATUS
                </span>
                {getStatusBadge(user?.status || "")}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-base font-normal text-brand-ash">
                  ACCOUNTS
                </span>
                <span className="flex items-center gap-2">
                  {user?.roles?.map((role) => getUserRoleIcon([role]))}
                </span>
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-base font-normal text-brand-ash">
                  KYC
                </span>
                {getKycStatus(
                  user?.kycLevel || 0,
                  user?.isBankVerified || false,
                  user?.isPhoneVerified || false
                )}
              </div>
            </div>
            <div className="col-span-3 flex items-center justify-between gap-6">
              <button
                onClick={handleSuspend}
                disabled={suspendUser.isPending}
                className="w-1/3 group border-1 border-brand-main rounded-lg px-4 py-2 cursor-pointer text-sm font-normal flex items-center justify-center text-brand-main gap-2 hover:bg-brand-main disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="group-hover:text-brand-white">
                  {suspendUser.isPending ? "Processing..." : "Suspend"}
                </span>
              </button>
              <button
                onClick={handleActivate}
                disabled={activateUser.isPending}
                className="w-1/3 group border-1 border-brand-main rounded-lg px-4 py-2 cursor-pointer text-sm font-normal flex items-center justify-center text-brand-main gap-2 hover:bg-brand-main disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="group-hover:text-brand-white">
                  {activateUser.isPending ? "Processing..." : "Activate"}
                </span>
              </button>
              <button
                onClick={handleBan}
                disabled={banUser.isPending}
                className="w-1/3 group border-1 border-brand-main rounded-lg px-4 py-2 cursor-pointer text-sm font-normal flex items-center justify-center text-brand-main gap-2 hover:bg-brand-main disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="group-hover:text-brand-white">
                  {banUser.isPending ? "Processing..." : "Ban"}
                </span>
              </button>
            </div>
          </div>
          {/* mid right */}
          <div className="w-[47%] flex flex-col gap-3 items-start justify-start">
            <span className="text-base font-normal text-brand-main">
              PERSONAL INFO
            </span>
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-base font-normal text-brand-ash">
                USER ID:
              </span>
              <span className="text-base font-normal text-brand-dark">
                {user?._id || user?.id || "N/A"}
              </span>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-base font-normal text-brand-ash">
                USER NAME:
              </span>
              <span className="text-base font-normal text-brand-dark">
                @{user?.username || "N/A"}
              </span>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-base font-normal text-brand-ash">
                EMAIL:
              </span>
              <span className="text-base font-normal text-brand-dark">
                {user?.email || "N/A"}
              </span>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-base font-normal text-brand-ash">
                PHONE:
              </span>
              <span className="text-base font-normal text-brand-dark">
                {user?.phone || "N/A"}
              </span>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-base font-normal text-brand-ash">
                DATE OF BIRTH:
              </span>
              <span className="text-base font-normal text-brand-dark">
                {user?.dob ? formatDate(user.dob) : "N/A"}
              </span>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-base font-normal text-brand-ash">
                USER SINCE:
              </span>
              <span className="text-base font-normal text-brand-dark">
                {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
              </span>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-base font-normal text-brand-ash">
                GENDER:
              </span>
              <span className="text-base font-normal text-brand-dark">
                {user?.gender === "M"
                  ? "Male"
                  : user?.gender === "F"
                  ? "Female"
                  : "N/A"}
              </span>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-base font-normal text-brand-ash">
                ADDRESS:
              </span>
              <span className="text-base font-normal text-brand-dark">
                {user?.deliveryAddresses?.[0]?.address || "No address provided"}
              </span>
            </div>
          </div>
        </div>
        {/* bot */}
        <div className="bg-brand-graybg rounded-xl p-8 flex flex-col gap-4">
          {/* Toggle Switch */}
          <div className="flex items-center">
            <div className="flex items-center border-b border-[#E9E7FD] w-[450px]">
              {toggleOptions.map(({ label, icon }) => (
                <button
                  key={label}
                  className={`transition-fx cursor-pointer flex flex-row items-center justify-center w-1/3 gap-2 py-2 border-b-2 text-sm font-medium
            ${
              selected === label
                ? "border-brand-main text-brand-main"
                : "border-brand-ash/80 text-brand-ash/80 hover:text-brand-main"
            }`}
                  onClick={() => setSelected(label)}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Below Toggle */}
          <div className="mt-4">
            {selected === "Customer" && <Customer />}
            {selected === "Rider" && <Rider />}
            {selected === "Vendor" && <Vendor />}
          </div>
        </div>
      </div>
    </>
  );
};

// export default OneUser

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OneUser />
    </Suspense>
  );
}
