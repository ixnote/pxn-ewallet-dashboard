import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/lib/api/user.api";
import type {
  GetAllUsersQuery,
  UpdateUserStatusPayload,
} from "@/lib/interfaces/user.interface";

// Query keys - Simple and clean approach
export const userKeys = {
  all: ["users"] as const,
  list: (params: GetAllUsersQuery) => ["users", "list", params] as const,
  detail: (id: string) => ["users", id] as const,
  statistics: (role?: string) => ["users", "statistics", role] as const,
};

// Fetch all users
export function useUsers(params: GetAllUsersQuery) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userApi.getAllUsers(params),
  });
}

// Fetch single user
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUserById(id),
    enabled: !!id,
  });
}

// Fetch user statistics
export function useUserStatistics(role?: string) {
  return useQuery({
    queryKey: userKeys.statistics(role),
    queryFn: () => userApi.getUserStatistics(role),
    staleTime: 1000 * 60 * 2, // 2 minutes - stats don't change often
  });
}

// Update user status mutation
export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserStatusPayload) =>
      userApi.updateUserStatus(payload),
    onSuccess: () => {
      // Invalidate all user queries and statistics to refetch data
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: ["users", "statistics"] });
    },
  });
}

// Suspend user mutation
export function useSuspendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.suspendUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: ["users", "statistics"] });
    },
  });
}

// Ban user mutation
export function useBanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.banUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: ["users", "statistics"] });
    },
  });
}

// Activate user mutation
export function useActivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.activateUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: ["users", "statistics"] });
    },
  });
}
