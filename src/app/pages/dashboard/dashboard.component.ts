import { Component, computed, inject } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  SlicePipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service';
import { DieselService } from '../../services/diesel.service';
import { SummaryService } from '../../services/summary.service';
import { JobFormComponent } from '../job-form/job-form.component';
import { DieselFormComponent } from '../diesel-form/diesel-form.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DecimalPipe,
    SlicePipe,
    RouterLink,
    JobFormComponent,
    DieselFormComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('jobFormRef') jobFormRef!: JobFormComponent;
  @ViewChild('dieselFormRef') dieselFormRef!: DieselFormComponent;

  private jobService = inject(JobService);
  private dieselService = inject(DieselService);
  private summaryService = inject(SummaryService);

  today = new Date();

  // ---- summary tiles ----
  summary = this.summaryService.summary;

  // ---- recent jobs (last 4) ----
  recentJobs = computed(() =>
    [...this.jobService.jobs()]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4),
  );

  // ---- recent diesel (last 3) ----
  recentDiesel = computed(() =>
    [...this.dieselService.purchases()]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3),
  );

  // ---- pending jobs ----
  pendingJobs = computed(() => this.jobService.getPendingJobs().slice(0, 4));

  // ---- monthly trend for mini bar chart ----
  weeklyTrend = this.summaryService.getWeeklyTrend();

  // ---- month-over-month change % ----
  earningsChange = computed(() => {
    const trend = this.weeklyTrend;
    if (trend.length < 2) return 0;
    const current = trend[trend.length - 1].earned;
    const previous = trend[trend.length - 2].earned;
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  });

  dieselChange = computed(() => {
    const trend = this.weeklyTrend;
    if (trend.length < 2) return 0;
    const current = trend[trend.length - 1].spent;
    const previous = trend[trend.length - 2].spent;
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  });

  // ---- farmer initials helper ----
  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  // ---- mark pending as paid directly from dashboard ----
  markPaid(jobId: number): void {
    this.jobService.markPaid(jobId);
  }

  // ---- open dialogs ----
  openAddJob(): void {
    this.jobFormRef.open();
  }

  openAddDiesel(): void {
    this.dieselFormRef.open();
  }

  getMaxEarned(): number {
    const max = Math.max(...this.weeklyTrend.map((w) => w.earned));
    return max === 0 ? 1 : max;
  }
}
