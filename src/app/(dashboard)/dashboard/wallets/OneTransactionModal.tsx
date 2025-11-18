"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Bike, User, X } from "lucide-react";
import { useTransaction } from "@/hooks/useTransactions";
import Spinner from "@/components/spinner/Spinner";

interface OneTransactionModalProps {
  id: string;
  setShowModal: (show: boolean) => void;
  showModal: boolean;
}

const OneTransactionModal = ({
  id,
  setShowModal,
  showModal,
}: OneTransactionModalProps) => {
  // Fetch transaction data
  const { data: transactionData, isLoading, error } = useTransaction(id);

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

  // Format currency
  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(numAmount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get transaction type display
  const getTransactionTypeDisplay = (type: string, genus: string) => {
    if (genus) return genus;
    return type === "credit" ? "Deposit" : "Withdrawal";
  };

  // Get status badge
  const getStatusBadge = (confirmed: boolean) => {
    if (confirmed) {
      return (
        <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600 text-sm">
          Completed
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded-xl bg-yellow-200 text-yellow-600 text-sm">
          Pending
        </span>
      );
    }
  };

  if (isLoading) {
    return (
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-ash/45 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8 m-4 overflow-auto h-[90%] flex items-center justify-center"
            >
              <Spinner />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (error || !transactionData?.data) {
    return (
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-ash/45 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8 m-4 overflow-auto h-[90%] flex flex-col items-center justify-center gap-4"
            >
              <p className="text-red-500">
                Error loading transaction:{" "}
                {error?.message || "Transaction not found"}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-brand-main/90"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const transaction = transactionData.data;
  const user = transaction.user;

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-ash/45 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8 m-4 overflow-auto h-[90%]"
            >
              <div className="gap-6 pb-8 flex flex-col items-center justify-start">
                {/* Top */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-lg font-semibold text-brand-main">
                    TRANSACTION DETAILS
                  </span>
                  <X
                    onClick={() => setShowModal(false)}
                    className="transition-fx font-bold cursor-pointer text-brand-ash hover:text-brand-main"
                  />
                </div>

                {/* Transaction Summary */}
                <div className="bg-brand-graybg rounded-xl p-4 flex flex-col items-center gap-2 w-full">
                  <span className="text-brand-ash text-sm">
                    {transaction.description ||
                      getTransactionTypeDisplay(
                        transaction.type,
                        transaction.genus
                      )}
                  </span>
                  <span className="text-lg font-semibold">
                    {formatCurrency(transaction.amount)}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(transaction.confirmed)}
                    <span className="text-xs text-brand-ash">
                      {transaction.reference}
                    </span>
                  </div>
                </div>

                {/* Transaction Info */}
                <div className="w-full bg-brand-graybg rounded-xl p-8 flex items-start flex-col gap-3">
                  <span className="text-base font-medium text-brand-main">
                    TRANSACTION INFO
                  </span>
                  <div className="w-full flex justify-between gap-4">
                    <span className="text-base text-brand-ash">
                      TRANSACTION ID:
                    </span>
                    <span className="text-base text-brand-dark">
                      {transaction.id}
                    </span>
                  </div>
                  <div className="w-full flex justify-between gap-4">
                    <span className="text-base text-brand-ash">REFERENCE:</span>
                    <span className="text-base text-brand-dark">
                      {transaction.reference}
                    </span>
                  </div>
                  <div className="w-full flex justify-between gap-4">
                    <span className="text-base text-brand-ash">TYPE:</span>
                    <span className="text-base text-brand-dark">
                      {getTransactionTypeDisplay(
                        transaction.type,
                        transaction.genus
                      )}
                    </span>
                  </div>
                  <div className="w-full flex justify-between gap-4">
                    <span className="text-base text-brand-ash">STATUS:</span>
                    {getStatusBadge(transaction.confirmed)}
                  </div>
                  <div className="w-full flex justify-between gap-4">
                    <span className="text-base text-brand-ash">
                      WALLET TYPE:
                    </span>
                    <span className="text-base text-brand-dark">
                      {transaction.wallet_type || "Standard"}
                    </span>
                  </div>
                  <div className="w-full flex justify-between gap-4">
                    <span className="text-base text-brand-ash">DATE:</span>
                    <span className="text-base text-brand-dark">
                      {formatDate(transaction.createdAt)}
                    </span>
                  </div>
                  {transaction.description && (
                    <div className="w-full flex justify-between gap-4">
                      <span className="text-base text-brand-ash">
                        DESCRIPTION:
                      </span>
                      <span className="text-base text-brand-dark text-right max-w-md">
                        {transaction.description}
                      </span>
                    </div>
                  )}
                  {transaction.narration && (
                    <div className="w-full flex justify-between gap-4">
                      <span className="text-base text-brand-ash">
                        NARRATION:
                      </span>
                      <span className="text-base text-brand-dark text-right max-w-md">
                        {transaction.narration}
                      </span>
                    </div>
                  )}
                  <div className="w-full bg-brand-white rounded-lg p-4 mt-2">
                    <div className="w-full flex justify-between gap-4 my-2">
                      <span className="text-base text-brand-ash">AMOUNT:</span>
                      <span className="text-base text-brand-dark font-medium">
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Info Section */}
                {user && (
                  <div className="w-full flex flex-col gap-3 bg-brand-graybg rounded-xl p-8">
                    <span className="text-base font-medium text-brand-main">
                      USER INFO
                    </span>
                    <div className="w-full flex justify-between gap-4">
                      <span className="text-base text-brand-ash">USER ID:</span>
                      <span className="text-base text-brand-dark">
                        {user._id}
                      </span>
                    </div>
                    <div className="w-full flex justify-between gap-4">
                      <span className="text-base text-brand-ash">
                        USER NAME:
                      </span>
                      <span className="text-base text-brand-dark">
                        @{user.username || "N/A"}
                      </span>
                    </div>
                    <div className="w-full flex justify-between gap-4">
                      <span className="text-base text-brand-ash">
                        FULL NAME:
                      </span>
                      <span className="text-base text-brand-dark">
                        {user.firstName || ""} {user.lastName || ""}
                        {!user.firstName && !user.lastName && "N/A"}
                      </span>
                    </div>
                    <div className="w-full flex justify-between gap-4">
                      <span className="text-base text-brand-ash">EMAIL:</span>
                      <span className="text-base text-brand-dark">
                        {user.email || transaction.email || "N/A"}
                      </span>
                    </div>
                    <div className="w-full flex justify-between gap-4">
                      <span className="text-base text-brand-ash">PHONE:</span>
                      <span className="text-base text-brand-dark">
                        {user.phone || "N/A"}
                      </span>
                    </div>
                    <div className="w-full flex justify-between gap-4">
                      <span className="text-base text-brand-ash">
                        USER TYPE:
                      </span>
                      <span className="text-base text-brand-dark">
                        {getUserTypeIcon(user.roles)}
                      </span>
                    </div>
                    <div className="w-full flex justify-between gap-4">
                      <span className="text-base text-brand-ash">
                        USER SINCE:
                      </span>
                      <span className="text-base text-brand-dark">
                        {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                      </span>
                    </div>
                    {user.kycLevel !== undefined && (
                      <div className="w-full flex justify-between gap-4">
                        <span className="text-base text-brand-ash">
                          KYC LEVEL:
                        </span>
                        <span className="text-base text-brand-dark">
                          {user.kycLevel}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Bank Info (if available) */}
                {(transaction.bank_name ||
                  transaction.account_number ||
                  transaction.fullname) && (
                  <div className="w-full flex flex-col gap-3 bg-brand-graybg rounded-xl p-8">
                    <span className="text-base font-medium text-brand-main">
                      BANK INFO
                    </span>
                    {transaction.fullname && (
                      <div className="w-full flex justify-between gap-4">
                        <span className="text-base text-brand-ash">
                          ACCOUNT NAME:
                        </span>
                        <span className="text-base text-brand-dark">
                          {transaction.fullname}
                        </span>
                      </div>
                    )}
                    {transaction.account_number && (
                      <div className="w-full flex justify-between gap-4">
                        <span className="text-base text-brand-ash">
                          ACCOUNT NUMBER:
                        </span>
                        <span className="text-base text-brand-dark">
                          {transaction.account_number}
                        </span>
                      </div>
                    )}
                    {transaction.bank_name && (
                      <div className="w-full flex justify-between gap-4">
                        <span className="text-base text-brand-ash">
                          BANK NAME:
                        </span>
                        <span className="text-base text-brand-dark">
                          {transaction.bank_name}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OneTransactionModal;
