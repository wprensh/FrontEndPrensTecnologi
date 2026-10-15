import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TECHNOLOGIES } from '../../shared/brand/technologies';

// Opción 2, Carrusel: lema a la izquierda y una cinta de logos que se desplaza sin fin
@Component({
  selector: 'app-hero-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <div class="intro">
        <p class="kicker">Ingeniería de software · Cartagena, CO</p>
        <p class="headline">Desarrollo de software a la medida, integraciones y nube para empresas que quieren <em>crecer</em>.</p>
      </div>
      <div class="marquee" aria-label="Tecnologías con las que trabajamos">
        <ul class="track">
          <!-- La lista va dos veces para que el desplazamiento sea continuo; la copia se oculta a lectores de pantalla -->
          @for (copy of [0, 1]; track copy) {
            @for (tech of technologies; track tech.name) {
              <li class="item" [attr.aria-hidden]="copy === 1 ? 'true' : null">
                <span class="logo"><img [src]="'tech-icons/' + tech.icon + '.svg'" alt="" width="26" height="26" /></span>
                <span class="name">{{ tech.name }}</span>
              </li>
            }
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .hero { padding: 24px 0 80px; }
    .intro { max-width: 1200px; margin: 0 auto 32px; padding: 0 16px; box-sizing: border-box; }
    .kicker { margin: 0; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #b2b9c6; }
    .headline { max-width: 760px; margin: 12px 0 0; font-size: 32px; line-height: 1.25; font-weight: 400; color: #fff; }
    .headline em { font-style: normal; color: var(--brand-yellow); }

    .marquee {
      overflow: hidden;
      padding: 18px 0;
      border-block: 1px solid rgb(255 255 255 / 12%);
      background: rgb(255 255 255 / 3%);
      mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    }
    .track { display: flex; width: max-content; gap: 40px; margin: 0; padding: 0; list-style: none; animation: scroll 40s linear infinite; }
    .marquee:hover .track { animation-play-state: paused; }
    .item { display: flex; align-items: center; gap: 12px; white-space: nowrap; }
    .logo { display: grid; place-items: center; width: 42px; height: 42px; background: #fff; border-radius: 50%; }
    .logo img { object-fit: contain; }
    .name { font-family: var(--font-mono); font-size: 14px; color: #fff; }
    @keyframes scroll { to { transform: translateX(calc(-50% - 20px)); } }

    @media (max-width: 600px) {
      .headline { font-size: 22px; }
      .track { gap: 28px; }
    }

    // Sin animación: la cinta se convierte en una cuadrícula estática y se oculta la copia
    @media (prefers-reduced-motion: reduce) {
      .marquee { mask-image: none; }
      .track { width: auto; max-width: 1200px; margin: 0 auto; padding: 0 16px; flex-wrap: wrap; gap: 16px 28px; animation: none; }
      .item[aria-hidden='true'] { display: none; }
    }
  `,
})
export class HeroBannerComponent {
  // En la cinta, .NET 8 va en la segunda posición (la de Node.js) para que se vea completo al cargar
  protected readonly technologies = swapFirstTwo(TECHNOLOGIES);
}

function swapFirstTwo<T>([first, second, ...rest]: T[]): T[] {
  return [second, first, ...rest];
}
