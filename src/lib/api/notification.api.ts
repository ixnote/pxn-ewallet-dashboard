import axios from "axios";
import type {
  GetAllNotificationsResponse,
  CreateBroadcastPayload,
  CreateBroadcastResponse,
  UpdateNotificationPayload,
  UpdateNotificationResponse,
  OpenAllNotificationsResponse,
} from "@/lib/interfaces/notification.interface";
import { getAuthHeaders } from "./auth.helper";

export const notificationApi = {
  // Get all notifications
  async getAllNotifications() {
    const response = await axios.get<GetAllNotificationsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/notification/all`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },

  // Send broadcast
  async createBroadcast(payload: CreateBroadcastPayload) {
    const response = await axios.post<CreateBroadcastResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/notification/broadcast/create`,
      payload,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },

  // Update single notification status
  async updateNotification(payload: UpdateNotificationPayload) {
    const response = await axios.put<UpdateNotificationResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/notification/update`,
      payload,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },

  // Open all notifications
  async openAllNotifications() {
    const response = await axios.put<OpenAllNotificationsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/notification/open/all`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },
};
