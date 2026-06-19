import { Component, computed, inject } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';

import { ChartConfiguration, ChartData } from 'chart.js';
import { JobService } from '../../services/job.service';
import { DieselService } from '../../services/diesel.service';
import { SummaryService } from '../../services/summary.service';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [DecimalPipe, NgChartsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  private jobService = inject(JobService);
  private dieselService = inject(DieselService);
  private summaryService = inject(SummaryService);

  summary = this.summaryService.summary;

  // Mock "other expenses" - swap with a real ExpenseService later
  otherExpenses = 2300;

  netProfit = computed(
    () =>
      this.summary().totalEarned -
      this.summary().dieselCost -
      this.otherExpenses,
  );

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
