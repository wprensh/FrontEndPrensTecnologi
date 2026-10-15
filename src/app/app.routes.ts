import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tareas' },
  {
    path: 'tareas',
    title: 'Tareas',
    loadChildren: () => import('./features/tasks/tasks.routes').then((m) => m.TASKS_ROUTES),
  },
  // { path: 'productos', loadChildren: () => import('./features/products/products.routes').then((m) => m.PRODUCTS_ROUTES) },
  { path: '**', redirectTo: 'tareas' },
];
