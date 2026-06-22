import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-farmers',
  standalone: true,
  imports: [NgFor, DecimalPipe, NgIf],
  templateUrl: './farmers.component.html',
  styleUrl: './farmers.component.css',
})
export class FarmersComponent {
  private farmerService = inject(FarmerService);
  private router = inject(Router);

  farmers = computed(() =>
    [...this.farmerService.farmers()].sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
  );
  searchTerm = signal('');

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
  filteredJobs = computed(() => {
    const search = this.searchTerm().toLowerCase();

    // Return all jobs if search is empty
    if (!search) return this.farmers();

    // Filter based on farmerName
    return this.farmers().filter((job) =>
      job.name.toLowerCase().includes(search),
    );
  });

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  goToFarmerJobs(farmerName: string): void {
    this.router.navigate(['/jobs'], { queryParams: { farmer: farmerName } });
  }
}
