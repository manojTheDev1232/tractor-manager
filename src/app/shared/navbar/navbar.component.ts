import {
  Component,
  inject,
  signal,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { JobService } from '../../services/job.service';
import { JobFormComponent } from '../../pages/job-form/job-form.component';
import { DieselFormComponent } from '../../pages/diesel-form/diesel-form.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    JobFormComponent,
    DieselFormComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('jobFormRef') jobFormRef!: JobFormComponent;
  @ViewChild('dieselFormRef') dieselFormRef!: DieselFormComponent;

  private authService = inject(AuthService);
  private jobService = inject(JobService);

  sidebarOpen = signal(false);
  pendingCount = signal(0);
  jobsCount = signal(0);

  constructor() {
    // update counts reactively
    this.jobsCount.set(this.jobService.getAll().length);
    this.pendingCount.set(this.jobService.getPendingJobs().length);
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  openAddJob(): void {
    this.jobFormRef.open();
    this.closeSidebar();
  }

  openAddDiesel(): void {
    this.dieselFormRef.open();
    this.closeSidebar();
  }

  logout(): void {
    this.authService.logout();
  }

  // close sidebar on ESC key
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeSidebar();
  }
}
