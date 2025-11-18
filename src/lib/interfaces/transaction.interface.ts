export interface TransactionUser {
  _id: string;
  roles?: string[];
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  username?: string;
  isActive?: boolean;
  isPhoneVerified?: boolean;
  isBankVerified?: boolean;
  isConfirmed?: boolean;
  suspended?: boolean;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  kycLevel?: number;
  notification_counter?: number;
}

export interface Transaction {
  id: number;
  type: "credit" | "debit";
  description: string;
  narration: string | null;
  fullname: string | null;
  bank_name: string | null;
  account_number: string | null;
  user_id: string | null;
  user: TransactionUser;
  email: string;
  amount: string;
  confirmed: boolean;
  reference: string;
  genus: string;
  store: string;
  isRider: boolean;
  wallet_type: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GetAllTransactionsQuery {
  page: number;
  pageSize: number;
  userId?: string;
  reference?: string;
  type?: string;
  status?: string;
  description?: string;
  genus?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

export interface TransactionsResponse {
  status: boolean;
  message: string;
  data: {
    transactions: Transaction[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface SingleTransactionResponse {
  status: boolean;
  message: string;
  data: Transaction;
}
