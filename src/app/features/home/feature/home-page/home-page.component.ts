import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { TECH_CATEGORY_LABELS, TECHNOLOGIES, TechCategory } from '../../../../shared/brand/technologies';
import { CONTACT } from '../../../../shared/brand/contact';
import { CASES, PROCESS, RESULTS, SERVICES } from '../../data-access/home.content';
import { ExperienceListComponent } from '../../ui/experience-list/experience-list.component';
import { ServiceListComponent } from '../../ui/service-list/service-list.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, MatButtonModule, MatChipsModule, MatIconModule, ServiceListComponent, ExperienceListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly services = SERVICES;
  protected readonly process = PROCESS;
  protected readonly results = RESULTS;
  protected readonly cases = CASES;
  protected readonly contact = CONTACT;
  protected readonly mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Proyecto con Prens Tecnologi')}`;

  // Tecnologías agrupadas por categoría, en el orden de TECH_CATEGORY_LABELS
  protected readonly techGroups = (Object.keys(TECH_CATEGORY_LABELS) as TechCategory[]).map((category) => ({
    category,
    label: TECH_CATEGORY_LABELS[category],
    items: TECHNOLOGIES.filter((t) => t.category === category),
  }));
}
