import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../models/task.model';

const DAY_MS = 86_400_000;

@Pipe({ name: 'taskDueLabel' })
export class TaskDueLabelPipe implements PipeTransform {
  transform(dueDate: string, status: TaskStatus): string {
    if (status === 'done') return 'Completada';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(`${dueDate}T00:00:00`);
    const days = Math.round((due.getTime() - today.getTime()) / DAY_MS);

    if (days < 0) return `Vencida hace ${-days} día${days === -1 ? '' : 's'}`;
    if (days === 0) return 'Vence hoy';
    if (days === 1) return 'Vence mañana';
    return `Vence en ${days} días`;
  }
}
