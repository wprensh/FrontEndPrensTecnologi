import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { CASES, CONTACT, RESULTS, SERVICES, TECHNOLOGIES } from '../../data-access/home.content';
import { TechExplorerComponent } from '../../ui/tech-explorer/tech-explorer.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, MatButtonModule, TechExplorerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly services = SERVICES;
  protected readonly technologies = TECHNOLOGIES;
  protected readonly results = RESULTS;
  protected readonly cases = CASES;
  protected readonly contact = CONTACT;
  protected readonly mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Proyecto con Prens Tegnologi')}`;
}
