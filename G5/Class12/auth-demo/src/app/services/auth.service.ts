import { inject, Injectable } from '@angular/core';
import {
  AuthToken,
  LoginCrentials,
  User,
  UserRole,
  UserWithPassword,
} from '../models/user.interface';
import { Observable } from 'rxjs';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // HARDCODED USERS
  private readonly DEMO_USERS: UserWithPassword[] = [
    { id: '1', username: 'user', password: 'user123', role: UserRole.USER },
    { id: '2', username: 'john', password: 'john123', role: UserRole.USER },
    { id: '3', username: 'admin', password: 'admin123', role: UserRole.ADMIN },
  ];

  private authStore = inject(AuthStore);

  constructor() {
    this.authStore.loadFromStorage();
  }

  isLoggedIn() {
    return this.authStore.isLoggedIn();
  }

  login(creadentials: LoginCrentials): Observable<{ user: User; token: AuthToken }> {
    this.authStore.setIsLoading(true);
    this.authStore.setError(null);

    // MOCKING API REQUEST (MIMICING THE BACKEND RESPONSE)
    return new Observable((observer) => {
      setTimeout(() => {
        const foundUser = this.DEMO_USERS.find(
          (user) =>
            user.username === creadentials.username && user.password === creadentials.password
        );

        if (foundUser) {
          const user: User = {
            id: foundUser.id,
            username: foundUser.username,
            role: foundUser.role,
          };
          // TOKENS ARE GENERATED ON THE BACKEND
          const token: AuthToken = {
            token: 'DUMMY_TOKEN',
            expiresAt: new Date(new Date().getTime() + 60 * 60 * 24 * 1000), // 24hrs from now
          };

          this.authStore.login(user, token);
          observer.next({ user, token });
          observer.complete();
        } else {
          const error = 'Invalid credentials';
          this.authStore.setError(error);
          this.authStore.setIsLoading(false);
          observer.error(new Error(error));
        }
      }, 1000); // 1s delay to simulate api request
    });
  }

  isAdmin() {
    return this.authStore.isAdmin();
  }

  isUser() {
    return this.authStore.isUser();
  }

  getToken() {
    return this.authStore.token();
  }

  logout() {
    this.authStore.logout();
  }
}
