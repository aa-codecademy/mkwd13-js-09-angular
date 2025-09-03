import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('WE ARE IN INTERCEPTOR', req);
  const authService = inject(AuthService);
  const token = authService.getToken()?.token;
  console.log(token);

  if (token && authService.isLoggedIn()) {
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    console.log(authRequest);
    return next(authRequest);
  }

  return next(req);
};
