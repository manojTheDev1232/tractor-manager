import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';
import { JobFormComponent } from '../job-form/job-form.component';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DecimalPipe,
    NgForOf,
    NgIf,
    RouterLink,
    JobFormComponent,
  ],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss',
})
export class JobsListComponent {
  @ViewChild('jobFormRef') jobFormRef!: JobFormComponent;

  private jobService = inject(JobService);
  private route = inject(ActivatedRoute);

  Math = Math;
  allJobs = this.jobService.jobs;
  searchTerm = signal('');
  statusFilter = signal<'All' | 'Paid' | 'Pending'>('All');
  monthFilter = signal(new Date().toISOString().slice(0, 7));
  monthFilterEnabled = signal(false);
  currentPage = signal(1);
  today = new Date();
  pageSize = 5;

  constructor() {
    this.route.queryParams.subscribe((params) => {
      if (params['farmer']) {
        this.searchTerm.set(params['farmer']);
        this.currentPage.set(1);
      }
    });
  }

  // ---- computed ----
  filteredJobs = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const status = this.statusFilter();
    const month = this.monthFilter();
    const monthEnabled = this.monthFilterEnabled();

    return this.allJobs().filter((job) => {
      const matchesSearch =
        !search || job.farmerName.toLowerCase().includes(search);
      const matchesStatus = status === 'All' || job.status === status;
      const matchesMonth = !monthEnabled || job.date.startsWith(month);
      return matchesSearch && matchesStatus && matchesMonth;
    });
  });

  pagedJobs = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredJobs().slice(start, start + this.pageSize);
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredJobs().length / this.pageSize)),
  );

  pageNumbers = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  // ---- summary stats ----
  totalEarned = computed(() =>
    this.filteredJobs().reduce((s, j) => s + j.amount, 0),
  );

  paidAmount = computed(() =>
    this.filteredJobs()
      .filter((j) => j.status === 'Paid')
      .reduce((s, j) => s + j.amount, 0),
  );

  pendingAmount = computed(() =>
    this.filteredJobs()
      .filter((j) => j.status === 'Pending')
      .reduce((s, j) => s + j.amount, 0),
  );

  // ---- actions ----
  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.currentPage.set(1);
  }

  onStatusChange(value: string): void {
    this.statusFilter.set(value as 'All' | 'Paid' | 'Pending');
    this.currentPage.set(1);
  }

  onMonthChange(value: string): void {
    this.monthFilter.set(value);
    this.currentPage.set(1);
  }

  toggleMonthFilter(): void {
    this.monthFilterEnabled.update((e) => !e);
    this.currentPage.set(1);
  }

  prevPage(): void {
    if (this.currentPage() > 1) this.currentPage.update((p) => p - 1);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages())
      this.currentPage.update((p) => p + 1);
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
  }

  openAddJob(): void {
    this.jobFormRef.open();
  }

  openEditJob(job: Job): void {
    this.jobFormRef.open(job);
  }

  togglePaid(job: Job): void {
    const newStatus = job.status === 'Paid' ? 'Pending' : 'Paid';
    this.jobService.update(job.id, { status: newStatus });
  }

  deleteJob(id: number): void {
    if (confirm('Delete this job entry?')) {
      this.jobService.delete(id);
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
