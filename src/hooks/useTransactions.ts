import { useQuery } from "@tanstack/react-query";
import { transactionApi } from "@/lib/api/transaction.api";
import type { GetAllTransactionsQuery } from "@/lib/interfaces/transaction.interface";

// Query keys - Simple and clean approach
export const transactionKeys = {
  all: ["transactions"] as const,
  list: (params: GetAllTransactionsQuery) =>
    ["transactions", "list", params] as const,
  detail: (id: string | number) => ["transactions", id] as const,
};

// Fetch all transactions
export function useTransactions(params: GetAllTransactionsQuery) {
  return useQuery({
    queryKey: transactionKeys.list(params),
    queryFn: () => transactionApi.getAllTransactions(params),
  });
}

// Fetch single transaction
export function useTransaction(id: string | number) {
  return useQuery({
    queryKey: transactionKeys.detail(id),
    queryFn: () => transactionApi.getTransactionById(id),
    enabled: !!id,
  });
}
