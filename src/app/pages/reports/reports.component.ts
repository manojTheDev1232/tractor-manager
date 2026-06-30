import { Component, computed, inject } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';

import { ChartConfiguration, ChartData } from 'chart.js';
import { JobService } from '../../services/job.service';
import { DieselService } from '../../services/diesel.service';
import { SummaryService } from '../../services/summary.service';
import { DecimalPipe, NgFor } from '@angular/common';
import { FarmerService } from '../../services/farmer.service';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [DecimalPipe, NgChartsModule, NgFor],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  private farmerService = inject(FarmerService);
  private dieselService = inject(DieselService);
  private summaryService = inject(SummaryService);

  summary = this.summaryService.summary;

  // Mock "other expenses" - swap with a real ExpenseService later
  otherExpenses = 2300;

  dieselPercent = computed(() => {
    const total = this.summary().dieselCost + this.otherExpenses;
    return Math.round((this.summary().dieselCost / total) * 100);
  });

  maintenancePercent = computed(() => 100 - this.dieselPercent());

  avgDieselRate = computed(() => {
    const liters = this.summary().totalLiters;
    return liters > 0 ? (this.summary().dieselCost / liters).toFixed(1) : 0;
  });

  monthlySummary = [
    {
      month: 'April',
      earned: 32000,
      diesel: 9000,
      profit: 23000,
      isCurrent: false,
    },
    {
      month: 'May',
      earned: 41000,
      diesel: 11500,
      profit: 29500,
      isCurrent: false,
    },
    {
      month: 'June',
      earned: 48200,
      diesel: 14500,
      profit: 33700,
      isCurrent: true,
    },
  ];

  totalEarned = computed(() =>
    this.monthlySummary.reduce((s, r) => s + r.earned, 0),
  );
  totalDiesel = computed(() =>
    this.monthlySummary.reduce((s, r) => s + r.diesel, 0),
  );
  totalProfit = computed(() =>
    this.monthlySummary.reduce((s, r) => s + r.profit, 0),
  );

  topFarmers = computed(() =>
    [...this.farmerService.farmers()]
      .sort((a, b) => b.totalJobs - a.totalJobs)
      .slice(0, 4),
  );

  netProfit = computed(
    () =>
      this.summary().totalEarned -
      this.summary().dieselCost -
      this.otherExpenses,
  );

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getBarWidth(jobs: number): string {
    const max = Math.max(...this.topFarmers().map((f) => f.totalJobs));
    return Math.round((jobs / max) * 100) + '%';
  }

  // ---- Monthly trend (bar chart: earnings vs diesel cost) ----
  monthlyTrendData: ChartData<'bar'> = {
    labels: ['Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Earnings',
        data: [32000, 41000, 48200],
        backgroundColor: '#5a9216',
        borderRadius: 4,
      },
      {
        label: 'Diesel cost',
        data: [9000, 11500, 14500],
        backgroundColor: '#c2473f',
        borderRadius: 4,
      },
    ],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, font: { size: 11 } },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { callback: (v) => '₹' + v } },
    },
  };

  // ---- Expense breakdown (doughnut) ----
  expenseBreakdownData: ChartData<'doughnut'> = {
    labels: ['Diesel', 'Maintenance'],
    datasets: [
      {
        data: [this.dieselService.getTotalCost(), this.otherExpenses],
        backgroundColor: ['#c2473f', '#d9a13b'],
        borderWidth: 0,
      },
    ],
  };

  doughnutOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, font: { size: 11 } },
      },
    },
    cutout: '65%',
  };

  // ---- Filters ----
  selectedRange = 'thisMonth';

  onRangeChange(value: string): void {
    this.selectedRange = value;
    // TODO: refetch/filter data based on range and update chart datasets
  }

  exportPdf(): void {
    // integrate jsPDF or call backend export endpoint
    console.log('Export PDF triggered');
  }

  exportExcel(): void {
    // integrate SheetJS (xlsx) or call backend export endpoint
    console.log('Export Excel triggered');
  }
}
