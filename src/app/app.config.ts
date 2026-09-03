import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// No zone.js in package.json -> this repo runs zoneless. All state in this app is
// signal-driven (ScrollSpyService, hero-scene hover/rotation, active nav link), so
// change detection is scheduled automatically whenever a signal read in a template
// changes — no manual markForCheck() needed anywhere.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
