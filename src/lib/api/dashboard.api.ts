import axios from "axios";
import type { DashboardMetricsResponse } from "@/lib/interfaces/dashboard.interface";
import { getAuthHeaders } from "./auth.helper";

export const dashboardApi = {
  async getMetrics() {
    const response = await axios.get<DashboardMetricsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/metrics`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },
};
