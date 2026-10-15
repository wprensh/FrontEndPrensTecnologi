import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { TECH_CATEGORY_LABELS, TechCategory, Technology } from '../../models/home.model';

type CategoryFilter = 'all' | TechCategory;

@Component({
  selector: 'app-tech-explorer',
  imports: [MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-chip-listbox
      class="filters"
      aria-label="Filtrar tecnologías por categoría"
      [value]="category()"
      (change)="category.set($event.value ?? 'all')"
    >
      @for (option of options; track option.value) {
        <mat-chip-option [value]="option.value" [selectable]="option.value !== category()">{{ option.label }}</mat-chip-option>
      }
    </mat-chip-listbox>

    <p class="count" aria-live="polite">{{ visible().length }} tecnologías</p>

    <ul class="tiles">
      @for (tech of visible(); track tech.name) {
        <li class="tech-tile">
          <span class="tech-name">{{ tech.name }}</span>
          <span class="tech-category">{{ labels[tech.category] }}</span>
        </li>
      }
    </ul>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host { display: block; }
    .filters {
      @include mat.chips-overrides((
        container-shape-radius: 2px,
        outline-color: var(--brand-line),
        elevated-selected-container-color: var(--brand-navy),
        selected-label-text-color: #fff,
        with-icon-selected-icon-color: var(--brand-yellow),
      ));
    }
    .count { margin: 16px 0 12px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brand-muted); }
    .tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; margin: 0; padding: 0; list-style: none; }
    .tech-tile {
      display: flex; flex-direction: column; gap: 6px; padding: 18px 16px;
      background: var(--brand-paper); border-left: 3px solid var(--brand-yellow);
      animation: tile-in 200ms ease both;
    }
    .tech-name { font-family: var(--font-mono); font-size: 15px; font-weight: 500; color: var(--brand-navy); }
    .tech-category { font-size: 12px; color: var(--brand-muted); }
    @keyframes tile-in { from { opacity: 0; transform: translateY(4px); } }
    @media (prefers-reduced-motion: reduce) { .tech-tile { animation: none; } }
  `,
})
export class TechExplorerComponent {
  readonly technologies = input.required<Technology[]>();

  protected readonly labels = TECH_CATEGORY_LABELS;
  protected readonly category = signal<CategoryFilter>('all');
  protected readonly options: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    ...(Object.keys(TECH_CATEGORY_LABELS) as TechCategory[]).map((value) => ({ value, label: TECH_CATEGORY_LABELS[value] })),
  ];

  protected readonly visible = computed(() => {
    const category = this.category();
    return category === 'all' ? this.technologies() : this.technologies().filter((t) => t.category === category);
  });
}
