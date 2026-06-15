import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JobsListComponent } from './pages/jobs-list/jobs-list.component';
import { JobFormComponent } from './pages/job-form/job-form.component';
import { DieselFormComponent } from './pages/diesel-form/diesel-form.component';
import { DieselListComponent } from './pages/diesel-list/diesel-list.component';
import { FarmersComponent } from './pages/farmers/farmers.component';
import { PendingPaymentsComponent } from './pages/pending-payments/pending-payments.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'jobs', component: JobsListComponent },
  { path: 'jobs/add', component: JobFormComponent },
  { path: 'jobs/edit/:id', component: JobFormComponent },
  { path: 'diesel', component: DieselListComponent },
  { path: 'diesel/add', component: DieselFormComponent },
  { path: 'diesel/edit/:id', component: DieselFormComponent },
  { path: 'farmers', component: FarmersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'pending-payments', component: PendingPaymentsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
