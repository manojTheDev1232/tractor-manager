import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmers',
  standalone: true,
  imports: [NgFor, DecimalPipe],
  templateUrl: './farmers.component.html',
  styleUrl: './farmers.component.css',
})
export class FarmersComponent {
  private farmerService = inject(FarmerService);

  farmers = this.farmerService.farmers;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
}
