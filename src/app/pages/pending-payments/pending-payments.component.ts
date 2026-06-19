import { Component, computed, inject } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-pending-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-payments.component.html',
  styleUrl: './pending-payments.component.css',
})
export class PendingPaymentsComponent {
  private jobService = inject(JobService);

  pendingJobs = computed(() => this.jobService.getPendingJobs());

  totalPending = computed(() =>
    this.pendingJobs().reduce((sum, j) => sum + j.amount, 0),
  );

  markPaid(job: Job) {
    if (confirm(`Mark ${job.amount} from ${job.farmerName}as paid?`)) {
      this.jobService.markPaid(job.id);
    }
  }
}
