import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CreateTaskDto, TASK_PRIORITY_LABELS, TaskPriority, localIsoDate } from '../../models/task.model';

@Component({
  selector: 'app-task-form-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 mat-dialog-title>Nueva tarea</h2>
    <form [formGroup]="form" (ngSubmit)="save()">
      <mat-dialog-content class="fields">
        <mat-form-field>
          <mat-label>Título</mat-label>
          <input matInput formControlName="title" maxlength="80" cdkFocusInitial />
          @if (form.controls.title.hasError('required')) {
            <mat-error>El título es obligatorio</mat-error>
          }
        </mat-form-field>

        <mat-form-field>
          <mat-label>Descripción</mat-label>
          <textarea matInput formControlName="description" rows="3" maxlength="300"></textarea>
        </mat-form-field>

        <div class="row">
          <mat-form-field>
            <mat-label>Prioridad</mat-label>
            <mat-select formControlName="priority">
              @for (option of priorities; track option.value) {
                <mat-option [value]="option.value">{{ option.label }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Fecha límite</mat-label>
            <input matInput formControlName="dueDate" [matDatepicker]="picker" [min]="minDate" />
            <mat-datepicker-toggle matIconSuffix [for]="picker" />
            <mat-datepicker #picker />
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" mat-dialog-close>Cancelar</button>
        <button mat-flat-button type="submit">Crear tarea</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: `
    .fields { display: flex; flex-direction: column; gap: 4px; padding-top: 8px; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    @media (max-width: 600px) { .row { grid-template-columns: 1fr; } }
  `,
})
export class TaskFormDialogComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject<MatDialogRef<TaskFormDialogComponent, CreateTaskDto>>(MatDialogRef);

  protected readonly minDate = new Date();
  protected readonly priorities = (Object.keys(TASK_PRIORITY_LABELS) as TaskPriority[]).map((value) => ({
    value,
    label: TASK_PRIORITY_LABELS[value],
  }));

  protected readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', Validators.maxLength(300)],
    priority: this.fb.control<TaskPriority>('medium'),
    dueDate: this.fb.control<Date>(new Date(), Validators.required),
  });

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, description, priority, dueDate } = this.form.getRawValue();
    this.dialogRef.close({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: localIsoDate(dueDate),
    });
  }
}
