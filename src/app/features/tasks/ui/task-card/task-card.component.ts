import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { TASK_PRIORITY_LABELS, TASK_STATUS_LABELS, Task, TaskStatus, localIsoDate } from '../../models/task.model';
import { PriorityAccentDirective } from '../priority-accent.directive';
import { TaskDueLabelPipe } from '../task-due-label.pipe';

@Component({
  selector: 'app-task-card',
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatButtonModule, MatMenuModule, TaskDueLabelPipe, PriorityAccentDirective],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  readonly task = input.required<Task>();
  readonly statusChange = output<TaskStatus>();
  readonly removeTask = output<void>();

  protected readonly statusOptions: TaskStatus[] = ['pending', 'in-progress', 'done'];
  protected readonly statusLabels = TASK_STATUS_LABELS;
  protected readonly priorityLabels = TASK_PRIORITY_LABELS;
  protected readonly statusIcons: Record<TaskStatus, string> = {
    pending: 'radio_button_unchecked',
    'in-progress': 'autorenew',
    done: 'check_circle',
  };

  protected readonly isOverdue = computed(() => {
    const task = this.task();
    return task.status !== 'done' && task.dueDate < localIsoDate();
  });
}
