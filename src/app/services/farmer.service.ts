// src/app/services/farmer.service.ts
import { Injectable, signal } from '@angular/core';
import { Farmer } from '../models/farmer.model';
import { JobService } from './job.service';

@Injectable({ providedIn: 'root' })
export class FarmerService {
  private farmersSignal = signal<Farmer[]>([
    {
      id: 1,
      name: 'Ramesh Patil',
      phone: '9876543210',
      totalJobs: 5,
      pendingAmount: 0,
    },
    {
      id: 2,
      name: 'Suresh More',
      phone: '9876501234',
      totalJobs: 3,
      pendingAmount: 2000,
    },
    {
      id: 3,
      name: 'Anita Jadhav',
      phone: '9876512345',
      totalJobs: 4,
      pendingAmount: 0,
    },
    {
      id: 4,
      name: 'Vikas Shinde',
      phone: '9876523456',
      totalJobs: 2,
      pendingAmount: 4000,
    },
  ]);

  farmers = this.farmersSignal.asReadonly();

  constructor(private jobService: JobService) {}

  getAll(): Farmer[] {
    return this.farmersSignal();
  }

  getById(id: number): Farmer | undefined {
    return this.farmersSignal().find((f) => f.id === id);
  }

  add(farmer: Omit<Farmer, 'id' | 'totalJobs' | 'pendingAmount'>): void {
    const newFarmer: Farmer = {
      ...farmer,
      id: Date.now(),
      totalJobs: 0,
      pendingAmount: 0,
    };
    this.farmersSignal.update((list) => [...list, newFarmer]);
  }

  getJobHistory(farmerId: number) {
    return this.jobService.getAll().filter((j) => j.farmerId === farmerId);
  }
}
