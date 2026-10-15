import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, defer, delay, of } from 'rxjs';

import { CreateTaskDto, Task, localIsoDate } from '../models/task.model';

const inDays = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return localIsoDate(date);
};

const SEED_TASKS: Task[] = [
  { id: 't-1', title: 'Definir la arquitectura vertical', description: 'Documentar slices, convenciones y límites entre features.', status: 'done', priority: 'high', dueDate: inDays(-3), createdAt: new Date().toISOString() },
  { id: 't-2', title: 'Configurar tema de Angular Material', description: 'Paleta Material 3, tipografía y modo oscuro.', status: 'in-progress', priority: 'medium', dueDate: inDays(1), createdAt: new Date().toISOString() },
  { id: 't-3', title: 'Integrar API de autenticación', description: 'Login, refresh token e interceptor.', status: 'pending', priority: 'high', dueDate: inDays(-1), createdAt: new Date().toISOString() },
  { id: 't-4', title: 'Escribir pruebas del store', description: 'Cubrir filtros, estadísticas y actualizaciones optimistas.', status: 'pending', priority: 'low', dueDate: inDays(7), createdAt: new Date().toISOString() },
];

@Injectable() // se provee en tasks.routes.ts, no en root: el slice es su propio dueño
export class TasksApiService {
  // Backend real: private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/tasks';
  private readonly latencyMs = 600;
  private db: Task[] = structuredClone(SEED_TASKS);

  getAll(): Observable<Task[]> {
    // return this.http.get<Task[]>(this.baseUrl);
    return this.simulate(() => structuredClone(this.db));
  }

  create(dto: CreateTaskDto): Observable<Task> {
    // return this.http.post<Task>(this.baseUrl, dto);
    return this.simulate(() => {
      const task: Task = { ...dto, id: crypto.randomUUID(), status: 'pending', createdAt: new Date().toISOString() };
      this.db = [task, ...this.db];
      return task;
    });
  }

  update(id: string, changes: Partial<Omit<Task, 'id'>>): Observable<Task> {
    // return this.http.patch<Task>(`${this.baseUrl}/${id}`, changes);
    return this.simulate(() => {
      const current = this.db.find((t) => t.id === id);
      if (!current) {
        throw new HttpErrorResponse({ status: 404, statusText: 'Not Found', url: `${this.baseUrl}/${id}` });
      }
      const updated: Task = { ...current, ...changes };
      this.db = this.db.map((t) => (t.id === id ? updated : t));
      return updated;
    });
  }

  delete(id: string): Observable<void> {
    // return this.http.delete<void>(`${this.baseUrl}/${id}`);
    return this.simulate(() => {
      this.db = this.db.filter((t) => t.id !== id);
    });
  }

  /** Ejecuta el "servidor" al suscribirse y responde tras la latencia simulada. */
  private simulate<T>(handler: () => T): Observable<T> {
    return defer(() => of(handler())).pipe(delay(this.latencyMs));
  }
}
