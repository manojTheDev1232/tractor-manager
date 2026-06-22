import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { DieselService } from '../../services/diesel.service';
import { DieselFormComponent } from '../diesel-form/diesel-form.component';

@Component({
  selector: 'app-diesel-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe, NgForOf, NgIf, DieselFormComponent],
  templateUrl: './diesel-list.component.html',
  styleUrl: './diesel-list.component.css',
})
export class DieselListComponent {
  private purchaseService = inject(DieselService);
  searchText = signal('');

  allPurchases = this.purchaseService.purchases;
  monthFilter = signal(new Date().toISOString().slice(0, 7));
  monthFilterEnabled = signal(false);

  Math = Math;
  currentPage = signal(1);
  pageSize = 3;

  filteredPurchases = computed(() => {
    const search = this.searchText().toLowerCase();
    const month = this.monthFilter();
    console.log(this.allPurchases);
    return this.allPurchases().filter((purchase) => {
      const matchesSearch = purchase.vendorName.toLowerCase().includes(search);

      const matchesMonth = !month || purchase.date.startsWith(month);
      return matchesSearch && matchesMonth;
    });
  });

  pagedPurchases = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredPurchases().slice(start, start + this.pageSize);
  });

  onSearchChanged(value: string) {
    this.searchText.set(value);
    this.currentPage.set(1);
  }
  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredPurchases().length / this.pageSize)),
  );

  prevPage(): void {
    if (this.currentPage() > 1) this.currentPage.update((p) => p - 1);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages())
      this.currentPage.update((p) => p + 1);
  }

  onMonthChange(value: string): void {
    this.monthFilter.set(value);
    this.currentPage.set(1);
  }

  toggleMonthFilter(): void {
    this.monthFilterEnabled.update((enabled) => !enabled);
    this.currentPage.set(1);
  }

  deleteJob(id: number): void {
    if (confirm('Delete this job entry?')) {
      this.purchaseService.delete(id);
    }
  }
}
