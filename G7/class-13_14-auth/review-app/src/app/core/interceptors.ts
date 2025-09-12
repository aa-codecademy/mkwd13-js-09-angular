import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './services/auth-service';
import { inject } from '@angular/core';

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  if (
    req.url.includes('login') ||
    req.url.includes('register') ||
    req.url.includes('refresh-token')
  ) {
    return next(req);
  }

  if (!authService.userData()) {
    return next(req);
  }

  console.log('this is the req: ', req);

  const token = authService.userData().token;

  // IMPORTANT: HttpRequests in Angular are IMMUTABLE (cannot be modified directly)
  // To add headers (or any other modifications), we must CLONE the request.
  const clone = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(clone);
};
