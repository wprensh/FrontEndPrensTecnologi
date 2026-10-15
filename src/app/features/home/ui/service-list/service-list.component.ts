import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { Service } from '../../models/home.model';

// Opción 1, Lista: dos columnas separadas por líneas finas, icono pequeño y sin fondos
@Component({
  selector: 'app-service-list',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="list">
      @for (service of services(); track service.title) {
        <li class="item">
          <mat-icon class="icon" aria-hidden="true">{{ service.icon }}</mat-icon>
          <div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </li>
      }
    </ul>
  `,
  styles: `
    :host { display: block; }
    .list { display: grid; grid-template-columns: 1fr 1fr; column-gap: 64px; margin: 0; padding: 0; list-style: none; }
    .item { display: grid; grid-template-columns: 24px 1fr; gap: 16px; padding: 22px 0; border-top: 1px solid var(--brand-line); }
    .icon { width: 22px; height: 22px; font-size: 22px; color: var(--brand-ochre); }
    h3 { margin: 0 0 4px; font-size: 16px; font-weight: 600; color: var(--brand-navy); }
    p { margin: 0; font-size: 14px; line-height: 1.55; color: var(--brand-muted); }
    @media (max-width: 760px) { .list { grid-template-columns: 1fr; } }
  `,
})
export class ServiceListComponent {
  readonly services = input.required<Service[]>();
}
