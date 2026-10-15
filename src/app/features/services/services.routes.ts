import { Routes } from '@angular/router';

export const SERVICES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/services-page/services-page.component').then((m) => m.ServicesPageComponent),
  },
];
