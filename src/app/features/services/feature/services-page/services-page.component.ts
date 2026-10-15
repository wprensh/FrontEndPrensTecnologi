import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SERVICE_CATALOG } from '../../data-access/services.content';

// Opción 3, Selector: se elige un servicio arriba y abajo aparecen sus tecnologías en tarjetas
@Component({
  selector: 'app-services-page',
  imports: [MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <header class="intro">
        <span class="eyebrow">Servicios</span>
        <h1>Tecnología con propósito para cada etapa de su software.</h1>
        <p class="lead">Elija un servicio para ver qué tecnologías usamos y qué aporta cada una a su proyecto.</p>
      </header>

      <div class="picker" role="tablist" aria-label="Servicios">
        @for (service of services; track service.id) {
          <button
            type="button"
            role="tab"
            class="option"
            [id]="service.id + '-tab'"
            [attr.aria-selected]="selectedId() === service.id"
            [attr.aria-controls]="'panel'"
            (click)="selectedId.set(service.id)"
          >
            <mat-icon aria-hidden="true">{{ service.icon }}</mat-icon>
            <span>{{ service.title }}</span>
          </button>
        }
      </div>

      @let service = selected();
      <section class="panel" id="panel" role="tabpanel" [attr.aria-labelledby]="service.id + '-tab'">
        <div class="panel-head">
          <h2>{{ service.title }}</h2>
          <p>{{ service.summary }}</p>
        </div>
        <ul class="cards">
          @for (tech of service.technologies; track tech.name) {
            <li class="card">
              <img [src]="'tech-icons/' + tech.icon + '.svg'" alt="" width="36" height="36" />
              <h3>{{ tech.name }}</h3>
              <p>{{ tech.description }}</p>
            </li>
          }
        </ul>
      </section>

      <footer class="cta-band">
        <p>¿No encuentra lo que busca? Cuéntenos su caso y le proponemos la solución.</p>
        <a mat-flat-button class="cta" href="mailto:wprensh@hotmail.com">Hablemos de su proyecto</a>
      </footer>
    </div>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host { display: block; }
    .page { padding: 40px 32px 32px; background: #fff; border: 1px solid var(--brand-line); }
    h1 { max-width: 720px; margin: 8px 0 0; font-size: 40px; line-height: 1.12; font-weight: 600; letter-spacing: -0.02em; color: var(--brand-navy); }
    .lead { max-width: 640px; margin: 14px 0 0; font-size: 17px; line-height: 1.6; color: var(--brand-ink); }

    .picker {
      display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 40px;
      border-top: 1px solid var(--brand-line); border-left: 1px solid var(--brand-line);
    }
    .option {
      display: flex; gap: 12px; align-items: center; min-height: 64px; padding: 14px 18px;
      border: 0; border-right: 1px solid var(--brand-line); border-bottom: 1px solid var(--brand-line);
      background: #fff; text-align: left; font: inherit; font-size: 14px; font-weight: 500; color: var(--brand-navy); cursor: pointer;
      transition: background 150ms ease, color 150ms ease;
    }
    .option mat-icon { flex: none; color: var(--brand-ochre); }
    .option:hover { background: var(--brand-paper); }
    .option[aria-selected='true'] { background: var(--brand-navy); color: #fff; }
    .option[aria-selected='true'] mat-icon { color: var(--brand-yellow); }
    .option:focus-visible { outline: 2px solid var(--brand-yellow); outline-offset: -2px; }

    .panel { padding: 40px 0 48px; }
    .panel-head h2 { margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.01em; color: var(--brand-navy); }
    .panel-head p { max-width: 640px; margin: 8px 0 0; font-size: 16px; line-height: 1.55; color: var(--brand-ink); }

    .cards {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;
      margin: 28px 0 0; padding: 0; list-style: none;
    }
    .card {
      display: flex; flex-direction: column; gap: 6px; padding: 24px;
      background: var(--brand-paper); border-top: 3px solid var(--brand-yellow);
      animation: rise 220ms ease both;
    }
    .card img { margin-bottom: 10px; object-fit: contain; }
    .card h3 { margin: 0; font-size: 16px; font-weight: 600; color: var(--brand-navy); }
    .card p { margin: 0; font-size: 14px; line-height: 1.55; color: var(--brand-ink); }
    @keyframes rise { from { opacity: 0; transform: translateY(6px); } }
    @media (prefers-reduced-motion: reduce) { .card { animation: none; } }

    .cta-band {
      display: flex; flex-wrap: wrap; gap: 16px 24px; align-items: center; justify-content: space-between;
      margin: 0 -32px -32px; padding: 28px 32px; background: var(--brand-navy); color: #fff;
    }
    .cta-band p { margin: 0; font-size: 17px; }
    .cta {
      height: 46px; font-weight: 600;
      @include mat.button-overrides((filled-container-color: var(--brand-yellow), filled-label-text-color: var(--brand-navy), filled-container-shape: 2px));
    }

    @media (max-width: 900px) {
      .picker { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }

    @media (max-width: 600px) {
      .page { padding: 24px 16px 16px; }
      h1 { font-size: 30px; }
      .option { gap: 8px; min-height: 56px; padding: 10px 12px; font-size: 13px; }
      .panel { padding: 32px 0 40px; }
      .panel-head h2 { font-size: 24px; }
      .cta-band { margin: 0 -16px -16px; padding: 24px 16px; }
    }
  `,
})
export class ServicesPageComponent {
  protected readonly services = SERVICE_CATALOG;
  protected readonly selectedId = signal(SERVICE_CATALOG[0].id);
  protected readonly selected = computed(
    () => this.services.find((service) => service.id === this.selectedId()) ?? this.services[0],
  );
}
