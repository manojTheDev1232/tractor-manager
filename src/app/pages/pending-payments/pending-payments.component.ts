import { Component, computed, inject } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-pending-payments',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe, NgForOf, NgIf],
  templateUrl: './pending-payments.component.html',
  styleUrl: './pending-payments.component.scss',
})
export class PendingPaymentsComponent {
  private jobService = inject(JobService);

  pendingJobs = computed(() =>
    [...this.jobService.getPendingJobs()].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    ),
  );

  totalPending = computed(() =>
    this.pendingJobs().reduce((s, j) => s + j.amount, 0),
  );

  overdueJobs = computed(() =>
    this.pendingJobs().filter((j) => this.getDaysAgo(j.date) > 30),
  );

  overdueAmount = computed(() =>
    this.overdueJobs().reduce((s, j) => s + j.amount, 0),
  );

  thisMonthJobs = computed(() => {
    const month = new Date().toISOString().slice(0, 7);
    return this.pendingJobs().filter((j) => j.date.startsWith(month));
  });

  thisMonthAmount = computed(() =>
    this.thisMonthJobs().reduce((s, j) => s + j.amount, 0),
  );

  getDaysAgo(date: string): number {
    const diff = new Date().getTime() - new Date(date).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  isOverdue(date: string): boolean {
    return this.getDaysAgo(date) > 30;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getBarWidth(amount: number): string {
    const total = this.totalPending();
    if (total === 0) return '0%';
    return Math.round((amount / total) * 100) + '%';
  }

  markPaid(job: Job): void {
    if (confirm(`Mark ₹${job.amount} from ${job.farmerName} as paid?`)) {
      this.jobService.markPaid(job.id);
    }
  }
}
