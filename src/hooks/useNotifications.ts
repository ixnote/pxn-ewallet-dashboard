import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "@/lib/api/notification.api";
import type {
  CreateBroadcastPayload,
  UpdateNotificationPayload,
} from "@/lib/interfaces/notification.interface";

// Query keys
export const notificationKeys = {
  all: ["notifications"] as const,
  list: () => [...notificationKeys.all, "list"] as const,
};

// Fetch all notifications
export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => notificationApi.getAllNotifications(),
    staleTime: 1000 * 30, // 30 seconds - notifications change frequently
    refetchInterval: 1000 * 60, // Refetch every minute
  });
}

// Create broadcast mutation
export function useCreateBroadcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBroadcastPayload) =>
      notificationApi.createBroadcast(payload),
    onSuccess: () => {
      // Invalidate notifications to refetch
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}

// Update notification status mutation
export function useUpdateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateNotificationPayload) =>
      notificationApi.updateNotification(payload),
    onSuccess: () => {
      // Invalidate notifications to refetch
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}

// Open all notifications mutation
export function useOpenAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.openAllNotifications(),
    onSuccess: () => {
      // Invalidate notifications to refetch
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
