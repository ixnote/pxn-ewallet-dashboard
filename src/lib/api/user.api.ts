import axios from "axios";
import type {
  GetAllUsersQuery,
  UpdateUserStatusPayload,
  User,
  UserStatisticsResponse,
} from "@/lib/interfaces/user.interface";
import type { ApiResponse } from "@/lib/interfaces/api.interface";
import type { GetAllUsersResponse } from "@/lib/interfaces/user.interface";
import { getAuthHeaders } from "./auth.helper";
import { getApiUrl } from "@/lib/config/api.config";

export const userApi = {
  // get current logged-in user
  async getCurrentUser() {
    const response = await axios.get<User>(
      getApiUrl("/user"),
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },

  // get user statistics
  async getUserStatistics(role?: string) {
    const url = role
      ? getApiUrl(`/dashboard/users/statistics?role=${role}`)
      : getApiUrl("/dashboard/users/statistics");

    const response = await axios.get<UserStatisticsResponse>(url, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  // all users
  async getAllUsers(params: GetAllUsersQuery) {
    // console.log("All users params: ", params);
    // Remove empty/undefined values from params
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== ""
      )
    );

    const response = await axios.get<GetAllUsersResponse<User>>(
      getApiUrl("/dashboard/users"),
      {
        params: cleanParams,
        headers: getAuthHeaders(),
      }
    );
    // console.log("Get all users response: ", response);
    return response.data;
  },

  // get user by id
  async getUserById(id: string) {
    const data = await axios.get<ApiResponse<User>>(
      getApiUrl(`/dashboard/users/${id}`),
      {
        headers: getAuthHeaders(),
      }
    );
    return data.data;
  },

  // create user
  //   async createUser(user: User) {
  //     const data = await axios.post<ApiResponse<User>>(
  //       `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users`,
  //       user
  //     );
  //     return data.data;
  //   },

  // update user status
  async updateUserStatus(payload: UpdateUserStatusPayload) {
    const data = await axios.post<ApiResponse<User>>(
      getApiUrl("/dashboard/users/update-status"),
      payload,
      {
        headers: getAuthHeaders(),
      }
    );
    return data.data;
  },

  // delete user
  //   async deleteUser(id: string) {
  //     const data = await axios.delete<ApiResponse<void>>(
  //       `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users/${id}`
  //     );
  //     return data.data;
  //   },

  // suspend user
  async suspendUser(id: string) {
    const data = await axios.post<ApiResponse<User>>(
      getApiUrl(`/dashboard/users/${id}/suspend`),
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return data.data;
  },

  // ban user
  async banUser(id: string) {
    const data = await axios.post<ApiResponse<User>>(
      getApiUrl(`/dashboard/users/${id}/ban`),
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return data.data;
  },

  // activate user
  async activateUser(id: string) {
    const data = await axios.post<ApiResponse<User>>(
      getApiUrl(`/dashboard/users/${id}/activate`),
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return data.data;
  },
};
