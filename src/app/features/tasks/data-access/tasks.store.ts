import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

import { CreateTaskDto, Task, TaskFilter, TaskStatus } from '../models/task.model';
import { TasksApiService } from './tasks-api.service';

const FILTER_KEY = 'tasks.filter';
const FILTERS: TaskFilter[] = ['all', 'pending', 'in-progress', 'done'];

function readStoredFilter(): TaskFilter {
  const stored = localStorage.getItem(FILTER_KEY) as TaskFilter | null;
  return stored && FILTERS.includes(stored) ? stored : 'all';
}

@Injectable()
export class TasksStore {
  private readonly api = inject(TasksApiService);
  private readonly snackBar = inject(MatSnackBar);

  // Estado privado (escritura solo desde el store)
  private readonly _tasks = signal<Task[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // Estado de UI que la vista puede escribir directamente
  readonly filter = signal<TaskFilter>(readStoredFilter());
  readonly search = signal('');

  // Lectura pública
  readonly tasks = this._tasks.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Estado derivado
  readonly filteredTasks = computed(() => {
    const filter = this.filter();
    const term = this.search().trim().toLowerCase();
    return this._tasks().filter(
      (t) =>
        (filter === 'all' || t.status === filter) &&
        (!term || t.title.toLowerCase().includes(term) || t.description.toLowerCase().includes(term)),
    );
  });

  readonly stats = computed(() => {
    const tasks = this._tasks();
    const count = (status: TaskStatus) => tasks.filter((t) => t.status === status).length;
    const done = count('done');
    return {
      total: tasks.length,
      pending: count('pending'),
      inProgress: count('in-progress'),
      done,
      progress: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
    };
  });

  // Efecto: recuerda el filtro elegido entre visitas
  private readonly persistFilter = effect(() => localStorage.setItem(FILTER_KEY, this.filter()));

  load(): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .getAll()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (tasks) => this._tasks.set(tasks),
        error: () => this._error.set('No se pudieron cargar las tareas.'),
      });
  }

  add(dto: CreateTaskDto): void {
    this.api.create(dto).subscribe({
      next: (task) => {
        this._tasks.update((tasks) => [task, ...tasks]);
        this.notify('Tarea creada');
      },
      error: () => this.notify('No se pudo crear la tarea'),
    });
  }

  /** Actualización optimista: la UI cambia al instante y se revierte si falla. */
  changeStatus(id: string, status: TaskStatus): void {
    const previous = this._tasks();
    this._tasks.update((tasks) => tasks.map((t) => (t.id === id ? { ...t, status } : t)));
    this.api.update(id, { status }).subscribe({
      error: () => {
        this._tasks.set(previous);
        this.notify('No se pudo actualizar la tarea');
      },
    });
  }

  remove(id: string): void {
    const previous = this._tasks();
    this._tasks.update((tasks) => tasks.filter((t) => t.id !== id));
    this.api.delete(id).subscribe({
      next: () => this.notify('Tarea eliminada'),
      error: () => {
        this._tasks.set(previous);
        this.notify('No se pudo eliminar la tarea');
      },
    });
  }

  private notify(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}
