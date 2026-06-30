// src/app/services/job.service.ts
import { Injectable, signal } from '@angular/core';
import { Job } from '../models/job.model';

@Injectable({ providedIn: 'root' })
export class JobService {
  public jobsSignal = signal<Job[]>([
    {
      id: 1,
      farmerId: 1,
      farmerName: 'Ramesh Patil',
      machineId: 1,
      machineName: 'Machine 1 - KantaHar',
      ratePerHour: 800,
      durationHours: 4,
      durationMinutes: 0,
      totalMinutes: 240,
      amount: 3200,
      date: '2026-06-12',
      status: 'Paid',
    },
    {
      id: 2,
      farmerId: 2,
      farmerName: 'Suresh More',
      machineId: 2,
      machineName: 'Machine 2 - Rotavator',
      ratePerHour: 1200,
      durationHours: 1,
      durationMinutes: 40,
      totalMinutes: 100,
      amount: 2000,
      date: '2026-06-10',
      status: 'Pending',
    },
    {
      id: 3,
      farmerId: 3,
      farmerName: 'Anita Jadhav',
      machineId: 1,
      machineName: 'Machine 1 - KantaHar',
      ratePerHour: 800,
      durationHours: 2,
      durationMinutes: 30,
      totalMinutes: 150,
      amount: 2000,
      date: '2026-06-14',
      status: 'Paid',
    },
    {
      id: 4,
      farmerId: 4,
      farmerName: 'Vikas Shinde',
      machineId: 3,
      machineName: 'Machine 3 - Cultivator',
      ratePerHour: 700,
      durationHours: 5,
      durationMinutes: 0,
      totalMinutes: 300,
      amount: 3500,
      date: '2026-06-15',
      status: 'Pending',
    },
    {
      id: 5,
      farmerId: 5,
      farmerName: 'Sunita Kadam',
      machineId: 2,
      machineName: 'Machine 2 - Rotavator',
      ratePerHour: 1200,
      durationHours: 3,
      durationMinutes: 15,
      totalMinutes: 195,
      amount: 3900,
      date: '2026-06-16',
      status: 'Paid',
    },
    {
      id: 6,
      farmerId: 1,
      farmerName: 'Ramesh Patil',
      machineId: 3,
      machineName: 'Machine 3 - Cultivator',
      ratePerHour: 700,
      durationHours: 2,
      durationMinutes: 0,
      totalMinutes: 120,
      amount: 1400,
      date: '2026-06-17',
      status: 'Pending',
    },
    {
      id: 7,
      farmerId: 7,
      farmerName: 'Pooja Mane',
      machineId: 1,
      machineName: 'Machine 1 - KantaHar',
      ratePerHour: 800,
      durationHours: 6,
      durationMinutes: 45,
      totalMinutes: 405,
      amount: 5400,
      date: '2026-06-18',
      status: 'Paid',
    },
    {
      id: 8,
      farmerId: 2,
      farmerName: 'Suresh More',
      machineId: 1,
      machineName: 'Machine 1 - KantaHar',
      ratePerHour: 800,
      durationHours: 3,
      durationMinutes: 30,
      totalMinutes: 210,
      amount: 2800,
      date: '2026-06-19',
      status: 'Pending',
    },
    {
      id: 9,
      farmerId: 9,
      farmerName: 'Vijay Sawant',
      machineId: 2,
      machineName: 'Machine 2 - Rotavator',
      ratePerHour: 1200,
      durationHours: 1,
      durationMinutes: 15,
      totalMinutes: 75,
      amount: 1500,
      date: '2026-06-20',
      status: 'Paid',
    },
    {
      id: 10,
      farmerId: 10,
      farmerName: 'Deepali Pawar',
      machineId: 3,
      machineName: 'Machine 3 - Cultivator',
      ratePerHour: 700,
      durationHours: 4,
      durationMinutes: 20,
      totalMinutes: 260,
      amount: 3033,
      date: '2026-06-20',
      status: 'Pending',
    },
    {
      id: 11,
      farmerId: 4,
      farmerName: 'Vikas Shinde',
      machineId: 2,
      machineName: 'Machine 2 - Rotavator',
      ratePerHour: 1200,
      durationHours: 2,
      durationMinutes: 45,
      totalMinutes: 165,
      amount: 3300,
      date: '2026-06-21',
      status: 'Paid',
    },
    {
      id: 12,
      farmerId: 12,
      farmerName: 'Rekha Gaikwad',
      machineId: 1,
      machineName: 'Machine 1 - KantaHar',
      ratePerHour: 800,
      durationHours: 5,
      durationMinutes: 15,
      totalMinutes: 315,
      amount: 4200,
      date: '2026-06-22',
      status: 'Pending',
    },
    {
      id: 13,
      farmerId: 13,
      farmerName: 'Mahesh Thorat',
      machineId: 3,
      machineName: 'Machine 3 - Cultivator',
      ratePerHour: 700,
      durationHours: 3,
      durationMinutes: 0,
      totalMinutes: 180,
      amount: 2100,
      date: '2026-06-22',
      status: 'Paid',
    },
    {
      id: 14,
      farmerId: 14,
      farmerName: 'Kavita Salunkhe',
      machineId: 2,
      machineName: 'Machine 2 - Rotavator',
      ratePerHour: 1200,
      durationHours: 4,
      durationMinutes: 30,
      totalMinutes: 270,
      amount: 5400,
      date: '2026-06-23',
      status: 'Pending',
    },
    {
      id: 15,
      farmerId: 7,
      farmerName: 'Pooja Mane',
      machineId: 3,
      machineName: 'Machine 3 - Cultivator',
      ratePerHour: 700,
      durationHours: 1,
      durationMinutes: 50,
      totalMinutes: 110,
      amount: 1283,
      date: '2026-06-23',
      status: 'Pending',
    },
    {
      id: 16,
      farmerId: 16,
      farmerName: 'Seema Londhe',
      machineId: 1,
      machineName: 'Machine 1 - KantaHar',
      ratePerHour: 800,
      durationHours: 7,
      durationMinutes: 0,
      totalMinutes: 420,
      amount: 5600,
      date: '2026-06-24',
      status: 'Paid',
    },
    {
      id: 17,
      farmerId: 17,
      farmerName: 'Vishal Gawade',
      machineId: 2,
      machineName: 'Machine 2 - Rotavator',
      ratePerHour: 1200,
      durationHours: 2,
      durationMinutes: 10,
      totalMinutes: 130,
      amount: 2600,
      date: '2026-06-24',
      status: 'Paid',
    },
    {
      id: 18,
      farmerId: 1,
      farmerName: 'Ramesh Patil',
      machineId: 2,
      machineName: 'Machine 2 - Rotavator',
      ratePerHour: 1200,
      durationHours: 3,
      durationMinutes: 40,
      totalMinutes: 220,
      amount: 4400,
      date: '2026-06-25',
      status: 'Pending',
    },
    {
      id: 19,
      farmerId: 19,
      farmerName: 'Nitin Waghmare',
      machineId: 1,
      machineName: 'Machine 1 - KantaHar',
      ratePerHour: 800,
      durationHours: 4,
      durationMinutes: 15,
      totalMinutes: 255,
      amount: 3400,
      date: '2026-06-25',
      status: 'Paid',
    },
    {
      id: 20,
      farmerId: 20,
      farmerName: 'Jyoti Dhumal',
      machineId: 3,
      machineName: 'Machine 3 - Cultivator',
      ratePerHour: 700,
      durationHours: 5,
      durationMinutes: 30,
      totalMinutes: 330,
      amount: 3850,
      date: '2026-06-26',
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
