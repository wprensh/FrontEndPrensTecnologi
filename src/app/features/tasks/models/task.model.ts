export type TaskStatus = 'pending' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskFilter = 'all' | TaskStatus;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // formato YYYY-MM-DD
  createdAt: string; // ISO 8601
}

/** Lo que envía el formulario al crear una tarea. */
export type CreateTaskDto = Pick<Task, 'title' | 'description' | 'priority' | 'dueDate'>;

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  'in-progress': 'En curso',
  done: 'Completada',
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

/** Fecha local en formato YYYY-MM-DD (evita desfases de zona horaria de toISOString). */
export function localIsoDate(date: Date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}
