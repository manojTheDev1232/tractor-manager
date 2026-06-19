import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';
import { JobFormComponent } from '../job-form/job-form.component';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [NgForOf, RouterLink, NgIf, DatePipe, DecimalPipe, JobFormComponent],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.css',
})
export class JobsListComponent {
  private jobService = inject(JobService);

  Math = Math;
  allJobs = this.jobService.jobs;
  searchTerm = signal('');
  statusFilter = signal<'All' | 'Paid' | 'Pending'>('All');
  currentDate = new Date();
  currentMonthYear = `${this.currentDate.getFullYear()}-${(this.currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
  monthFilter = signal<string>(this.currentMonthYear);

  currentPage = signal(1);
  pageSize = 3;

  filteredJobs = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const month = this.monthFilter();

    return this.allJobs().filter((job) => {
      const matchesSearch = job.farmerName.toLowerCase().includes(search);
      const matchesStatus = status === 'All' || job.status === status;
      const matchesMonth = !month || job.date.startsWith(month);
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

  prevPage(): void {
    if (this.currentPage() > 1) this.currentPage.update((p) => p - 1);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages())
      this.currentPage.update((p) => p + 1);
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
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

  togglePaid(job: Job): void {
    const newStatus = job.status === 'Paid' ? 'Pending' : 'Paid';
    this.jobService.update(job.id, { status: newStatus });
  }
  deleteJob(id: number): void {
    if (confirm('Delete this job entry?')) {
      this.jobService.delete(id);
    }
  }
}
