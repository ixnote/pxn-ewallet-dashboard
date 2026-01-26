import axios from "axios";
import type { DashboardMetricsResponse } from "@/lib/interfaces/dashboard.interface";
import { getAuthHeaders } from "./auth.helper";
import { getApiUrl } from "@/lib/config/api.config";

export const dashboardApi = {
  async getMetrics() {
    const response = await axios.get<DashboardMetricsResponse>(
      getApiUrl("/dashboard/metrics"),
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },
};
