import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Service } from '../../models/home.model';
import { logoLabel } from './logo-label';

// Opción 6, Índice con logos: una fila por servicio con número, título, descripción y sus logos al final
@Component({
  selector: 'app-service-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="index">
      @for (service of services(); track service.title; let i = $index) {
        <li class="row">
          <span class="num">{{ (i + 1).toString().padStart(2, '0') }}</span>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <div class="logos">
            @for (logo of service.logos; track logo) {
              <img [src]="'tech-icons/' + logo + '.svg'" [alt]="label(logo)" [title]="label(logo)" width="24" height="24" />
            }
          </div>
        </li>
      }
    </ol>
  `,
  styles: `
    :host { display: block; }
    .index { margin: 0; padding: 0; list-style: none; border-bottom: 1px solid var(--brand-line); }
    .row {
      display: grid; grid-template-columns: 48px minmax(0, 1fr) minmax(0, 1.2fr) 112px; gap: 24px; align-items: center;
      padding: 20px 0; border-top: 1px solid var(--brand-line);
    }
    .num { font-family: var(--font-mono); font-size: 13px; color: var(--brand-ochre); }
    h3 { margin: 0; font-size: 20px; font-weight: 500; letter-spacing: -0.01em; color: var(--brand-navy); transition: transform 200ms ease; }
    p { margin: 0; font-size: 14px; line-height: 1.55; color: var(--brand-muted); }
    .logos { display: flex; justify-content: flex-end; gap: 10px; filter: grayscale(1); opacity: 0.7; transition: filter 200ms ease, opacity 200ms ease; }
    .logos img { object-fit: contain; }
    .row:hover h3 { transform: translateX(6px); }
    .row:hover .logos { filter: none; opacity: 1; }
    @media (max-width: 760px) {
      .row { grid-template-columns: 36px 1fr; gap: 8px 12px; padding: 18px 0; }
      h3 { font-size: 18px; }
      p, .logos { grid-column: 2; }
      .logos { justify-content: flex-start; filter: none; opacity: 1; margin-top: 4px; }
    }
    @media (prefers-reduced-motion: reduce) { h3, .logos { transition: none; } }
  `,
})
export class ServiceListComponent {
  readonly services = input.required<Service[]>();
  protected readonly label = logoLabel;
}
