import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SERVICE_CATALOG, findService } from '../../data-access/services.content';

// Página de un servicio: /servicios/<id>. El id llega como input desde la ruta (withComponentInputBinding).
@Component({
  selector: 'app-service-detail-page',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let service = this.service();
    <article class="page">
      <nav class="crumbs" aria-label="Ruta">
        <a routerLink="/servicios">Servicios</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{{ service.title }}</span>
      </nav>

      <header class="hero">
        <span class="badge"><mat-icon aria-hidden="true">{{ service.icon }}</mat-icon></span>
        <div>
          <span class="eyebrow">Servicio {{ position() }} de {{ total }}</span>
          <h1>{{ service.title }}</h1>
          <p class="summary">{{ service.summary }}</p>
          <p class="intro">{{ service.intro }}</p>
          <a mat-flat-button class="cta" routerLink="/contacto" [queryParams]="{ interes: service.contactInterest }">Cotizar este servicio</a>
        </div>
      </header>

      <div class="columns">
        <section>
          <h2>Qué incluye</h2>
          <ul class="checks">
            @for (item of service.includes; track item) {
              <li><mat-icon aria-hidden="true">check</mat-icon>{{ item }}</li>
            }
          </ul>
        </section>
        <section class="ideal">
          <h2>¿Cuándo lo necesita?</h2>
          <ul>
            @for (item of service.idealFor; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </section>
      </div>

      <section>
        <h2>Tecnologías que usamos</h2>
        <ul class="cards">
          @for (tech of service.technologies; track tech.name) {
            <li class="card">
              <img [src]="'tech-icons/' + tech.icon + '.svg'" alt="" width="32" height="32" />
              <h3>{{ tech.name }}</h3>
              <p>{{ tech.description }}</p>
            </li>
          }
        </ul>
      </section>

      <nav class="pager" aria-label="Otros servicios">
        <a [routerLink]="['/servicios', previous().id]"><span>← Anterior</span>{{ previous().title }}</a>
        <a [routerLink]="['/servicios', next().id]" class="next"><span>Siguiente →</span>{{ next().title }}</a>
      </nav>
    </article>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host { display: block; }
    .page { padding: 32px 32px 0; background: #fff; border: 1px solid var(--brand-line); }
    .crumbs { display: flex; gap: 8px; font-size: 13px; color: var(--brand-muted); }
    .crumbs a { color: var(--brand-ochre); text-decoration: none; }
    .crumbs a:hover { text-decoration: underline; }

    .hero { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 24px; margin-top: 24px; padding-bottom: 40px; border-bottom: 1px solid var(--brand-line); }
    .badge { display: grid; place-items: center; width: 64px; height: 64px; background: var(--brand-navy); }
    .badge mat-icon { width: 32px; height: 32px; font-size: 32px; color: var(--brand-yellow); }
    h1 { margin: 8px 0 0; font-size: 40px; line-height: 1.12; font-weight: 600; letter-spacing: -0.02em; color: var(--brand-navy); }
    .summary { max-width: 680px; margin: 12px 0 0; font-size: 19px; line-height: 1.5; color: var(--brand-navy); }
    .intro { max-width: 680px; margin: 12px 0 24px; font-size: 16px; line-height: 1.65; color: var(--brand-ink); }
    .cta {
      height: 46px; font-weight: 600;
      @include mat.button-overrides((filled-container-color: var(--brand-yellow), filled-label-text-color: var(--brand-navy), filled-container-shape: 2px));
    }

    section { padding: 40px 0 0; }
    h2 { margin: 0 0 18px; font-size: 24px; font-weight: 600; letter-spacing: -0.01em; color: var(--brand-navy); }
    ul { margin: 0; padding: 0; list-style: none; }
    .columns { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 32px; }
    .checks li { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--brand-line); font-size: 15px; color: var(--brand-ink); }
    .checks mat-icon { flex: none; color: var(--brand-ochre); }
    .ideal ul { padding: 20px 24px; background: var(--brand-paper); border-left: 3px solid var(--brand-yellow); }
    .ideal li { padding: 8px 0; font-size: 15px; line-height: 1.5; color: var(--brand-navy); }

    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 16px; }
    .card { padding: 22px; background: var(--brand-paper); border-top: 3px solid var(--brand-yellow); }
    .card img { object-fit: contain; }
    .card h3 { margin: 12px 0 6px; font-size: 16px; font-weight: 600; color: var(--brand-navy); }
    .card p { margin: 0; font-size: 14px; line-height: 1.55; color: var(--brand-ink); }

    .pager { display: grid; grid-template-columns: 1fr 1fr; margin: 48px -32px 0; border-top: 1px solid var(--brand-line); }
    .pager a { display: flex; flex-direction: column; gap: 4px; padding: 22px 32px; font-weight: 600; color: var(--brand-navy); text-decoration: none; }
    .pager a:hover { background: var(--brand-paper); }
    .pager span { font-family: var(--font-mono); font-size: 12px; font-weight: 400; color: var(--brand-ochre); }
    .pager .next { align-items: flex-end; text-align: right; border-left: 1px solid var(--brand-line); }

    @media (max-width: 760px) {
      .columns { grid-template-columns: 1fr; gap: 0; }
    }
    @media (max-width: 600px) {
      .page { padding: 24px 16px 0; }
      .hero { grid-template-columns: 1fr; gap: 16px; }
      h1 { font-size: 30px; }
      .pager { margin: 40px -16px 0; }
      .pager a { padding: 18px 16px; }
    }
  `,
})
export class ServiceDetailPageComponent {
  readonly id = input.required<string>();

  protected readonly total = SERVICE_CATALOG.length;
  // La ruta solo permite ids del catálogo (canMatch), así que siempre hay servicio.
  protected readonly service = computed(() => findService(this.id()) ?? SERVICE_CATALOG[0]);
  private readonly index = computed(() => SERVICE_CATALOG.indexOf(this.service()));
  protected readonly position = computed(() => this.index() + 1);
  protected readonly previous = computed(() => SERVICE_CATALOG[(this.index() - 1 + this.total) % this.total]);
  protected readonly next = computed(() => SERVICE_CATALOG[(this.index() + 1) % this.total]);
}
