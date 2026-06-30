// src/app/services/machine.service.ts
import { Injectable, signal } from '@angular/core';
import { Machine } from '../models/machine.model';

@Injectable({ providedIn: 'root' })
export class MachineService {
  private machinesSignal = signal<Machine[]>([
    {
      id: 1,
      name: 'Machine 1 - Mahindra 575',
      ratePerHour: 800,
      isActive: true,
    },
    {
      id: 2,
      name: 'Machine 2 - Sonalika 750',
      ratePerHour: 1200,
      isActive: true,
    },
    {
      id: 3,
      name: 'Machine 3 - John Deere',
      ratePerHour: 1500,
      isActive: true,
    },
  ]);

  machines = this.machinesSignal.asReadonly();

  getAll(): Machine[] {
    return this.machinesSignal().filter((m) => m.isActive);
  }

  getById(id: number): Machine | undefined {
    return this.machinesSignal().find((m) => m.id === id);
  }

  add(machine: Omit<Machine, 'id'>): void {
    const newMachine: Machine = { ...machine, id: Date.now() };
    this.machinesSignal.update((list) => [...list, newMachine]);
  }

  update(id: number, changes: Partial<Machine>): void {
    this.machinesSignal.update((list) =>
      list.map((m) => (m.id === id ? { ...m, ...changes } : m)),
    );
  }

  updateRate(id: number, newRate: number): void {
    this.update(id, { ratePerHour: newRate });
  }
}
