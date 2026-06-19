import { Component, inject } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css',
})
export class JobFormComponent {
  private farmerService = inject(FarmerService);
  farmerList = this.farmerService.getAll();

  currentDate = new Date();
}
