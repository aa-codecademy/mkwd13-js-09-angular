import { inject, Injectable, signal } from '@angular/core';
import { AuthApiService } from './auth-api-service';
import { Router } from '@angular/router';
import {
  RegisterReq,
  User,
  UserCredentials,
} from '../../feature/auth/auth-model';
import { NotificationsService } from './notifications-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(AuthApiService);
  private router = inject(Router);
  private notificationsService = inject(NotificationsService);

  userData = signal<User>(null);

  constructor() {
    this.getUserFromLocalStorage();
  }

  registerUser(req: RegisterReq) {
    this.apiService.registerUser(req).subscribe({
      next: () => {
        console.log('user registered');
        this.notificationsService.showToast(
          'Successfully registered, please log in with your new account!',
          true,
        );
        this.router.navigate(['login']);
      },
      error: (err) => console.log(err),
    });
  }

  loginUser(credentials: UserCredentials) {
    this.apiService.loginUser(credentials).subscribe({
      next: (res) => {
        const token = res.headers.get('access-token');
        const refreshToken = res.headers.get('refresh-token');

        this.userData.set({ ...res.body, token, refreshToken });

        this.saveUserInLocalStorage(this.userData());

        this.router.navigate(['']);
      },
      error: (err) =>
        this.notificationsService.showToast(err.error.message, false),
    });
  }

  saveUserInLocalStorage(userData: User) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserFromLocalStorage() {
    const userJSON = localStorage.getItem('userData');

    if (!userJSON) return;

    this.userData.set(JSON.parse(userJSON));
  }

  logoutFromServer() {
    this.apiService.logoutUser(this.userData().refreshToken).subscribe();
  }

  logoutFromClient() {
    this.userData.set(null);
    localStorage.removeItem('userData');
    this.router.navigate(['login']);
  }

  refreshAccessToken(refreshToken: string) {
    return this.apiService.refreshAccessToken(refreshToken).pipe(
      tap((response) => {
        console.log('this is from the tap in the auth', response);
        const token = response.headers.get('access-token');
        const refreshToken = response.headers.get('refresh-token');

        this.userData.update((prevData) => ({
          ...prevData,
          token,
          refreshToken,
        }));

        this.saveUserInLocalStorage(this.userData());
      }),
    );
  }
}
