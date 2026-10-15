import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Service } from '../../models/home.model';

// Opción 3, Índice: una fila por servicio con número, título grande y descripción; sin iconos ni fondos
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
          <span class="arrow" aria-hidden="true">→</span>
        </li>
      }
    </ol>
  `,
  styles: `
    :host { display: block; }
    .index { margin: 0; padding: 0; list-style: none; border-bottom: 1px solid var(--brand-line); }
    .row {
      display: grid; grid-template-columns: 56px minmax(0, 1fr) minmax(0, 1.2fr) 24px; gap: 24px; align-items: baseline;
      padding: 22px 0; border-top: 1px solid var(--brand-line);
    }
    .num { font-family: var(--font-mono); font-size: 13px; color: var(--brand-ochre); }
    h3 { margin: 0; font-size: 22px; font-weight: 500; letter-spacing: -0.01em; color: var(--brand-navy); transition: transform 200ms ease; }
    p { margin: 0; font-size: 14px; line-height: 1.55; color: var(--brand-muted); }
    .arrow { color: var(--brand-yellow); font-size: 20px; opacity: 0; transform: translateX(-6px); transition: opacity 200ms ease, transform 200ms ease; }
    .row:hover h3 { transform: translateX(6px); }
    .row:hover .arrow { opacity: 1; transform: none; }
    @media (max-width: 760px) {
      .row { grid-template-columns: 40px 1fr; gap: 6px 12px; padding: 18px 0; }
      h3 { font-size: 18px; }
      p { grid-column: 2; }
      .arrow { display: none; }
    }
    @media (prefers-reduced-motion: reduce) { h3, .arrow { transition: none; } }
  `,
})
export class ServiceListComponent {
  readonly services = input.required<Service[]>();
}
