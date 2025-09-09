import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// The main config object for our Angular application.
// This is used to set up providers and core services for the app.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Sets up the Angular Router with the application's route definitions.
    // The 'routes' object imported above defines all the navigation paths and their associated components
    provideRouter(routes),
    // We need to provide the http client here for the application to be able to use it
    provideHttpClient(),
  ],
};
