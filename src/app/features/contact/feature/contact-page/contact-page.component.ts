import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CONTACT } from '../../../../shared/brand/contact';
import { contactForm, fieldError } from '../../data-access/contact-form';
import { ContactService } from '../../data-access/contact.service';
import { CONTACT_INTERESTS } from '../../models/contact.model';

// Opción 2, Centrado: una sola columna, el servicio se elige con chips y los canales quedan al pie
@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="column">
        <header class="intro">
          <span class="eyebrow">Contacto</span>
          <h1>Hablemos de su proyecto.</h1>
          <p class="lead">Respondemos en menos de un día hábil.</p>
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
            <fieldset class="interest">
              <legend>¿En qué podemos ayudarle?</legend>
              <mat-chip-listbox formControlName="interest" aria-label="Servicio de interés">
                @for (interest of interests; track interest) {
                  <mat-chip-option [value]="interest">{{ interest }}</mat-chip-option>
                }
              </mat-chip-listbox>
              @if (form.controls.interest.touched && form.controls.interest.invalid) {
                <p class="chip-error" role="alert">Elija una opción.</p>
              }
            </fieldset>

            <div class="row">
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
            </div>
            <div class="row">
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
            <mat-form-field>
              <mat-label>Mensaje</mat-label>
              <textarea matInput formControlName="message" rows="5"></textarea>
              <mat-hint align="end">{{ form.controls.message.value.length }} / 1500</mat-hint>
              <mat-error>{{ error('message') }}</mat-error>
            </mat-form-field>

            <button mat-flat-button class="cta" type="submit">Enviar mensaje</button>
          </form>
        }

        <footer class="channels">
          <a [href]="'mailto:' + contact.email"><mat-icon aria-hidden="true">mail</mat-icon>{{ contact.email }}</a>
          <span><mat-icon aria-hidden="true">call</mat-icon>{{ contact.phone }}</span>
          <span><mat-icon aria-hidden="true">location_on</mat-icon>{{ contact.city }}</span>
        </footer>
      </div>
    </div>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host { display: block; }
    .page { padding: 48px 32px; background: #fff; border: 1px solid var(--brand-line); }
    .column { max-width: 680px; margin: 0 auto; }
    .intro { text-align: center; }
    h1 { margin: 8px 0 0; font-size: 40px; line-height: 1.12; font-weight: 600; letter-spacing: -0.02em; color: var(--brand-navy); }
    .lead { margin: 10px 0 0; font-size: 17px; color: var(--brand-ink); }

    form { display: flex; flex-direction: column; gap: 4px; margin-top: 36px; }
    .row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }

    .interest { margin: 0 0 20px; padding: 0; border: 0; }
    legend { margin-bottom: 12px; font-size: 15px; font-weight: 600; color: var(--brand-navy); }
    mat-chip-listbox {
      @include mat.chips-overrides((
        outline-color: var(--brand-line),
        container-shape-radius: 2px,
        label-text-color: var(--brand-navy),
        selected-label-text-color: var(--brand-navy),
        elevated-selected-container-color: var(--brand-yellow),
        selected-trailing-icon-color: var(--brand-navy),
        with-icon-selected-icon-color: var(--brand-navy),
      ));
    }
    .chip-error { margin: 8px 0 0; font-size: 12px; color: var(--mat-sys-error); }

    .cta {
      align-self: center; height: 50px; min-width: 240px; margin-top: 12px; font-weight: 600;
      @include mat.button-overrides((filled-container-color: var(--brand-navy), filled-label-text-color: #fff, filled-container-shape: 2px));
    }

    .sent { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 36px; text-align: center; }
    .sent mat-icon { width: 44px; height: 44px; font-size: 44px; color: var(--brand-ochre); }
    .sent h2 { margin: 0; font-size: 26px; font-weight: 600; color: var(--brand-navy); }
    .sent p { max-width: 460px; margin: 0 0 8px; font-size: 15px; line-height: 1.6; color: var(--brand-ink); }

    .channels {
      display: flex; flex-wrap: wrap; justify-content: center; gap: 12px 28px;
      margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--brand-line);
      font-size: 14px; color: var(--brand-ink);
    }
    .channels a, .channels span { display: inline-flex; gap: 8px; align-items: center; color: inherit; text-decoration: none; }
    .channels mat-icon { width: 18px; height: 18px; font-size: 18px; color: var(--brand-ochre); }

    @media (max-width: 600px) {
      .page { padding: 28px 16px; }
      h1 { font-size: 30px; }
      .row { grid-template-columns: 1fr; gap: 4px; }
      .cta { align-self: stretch; }
      .channels { flex-direction: column; align-items: flex-start; }
    }
  `,
})
export class ContactPageComponent {
  private readonly contactService = inject(ContactService);

  protected readonly contact = CONTACT;
  protected readonly interests = CONTACT_INTERESTS;
  protected readonly form = contactForm();
  protected readonly sent = signal(false);

  protected error(field: keyof typeof this.form.controls): string {
    return fieldError(this.form, field);
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
