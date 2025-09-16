import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './services/auth-service';
import { inject } from '@angular/core';
import { SpinnerService } from './services/spinner-service';
import { catchError, EMPTY, finalize, switchMap, tap } from 'rxjs';
import { NotificationsService } from './services/notifications-service';

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  //In special cases like interceptors or guards we can inject in the functions
  const authService = inject(AuthService);
  const notificationsService = inject(NotificationsService);

  if (
    req.url.includes('login') ||
    req.url.includes('register') ||
    req.url.includes('refresh-token')
  )
    return next(req);

  if (!authService.userData()) return next(req);

  console.log('this is the req', req);

  const token = authService.userData().token;

  //We make a clone of the original http request as request are immutable and by cloning we set the value of the autorization header so that the jwt is sent back to the backend
  const clone = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(clone).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log('THIS IS THE CATCH ERROR DATA', err);

      if (err.status === 403) {
        //Attempt to refresh access token and call endpoint again
        return authService
          .refreshAccessToken(authService.userData().refreshToken)
          .pipe(
            catchError(() => {
              notificationsService.showToast(
                'Session Expired, please log in again to continue!',
                false,
              );
              authService.logoutFromClient();

              return EMPTY;
            }),
            //If refreshing is successfull, call the original endpoint again with the new access token
            switchMap((response) => {
              const newToken = response.headers.get('access-token');

              const newClone = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`),
              });
              //Attempt to fetch the original request using the updated token
              return next(newClone);
            }),
          );
      }

      return next(clone);
    }),
  );
};

export const spinnerInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const spinnerService = inject(SpinnerService);

  spinnerService.toggleSpinner(true);

  return next(req).pipe(finalize(() => spinnerService.toggleSpinner(false)));
};
