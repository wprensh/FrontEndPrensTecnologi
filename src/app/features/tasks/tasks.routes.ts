import { Routes } from '@angular/router';

import { TasksApiService } from './data-access/tasks-api.service';
import { TasksStore } from './data-access/tasks.store';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    providers: [TasksApiService, TasksStore],
    loadComponent: () =>
      import('./feature/tasks-dashboard/tasks-dashboard.component').then((m) => m.TasksDashboardComponent),
  },
];
