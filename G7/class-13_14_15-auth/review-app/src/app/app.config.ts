import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, loaderInterceptor } from './core/interceptors';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Interceptor order matters - multiple interceptors run in the order they are provided.
    provideHttpClient(withInterceptors([authInterceptor, loaderInterceptor])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-left',
    }),
  ],
};
