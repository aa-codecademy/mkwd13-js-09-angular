import { AuthService } from './services/auth-service';
import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, finalize, switchMap } from 'rxjs';
import { NotificationsService } from './services/notifications-service';
import { LoaderService } from './services/loader-service';

// Interceptors are like middleware for HTTP requests.
// Every time you make an HTTP request with HttpClient,
// Angular runs your request through a chain of interceptors before sending it to the server.

// Interceptors can:
// Read/modify requests before they’re sent (e.g., add auth headers).
// Read/modify responses before they’re returned to your service/component.
// Handle errors globally (like automatically logging out on 401).
// Log all requests/responses.

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const notificationsService = inject(NotificationsService);

  // 2. Check if the request is going to login, register, or refresh-token endpoints.
  // If yes → we skip adding an Authorization header, since those endpoints don’t need a JWT.
  if (
    req.url.includes('login') ||
    req.url.includes('register') ||
    req.url.includes('refresh-token')
  ) {
    return next(req); // just forward the request as is
  }

  // 3. If the user is not logged in (no userData in AuthService),
  // also forward the request without adding a token.
  if (!authService.userData()) return next(req);

  console.log('this is the req', req);

  // 4. Otherwise, extract the JWT token from userData().
  const token = authService.userData().token;

  // 5. IMPORTANT: HttpRequests in Angular are IMMUTABLE (cannot be modified directly).
  // To add headers (or any modifications), we must CLONE the request.
  const clone = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  // When your API returns 403 Forbidden, it usually means your access token expired.
  // Instead of logging the user out immediately, we try to use the refresh token to get a new access token.
  // If refresh works - retry the request with the new token.
  // If refresh fails - log the user out.

  return next(clone).pipe(
    // catchError lets us "listen" for errors in the HTTP response
    catchError((err: HttpErrorResponse) => {
      // If the server says "403 Forbidden", it usually means the access token expired
      if (err.status === 403) {
        // Call the API to get a new access token using the refresh token
        return authService
          .refreshAccessToken(authService.userData().refreshToken)
          .pipe(
            // If refreshing fails (e.g. refresh token also expired), handle it here
            catchError(() => {
              // Show a notification to the user
              notificationsService.showToast(
                'Session Expired, Please Log In',
                false,
              );

              // Remove user data from client (force logout)
              authService.logoutFromClient();

              // Return EMPTY so the app doesn't crash (it completes the stream without emitting anything)
              return EMPTY;
            }),
            switchMap((response) => {
              // Extract the new access token from the response headers
              const newToken = response.headers.get('access-token');

              // Clone the original request, but replace the Authorization header with the new token
              const newClone = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`),
              });

              // Retry the original request, but this time with the new access token
              return next(newClone);
            }),
          );
      }

      // If the error was not 403, just continue as usual
      return next(clone);
    }),
  );
};

// This interceptor shows a loading spinner whenever HTTP request starts, and hides it when it finishes.
export const loaderInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const loaderService = inject(LoaderService);

  loaderService.toggleLoader(true);

  return next(req).pipe(finalize(() => loaderService.toggleLoader(false)));
};
