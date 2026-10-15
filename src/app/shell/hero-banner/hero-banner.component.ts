import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TECHNOLOGIES } from '../../shared/brand/technologies';

// Opción 3, Mosaico: lema y cifras a la izquierda, mosaico de logos a la derecha
@Component({
  selector: 'app-hero-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <div class="copy">
        <p class="kicker">Ingeniería de software · Cartagena, CO</p>
        <p class="headline">Desarrollo de software a la medida, integraciones y nube para empresas que quieren crecer.</p>
        <p class="stack">.NET · Azure · Web · Móvil</p>
      </div>
      <ul class="mosaic" aria-label="Tecnologías con las que trabajamos">
        @for (tech of technologies; track tech.name) {
          <li class="tile" [title]="tech.name">
            <span class="tile-logo"><img [src]="'tech-icons/' + tech.icon + '.svg'" alt="" width="30" height="30" /></span>
            <span class="tile-name">{{ tech.name }}</span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .hero {
      display: grid; grid-template-columns: 1fr 1.05fr; gap: 48px; align-items: center;
      max-width: 1200px; margin: 0 auto; padding: 24px 16px 88px; box-sizing: border-box;
    }
    .kicker { margin: 0; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #b2b9c6; }
    .headline { margin: 12px 0; font-size: 32px; line-height: 1.25; font-weight: 400; color: #fff; }
    .stack { margin: 0; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--brand-yellow); }

    .mosaic { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; margin: 0; padding: 0; list-style: none; }
    .tile {
      display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 14px 6px 10px;
      background: rgb(255 255 255 / 5%); border: 1px solid rgb(255 255 255 / 10%);
      transition: background 150ms ease, border-color 150ms ease;
    }
    .tile:hover { background: rgb(255 255 255 / 10%); border-color: var(--brand-yellow); }
    .tile-logo { display: grid; place-items: center; width: 46px; height: 46px; background: #fff; }
    .tile-logo img { object-fit: contain; }
    .tile-name { font-family: var(--font-mono); font-size: 11px; color: #dbe2ee; text-align: center; line-height: 1.3; }

    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; gap: 28px; }
    }
    @media (max-width: 600px) {
      .headline { font-size: 22px; }
      .mosaic { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
      .tile-logo { width: 38px; height: 38px; }
      .tile-name { font-size: 10px; }
    }
    @media (prefers-reduced-motion: reduce) { .tile { transition: none; } }
  `,
})
export class HeroBannerComponent {
  protected readonly technologies = TECHNOLOGIES;
}
