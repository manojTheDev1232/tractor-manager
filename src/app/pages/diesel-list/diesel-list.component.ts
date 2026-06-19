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
  searchTerm = signal('');
  monthFilter = signal<string>('');
  allPurchases = this.purchaseService.purchases;

  Math = Math;
  currentPage = signal(1);
  pageSize = 3;

  filteredPurchases = computed(() => {
    const search = this.searchTerm().toLowerCase();
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
}
