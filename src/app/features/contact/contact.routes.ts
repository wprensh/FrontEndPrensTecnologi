import { Routes } from '@angular/router';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/contact-page/contact-page.component').then((m) => m.ContactPageComponent),
  },
];
