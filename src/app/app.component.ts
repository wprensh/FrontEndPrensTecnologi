import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  template: `
    <header class="masthead">
      <mat-toolbar class="toolbar">
        <a class="brand" routerLink="/" aria-label="Prens Tegnologi">
          <span class="brand-word">prens<span class="brand-dot"></span></span>
          <span class="brand-sub">Tegnologi</span>
        </a>
        <span class="spacer"></span>
        <nav class="nav">
          <a mat-button routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
          <a mat-button routerLink="/tareas" routerLinkActive="is-active">Tareas</a>
        </nav>
      </mat-toolbar>
      <div class="hero">
        <p class="hero-kicker">Ingeniería de software · Cartagena, CO</p>
        <p class="hero-text">Desarrollo de software a la medida, integraciones y nube para empresas que quieren crecer.</p>
        <p class="hero-stack">.NET · Azure · Web · Móvil</p>
      </div>
    </header>
    <main class="content">
      <router-outlet />
    </main>
  `,
  styles: `
    @use '@angular/material' as mat;

    .masthead { background: var(--brand-navy); color: #fff; }
    .toolbar {
      max-width: 1200px; margin: 0 auto; height: 76px; padding: 0 16px; box-sizing: border-box;
      @include mat.toolbar-overrides((container-background-color: transparent, container-text-color: #fff));
    }
    .brand { display: flex; flex-direction: column; line-height: 1; color: inherit; text-decoration: none; }
    .brand-word { font-size: 30px; font-weight: 800; letter-spacing: -1.5px; }
    .brand-dot { display: inline-block; width: 8px; height: 8px; margin-left: 2px; border-radius: 50%; background: var(--brand-yellow); }
    .brand-sub { margin-top: 3px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.42em; text-transform: uppercase; color: #b2b9c6; }
    .spacer { flex: 1; }
    .nav a {
      font-family: var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; font-size: 12px;
      @include mat.button-overrides((text-label-text-color: #fff));
    }
    .nav a.is-active { box-shadow: inset 0 -2px 0 var(--brand-yellow); border-radius: 0; }
    .hero { max-width: 1200px; margin: 0 auto; padding: 24px 16px 72px; box-sizing: border-box; }
    .hero-kicker { margin: 0; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #b2b9c6; }
    .hero-text { max-width: 640px; margin: 12px 0; font-size: 26px; line-height: 1.25; font-weight: 400; color: #fff; }
    .hero-stack { margin: 0; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--brand-yellow); }
    .content { max-width: 1200px; margin: -48px auto 0; padding: 0 16px 48px; box-sizing: border-box; }
    @media (max-width: 600px) { .hero-text { font-size: 20px; } }
  `,
})
export class AppComponent {}
