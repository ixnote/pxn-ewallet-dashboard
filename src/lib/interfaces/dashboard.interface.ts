export interface MetricsUsers {
  newUsers: number;
  totalUsers: number;
  percentageIncrease: number;
}

export interface MetricsOrders {
  newOrders: number;
  totalOrders: number;
  percentageIncrease: number;
}

export interface DashboardMetricsData {
  users: MetricsUsers;
  orders: MetricsOrders;
  totalRevenue: number;
  totalWalletBalance: number;
}

export interface DashboardMetricsResponse {
  status: boolean;
  message: string;
  results: DashboardMetricsData;
}
