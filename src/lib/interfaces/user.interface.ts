export interface User {
  _id: string;
  id?: string; // For compatibility
  sqlId: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  roles: string[];
  isOnline: boolean;
  isPhoneVerified: boolean;
  isBankVerified: boolean;
  isConfirmed: boolean;
  status: string;
  deleted: boolean;
  kycLevel: number;
  notification_counter: number;
  hasStore: boolean;
  deliveryAddresses: unknown[];
  current_location?: {
    coordinates: number[];
    _id: string;
    type: string;
  };
  lastLogin: string;
  suspendedUntil: string | null;
  suspensionReason: string | null;
  createdAt: string;
  updatedAt: string;
  // Additional fields from your API
  isActive?: boolean;
  suspended?: boolean;
  avatar?: string | null;
  device_token?: string;
  dob?: string;
  gender?: string;
  title?: string;
  bankAccount?: string;
  bankAccountName?: string;
  bankName?: string;
  bankCode?: string;
  walletBalance?: number;
}

export interface GetAllUsersQuery {
  role: string;
  page: number;
  pageSize: number;
  search: string;
  status: string;
  createdAtStart: string;
  id: string;
}

export interface GetAllUsersResponse<T> {
  status: boolean;
  message: string;
  data: {
    users: T[];
    pagination: {
      page: number;
      pageSize: number;
      limit?: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface UserStatistics {
  activeUsers: number;
  suspendedUsers: number;
  bannedUsers: number;
  newUsers: number;
  totalUsers: number;
}

export interface UserStatisticsResponse {
  status: boolean;
  message: string;
  data: UserStatistics;
}

export interface UpdateUserStatusPayload {
  userId: string;
  status: string; // "active" "suspended"  "banned",
  suspendedUntil?: string;
  reason?: string;
}
