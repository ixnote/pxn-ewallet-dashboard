"use client";
import React, { useState } from "react";
import {
  Bike,
  CheckCircle2Icon,
  ChevronLeft,
  ChevronRight,
  CirclePlusIcon,
  LayoutDashboard,
  Store,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useUsers,
  useUserStatistics,
  useSuspendUser,
  useBanUser,
  useActivateUser,
} from "@/hooks/useUsers";
import Spinner from "@/components/spinner/Spinner";

const Users = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");

  const toggleOptions = [
    { label: "All", value: "all", icon: <LayoutDashboard size={16} /> },
    { label: "Customers", value: "customer", icon: <User size={16} /> },
    { label: "Riders", value: "rider", icon: <Bike size={16} /> },
    { label: "Vendors", value: "storeOwner", icon: <Store size={16} /> },
  ];

  // Fetch users with TanStack Query
  const {
    data: allUsers,
    isLoading,
    error,
  } = useUsers({
    role:
      selected === "all"
        ? ""
        : selected === "storeOwner"
        ? "storeOwner"
        : selected === "rider"
        ? "rider"
        : selected === "customer"
        ? "customer"
        : "",
    page: currentPage,
    pageSize: perPage,
    search: appliedSearchQuery,
    status: statusFilter,
    createdAtStart: "",
    id: "",
  });

  // console.log("All users: ", allUsers);

  // Fetch user statistics based on selected role
  const { data: userStats } = useUserStatistics(
    selected === "all" ? undefined : selected
  );

  // Mutations
  const suspendUser = useSuspendUser();
  const banUser = useBanUser();
  const activateUser = useActivateUser();

  const gotoUser = (id: string) => {
    router.push(`/dashboard/users/one?id=${id}`);
  };

  const handleSuspend = (userId: string) => {
    suspendUser.mutate(userId);
  };

  const handleBan = (userId: string) => {
    banUser.mutate(userId);
  };

  const handleActivate = (userId: string) => {
    activateUser.mutate(userId);
  };

  // Handle status filter clicks
  const handleStatusClick = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Clear status filter
  const clearStatusFilter = () => {
    setStatusFilter("");
    setCurrentPage(1);
  };

  // Handle search filter
  const handleSearchFilter = () => {
    setAppliedSearchQuery(searchQuery);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setAppliedSearchQuery("");
    setCurrentPage(1);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Error loading users: {error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-brand-main text-white rounded-lg cursor-pointer hover:bg-brand-main/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const users = allUsers?.data?.users || [];
  const pagination = allUsers?.data?.pagination;

  // Get user type icon
  const getUserTypeIcon = (roles: string[]) => {
    if (roles.includes("storeOwner"))
      return <Store className="text-brand-main" />;
    if (roles.includes("rider")) return <Bike className="text-brand-main" />;
    if (roles.includes("customer")) return <User className="text-brand-main" />;
    return <User className="text-brand-main" />;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return (
          <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
            Active
          </span>
        );
      case "suspended":
        return (
          <span className="px-2 py-1 rounded-xl bg-yellow-200 text-yellow-600">
            Suspended
          </span>
        );
      case "banned":
        return (
          <span className="px-2 py-1 rounded-xl bg-red-200 text-red-600">
            Banned
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-xl bg-gray-200 text-gray-600">
            Inactive
          </span>
        );
    }
  };

  // Get verification status
  const getVerificationIcon = (
    isPhoneVerified: boolean,
    isBankVerified: boolean
  ) => {
    if (isPhoneVerified && isBankVerified) {
      return <CheckCircle2Icon className="text-green-400 text-sm" />;
    }
    return <CirclePlusIcon className="rotate-45 text-red-400 text-sm" />;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get time ago
  const getTimeAgo = (dateString: string | null | undefined) => {
    if (!dateString) {
      return "Never";
    }

    const now = new Date();
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Never";
    }

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Handle negative differences (future dates)
    if (diffInSeconds < 0) {
      return "Just now";
    }

    if (diffInSeconds < 60) return `${diffInSeconds} secs ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-start justify-start pb-8">
        {/* top */}
        <div className="w-full flex justify-between items-center">
          {/* Toggle switch */}
          <div className="flex items-center">
            <div className="relative flex items-center bg-[#F1F2F6] border-1 border-[#E9E7FD] rounded-full h-8 w-[450px]">
              {/* Toggle Background */}
              <div
                className={`absolute h-full bg-brand-main rounded-full shadow-xl transition-all duration-300 ${
                  selected === "all"
                    ? "w-1/4 left-0"
                    : selected === "customer"
                    ? "w-1/4 left-1/4"
                    : selected === "rider"
                    ? "w-1/4 left-2/4"
                    : "w-1/4 left-3/4"
                }`}
              />

              {/* Buttons Container */}
              <div className="relative flex w-full">
                {toggleOptions.map(({ label, value, icon }) => (
                  <button
                    key={value}
                    className={`w-1/4 text-center font-medium text-sm transition-colors duration-300 cursor-pointer flex items-center justify-center gap-3 ${
                      selected === value ? "text-brand-white" : "text-brand-ash"
                    }`}
                    onClick={() => setSelected(value)}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* top right */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-brand-white p-1 px-2 rounded-lg">
              {/* <Search className="text-brand-ash" /> */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5311 15.6998L9.05397 10.2227C8.59564 10.5588 8.09308 10.8224 7.54628 11.0133C6.99949 11.2043 6.41756 11.2998 5.80049 11.2998C4.27226 11.2998 2.97342 10.7651 1.90397 9.69564C0.834527 8.62619 0.299805 7.32758 0.299805 5.7998C0.299805 4.27203 0.834527 2.97342 1.90397 1.90397C2.97342 0.834527 4.27203 0.299805 5.7998 0.299805C7.32758 0.299805 8.62619 0.834527 9.69564 1.90397C10.7651 2.97342 11.2998 4.27226 11.2998 5.80049C11.2998 6.41756 11.2043 6.99949 11.0133 7.54628C10.8224 8.09308 10.5588 8.59564 10.2227 9.05397L15.6998 14.5311L14.5311 15.6998ZM5.7998 9.6498C6.86925 9.6498 7.77828 9.2755 8.52689 8.52689C9.2755 7.77828 9.6498 6.86925 9.6498 5.7998C9.6498 4.73036 9.2755 3.82133 8.52689 3.07272C7.77828 2.32411 6.86925 1.9498 5.7998 1.9498C4.73036 1.9498 3.82133 2.32411 3.07272 3.07272C2.32411 3.82133 1.9498 4.73036 1.9498 5.7998C1.9498 6.86925 2.32411 7.77828 3.07272 8.52689C3.82133 9.2755 4.73036 9.6498 5.7998 9.6498Z"
                  fill="#8B909A"
                />
              </svg>

              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search User"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none rounded-md px-2 py-1 text-brand-dark text-sm hover:outline hover:outline-brand-main placeholder:text-brand-ash"
              />
            </div>
            <button
              onClick={handleSearchFilter}
              className="group border-1 border-brand-main rounded-lg px-4 cursor-pointer text-sm font-normal flex items-center text-brand-main gap-2 h-8 hover:bg-brand-main"
            >
              <span className="group-hover:text-brand-white">Search</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#115D8B] group-hover:fill-brand-white"
              >
                <path d="M14.5311 15.6998L9.05397 10.2227C8.59564 10.5588 8.09308 10.8224 7.54628 11.0133C6.99949 11.2043 6.41756 11.2998 5.80049 11.2998C4.27226 11.2998 2.97342 10.7651 1.90397 9.69564C0.834527 8.62619 0.299805 7.32758 0.299805 5.7998C0.299805 4.27203 0.834527 2.97342 1.90397 1.90397C2.97342 0.834527 4.27203 0.299805 5.7998 0.299805C7.32758 0.299805 8.62619 0.834527 9.69564 1.90397C10.7651 2.97342 11.2998 4.27226 11.2998 5.80049C11.2998 6.41756 11.2043 6.99949 11.0133 7.54628C10.8224 8.09308 10.5588 8.59564 10.2227 9.05397L15.6998 14.5311L14.5311 15.6998ZM5.7998 9.6498C6.86925 9.6498 7.77828 9.2755 8.52689 8.52689C9.2755 7.77828 9.6498 6.86925 9.6498 5.7998C9.6498 4.73036 9.2755 3.82133 8.52689 3.07272C7.77828 2.32411 6.86925 1.9498 5.7998 1.9498C4.73036 1.9498 3.82133 2.32411 3.07272 3.07272C2.32411 3.82133 1.9498 4.73036 1.9498 5.7998C1.9498 6.86925 2.32411 7.77828 3.07272 8.52689C3.82133 9.2755 4.73036 9.6498 5.7998 9.6498Z" />
              </svg>
            </button>
            {appliedSearchQuery && (
              <button
                onClick={clearSearch}
                className="border-1 border-red-500 rounded-lg px-4 cursor-pointer text-sm font-normal flex items-center text-red-500 gap-2 h-8 hover:bg-red-500 hover:text-white"
              >
                <span>Clear Search</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-red-500 group-hover:fill-white"
                >
                  <path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm3.5 10.5l-1.414 1.414L8 9.414l-2.086 2.086L4.5 10.5 6.586 8.414 4.5 6.328l1.414-1.414L8 6.586l2.086-2.086L11.5 6.328 9.414 8.414 11.5 10.5z" />
                </svg>
              </button>
            )}
          </div>
        </div>
        {/* sub-top */}
        <div className="w-full flex flex-col gap-4 mx-4">
          {/* Active Filter Indicators */}
          {(statusFilter || appliedSearchQuery) && (
            <div className="flex items-center gap-4 flex-wrap">
              {statusFilter && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-brand-ash">
                    Filtered by:{" "}
                    <span className="text-brand-main font-medium capitalize">
                      {statusFilter}
                    </span>
                  </span>
                  <button
                    onClick={clearStatusFilter}
                    className="text-xs text-brand-ash hover:text-brand-main underline cursor-pointer"
                  >
                    Clear filter
                  </button>
                </div>
              )}
              {appliedSearchQuery && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-brand-ash">
                    Search:{" "}
                    <span className="text-brand-main font-medium">
                      &ldquo;{appliedSearchQuery}&rdquo;
                    </span>
                  </span>
                  <button
                    onClick={clearSearch}
                    className="text-xs text-brand-ash hover:text-brand-main underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Status Counters */}
          <div className="flex gap-8 items-center">
            <span
              className={`transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer ${
                statusFilter === "active"
                  ? "border-brand-main text-brand-main"
                  : "border-brand-ash/80 text-brand-ash/80 hover:text-brand-main hover:border-brand-main"
              }`}
              onClick={() => handleStatusClick("active")}
            >
              <span>{userStats?.data?.activeUsers || 0}</span>
              <span>Active Users</span>
            </span>
            <span
              className={`transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer ${
                statusFilter === "suspended"
                  ? "border-brand-main text-brand-main"
                  : "border-brand-ash/80 text-brand-ash/80 hover:text-brand-main hover:border-brand-main"
              }`}
              onClick={() => handleStatusClick("suspended")}
            >
              <span>{userStats?.data?.suspendedUsers || 0}</span>
              <span>Suspended Users</span>
            </span>
            <span
              className={`transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer ${
                statusFilter === "banned"
                  ? "border-brand-main text-brand-main"
                  : "border-brand-ash/80 text-brand-ash/80 hover:text-brand-main hover:border-brand-main"
              }`}
              onClick={() => handleStatusClick("banned")}
            >
              <span>{userStats?.data?.bannedUsers || 0}</span>
              <span>Banned Users</span>
            </span>
            <span
              className={`transition-fx flex flex-col items-start gap-1 border-b-2 cursor-pointer ${
                statusFilter === ""
                  ? "border-brand-main text-brand-main"
                  : "border-brand-ash/80 text-brand-ash/80 hover:text-brand-main hover:border-brand-main"
              }`}
              onClick={clearStatusFilter}
            >
              <span>{userStats?.data?.totalUsers || 0}</span>
              <span>Total Users</span>
            </span>
          </div>
        </div>
        {/* body */}
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm font-normal text-brand-ash uppercase">
              <tr className="border-b border-brand-ash/20">
                {/* <th scope="col" className="px-6 py-3">
                  S/N
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Joined
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3">
                  User Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Verification
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="px-6 py-8 text-center text-brand-ash"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, i) => (
                  <tr
                    key={i + 1}
                    onClick={() => gotoUser(user._id)}
                    className="text-sm font-normal bg-brand-white border-b border-brand-ash/20 hover:bg-brand-ash/10 cursor-pointer"
                  >
                    {/* <td className="px-6 py-4">{i + 1}</td> */}
                    <td className="px-6 py-4">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4">{getTimeAgo(user.lastLogin)}</td>
                    <td className="px-6 py-4">{getUserTypeIcon(user.roles)}</td>
                    <td className="px-6 py-4 flex items-center justify-center">
                      {getVerificationIcon(
                        user.isPhoneVerified,
                        user.isBankVerified
                      )}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                    <td
                      className="px-6 py-4 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative group">
                        <span className="text-brand-dark hover:text-brand-main">
                          <span>:</span>
                        </span>
                        <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-50 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                          <Link
                            href={`/dashboard/users/one?id=${user._id}`}
                            className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                          >
                            View User
                          </Link>
                          <span
                            onClick={() => handleSuspend(user._id)}
                            className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left cursor-pointer"
                          >
                            Suspend User
                          </span>
                          <span
                            onClick={() => handleBan(user._id)}
                            className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left cursor-pointer"
                          >
                            Ban User
                          </span>
                          <span
                            onClick={() => handleActivate(user._id)}
                            className="p-2 px-4 text-left hover:bg-brand-ash/10 cursor-pointer"
                          >
                            Activate User
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="w-full px-6 py-4 bg-[#F1F2F6] border-1 border-[#E9E7FD] flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-ash">
              Showing
              <select
                name="perPage"
                id="perPage"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
              of {pagination?.total || 0}
            </div>
            <div className="group flex items-center gap-2 text-brand-ash">
              <ChevronLeft
                className={`transition-fx cursor-pointer hover:animate-bounce ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
              />
              {pagination &&
                (() => {
                  const totalPages = pagination.totalPages;
                  const current = currentPage;
                  const pages = [];

                  // Always show first page
                  pages.push(
                    <span
                      key={1}
                      className={`transition-fx p-1 px-4 rounded-lg cursor-pointer ${
                        current === 1
                          ? "bg-brand-main text-brand-white"
                          : "hover:bg-brand-main hover:text-brand-white"
                      }`}
                      onClick={() => setCurrentPage(1)}
                    >
                      1
                    </span>
                  );

                  // Show ellipsis if current page is far from start
                  if (current > 4) {
                    pages.push(
                      <span key="ellipsis1" className="px-2 text-brand-ash">
                        ...
                      </span>
                    );
                  }

                  // Show pages around current page
                  const start = Math.max(2, current - 1);
                  const end = Math.min(totalPages - 1, current + 1);

                  for (let i = start; i <= end; i++) {
                    if (i !== 1 && i !== totalPages) {
                      pages.push(
                        <span
                          key={i}
                          className={`transition-fx p-1 px-4 rounded-lg cursor-pointer ${
                            current === i
                              ? "bg-brand-main text-brand-white"
                              : "hover:bg-brand-main hover:text-brand-white"
                          }`}
                          onClick={() => setCurrentPage(i)}
                        >
                          {i}
                        </span>
                      );
                    }
                  }

                  // Show ellipsis if current page is far from end
                  if (current < totalPages - 3) {
                    pages.push(
                      <span key="ellipsis2" className="px-2 text-brand-ash">
                        ...
                      </span>
                    );
                  }

                  // Always show last page (if more than 1 page)
                  if (totalPages > 1) {
                    pages.push(
                      <span
                        key={totalPages}
                        className={`transition-fx p-1 px-4 rounded-lg cursor-pointer ${
                          current === totalPages
                            ? "bg-brand-main text-brand-white"
                            : "hover:bg-brand-main hover:text-brand-white"
                        }`}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </span>
                    );
                  }

                  return pages;
                })()}
              <ChevronRight
                className={`transition-fx cursor-pointer hover:animate-bounce ${
                  currentPage === pagination?.totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() =>
                  pagination &&
                  currentPage < pagination.totalPages &&
                  setCurrentPage(currentPage + 1)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
