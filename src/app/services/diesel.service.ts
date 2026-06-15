// src/app/services/diesel.service.ts
import { Injectable, signal } from '@angular/core';
import { DieselPurchase } from '../models/diesel.model';

@Injectable({ providedIn: 'root' })
export class DieselService {
  private purchasesSignal = signal<DieselPurchase[]>([
    {
      id: 1,
      vendorId: 1,
      vendorName: 'HP Pump, Phaltan',
      liters: 40,
      ratePerLiter: 95,
      amount: 3800,
      date: '2026-06-11',
    },
    {
      id: 2,
      vendorId: 2,
      vendorName: 'IOC Pump, Satara',
      liters: 50,
      ratePerLiter: 95,
      amount: 4750,
      date: '2026-06-09',
    },
    {
      id: 3,
      vendorId: 3,
      vendorName: 'Local pump',
      liters: 30,
      ratePerLiter: 98,
      amount: 5950,
      date: '2026-06-06',
    },
  ]);

  purchases = this.purchasesSignal.asReadonly();

  getAll(): DieselPurchase[] {
    return this.purchasesSignal();
  }

  getById(id: number): DieselPurchase | undefined {
    return this.purchasesSignal().find((p) => p.id === id);
  }

  add(purchase: Omit<DieselPurchase, 'id' | 'amount'>): void {
    const amount = purchase.liters * purchase.ratePerLiter;
    const newPurchase: DieselPurchase = { ...purchase, id: Date.now(), amount };
    this.purchasesSignal.update((list) => [newPurchase, ...list]);
  }

  update(id: number, changes: Partial<DieselPurchase>): void {
    this.purchasesSignal.update((list) =>
      list.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, ...changes };
        updated.amount = updated.liters * updated.ratePerLiter;
        return updated;
      }),
    );
  }

  delete(id: number): void {
    this.purchasesSignal.update((list) => list.filter((p) => p.id !== id));
  }

  getTotalCost(): number {
    return this.purchasesSignal().reduce((sum, p) => sum + p.amount, 0);
  }

  getTotalLiters(): number {
    return this.purchasesSignal().reduce((sum, p) => sum + p.liters, 0);
  }
}
