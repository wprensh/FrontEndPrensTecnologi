import { inject } from '@angular/core';
import { CanMatchFn, ResolveFn, Router, Routes, UrlSegment } from '@angular/router';

import { findService } from './data-access/services.content';

// Solo entra a la página de detalle un id del catálogo; cualquier otro vuelve al listado.
const knownService: CanMatchFn = (_route, segments: UrlSegment[]) =>
  findService(segments[0]?.path) ? true : inject(Router).createUrlTree(['/servicios']);

const serviceTitle: ResolveFn<string> = (route) => `${findService(route.paramMap.get('id'))?.title} · Prens Tecnologi`;

export const SERVICES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/services-page/services-page.component').then((m) => m.ServicesPageComponent),
  },
  {
    path: ':id',
    canMatch: [knownService],
    title: serviceTitle,
    loadComponent: () =>
      import('./feature/service-detail-page/service-detail-page.component').then((m) => m.ServiceDetailPageComponent),
  },
];
