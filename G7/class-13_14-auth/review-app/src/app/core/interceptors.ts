import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './services/auth-service';
import { inject } from '@angular/core';

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

  // Check if the request is going to login, register, or refresh-token endpoints.
  // If yes - we skip adding an Authorization header, since those endpoints don’t need a JWT.
  if (
    req.url.includes('login') ||
    req.url.includes('register') ||
    req.url.includes('refresh-token')
  ) {
    return next(req);
  }

  // If the user is not logged in (no userData in AuthService),
  // also forward the request without adding a token.
  if (!authService.userData()) {
    return next(req);
  }

  console.log('this is the req: ', req);

  // Otherwise, extract the JWT token from userData().
  const token = authService.userData().token;

  // IMPORTANT: HttpRequests in Angular are IMMUTABLE (cannot be modified directly)
  // To add headers (or any other modifications), we must CLONE the request.
  const clone = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  // Pass the cloned request (with the Authorization header) to the next handler.
  return next(clone);
};
