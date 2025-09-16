import { inject } from '@angular/core';
import { AuthService } from './services/auth-service';
import { Router } from '@angular/router';
import { NotificationsService } from './services/notifications-service';

// A guard in Angular is like a security checkpoint before the user enters a route (page).
// We need it to prevent unauthenticated users from accessing private routes.
// Even if someone manually types the URL in the browser, the guard will stop them.

// A guard function that decides if a route can be activated (entered)
export const authGuard = () => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationsService);
  const router = inject(Router);

  if (!authService.userData()) {
    router.navigate(['login']);
    notificationService.showToast("You're not logged in.", false);

    // Returning false means: "Stop navigation, do not enter this route."
    return false;
  }

  // If userData exists - user is logged in - allow access to the route.
  return true;
};
