import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { Service } from '../../models/home.model';

// Opción 2, Rejilla: celdas sin fondo que comparten bordes finos; al pasar el ratón aparece una línea amarilla
@Component({
  selector: 'app-service-list',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid">
      @for (service of services(); track service.title) {
        <li class="cell">
          <mat-icon class="icon" aria-hidden="true">{{ service.icon }}</mat-icon>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </li>
      }
    </ul>
  `,
  styles: `
    :host { display: block; }
    .grid {
      display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
      margin: 0; padding: 0; list-style: none;
      border-top: 1px solid var(--brand-line); border-left: 1px solid var(--brand-line);
    }
    .cell {
      position: relative; padding: 28px 24px 32px;
      border-right: 1px solid var(--brand-line); border-bottom: 1px solid var(--brand-line);
      transition: background 150ms ease;
    }
    .cell::after {
      content: ''; position: absolute; left: 24px; right: 24px; bottom: -1px; height: 2px;
      background: var(--brand-yellow); transform: scaleX(0); transform-origin: left; transition: transform 200ms ease;
    }
    .cell:hover { background: var(--brand-paper); }
    .cell:hover::after { transform: scaleX(1); }
    .icon { width: 24px; height: 24px; font-size: 24px; color: var(--brand-navy); }
    h3 { margin: 28px 0 8px; font-size: 16px; font-weight: 600; color: var(--brand-navy); }
    p { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--brand-muted); }
    @media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 600px) {
      .grid { grid-template-columns: 1fr; }
      .cell { padding: 20px 16px 24px; }
      h3 { margin-top: 16px; }
    }
    @media (prefers-reduced-motion: reduce) { .cell, .cell::after { transition: none; } }
  `,
})
export class ServiceListComponent {
  readonly services = input.required<Service[]>();
}
