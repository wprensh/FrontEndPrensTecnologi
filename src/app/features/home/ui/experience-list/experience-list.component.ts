import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CaseStudy } from '../../models/home.model';

// Experiencia por sector: cada proyecto con su resultado y las habilidades (skills) que demostró
@Component({
  selector: 'app-experience-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid">
      @for (experience of experiences(); track experience.title) {
        <li class="card">
          <span class="sector">{{ experience.sector }}</span>
          <h3>{{ experience.title }}</h3>
          <p>{{ experience.description }}</p>
          <ul class="skills" [attr.aria-label]="'Skills en ' + experience.sector">
            @for (skill of experience.skills; track skill.name) {
              <li class="skill">
                @if (skill.icon) {
                  <img [src]="'tech-icons/' + skill.icon + '.svg'" alt="" width="16" height="16" />
                }
                {{ skill.name }}
              </li>
            }
          </ul>
        </li>
      }
    </ul>
  `,
  styles: `
    :host { display: block; }
    .grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin: 0; padding: 0; list-style: none; }
    .card { display: flex; flex-direction: column; padding: 24px 20px; border: 1px solid var(--brand-line); border-top: 3px solid var(--brand-navy); }
    .sector { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--brand-ochre); }
    h3 { margin: 10px 0 8px; font-size: 17px; font-weight: 600; line-height: 1.3; color: var(--brand-navy); }
    p { margin: 0 0 18px; font-size: 14px; line-height: 1.55; color: var(--brand-ink); }
    .skills { display: flex; flex-wrap: wrap; gap: 6px; margin: auto 0 0; padding: 14px 0 0; list-style: none; border-top: 1px dashed var(--brand-line); }
    .skill {
      display: inline-flex; gap: 6px; align-items: center; padding: 5px 9px;
      background: var(--brand-paper); border: 1px solid var(--brand-line); border-radius: 2px;
      font-family: var(--font-mono); font-size: 12px; color: var(--brand-navy);
    }
    .skill img { object-fit: contain; }
    @media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
  `,
})
export class ExperienceListComponent {
  readonly experiences = input.required<CaseStudy[]>();
}
