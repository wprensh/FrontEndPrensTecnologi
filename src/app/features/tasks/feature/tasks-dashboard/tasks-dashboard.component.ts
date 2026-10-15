import { ChangeDetectionStrategy, Component, OnInit, computed, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TasksStore } from '../../data-access/tasks.store';
import { TaskFilter } from '../../models/task.model';
import { TaskCardComponent } from '../../ui/task-card/task-card.component';
import { TaskFormDialogComponent } from '../../ui/task-form-dialog/task-form-dialog.component';

type ViewState = 'loading' | 'error' | 'ready';

@Component({
  selector: 'app-tasks-dashboard',
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    TaskCardComponent,
  ],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksDashboardComponent implements OnInit {
  protected readonly store = inject(TasksStore);
  private readonly dialog = inject(MatDialog);
  private readonly title = inject(Title);

  protected readonly filterOptions: { value: TaskFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'in-progress', label: 'En curso' },
    { value: 'done', label: 'Completadas' },
  ];

  protected readonly viewState = computed<ViewState>(() => {
    if (this.store.loading() && this.store.tasks().length === 0) return 'loading';
    if (this.store.error()) return 'error';
    return 'ready';
  });

  protected readonly statCards = computed(() => {
    const s = this.store.stats();
    return [
      { label: 'Total', value: s.total, icon: 'list_alt' },
      { label: 'Pendientes', value: s.pending, icon: 'radio_button_unchecked' },
      { label: 'En curso', value: s.inProgress, icon: 'autorenew' },
      { label: 'Completadas', value: s.done, icon: 'check_circle' },
    ];
  });

  // Efecto: el título de la pestaña muestra las tareas abiertas
  private readonly syncTitle = effect(() => {
    const { pending, inProgress } = this.store.stats();
    this.title.setTitle(`(${pending + inProgress}) Tareas | PrensTecnologi`);
  });

  ngOnInit(): void {
    this.store.load();
  }

  protected openCreateDialog(): void {
    this.dialog
      .open(TaskFormDialogComponent, { width: '520px', maxWidth: '95vw', autoFocus: 'first-tabbable' })
      .afterClosed()
      .subscribe((dto) => {
        if (dto) this.store.add(dto);
      });
  }
}
