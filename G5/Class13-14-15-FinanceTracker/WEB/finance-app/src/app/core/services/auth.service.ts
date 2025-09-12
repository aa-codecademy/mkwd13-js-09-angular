import { inject, Injectable, signal } from '@angular/core';
import { AuthResponse, LoginDto, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3001';
  private readonly TOKEN_KEY = 'budget_app_token';
  private readonly USER_KEY = 'budget_app_user_me';

  private http = inject(HttpClient);
  private router = inject(Router);

  // Signals for reactive state management
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<User | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    const user = this.getUserFromStorage();

    this.currentUser.set(user);
    // TODO: Here get the token
    this.isAuthenticated.set(!!user);
  }

  login(creadentials: LoginDto) {
    this.error.set(null);
    this.isLoading.set(true);

    this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, creadentials).subscribe({
      next: (data) => {
        this.handleAuthSuccess(data);
        this.isLoading.set(false);
        this.router.navigate(['/budgets']);
      },
      error: (error) => {
        this.error.set(error.error.message);
        console.error(error);
      },
    });
  }

  private handleAuthSuccess(response: AuthResponse) {
    localStorage.setItem(this.TOKEN_KEY, response.access_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));

    this.isAuthenticated.set(true);
    this.currentUser.set(response.user);
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);

    return userJson ? JSON.parse(userJson) : null;
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
