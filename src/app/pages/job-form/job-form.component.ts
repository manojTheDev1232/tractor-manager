import {
  Component,
  inject,
  signal,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { JobService } from '../../services/job.service';
import { FarmerService } from '../../services/farmer.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-form.component.html',
})
export class JobFormComponent implements OnInit {
  private jobService = inject(JobService);
  private farmerService = inject(FarmerService);

  farmers = this.farmerService.farmers;
  isVisible = signal(false);
  isEditMode = signal(false);
  editJobId = signal<number | null>(null);
  totalAmount = signal(0);

  jobForm = new FormGroup({
    farmerId: new FormControl<number | null>(null, Validators.required),
    acres: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0.1),
    ]),
    ratePerAcre: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    date: new FormControl('', Validators.required),
    status: new FormControl<'Paid' | 'Pending'>('Pending'),
    notes: new FormControl(''),
  });

  ngOnInit(): void {
    this.jobForm.get('acres')?.valueChanges.subscribe(() => this.calcTotal());
    this.jobForm
      .get('ratePerAcre')
      ?.valueChanges.subscribe(() => this.calcTotal());
  }

  open(job?: Job): void {
    this.jobForm.reset({ status: 'Pending' });
    this.totalAmount.set(0);

    if (job) {
      this.isEditMode.set(true);
      this.editJobId.set(job.id);
      this.jobForm.patchValue({
        farmerId: job.farmerId,
        acres: job.acres,
        ratePerAcre: job.ratePerAcre,
        date: job.date,
        status: job.status,
        notes: job.notes ?? '',
      });
      this.calcTotal();
    } else {
      this.isEditMode.set(false);
      this.editJobId.set(null);
    }

    this.isVisible.set(true);
  }

  close(): void {
    this.isVisible.set(false);
    this.jobForm.reset();
  }

  calcTotal(): void {
    const acres = this.jobForm.get('acres')?.value ?? 0;
    const rate = this.jobForm.get('ratePerAcre')?.value ?? 0;
    this.totalAmount.set((acres ?? 0) * (rate ?? 0));
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    const formVal = this.jobForm.value;
    const selectedFarmer = this.farmers().find(
      (f) => f.id === Number(formVal.farmerId),
    );

    const payload = {
      farmerId: Number(formVal.farmerId),
      farmerName: selectedFarmer?.name ?? '',
      acres: formVal.acres!,
      ratePerAcre: formVal.ratePerAcre!,
      date: formVal.date!,
      status: formVal.status as 'Paid' | 'Pending',
      notes: formVal.notes ?? '',
    };

    if (this.isEditMode() && this.editJobId()) {
      this.jobService.update(this.editJobId()!, payload);
    } else {
      this.jobService.add(payload);
    }

    this.close();
  }

  isInvalid(field: string): boolean {
    const c = this.jobForm.get(field);
    return !!(c?.invalid && c?.touched);
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('dialog-overlay')) {
      this.close();
    }
  }
}
