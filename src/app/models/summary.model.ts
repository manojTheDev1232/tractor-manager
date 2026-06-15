export interface DashboardSummary {
  totalEarned: number;
  dieselCost: number;
  netProfit: number;
  pendingAmount: number;
  jobsCount: number;
  totalLiters: number;
  pendingFarmersCount: number;
}

export interface WeeklyTrend {
  label: string;
  earned: number;
  spent: number;
}
