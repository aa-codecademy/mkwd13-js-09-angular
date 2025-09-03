import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const isAdmin = authService.isAdmin();
  if (isAdmin) return true;

  router.navigate(['/access-denied']);
  return false;
};

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const isAdmin = authService.isAdmin();
  const isUser = authService.isUser();

  if (isAdmin || isUser) return true;

  router.navigate(['/access-denied']);
  return false;
};
