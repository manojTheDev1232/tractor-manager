// src/app/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = signal<boolean>(false);
  isLoggedIn = this.loggedIn.asReadonly();

  constructor(private router: Router) {}

  login(phone: string, password: string): boolean {
    // Replace with real API call
    if (phone && password) {
      this.loggedIn.set(true);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.set(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  checkAuth(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
