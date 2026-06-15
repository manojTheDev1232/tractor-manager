// src/app/services/job.service.ts
import { Injectable, signal } from '@angular/core';
import { Job } from '../models/job.model';

@Injectable({ providedIn: 'root' })
export class JobService {
  private jobsSignal = signal<Job[]>([
    {
      id: 1,
      farmerId: 1,
      farmerName: 'Ramesh Patil',
      acres: 4,
      ratePerAcre: 800,
      amount: 3200,
      date: '2026-06-12',
      status: 'Paid',
    },
    {
      id: 2,
      farmerId: 2,
      farmerName: 'Suresh More',
      acres: 2.5,
      ratePerAcre: 800,
      amount: 2000,
      date: '2026-06-10',
      status: 'Pending',
    },
    {
      id: 3,
      farmerId: 3,
      farmerName: 'Anita Jadhav',
      acres: 3,
      ratePerAcre: 800,
      amount: 2400,
      date: '2026-06-08',
      status: 'Paid',
    },
    {
      id: 4,
      farmerId: 4,
      farmerName: 'Vikas Shinde',
      acres: 5,
      ratePerAcre: 800,
      amount: 4000,
      date: '2026-06-05',
      status: 'Pending',
    },
  ]);

  jobs = this.jobsSignal.asReadonly();

  getAll(): Job[] {
    return this.jobsSignal();
  }

  getById(id: number): Job | undefined {
    return this.jobsSignal().find((j) => j.id === id);
  }

  add(job: Omit<Job, 'id' | 'amount'>): void {
    const amount = job.acres * job.ratePerAcre;
    const newJob: Job = { ...job, id: Date.now(), amount };
    this.jobsSignal.update((jobs) => [newJob, ...jobs]);
  }

  update(id: number, changes: Partial<Job>): void {
    this.jobsSignal.update((jobs) =>
      jobs.map((j) => {
        if (j.id !== id) return j;
        const updated = { ...j, ...changes };
        updated.amount = updated.acres * updated.ratePerAcre;
        return updated;
      }),
    );
  }

  delete(id: number): void {
    this.jobsSignal.update((jobs) => jobs.filter((j) => j.id !== id));
  }

  markPaid(id: number): void {
    this.update(id, { status: 'Paid' });
  }

  getTotalEarned(): number {
    return this.jobsSignal().reduce((sum, j) => sum + j.amount, 0);
  }

  getPendingJobs(): Job[] {
    return this.jobsSignal().filter((j) => j.status === 'Pending');
  }

  getPendingAmount(): number {
    return this.getPendingJobs().reduce((sum, j) => sum + j.amount, 0);
  }
}
