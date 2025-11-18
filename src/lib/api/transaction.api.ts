import axios from "axios";
import type {
  GetAllTransactionsQuery,
  TransactionsResponse,
  SingleTransactionResponse,
} from "@/lib/interfaces/transaction.interface";

export const transactionApi = {
  async getAllTransactions(params: GetAllTransactionsQuery) {
    // Remove undefined values from params
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== ""
      )
    );

    const response = await axios.get<TransactionsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/transactions`,
      { params: cleanParams }
    );
    return response.data;
  },

  async getTransactionById(id: string | number) {
    const response = await axios.get<SingleTransactionResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/transactions/${id}`
    );
    return response.data;
  },
};
