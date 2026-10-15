import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SERVICE_CATALOG } from '../../data-access/services.content';

// Opción 2, Índice lateral: menú fijo a la izquierda y cada servicio como una sección con sus tecnologías
@Component({
  selector: 'app-services-page',
  imports: [MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <header class="intro">
        <span class="eyebrow">Servicios</span>
        <h1>Tecnología con propósito para cada etapa de su software.</h1>
        <p class="lead">Ocho servicios, cada uno con las tecnologías que dominamos y lo que aportan a su proyecto.</p>
      </header>

      <div class="layout">
        <nav class="toc" aria-label="Servicios">
          @for (service of services; track service.id) {
            <button type="button" [class.is-active]="activeId() === service.id" (click)="goTo(service.id)">
              {{ service.title }}
            </button>
          }
        </nav>

        <div class="sections">
          @for (service of services; track service.id) {
            <section class="service" [id]="service.id">
              <div class="service-head">
                <mat-icon aria-hidden="true">{{ service.icon }}</mat-icon>
                <div>
                  <h2>{{ service.title }}</h2>
                  <p class="summary">{{ service.summary }}</p>
                </div>
              </div>
              <ul class="techs">
                @for (tech of service.technologies; track tech.name) {
                  <li class="tech">
                    <span class="tile"><img [src]="'tech-icons/' + tech.icon + '.svg'" alt="" width="26" height="26" /></span>
                    <div>
                      <h3>{{ tech.name }}</h3>
                      <p>{{ tech.description }}</p>
                    </div>
                  </li>
                }
              </ul>
            </section>
          }
        </div>
      </div>

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

    .layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 56px; margin-top: 48px; }

    .toc { position: sticky; top: 24px; align-self: start; display: flex; flex-direction: column; border-left: 1px solid var(--brand-line); }
    .toc button {
      margin-left: -1px; padding: 9px 0 9px 16px; border: 0; border-left: 2px solid transparent; background: none;
      text-align: left; font: inherit; font-size: 14px; color: var(--brand-muted); cursor: pointer;
      transition: color 150ms ease, border-color 150ms ease;
    }
    .toc button:hover { color: var(--brand-navy); }
    .toc button.is-active { color: var(--brand-navy); font-weight: 600; border-left-color: var(--brand-yellow); }
    .toc button:focus-visible { outline: 2px solid var(--brand-yellow); outline-offset: 2px; }

    .service { padding: 0 0 40px; scroll-margin-top: 24px; }
    .service + .service { padding-top: 40px; border-top: 1px solid var(--brand-line); }
    .service-head { display: flex; gap: 16px; align-items: flex-start; }
    .service-head mat-icon { flex: none; margin-top: 4px; color: var(--brand-ochre); }
    h2 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.01em; color: var(--brand-navy); }
    .summary { margin: 6px 0 0; font-size: 15px; line-height: 1.55; color: var(--brand-ink); }

    .techs { display: grid; gap: 4px; margin: 24px 0 0 40px; padding: 0; list-style: none; }
    .tech { display: flex; gap: 16px; align-items: center; padding: 12px 0; }
    .tile {
      flex: none; display: grid; place-items: center; width: 48px; height: 48px;
      background: var(--brand-paper); border: 1px solid var(--brand-line);
    }
    .tile img { object-fit: contain; }
    .tech h3 { margin: 0; font-size: 15px; font-weight: 600; color: var(--brand-navy); }
    .tech p { margin: 3px 0 0; font-size: 14px; line-height: 1.5; color: var(--brand-ink); }

    .cta-band {
      display: flex; flex-wrap: wrap; gap: 16px 24px; align-items: center; justify-content: space-between;
      margin: 8px -32px -32px; padding: 28px 32px; background: var(--brand-navy); color: #fff;
    }
    .cta-band p { margin: 0; font-size: 17px; }
    .cta {
      height: 46px; font-weight: 600;
      @include mat.button-overrides((filled-container-color: var(--brand-yellow), filled-label-text-color: var(--brand-navy), filled-container-shape: 2px));
    }

    @media (max-width: 900px) {
      .layout { grid-template-columns: 1fr; gap: 24px; margin-top: 32px; }
      .toc {
        position: sticky; top: 0; z-index: 1; flex-direction: row; gap: 8px; overflow-x: auto;
        margin: 0 -16px; padding: 10px 16px; border: 0; border-bottom: 1px solid var(--brand-line); background: #fff;
        scrollbar-width: none;
      }
      .toc button { flex: none; margin: 0; padding: 7px 12px; border: 1px solid var(--brand-line); white-space: nowrap; font-size: 13px; }
      .toc button.is-active { border-color: var(--brand-navy); background: var(--brand-navy); color: #fff; }
      .service { scroll-margin-top: 72px; }
    }

    @media (max-width: 600px) {
      .page { padding: 24px 16px 16px; }
      h1 { font-size: 30px; }
      .techs { margin-left: 0; }
      .cta-band { margin: 8px -16px -16px; padding: 24px 16px; }
    }
  `,
})
export class ServicesPageComponent {
  protected readonly services = SERVICE_CATALOG;
  protected readonly activeId = signal(SERVICE_CATALOG[0].id);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Marca en el índice la sección que está a la vista
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (visible) this.activeId.set(visible.target.id);
        },
        { rootMargin: '-30% 0px -60% 0px' },
      );
      this.host.nativeElement.querySelectorAll('.service').forEach((section) => observer.observe(section));
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected goTo(id: string): void {
    this.activeId.set(id);
    this.host.nativeElement.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
