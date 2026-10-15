import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { routes } from './app.routes';
import { errorInterceptor } from './core/http/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Rutas: parámetros de ruta como input() y transiciones nativas entre vistas
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),

    // HttpClient con fetch e interceptores funcionales
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor])),

    // Animaciones de Angular Material (carga diferida)
    provideAnimationsAsync(),

    // Opciones globales de Material
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
};
