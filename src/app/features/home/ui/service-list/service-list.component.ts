import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { Service } from '../../models/home.model';
import { logoLabel } from './logo-label';

// Opción 5, Rejilla con logos: celdas con bordes finos, logos agrupados arriba y línea amarilla al pasar el ratón
@Component({
  selector: 'app-service-list',
  imports: [RouterLink, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid">
      @for (service of services(); track service.title) {
        <li class="cell">
          <div class="logos">
            @for (logo of service.logos; track logo) {
              <span class="logo"><img [src]="'tech-icons/' + logo + '.svg'" [alt]="label(logo)" [title]="label(logo)" width="22" height="22" /></span>
            }
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <a mat-stroked-button class="more" [routerLink]="['/servicios', service.id]" [attr.aria-label]="'Ver más sobre ' + service.title">
            Ver más <span aria-hidden="true">→</span>
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host { display: block; }
    .grid {
      display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
      margin: 0; padding: 0; list-style: none;
      border-top: 1px solid var(--brand-line); border-left: 1px solid var(--brand-line);
    }
    .cell {
      position: relative; display: flex; flex-direction: column; padding: 28px 24px 28px;
      border-right: 1px solid var(--brand-line); border-bottom: 1px solid var(--brand-line);
      transition: background 150ms ease;
    }
    .cell::after {
      content: ''; position: absolute; left: 24px; right: 24px; bottom: -1px; height: 2px;
      background: var(--brand-yellow); transform: scaleX(0); transform-origin: left; transition: transform 200ms ease;
    }
    .cell:hover { background: var(--brand-paper); }
    .cell:hover::after { transform: scaleX(1); }
    .logos { display: flex; }
    .logo {
      display: grid; place-items: center; width: 38px; height: 38px; margin-right: -6px;
      background: #fff; border: 1px solid var(--brand-line); border-radius: 50%;
    }
    .logo img { object-fit: contain; }
    h3 { margin: 24px 0 8px; font-size: 16px; font-weight: 600; color: var(--brand-navy); }
    p { margin: 0 0 20px; font-size: 13.5px; line-height: 1.55; color: var(--brand-muted); }
    .more {
      align-self: flex-start; margin-top: auto; height: 36px; padding: 0 14px; font-size: 13px; font-weight: 600;
      @include mat.button-overrides((outlined-label-text-color: var(--brand-navy), outlined-outline-color: var(--brand-navy), outlined-container-shape: 2px));
    }
    .more:hover { background: var(--brand-navy); color: #fff; }
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
  protected readonly label = logoLabel;
}
