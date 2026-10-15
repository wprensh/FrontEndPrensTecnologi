import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Service } from '../../models/home.model';
import { logoLabel } from './logo-label';

// Opción 4, Lista con logos: dos columnas con líneas finas y, sobre cada servicio, los logos de sus tecnologías
@Component({
  selector: 'app-service-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="list">
      @for (service of services(); track service.title) {
        <li class="item">
          <div class="logos">
            @for (logo of service.logos; track logo) {
              <img [src]="'tech-icons/' + logo + '.svg'" [alt]="label(logo)" [title]="label(logo)" width="26" height="26" />
            }
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </li>
      }
    </ul>
  `,
  styles: `
    :host { display: block; }
    .list { display: grid; grid-template-columns: 1fr 1fr; column-gap: 64px; margin: 0; padding: 0; list-style: none; }
    .item { padding: 24px 0; border-top: 1px solid var(--brand-line); }
    .logos { display: flex; gap: 10px; margin-bottom: 14px; }
    .logos img { object-fit: contain; }
    h3 { margin: 0 0 4px; font-size: 16px; font-weight: 600; color: var(--brand-navy); }
    p { margin: 0; font-size: 14px; line-height: 1.55; color: var(--brand-muted); }
    @media (max-width: 760px) { .list { grid-template-columns: 1fr; } }
  `,
})
export class ServiceListComponent {
  readonly services = input.required<Service[]>();
  protected readonly label = logoLabel;
}
