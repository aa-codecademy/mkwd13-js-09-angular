import { inject, Injectable, signal } from '@angular/core';
import { AuthApiService } from './auth-api-service';
import { Router } from '@angular/router';
import {
  RegisterReq,
  User,
  UserCredentials,
} from '../../feature/auth/auth-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(AuthApiService);
  private router = inject(Router);

  constructor() {
    // Load any user info from localStorage (if the user was already logged in earlier).
    this.getUserFromLocalStorage();
  }

  userData = signal<User>(null);

  registerUser(req: RegisterReq) {
    this.apiService.registerUser(req).subscribe({
      next: () => {
        console.log('user registered');
        // after succesful registration - redirect to login page
        this.router.navigate(['login']);
      },
      error: (err) => console.log(err),
    });
  }

  loginUser(credentials: UserCredentials) {
    this.apiService.loginUser(credentials).subscribe({
      next: (res) => {
        // Extract tokens from response headers (sent by backend)
        const token = res.headers.get('access-token');
        const refreshToken = res.headers.get('refresh-token');

        this.userData.set({ ...res.body, token, refreshToken });

        this.saveUserInLocalStorage(this.userData());

        this.router.navigate(['']);
      },
      error: (err) => console.log(err),
    });
  }

  // Save user to localStorage (so login persists across refresh/browser call)
  saveUserInLocalStorage(userData: User) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  // Load user from localStorage
  getUserFromLocalStorage() {
    const userJSON = localStorage.getItem('userData');

    if (!userJSON) return;

    this.userData.set(JSON.parse(userJSON));
  }

  // Logout from the server (invalidate refresh token in backend)
  logoutFromServer() {
    this.apiService.logoutUser(this.userData().refreshToken).subscribe();
  }

  // Logout from client (clear the local storage)
  logoutFromClient() {
    this.userData.set(null); // clear the userData signal
    localStorage.removeItem('userData'); // clear local storage
    this.router.navigate(['login']); // send user back to the login page
  }
}
