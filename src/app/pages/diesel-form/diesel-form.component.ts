import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DieselService } from '../../services/diesel.service';
import { VendorService } from '../../services/vendor.service';
import { DieselPurchase } from '../../models/diesel.model';

@Component({
  selector: 'app-diesel-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './diesel-form.component.html',
})
export class DieselFormComponent implements OnInit {
  private dieselService = inject(DieselService);
  private vendorService = inject(VendorService);

  vendors = this.vendorService.vendors;
  isVisible = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  totalAmount = signal(0);

  dieselForm = new FormGroup({
    vendorId: new FormControl<number | null>(null, Validators.required),
    liters: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0.1),
    ]),
    ratePerLiter: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    date: new FormControl('', Validators.required),
    odometerReading: new FormControl<number | null>(null),
  });

  ngOnInit(): void {
    this.dieselForm
      .get('liters')
      ?.valueChanges.subscribe(() => this.calcTotal());
    this.dieselForm
      .get('ratePerLiter')
      ?.valueChanges.subscribe(() => this.calcTotal());
  }

  open(purchase?: DieselPurchase): void {
    this.dieselForm.reset();
    this.totalAmount.set(0);

    if (purchase) {
      this.isEditMode.set(true);
      this.editId.set(purchase.id);
      this.dieselForm.patchValue({
        vendorId: purchase.vendorId,
        liters: purchase.liters,
        ratePerLiter: purchase.ratePerLiter,
        date: purchase.date,
        odometerReading: purchase.odometerReading ?? null,
      });
      this.calcTotal();
    } else {
      this.isEditMode.set(false);
      this.editId.set(null);
    }

    this.isVisible.set(true);
  }

  close(): void {
    this.isVisible.set(false);
    this.dieselForm.reset();
  }

  calcTotal(): void {
    const liters = this.dieselForm.get('liters')?.value ?? 0;
    const rate = this.dieselForm.get('ratePerLiter')?.value ?? 0;
    this.totalAmount.set((liters ?? 0) * (rate ?? 0));
  }

  onSubmit(): void {
    if (this.dieselForm.invalid) {
      this.dieselForm.markAllAsTouched();
      return;
    }

    const formVal = this.dieselForm.value;
    const selectedVendor = this.vendors().find(
      (v) => v.id === Number(formVal.vendorId),
    );

    const payload = {
      vendorId: Number(formVal.vendorId),
      vendorName: selectedVendor?.name ?? '',
      liters: formVal.liters!,
      ratePerLiter: formVal.ratePerLiter!,
      date: formVal.date!,
      odometerReading: formVal.odometerReading ?? undefined,
    };

    if (this.isEditMode() && this.editId()) {
      this.dieselService.update(this.editId()!, payload);
    } else {
      this.dieselService.add(payload);
    }

    this.close();
  }

  isInvalid(field: string): boolean {
    const c = this.dieselForm.get(field);
    return !!(c?.invalid && c?.touched);
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('dialog-overlay')) {
      this.close();
    }
  }
}
