import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TECHNOLOGIES } from '../../shared/brand/technologies';

// Opción 1, Franja: lema del brochure y debajo una franja con el logo de cada tecnología
@Component({
  selector: 'app-hero-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <p class="kicker">Ingeniería de software · Cartagena, CO</p>
      <p class="headline">Desarrollo de software a la medida, integraciones y nube para empresas que quieren crecer.</p>
      <div class="stack">
        <span class="stack-label">Tecnologías con las que trabajamos</span>
        <ul class="logos">
          @for (tech of technologies; track tech.name) {
            <li class="logo-pill">
              <img [src]="'tech-icons/' + tech.icon + '.svg'" alt="" width="22" height="22" />
              <span>{{ tech.name }}</span>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .hero { max-width: 1200px; margin: 0 auto; padding: 24px 16px 80px; box-sizing: border-box; }
    .kicker, .stack-label {
      margin: 0; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #b2b9c6;
    }
    .headline { max-width: 720px; margin: 12px 0 28px; font-size: 30px; line-height: 1.25; font-weight: 400; color: #fff; }
    .stack { padding-top: 20px; border-top: 1px solid rgb(255 255 255 / 14%); }
    .stack-label { display: block; margin-bottom: 14px; color: var(--brand-yellow); }
    .logos { display: flex; flex-wrap: wrap; gap: 10px; margin: 0; padding: 0; list-style: none; }
    .logo-pill {
      display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px 8px 10px;
      background: #fff; color: var(--brand-navy);
      font-family: var(--font-mono); font-size: 13px; font-weight: 500;
      transition: transform 150ms ease;
    }
    .logo-pill:hover { transform: translateY(-2px); }
    .logo-pill img { object-fit: contain; }
    @media (max-width: 600px) {
      .headline { font-size: 22px; }
      .logo-pill { padding: 6px 10px 6px 8px; font-size: 12px; }
    }
    @media (prefers-reduced-motion: reduce) { .logo-pill { transition: none; } }
  `,
})
export class HeroBannerComponent {
  protected readonly technologies = TECHNOLOGIES;
}
