import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api/dashboard.api";

// Query keys - Simple and clean approach
export const dashboardKeys = {
  all: ["dashboard"] as const,
  metrics: ["dashboard", "metrics"] as const,
};

// Fetch dashboard metrics
export function useDashboardMetrics() {
  return useQuery({
    queryKey: dashboardKeys.metrics,
    queryFn: () => dashboardApi.getMetrics(),
    staleTime: 1000 * 60 * 5, // 5 minutes - metrics don't change often
  });
}
