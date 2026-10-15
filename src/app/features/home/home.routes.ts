import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
];
