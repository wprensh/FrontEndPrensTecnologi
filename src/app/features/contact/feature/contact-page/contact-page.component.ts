import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CONTACT } from '../../../../shared/brand/contact';
import { contactForm, fieldError } from '../../data-access/contact-form';
import { ContactService } from '../../data-access/contact.service';
import { CONTACT_INTERESTS } from '../../models/contact.model';

// Opción 1, Dividido: datos de contacto en un panel azul a la izquierda y el formulario a la derecha
@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <aside class="info">
        <span class="eyebrow">Contacto</span>
        <h1>Hablemos de su proyecto.</h1>
        <p class="lead">Cuéntenos qué necesita y le respondemos en menos de un día hábil con una propuesta de siguiente paso.</p>
        <ul class="channels">
          <li><mat-icon aria-hidden="true">mail</mat-icon><a [href]="'mailto:' + contact.email">{{ contact.email }}</a></li>
          <li><mat-icon aria-hidden="true">call</mat-icon><span>{{ contact.phone }}</span></li>
          <li><mat-icon aria-hidden="true">location_on</mat-icon><span>{{ contact.city }}</span></li>
        </ul>
      </aside>

      <section class="form-side">
        @if (sent()) {
          <div class="sent" role="status">
            <mat-icon aria-hidden="true">check_circle</mat-icon>
            <h2>Su mensaje está listo.</h2>
            <p>Abrimos su aplicación de correo con todo diligenciado; solo falta pulsar Enviar. Si no se abrió, escríbanos a {{ contact.email }}.</p>
            <button mat-stroked-button type="button" (click)="reset()">Escribir otro mensaje</button>
          </div>
        } @else {
          <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
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
            <mat-form-field class="full">
              <mat-label>¿En qué podemos ayudarle?</mat-label>
              <mat-select formControlName="interest">
                @for (interest of interests; track interest) {
                  <mat-option [value]="interest">{{ interest }}</mat-option>
                }
              </mat-select>
              <mat-error>{{ error('interest') }}</mat-error>
            </mat-form-field>
            <mat-form-field class="full">
              <mat-label>Mensaje</mat-label>
              <textarea matInput formControlName="message" rows="5"></textarea>
              <mat-hint align="end">{{ form.controls.message.value.length }} / 1500</mat-hint>
              <mat-error>{{ error('message') }}</mat-error>
            </mat-form-field>
            <div class="full actions">
              <button mat-flat-button class="cta" type="submit">Enviar mensaje</button>
            </div>
          </form>
        }
      </section>
    </div>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host { display: block; }
    .page {
      display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.4fr);
      background: #fff; border: 1px solid var(--brand-line);
    }

    .info { padding: 40px 32px; background: var(--brand-navy); color: #fff; }
    .info .eyebrow { color: var(--brand-yellow); }
    h1 { margin: 8px 0 0; font-size: 36px; line-height: 1.12; font-weight: 600; letter-spacing: -0.02em; }
    .lead { margin: 14px 0 0; font-size: 16px; line-height: 1.6; color: #c9d0dc; }
    .channels { display: grid; gap: 14px; margin: 32px 0 0; padding: 0; list-style: none; }
    .channels li { display: flex; gap: 12px; align-items: center; font-size: 15px; }
    .channels mat-icon { color: var(--brand-yellow); }
    .channels a { color: #fff; }

    .form-side { padding: 40px 32px; }
    form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 16px; }
    .full { grid-column: 1 / -1; }
    .actions { display: flex; justify-content: flex-end; margin-top: 8px; }
    .cta {
      height: 48px; padding: 0 28px; font-weight: 600;
      @include mat.button-overrides((filled-container-color: var(--brand-yellow), filled-label-text-color: var(--brand-navy), filled-container-shape: 2px));
    }

    .sent { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; padding: 24px 0; }
    .sent mat-icon { width: 40px; height: 40px; font-size: 40px; color: var(--brand-ochre); }
    .sent h2 { margin: 0; font-size: 26px; font-weight: 600; color: var(--brand-navy); }
    .sent p { max-width: 460px; margin: 0 0 8px; font-size: 15px; line-height: 1.6; color: var(--brand-ink); }

    @media (max-width: 860px) {
      .page { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .info, .form-side { padding: 28px 16px; }
      h1 { font-size: 30px; }
      form { grid-template-columns: 1fr; }
      .actions { justify-content: stretch; }
      .cta { width: 100%; }
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
