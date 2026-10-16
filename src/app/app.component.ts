import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { HeroBannerComponent } from './shell/hero-banner/hero-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, HeroBannerComponent],
  template: `
    <header class="masthead">
      <mat-toolbar class="toolbar">
        <a class="brand" routerLink="/" aria-label="Prens Tegnologi">
          <img class="brand-mark" src="brand/logo-2-simbolo-negativo.svg" alt="" width="40" height="40" />
          <span class="brand-text">
            <span class="brand-word">Prens</span>
            <span class="brand-sub">Tegnologi</span>
          </span>
        </a>
        <span class="spacer"></span>
        <nav class="nav">
          <a mat-button routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
          <a mat-button routerLink="/servicios" routerLinkActive="is-active">Servicios</a>
          <a mat-button routerLink="/tareas" routerLinkActive="is-active">Tareas</a>
        </nav>
      </mat-toolbar>
      <app-hero-banner />
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
    // Logo: monograma (public/brand/) con el nombre al lado
    .brand { display: flex; gap: 12px; align-items: center; color: inherit; text-decoration: none; }
    .brand-mark { display: block; }
    .brand-text { display: flex; flex-direction: column; line-height: 1; }
    .brand-word { font-size: 24px; font-weight: 700; letter-spacing: -0.03em; }
    .brand-sub { margin-top: 2px; font-size: 14px; font-weight: 500; color: var(--brand-yellow); }
    .spacer { flex: 1; }
    .nav a {
      font-family: var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; font-size: 12px;
      @include mat.button-overrides((text-label-text-color: #fff));
    }
    .nav a.is-active { box-shadow: inset 0 -2px 0 var(--brand-yellow); border-radius: 0; }
    @media (max-width: 480px) {
      .brand { gap: 8px; }
      .brand-mark { width: 32px; height: 32px; }
      .brand-word { font-size: 18px; }
      .brand-sub { font-size: 11px; }
      .nav a { min-width: 0; padding: 0 8px; font-size: 11px; letter-spacing: 0.04em; }
    }
    .content { max-width: 1200px; margin: -48px auto 0; padding: 0 16px 48px; box-sizing: border-box; }
  `,
})
export class AppComponent {}
