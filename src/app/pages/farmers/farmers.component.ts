import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-farmers',
  standalone: true,
  imports: [NgFor, DecimalPipe, NgIf, NgFor],
  templateUrl: './farmers.component.html',
  styleUrl: './farmers.component.css',
})
export class FarmersComponent {
  private farmerService = inject(FarmerService);
  private jobService = inject(JobService);
  private router = inject(Router);

  villageFilter = signal('All');
  // ---- unique village list for dropdown ----
  villages = computed(() => {
    const all = this.farmerService.farmers().map((f) => f.village);
    return ['All', ...Array.from(new Set(all)).sort()];
  });

  searchTerm = signal('');

  jobsCount = computed(() => {
    return this.jobService.jobs().reduce<Record<number, number>>((acc, job) => {
      acc[job.farmerId] = (acc[job.farmerId] || 0) + 1;
      return acc;
    }, {});
  });

  // ---- filtered + sorted farmers ----
  farmers = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const village = this.villageFilter();

    return [...this.farmerService.farmers()]
      .filter((f) => {
        const matchesSearch = !search || f.name.toLowerCase().includes(search);
        const matchesVillage = village === 'All' || f.village === village;
        return matchesSearch && matchesVillage;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  // ---- summary stats ----
  totalFarmers = computed(() => this.farmers().length);

  totalPending = computed(() =>
    this.farmers().reduce((s, f) => s + f.pendingAmount, 0),
  );

  allPaidCount = computed(
    () => this.farmers().filter((f) => f.pendingAmount === 0).length,
  );

  // ---- actions ----
  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  onVillageChange(value: string): void {
    this.villageFilter.set(value);
  }

  goToFarmerJobs(farmerName: string): void {
    this.router.navigate(['/jobs'], { queryParams: { farmer: farmerName } });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
