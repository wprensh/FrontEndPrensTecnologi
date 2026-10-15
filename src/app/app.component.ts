import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar class="toolbar">
      <div class="toolbar-inner">
        <a class="brand" routerLink="/" aria-label="Prens Tegnologi">
          <span class="brand-word">prens<span class="brand-dot"></span></span>
          <span class="brand-sub">Tegnologi</span>
        </a>
        <span class="spacer"></span>
        <nav class="nav">
          <a mat-button routerLink="/tareas" routerLinkActive="is-active">Tareas</a>
        </nav>
      </div>
    </mat-toolbar>
    <main class="content">
      <router-outlet />
    </main>
    <footer class="footer">
      <span>.NET · Azure · Web · Móvil</span>
      <span>Cartagena de Indias, Colombia</span>
    </footer>
  `,
  styles: `
    @use '@angular/material' as mat;

    .toolbar {
      position: sticky; top: 0; z-index: 10; height: 72px;
      border-bottom: 1px solid var(--brand-panel-line);
      backdrop-filter: blur(12px);
      @include mat.toolbar-overrides((container-background-color: rgb(8 21 48 / 72%), container-text-color: #fff));
    }
    .toolbar-inner { display: flex; align-items: center; width: 100%; max-width: 1200px; margin: 0 auto; }
    .brand { display: flex; flex-direction: column; line-height: 1; color: inherit; text-decoration: none; }
    .brand-word { font-size: 28px; font-weight: 800; letter-spacing: -1.5px; }
    .brand-dot { display: inline-block; width: 8px; height: 8px; margin-left: 2px; border-radius: 50%; background: var(--brand-yellow); box-shadow: 0 0 12px var(--brand-yellow); }
    .brand-sub { margin-top: 3px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.42em; text-transform: uppercase; color: var(--brand-soft); }
    .spacer { flex: 1; }
    .nav a { border-radius: 999px; }
    .nav a.is-active { background: rgb(245 197 66 / 14%); }
    .content { max-width: 1200px; margin: 0 auto; padding: 40px 16px; box-sizing: border-box; }
    .footer {
      display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px;
      max-width: 1200px; margin: 0 auto; padding: 24px 16px 40px; box-sizing: border-box;
      border-top: 1px solid var(--brand-panel-line);
      font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--brand-muted);
    }
  `,
})
export class AppComponent {}
