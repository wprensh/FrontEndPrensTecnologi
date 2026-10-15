import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar class="toolbar">
      <mat-icon aria-hidden="true">dashboard</mat-icon>
      <span class="brand">PrensTecnologi</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/tareas" routerLinkActive="is-active">Tareas</a>
    </mat-toolbar>
    <main class="content">
      <router-outlet />
    </main>
  `,
  styles: `
    .toolbar { position: sticky; top: 0; z-index: 10; gap: 8px; }
    .brand { font-weight: 500; }
    .spacer { flex: 1; }
    .is-active { background: var(--mat-sys-secondary-container); }
    .content { max-width: 1200px; margin: 0 auto; padding: 24px 16px; }
  `,
})
export class AppComponent {}
