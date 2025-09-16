import { inject } from '@angular/core';
import { AuthService } from './services/auth-service';
import { Router } from '@angular/router';
import { NotificationsService } from './services/notifications-service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationsService = inject(NotificationsService);

  if (!authService.userData()) {
    notificationsService.showToast('Please login to continue', false);
    router.navigate(['login']);
    return false;
  }

  return true;
};
