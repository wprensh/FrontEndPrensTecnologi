import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { map } from 'rxjs';

import { CONTACT } from '../../../../shared/brand/contact';
import { contactForm, fieldError } from '../../data-access/contact-form';
import { ContactService } from '../../data-access/contact.service';
import { CONTACT_INTERESTS } from '../../models/contact.model';

type Field = keyof ReturnType<typeof contactForm>['controls'];

const STEP_FIELDS: Field[][] = [['interest'], ['name', 'email', 'company', 'phone'], ['message']];

// Opción 3, Por pasos: servicio, datos y mensaje, uno a la vez, con un resumen antes de enviar
@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatStepperModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <header class="intro">
        <span class="eyebrow">Contacto</span>
        <h1>Hablemos de su proyecto.</h1>
        <p class="lead">Tres pasos y le respondemos en menos de un día hábil.</p>
      </header>

      @if (sent()) {
        <div class="sent" role="status">
          <mat-icon aria-hidden="true">check_circle</mat-icon>
          <h2>Su mensaje está listo.</h2>
          <p>Abrimos su aplicación de correo con todo diligenciado; solo falta pulsar Enviar. Si no se abrió, escríbanos a {{ contact.email }}.</p>
          <button mat-stroked-button type="button" (click)="reset()">Escribir otro mensaje</button>
        </div>
      } @else {
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <mat-stepper linear [orientation]="vertical() ? 'vertical' : 'horizontal'" #stepper>
            <mat-step label="Servicio" [completed]="isValid(0)">
              <p class="step-title">¿En qué podemos ayudarle?</p>
              <div class="options" role="radiogroup" aria-label="Servicio de interés">
                @for (interest of interests; track interest) {
                  <button type="button" role="radio" class="option" [attr.aria-checked]="form.controls.interest.value === interest" (click)="choose(interest)">
                    {{ interest }}
                  </button>
                }
              </div>
              @if (form.controls.interest.touched && form.controls.interest.invalid) {
                <p class="step-error" role="alert">Elija una opción para continuar.</p>
              }
            </mat-step>

            <mat-step label="Sus datos" [completed]="isValid(1)">
              <!-- Contenido diferido: los campos se crean visibles y el borde con etiqueta se dibuja bien -->
              <ng-template matStepContent>
                <div class="grid">
                  <mat-form-field>
                    <mat-label>Nombre</mat-label>
                    <input matInput formControlName="name" autocomplete="name" />
                    <mat-error>{{ error('name') }}</mat-error>
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Correo</mat-label>
                    <input matInput type="email" formControlName="email" autocomplete="email" />
                    <mat-error>{{ error('email') }}</mat-error>
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Empresa (opcional)</mat-label>
                    <input matInput formControlName="company" autocomplete="organization" />
                    <mat-error>{{ error('company') }}</mat-error>
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Teléfono (opcional)</mat-label>
                    <input matInput type="tel" formControlName="phone" autocomplete="tel" />
                    <mat-error>{{ error('phone') }}</mat-error>
                  </mat-form-field>
                </div>
                <div class="nav">
                  <button mat-button type="button" matStepperPrevious>Atrás</button>
                  <button mat-flat-button class="next" type="button" (click)="next(1)">Siguiente</button>
                </div>
              </ng-template>
            </mat-step>

            <mat-step label="Mensaje">
              <ng-template matStepContent>
                <mat-form-field class="message">
                  <mat-label>Cuéntenos su proyecto</mat-label>
                  <textarea matInput formControlName="message" rows="6"></textarea>
                  <mat-hint align="end">{{ form.controls.message.value.length }} / 1500</mat-hint>
                  <mat-error>{{ error('message') }}</mat-error>
                </mat-form-field>
                <dl class="summary">
                  <div><dt>Servicio</dt><dd>{{ form.controls.interest.value }}</dd></div>
                  <div><dt>Contacto</dt><dd>{{ form.controls.name.value }} · {{ form.controls.email.value }}</dd></div>
                </dl>
                <div class="nav">
                  <button mat-button type="button" matStepperPrevious>Atrás</button>
                  <button mat-flat-button class="cta" type="submit">Enviar mensaje</button>
                </div>
              </ng-template>
            </mat-step>
          </mat-stepper>
        </form>
      }

      <footer class="channels">
        <a [href]="'mailto:' + contact.email"><mat-icon aria-hidden="true">mail</mat-icon>{{ contact.email }}</a>
        <span><mat-icon aria-hidden="true">call</mat-icon>{{ contact.phone }}</span>
        <span><mat-icon aria-hidden="true">location_on</mat-icon>{{ contact.city }}</span>
      </footer>
    </div>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host { display: block; }
    .page { padding: 40px 32px 32px; background: #fff; border: 1px solid var(--brand-line); }
    h1 { margin: 8px 0 0; font-size: 40px; line-height: 1.12; font-weight: 600; letter-spacing: -0.02em; color: var(--brand-navy); }
    .lead { margin: 10px 0 0; font-size: 17px; color: var(--brand-ink); }

    form { margin-top: 28px; }
    mat-stepper {
      background: transparent;
      @include mat.stepper-overrides((
        container-color: transparent,
        header-selected-state-icon-background-color: var(--brand-navy),
        header-done-state-icon-background-color: var(--brand-ochre),
        header-edit-state-icon-background-color: var(--brand-ochre),
        header-icon-background-color: var(--brand-line),
        header-icon-foreground-color: var(--brand-navy),
      ));
    }

    .step-title { margin: 8px 0 16px; font-size: 18px; font-weight: 600; color: var(--brand-navy); }
    .options { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .option {
      min-height: 56px; padding: 12px 16px; border: 1px solid var(--brand-line); background: #fff;
      text-align: left; font: inherit; font-size: 15px; font-weight: 500; color: var(--brand-navy); cursor: pointer;
      transition: border-color 150ms ease, background 150ms ease;
    }
    .option:hover { border-color: var(--brand-navy); }
    .option[aria-checked='true'] { border-color: var(--brand-navy); background: var(--brand-navy); color: #fff; box-shadow: inset 4px 0 0 var(--brand-yellow); }
    .option:focus-visible { outline: 2px solid var(--brand-yellow); outline-offset: 2px; }
    .step-error { margin: 10px 0 0; font-size: 12px; color: var(--mat-sys-error); }

    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 16px; margin-top: 8px; }
    .message { width: 100%; margin-top: 8px; }

    .summary { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin: 8px 0 0; padding: 16px; background: var(--brand-paper); }
    .summary dt { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--brand-ochre); }
    .summary dd { margin: 4px 0 0; font-size: 15px; color: var(--brand-navy); overflow-wrap: anywhere; }

    .nav { display: flex; justify-content: space-between; margin-top: 20px; }
    .next, .cta { height: 46px; min-width: 160px; font-weight: 600; @include mat.button-overrides((filled-container-shape: 2px)); }
    .next { @include mat.button-overrides((filled-container-color: var(--brand-navy), filled-label-text-color: #fff)); }
    .cta { @include mat.button-overrides((filled-container-color: var(--brand-yellow), filled-label-text-color: var(--brand-navy))); }

    .sent { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; margin-top: 32px; }
    .sent mat-icon { width: 44px; height: 44px; font-size: 44px; color: var(--brand-ochre); }
    .sent h2 { margin: 0; font-size: 26px; font-weight: 600; color: var(--brand-navy); }
    .sent p { max-width: 460px; margin: 0 0 8px; font-size: 15px; line-height: 1.6; color: var(--brand-ink); }

    .channels {
      display: flex; flex-wrap: wrap; gap: 12px 28px; margin-top: 32px; padding-top: 20px;
      border-top: 1px solid var(--brand-line); font-size: 14px; color: var(--brand-ink);
    }
    .channels a, .channels span { display: inline-flex; gap: 8px; align-items: center; color: inherit; text-decoration: none; }
    .channels mat-icon { width: 18px; height: 18px; font-size: 18px; color: var(--brand-ochre); }

    @media (max-width: 760px) {
      .options { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid, .summary { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .page { padding: 28px 16px 16px; }
      h1 { font-size: 30px; }
      .options { grid-template-columns: 1fr; }
      .channels { flex-direction: column; }
    }
  `,
})
export class ContactPageComponent {
  private readonly contactService = inject(ContactService);
  private readonly stepper = viewChild<MatStepper>('stepper');

  protected readonly contact = CONTACT;
  protected readonly interests = CONTACT_INTERESTS;
  protected readonly form = contactForm();
  protected readonly sent = signal(false);
  protected readonly vertical = toSignal(
    inject(BreakpointObserver).observe('(max-width: 600px)').pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  protected error(field: Field): string {
    return fieldError(this.form, field);
  }

  protected isValid(step: number): boolean {
    return STEP_FIELDS[step].every((field) => this.form.controls[field].valid);
  }

  /** Elegir el servicio avanza solo al siguiente paso. */
  protected choose(interest: string): void {
    this.form.controls.interest.setValue(interest);
    this.next(0);
  }

  protected next(step: number): void {
    STEP_FIELDS[step].forEach((field) => this.form.controls[field].markAsTouched());
    const stepper = this.stepper();
    if (stepper?.selected && this.isValid(step)) {
      // El stepper es lineal: se marca el paso como completo antes de avanzar, sin esperar a la detección de cambios.
      stepper.selected.completed = true;
      stepper.next();
    }
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.contactService.send(this.form.getRawValue());
    this.sent.set(true);
  }

  protected reset(): void {
    this.form.reset();
    this.sent.set(false);
  }
}
