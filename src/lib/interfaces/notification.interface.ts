export interface Notification {
  _id: string;
  id?: string;
  title: string;
  body: string;
  status: "read" | "unread";
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPagination {
  prevPage: number | null;
  currentPage: number;
  nextPage: number | null;
  pageTotal: number;
  pageSize: number;
  total: number;
}

export interface GetAllNotificationsResponse {
  status: string;
  message: string;
  data: {
    pagination: NotificationPagination;
    notifications: Notification[];
  };
}

export interface CreateBroadcastPayload {
  title: string;
  body: string;
  isDraft: boolean;
}

export interface CreateBroadcastResponse {
  status: string;
  message: string;
}

export interface UpdateNotificationPayload {
  notificationId: string;
  status: "read" | "unread";
}

export interface UpdateNotificationResponse {
  status: string;
  message: string;
}

export interface OpenAllNotificationsResponse {
  status: string;
  message: string;
}
