import axios from "axios";
import type {
  GetAllTransactionsQuery,
  TransactionsResponse,
  SingleTransactionResponse,
} from "@/lib/interfaces/transaction.interface";
import { getAuthHeaders } from "./auth.helper";
import { getApiUrl } from "@/lib/config/api.config";

export const transactionApi = {
  async getAllTransactions(params: GetAllTransactionsQuery) {
    // Remove undefined values from params
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== ""
      )
    );

    const response = await axios.get<TransactionsResponse>(
      getApiUrl("/dashboard/transactions"),
      {
        params: cleanParams,
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },

  async getTransactionById(id: string | number) {
    const response = await axios.get<SingleTransactionResponse>(
      getApiUrl(`/dashboard/transactions/${id}`),
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },
};
