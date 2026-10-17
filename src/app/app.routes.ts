import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Prens Tecnologi',
    loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'servicios',
    title: 'Servicios · Prens Tecnologi',
    loadChildren: () => import('./features/services/services.routes').then((m) => m.SERVICES_ROUTES),
  },
  {
    path: 'contacto',
    title: 'Contacto · Prens Tecnologi',
    loadChildren: () => import('./features/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
  },
  {
    path: 'tareas',
    title: 'Tareas',
    loadChildren: () => import('./features/tasks/tasks.routes').then((m) => m.TASKS_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
