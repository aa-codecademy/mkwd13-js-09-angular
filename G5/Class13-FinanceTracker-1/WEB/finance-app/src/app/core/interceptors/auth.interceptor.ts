import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authService.getToken()}`),
    });

    return next(authReq).pipe(
      tap({
        error: (err) => {
          // TODO: Investigate: Maybe handle better when token expired or unauthorized
          if (err.status === 401) {
            authService.logout();

            // TODO: Implement refresh token
          }
        },
      })
    );
  }

  return next(req);
};
