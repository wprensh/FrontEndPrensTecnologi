import { Directive, computed, input } from '@angular/core';
import { TaskPriority } from '../models/task.model';

const ACCENTS: Record<TaskPriority, string> = {
  high: 'var(--mat-sys-error)',
  medium: 'var(--mat-sys-tertiary)',
  low: 'var(--mat-sys-outline)',
};

@Directive({
  selector: '[appPriorityAccent]',
  host: {
    '[style.--task-accent]': 'accent()',
    '[class.is-high-priority]': "appPriorityAccent() === 'high'",
  },
})
export class PriorityAccentDirective {
  readonly appPriorityAccent = input.required<TaskPriority>();
  protected readonly accent = computed(() => ACCENTS[this.appPriorityAccent()]);
}
