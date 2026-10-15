import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SERVICE_CATALOG } from '../../data-access/services.content';
import { ServiceDetail } from '../../models/services.model';

// Opción 1, Acordeón: una fila por servicio; al abrirla aparecen sus tecnologías con su descripción
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

      <ul class="list">
        @for (service of services; track service.id; let i = $index) {
          <li class="item" [id]="service.id" [class.is-open]="openId() === service.id">
            <button
              type="button"
              class="row"
              [attr.aria-expanded]="openId() === service.id"
              [attr.aria-controls]="service.id + '-panel'"
              (click)="toggle(service.id)"
            >
              <span class="num">{{ (i + 1).toString().padStart(2, '0') }}</span>
              <span class="head">
                <span class="title">{{ service.title }}</span>
                <span class="summary">{{ service.summary }}</span>
              </span>
              <span class="logos" aria-hidden="true">
                @for (icon of logos(service); track icon) {
                  <img [src]="'tech-icons/' + icon + '.svg'" alt="" width="22" height="22" />
                }
              </span>
              <mat-icon class="chevron" aria-hidden="true">add</mat-icon>
            </button>

            @if (openId() === service.id) {
              <div class="panel" [id]="service.id + '-panel'">
                @for (tech of service.technologies; track tech.name) {
                  <div class="tech">
                    <img [src]="'tech-icons/' + tech.icon + '.svg'" alt="" width="28" height="28" />
                    <div>
                      <h3>{{ tech.name }}</h3>
                      <p>{{ tech.description }}</p>
                    </div>
                  </div>
                }
              </div>
            }
          </li>
        }
      </ul>

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

    .list { margin: 40px 0 0; padding: 0; list-style: none; border-top: 1px solid var(--brand-line); }
    .item { border-bottom: 1px solid var(--brand-line); }

    .row {
      display: grid; grid-template-columns: 40px minmax(0, 1fr) auto 32px; gap: 20px; align-items: center;
      width: 100%; padding: 22px 0; border: 0; background: none; text-align: left; font: inherit; color: inherit; cursor: pointer;
    }
    .row:focus-visible { outline: 2px solid var(--brand-yellow); outline-offset: 2px; }
    .num { font-family: var(--font-mono); font-size: 13px; color: var(--brand-ochre); }
    .head { display: flex; flex-direction: column; gap: 4px; }
    .title { font-size: 20px; font-weight: 600; color: var(--brand-navy); }
    .summary { font-size: 14px; line-height: 1.5; color: var(--brand-muted); }
    .logos { display: flex; gap: 10px; }
    .logos img { object-fit: contain; filter: grayscale(1); opacity: 0.6; transition: filter 150ms ease, opacity 150ms ease; }
    .row:hover .logos img, .is-open .logos img { filter: none; opacity: 1; }
    .chevron { color: var(--brand-navy); transition: transform 200ms ease; }
    .is-open .chevron { transform: rotate(45deg); }

    .panel {
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 40px;
      padding: 4px 52px 32px 60px;
    }
    .tech { display: flex; gap: 14px; align-items: flex-start; }
    .tech img { flex: none; margin-top: 2px; object-fit: contain; }
    .tech h3 { margin: 0; font-size: 15px; font-weight: 600; color: var(--brand-navy); }
    .tech p { margin: 4px 0 0; font-size: 14px; line-height: 1.55; color: var(--brand-ink); }

    .cta-band {
      display: flex; flex-wrap: wrap; gap: 16px 24px; align-items: center; justify-content: space-between;
      margin: 40px -32px -32px; padding: 28px 32px; background: var(--brand-navy); color: #fff;
    }
    .cta-band p { margin: 0; font-size: 17px; }
    .cta {
      height: 46px; font-weight: 600;
      @include mat.button-overrides((filled-container-color: var(--brand-yellow), filled-label-text-color: var(--brand-navy), filled-container-shape: 2px));
    }

    @media (max-width: 760px) {
      .page { padding: 24px 16px 16px; }
      h1 { font-size: 30px; }
      .row { grid-template-columns: 28px minmax(0, 1fr) 24px; gap: 12px; align-items: start; }
      .num { padding-top: 6px; }
      .logos { display: none; }
      .panel { grid-template-columns: 1fr; padding: 0 0 24px 40px; }
      .cta-band { margin: 32px -16px -16px; padding: 24px 16px; }
    }
  `,
})
export class ServicesPageComponent {
  protected readonly services = SERVICE_CATALOG;
  protected readonly openId = signal<string | null>(SERVICE_CATALOG[0].id);

  // React y React Native comparten logo: se muestra una sola vez
  protected logos(service: ServiceDetail): string[] {
    return [...new Set(service.technologies.map((t) => t.icon))];
  }

  protected toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}
