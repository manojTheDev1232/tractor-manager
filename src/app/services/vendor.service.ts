// src/app/services/vendor.service.ts
import { Injectable, signal } from '@angular/core';
import { Vendor } from '../models/vendor.model';

@Injectable({ providedIn: 'root' })
export class VendorService {
  vendors = signal<Vendor[]>([
    { id: 1, name: 'HP Pump, Phaltan' },
    { id: 2, name: 'IOC Pump, Satara' },
    { id: 3, name: 'Local pump' },
  ]);
}
