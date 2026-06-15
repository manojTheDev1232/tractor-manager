// src/app/services/summary.service.ts
import { Injectable, computed } from '@angular/core';
import { JobService } from './job.service';
import { DieselService } from './diesel.service';
import { FarmerService } from './farmer.service';
import { DashboardSummary, WeeklyTrend } from '../models/summary.model';

@Injectable({ providedIn: 'root' })
export class SummaryService {
  constructor(
    private jobService: JobService,
    private dieselService: DieselService,
    private farmerService: FarmerService,
  ) {}

  // Reactive summary using signals + computed
  summary = computed<DashboardSummary>(() => {
    const totalEarned = this.jobService.getTotalEarned();
    const dieselCost = this.dieselService.getTotalCost();
    const pendingJobs = this.jobService.getPendingJobs();

    return {
      totalEarned,
      dieselCost,
      netProfit: totalEarned - dieselCost,
      pendingAmount: this.jobService.getPendingAmount(),
      jobsCount: this.jobService.getAll().length,
      totalLiters: this.dieselService.getTotalLiters(),
      pendingFarmersCount: new Set(pendingJobs.map((j) => j.farmerId)).size,
    };
  });

  // Mock weekly trend - replace with real aggregation from dates later
  getWeeklyTrend(): WeeklyTrend[] {
    return [
      { label: 'Wk1', earned: 6000, spent: 2500 },
      { label: 'Wk2', earned: 7500, spent: 3000 },
      { label: 'Wk3', earned: 5000, spent: 2000 },
      { label: 'Wk4', earned: 9000, spent: 3500 },
      { label: 'Wk5', earned: 6500, spent: 2800 },
      { label: 'Wk6', earned: 8500, spent: 3200 },
    ];
  }
}
