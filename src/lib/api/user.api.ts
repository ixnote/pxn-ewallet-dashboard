import axios from "axios";
import type {
  GetAllUsersQuery,
  UpdateUserStatusPayload,
  User,
  UserStatisticsResponse,
} from "@/lib/interfaces/user.interface";
import type { ApiResponse } from "@/lib/interfaces/api.interface";
import type { GetAllUsersResponse } from "@/lib/interfaces/user.interface";

export const userApi = {
  // get user statistics
  async getUserStatistics(role?: string) {
    const url = role
      ? `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users/statistics?role=${role}`
      : `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users/statistics`;

    const response = await axios.get<UserStatisticsResponse>(url);
    return response.data;
  },

  // all users
  async getAllUsers(params: GetAllUsersQuery) {
    console.log("All users params: ", params);
    const response = await axios.get<GetAllUsersResponse<User>>(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users?${
        params.role ? `role=${params.role}` : ""
      }&${params.page ? `page=${params.page}` : ""}&${
        params.pageSize ? `pageSize=${params.pageSize}` : ""
      }&${params.search ? `search=${params.search}` : ""}&${
        params.status ? `status=${params.status}` : ""
      }&${
        params.createdAtStart ? `createdAtStart=${params.createdAtStart}` : ""
      }&${params.id ? `id=${params.id}` : ""}`
      // {
      //   params,
      //   // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      // }
    );
    console.log("Get all users response: ", response);
    return response.data.data;
  },

  // get user by id
  async getUserById(id: string) {
    const data = await axios.get<ApiResponse<User>>(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users/${id}`
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
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users/update-status`,
      payload
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
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users/${id}/suspend`
    );
    return data.data;
  },

  // ban user
  async banUser(id: string) {
    const data = await axios.post<ApiResponse<User>>(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users/${id}/ban`
    );
    return data.data;
  },

  // activate user
  async activateUser(id: string) {
    const data = await axios.post<ApiResponse<User>>(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/users/${id}/activate`
    );
    return data.data;
  },
};
