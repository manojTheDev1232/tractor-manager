import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import { DieselService } from '../../services/diesel.service';
import { DieselPurchase } from '../../models/diesel.model';
import { DieselFormComponent } from '../diesel-form/diesel-form.component';

@Component({
  selector: 'app-diesel-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DecimalPipe,
    NgForOf,
    NgIf,
    DieselFormComponent,
  ],
  templateUrl: './diesel-list.component.html',
  styleUrl: './diesel-list.component.scss',
})
export class DieselListComponent {
  @ViewChild('dieselFormRef') dieselFormRef!: DieselFormComponent;

  private dieselService = inject(DieselService);

  Math = Math;
  allPurchases = this.dieselService.purchases;
  searchText = signal('');
  monthFilter = signal(new Date().toISOString().slice(0, 7));
  monthFilterEnabled = signal(false);
  currentPage = signal(1);
  pageSize = 5;
  today = new Date();

  // ---- computed ----
  filteredPurchases = computed(() => {
    const search = this.searchText().toLowerCase().trim();
    const month = this.monthFilter();
    const monthEnabled = this.monthFilterEnabled();

    return this.allPurchases().filter((p) => {
      const matchesSearch =
        !search || p.vendorName.toLowerCase().includes(search);
      const matchesMonth = !monthEnabled || p.date.startsWith(month);
      return matchesSearch && matchesMonth;
    });
  });

  pagedPurchases = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredPurchases().slice(start, start + this.pageSize);
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredPurchases().length / this.pageSize)),
  );

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  // ---- summary stats ----
  totalSpent = computed(() =>
    this.filteredPurchases().reduce((s, p) => s + p.amount, 0),
  );

  totalLiters = computed(() =>
    this.filteredPurchases().reduce((s, p) => s + p.liters, 0),
  );

  avgRate = computed(() => {
    const liters = this.totalLiters();
    const spent = this.totalSpent();
    if (liters === 0) return 0;
    return (spent / liters).toFixed(1);
  });

  // ---- actions ----
  onSearchChanged(value: string): void {
    this.searchText.set(value);
    this.currentPage.set(1);
  }

  clearSearch(): void {
    this.searchText.set('');
    this.currentPage.set(1);
  }

  onMonthChange(value: string): void {
    this.monthFilter.set(value);
    this.currentPage.set(1);
  }

  toggleMonthFilter(): void {
    this.monthFilterEnabled.update((e) => !e);
    this.currentPage.set(1);
  }

  prevPage(): void {
    if (this.currentPage() > 1) this.currentPage.update((p) => p - 1);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages())
      this.currentPage.update((p) => p + 1);
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
  }

  openAddPurchase(): void {
    if (!this.dieselFormRef) return;
    this.dieselFormRef.open();
  }

  openEditPurchase(purchase: DieselPurchase): void {
    if (!this.dieselFormRef) return;
    this.dieselFormRef.open(purchase);
  }

  deletePurchase(id: number): void {
    if (confirm('Delete this diesel purchase?')) {
      this.dieselService.delete(id);
    }
  }

  getVendorShortName(name: string): string {
    return name.split(',')[0].trim();
  }

  getVendorLocation(name: string): string {
    const parts = name.split(',');
    return parts.length > 1 ? parts[1].trim() : '';
  }
}
