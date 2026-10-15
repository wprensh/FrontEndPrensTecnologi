import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { Service } from '../../models/home.model';

@Component({
  selector: 'app-service-card',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="card">
      <span class="icon"><mat-icon aria-hidden="true">{{ service().icon }}</mat-icon></span>
      <h3>{{ service().title }}</h3>
      <p>{{ service().description }}</p>
    </article>
  `,
  styles: `
    :host { display: block; }
    .card {
      height: 100%; box-sizing: border-box; padding: 24px;
      background: var(--brand-paper); border-top: 3px solid var(--brand-navy);
      transition: transform 150ms ease, box-shadow 150ms ease;
    }
    .card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgb(8 21 48 / 12%); }
    .icon {
      display: inline-flex; align-items: center; justify-content: center;
      width: 44px; height: 44px; background: var(--brand-navy); color: var(--brand-yellow);
    }
    h3 { margin: 16px 0 8px; font-size: 17px; font-weight: 600; color: var(--brand-navy); }
    p { margin: 0; font-size: 14px; line-height: 1.5; color: var(--brand-ink); }
    @media (prefers-reduced-motion: reduce) { .card { transition: none; } }
  `,
})
export class ServiceCardComponent {
  readonly service = input.required<Service>();
}
