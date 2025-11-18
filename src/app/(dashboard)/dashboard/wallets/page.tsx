"use client";
import React, { useState } from "react";
import {
  Bike,
  ChevronLeft,
  ChevronRight,
  Flag,
  Store,
  User,
} from "lucide-react";
import OneTransactionModal from "./OneTransactionModal";
import { useTransactions } from "@/hooks/useTransactions";
import Spinner from "@/components/spinner/Spinner";

const Wallets = () => {
  const [selected, setSelected] = useState("All");
  const [oneTrxId, setOneTrxId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(20);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedStartDate, setAppliedStartDate] = useState("");
  const [appliedEndDate, setAppliedEndDate] = useState("");

  const toggleOptions = [
    { label: "All" },
    { label: "Completed" },
    { label: "Pending" },
    { label: "Failed" },
  ];

  // Map selected status to API query parameters
  const getStatusFilter = () => {
    switch (selected) {
      case "Completed":
        return "completed";
      case "Pending":
        return "pending";
      case "Failed":
        return "failed";
      default:
        return undefined;
    }
  };

  // Fetch transactions with TanStack Query
  const {
    data: transactionsData,
    isLoading,
    error,
  } = useTransactions({
    page: currentPage,
    pageSize: perPage,
    search: appliedSearchQuery || undefined,
    status: getStatusFilter(),
    startDate: appliedStartDate || undefined,
    endDate: appliedEndDate || undefined,
  });

  const gotoTransaction = (id: string) => {
    setOneTrxId(id);
    setShowModal(true);
  };

  // Handle search filter
  const handleSearchFilter = () => {
    setAppliedSearchQuery(searchQuery);
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setAppliedSearchQuery("");
    setStartDate("");
    setEndDate("");
    setAppliedStartDate("");
    setAppliedEndDate("");
    setCurrentPage(1);
  };

  // Get user type icon
  const getUserTypeIcon = (roles?: string[]) => {
    if (!roles || roles.length === 0)
      return <User className="text-brand-main" />;
    if (roles.includes("storeOwner"))
      return <Store className="text-brand-main" />;
    if (roles.includes("rider")) return <Bike className="text-brand-main" />;
    if (roles.includes("customer")) return <User className="text-brand-main" />;
    return <User className="text-brand-main" />;
  };

  // Get status badge
  const getStatusBadge = (confirmed: boolean) => {
    // Based on the response, we can infer status from confirmed field
    // You may need to adjust this based on actual API response structure
    if (confirmed) {
      return (
        <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
          Completed
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded-xl bg-yellow-200 text-yellow-600">
          Pending
        </span>
      );
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(numAmount);
  };

  // Get transaction type display
  const getTransactionType = (type: string, genus: string) => {
    if (genus) return genus;
    return type === "credit" ? "Deposit" : "Withdrawal";
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
            Error loading transactions: {error.message}
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

  const transactions = transactionsData?.data?.transactions || [];
  const pagination = transactionsData?.data?.pagination;

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
                  selected === "All"
                    ? "w-1/4 left-0"
                    : selected === "Completed"
                    ? "w-1/4 left-1/4"
                    : selected === "Pending"
                    ? "w-1/4 left-2/4"
                    : "w-1/4 left-3/4"
                }`}
              />

              {/* Buttons Container */}
              <div className="relative flex w-full">
                {toggleOptions.map(({ label }) => (
                  <button
                    key={label}
                    className={`w-1/4 text-center font-medium text-sm transition-colors duration-300 cursor-pointer flex items-center justify-center gap-3 ${
                      selected === label ? "text-brand-white" : "text-brand-ash"
                    }`}
                    onClick={() => {
                      setSelected(label);
                      setCurrentPage(1); // Reset to first page when filtering
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* top right */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-brand-white p-1 px-2 rounded-lg">
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
                placeholder="Search Transaction"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none rounded-md px-2 py-1 text-brand-dark text-sm hover:outline hover:outline-brand-main placeholder:text-brand-ash w-40"
              />
            </div>
            {/* Date Range Filter */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-brand-white border border-brand-ash/30 rounded-lg px-3 py-1 text-brand-dark text-sm outline-none focus:border-brand-main hover:border-brand-main"
                placeholder="Start Date"
              />
              <span className="text-brand-ash">to</span>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-brand-white border border-brand-ash/30 rounded-lg px-3 py-1 text-brand-dark text-sm outline-none focus:border-brand-main hover:border-brand-main"
                placeholder="End Date"
              />
            </div>
            <button
              onClick={handleSearchFilter}
              className="group border-1 border-brand-main rounded-lg px-4 cursor-pointer text-sm font-normal flex items-center text-brand-main gap-2 h-8 hover:bg-brand-main"
            >
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
            </button>
            {(appliedSearchQuery || appliedStartDate || appliedEndDate) && (
              <button
                onClick={clearSearch}
                className="border-1 border-red-500 rounded-lg px-4 cursor-pointer text-sm font-normal flex items-center text-red-500 gap-2 h-8 hover:bg-red-500 hover:text-white"
              >
                <span>Clear Filters</span>
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
        {/* Active Filter Indicators */}
        {(appliedSearchQuery || appliedStartDate || appliedEndDate) && (
          <div className="w-full flex items-center gap-4 flex-wrap">
            {appliedSearchQuery && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-brand-ash">
                  Search:{" "}
                  <span className="text-brand-main font-medium">
                    &ldquo;{appliedSearchQuery}&rdquo;
                  </span>
                </span>
              </div>
            )}
            {appliedStartDate && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-brand-ash">
                  From:{" "}
                  <span className="text-brand-main font-medium">
                    {new Date(appliedStartDate).toLocaleDateString()}
                  </span>
                </span>
              </div>
            )}
            {appliedEndDate && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-brand-ash">
                  To:{" "}
                  <span className="text-brand-main font-medium">
                    {new Date(appliedEndDate).toLocaleDateString()}
                  </span>
                </span>
              </div>
            )}
            <button
              onClick={clearSearch}
              className="text-xs text-brand-ash hover:text-brand-main underline"
            >
              Clear all filters
            </button>
          </div>
        )}
        {/* body */}
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm font-normal text-brand-ash uppercase">
              <tr className="border-b border-brand-ash/20">
                <th scope="col" className="px-6 py-3">
                  TRANSACTION NO
                </th>
                <th scope="col" className="px-6 py-3">
                  TRANSACTION TYPE
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  USER ID
                </th>
                <th scope="col" className="px-6 py-3">
                  USER NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  USER TYPE
                </th>
                <th scope="col" className="px-6 py-3">
                  STATUS
                </th>
                <th scope="col" className="px-6 py-3">
                  TOTAL
                </th>
                <th scope="col" className="px-6 py-3">
                  PAYMENT
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-8 text-center text-brand-ash"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="text-sm font-normal bg-brand-white border-b border-brand-ash/20 hover:bg-brand-ash/10"
                  >
                    <td className="px-6 py-4">#{transaction.reference}</td>
                    <td className="px-6 py-4">
                      {getTransactionType(transaction.type, transaction.genus)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      {transaction.user?._id || transaction.user_id || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {transaction.user?.username ||
                        transaction.user?.firstName ||
                        transaction.email ||
                        "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {getUserTypeIcon(transaction.user?.roles)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(transaction.confirmed)}
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4">
                      {transaction.wallet_type || "Wallet"}
                    </td>
                    <td className="px-6 py-4 cursor-pointer">
                      <div className="flex items-center gap-6">
                        <Flag
                          className={
                            transaction.confirmed
                              ? "text-brand-ash"
                              : "text-red-400"
                          }
                        />
                        <div className="relative group">
                          <span className="text-brand-dark hover:text-brand-main">
                            <span>:</span>
                          </span>
                          <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                            <span
                              onClick={() =>
                                gotoTransaction(transaction.id.toString())
                              }
                              className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                            >
                              View Details
                            </span>
                            <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                              Reverse Transaction
                            </span>
                          </div>
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
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when changing page size
                }}
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

      <OneTransactionModal
        id={oneTrxId}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Wallets;
