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
    {
      id: 5,
      name: 'Sunita Kadam',
      phone: '9876534567',
      totalJobs: 6,
      pendingAmount: 1500,
    },
    {
      id: 6,
      name: 'Rahul Deshmukh',
      phone: '9876545678',
      totalJobs: 1,
      pendingAmount: 0,
    },
    {
      id: 7,
      name: 'Pooja Mane',
      phone: '9876556789',
      totalJobs: 8,
      pendingAmount: 5000,
    },
    {
      id: 8,
      name: 'Amit Bhosale',
      phone: '9876567890',
      totalJobs: 3,
      pendingAmount: 1000,
    },
    {
      id: 9,
      name: 'Vijay Sawant',
      phone: '9876578901',
      totalJobs: 5,
      pendingAmount: 0,
    },
    {
      id: 10,
      name: 'Deepali Pawar',
      phone: '9876589012',
      totalJobs: 2,
      pendingAmount: 3000,
    },
    {
      id: 11,
      name: 'Sanjay Nikam',
      phone: '9876590123',
      totalJobs: 4,
      pendingAmount: 0,
    },
    {
      id: 12,
      name: 'Rekha Gaikwad',
      phone: '9876502345',
      totalJobs: 7,
      pendingAmount: 2500,
    },
    {
      id: 13,
      name: 'Mahesh Thorat',
      phone: '9876513456',
      totalJobs: 2,
      pendingAmount: 0,
    },
    {
      id: 14,
      name: 'Kavita Salunkhe',
      phone: '9876524567',
      totalJobs: 5,
      pendingAmount: 8000,
    },
    {
      id: 15,
      name: 'Prasad Jagtap',
      phone: '9876535678',
      totalJobs: 3,
      pendingAmount: 0,
    },
    {
      id: 16,
      name: 'Seema Londhe',
      phone: '9876546789',
      totalJobs: 9,
      pendingAmount: 1200,
    },
    {
      id: 17,
      name: 'Vishal Gawade',
      phone: '9876557890',
      totalJobs: 4,
      pendingAmount: 0,
    },
    {
      id: 18,
      name: 'Archana Kokare',
      phone: '9876568901',
      totalJobs: 2,
      pendingAmount: 500,
    },
    {
      id: 19,
      name: 'Nitin Waghmare',
      phone: '9876579012',
      totalJobs: 6,
      pendingAmount: 0,
    },
    {
      id: 20,
      name: 'Jyoti Dhumal',
      phone: '9876580123',
      totalJobs: 3,
      pendingAmount: 3500,
    },
    {
      id: 21,
      name: 'Sandip Kumbhar',
      phone: '9876591234',
      totalJobs: 5,
      pendingAmount: 0,
    },
    {
      id: 22,
      name: 'Manisha Chavan',
      phone: '9876503456',
      totalJobs: 1,
      pendingAmount: 0,
    },
    {
      id: 23,
      name: 'Ajay Shinde',
      phone: '9876514567',
      totalJobs: 4,
      pendingAmount: 2000,
    },
    {
      id: 24,
      name: 'Usha Mohite',
      phone: '9876525678',
      totalJobs: 7,
      pendingAmount: 4500,
    },
    {
      id: 25,
      name: 'Rohan Deshpande',
      phone: '9876536789',
      totalJobs: 2,
      pendingAmount: 0,
    },
    {
      id: 26,
      name: 'Megha Kulkarni',
      phone: '9876547890',
      totalJobs: 5,
      pendingAmount: 1000,
    },
    {
      id: 27,
      name: 'Tushar Raut',
      phone: '9876558901',
      totalJobs: 3,
      pendingAmount: 0,
    },
    {
      id: 28,
      name: 'Varsha Mali',
      phone: '9876569012',
      totalJobs: 8,
      pendingAmount: 6000,
    },
    {
      id: 29,
      name: 'Swapnil Sonawane',
      phone: '9876570123',
      totalJobs: 4,
      pendingAmount: 0,
    },
    {
      id: 30,
      name: 'Shital Ingale',
      phone: '9876581234',
      totalJobs: 2,
      pendingAmount: 2000,
    },
    {
      id: 31,
      name: 'Pravin Kale',
      phone: '9876592345',
      totalJobs: 6,
      pendingAmount: 0,
    },
    {
      id: 32,
      name: 'Snehal Ghodake',
      phone: '9876504567',
      totalJobs: 3,
      pendingAmount: 500,
    },
    {
      id: 33,
      name: 'Sameer Bhagat',
      phone: '9876515678',
      totalJobs: 5,
      pendingAmount: 1500,
    },
    {
      id: 34,
      name: 'Rupali Patil',
      phone: '9876526789',
      totalJobs: 9,
      pendingAmount: 0,
    },
    {
      id: 35,
      name: 'Ganesh Zende',
      phone: '9876537890',
      totalJobs: 2,
      pendingAmount: 4000,
    },
    {
      id: 36,
      name: 'Vidya Deshmukh',
      phone: '9876548901',
      totalJobs: 4,
      pendingAmount: 0,
    },
    {
      id: 37,
      name: 'Abhijit Sutar',
      phone: '9876559012',
      totalJobs: 3,
      pendingAmount: 1200,
    },
    {
      id: 38,
      name: 'Ashwini Birajdar',
      phone: '9876560123',
      totalJobs: 7,
      pendingAmount: 0,
    },
    {
      id: 39,
      name: 'Kiran Mane',
      phone: '9876571234',
      totalJobs: 5,
      pendingAmount: 2500,
    },
    {
      id: 40,
      name: 'Pallavi More',
      phone: '9876582345',
      totalJobs: 1,
      pendingAmount: 0,
    },
    {
      id: 41,
      name: 'Dinesh Sawant',
      phone: '9876593456',
      totalJobs: 6,
      pendingAmount: 3000,
    },
    {
      id: 42,
      name: 'Smita Kamble',
      phone: '9876505678',
      totalJobs: 2,
      pendingAmount: 0,
    },
    {
      id: 43,
      name: 'Hemant Kadam',
      phone: '9876516789',
      totalJobs: 4,
      pendingAmount: 1000,
    },
    {
      id: 44,
      name: 'Nilima Shewale',
      phone: '9876527890',
      totalJobs: 8,
      pendingAmount: 5500,
    },
    {
      id: 45,
      name: 'Sachin Ghatge',
      phone: '9876538901',
      totalJobs: 3,
      pendingAmount: 0,
    },
    {
      id: 46,
      name: 'Tejaswini Nimbalkar',
      phone: '9876549012',
      totalJobs: 5,
      pendingAmount: 2000,
    },
    {
      id: 47,
      name: 'Manoj Salunkhe',
      phone: '9876550123',
      totalJobs: 2,
      pendingAmount: 0,
    },
    {
      id: 48,
      name: 'Anjali Pawar',
      phone: '9876561234',
      totalJobs: 7,
      pendingAmount: 4500,
    },
    {
      id: 49,
      name: 'Yogesh Koli',
      phone: '9876572345',
      totalJobs: 4,
      pendingAmount: 0,
    },
    {
      id: 50,
      name: 'Madhavi Suryawanshi',
      phone: '9876583456',
      totalJobs: 6,
      pendingAmount: 1500,
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
