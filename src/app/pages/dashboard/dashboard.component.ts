// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { DieselService } from '../../services/diesel.service';
import { SummaryService } from '../../services/summary.service';
import { DecimalPipe } from '@angular/common';
import {
  NgbNavContent,
  NgbNav,
  NgbNavItem,
  NgbNavItemRole,
  NgbNavLinkButton,
  NgbNavLinkBase,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { JobFormComponent } from '../job-form/job-form.component';
import { JobsListComponent } from '../jobs-list/jobs-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    DecimalPipe,
    SidebarComponent,
    RouterOutlet,
    JobFormComponent,
    JobsListComponent,
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  summary: any;
  recentJobs: any;
  recentDiesel: any;
  weeklyTrend: any;
  active = 1;

  constructor(
    private jobService: JobService,
    private dieselService: DieselService,
    private summaryService: SummaryService,
  ) {
    this.summary = this.summaryService.summary;
    this.recentJobs = this.jobService.jobs;
    this.recentDiesel = this.dieselService.purchases;
    this.weeklyTrend = this.summaryService.getWeeklyTrend();
  }
}
