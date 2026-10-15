import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <a class="brand" routerLink="/" aria-label="Prens Tegnologi">
          <span class="brand-word">prens<span class="brand-dot"></span></span>
          <span class="brand-sub">Tegnologi</span>
        </a>
        <p class="tagline">Software a la medida, integraciones y nube para empresas que quieren crecer.</p>
        <nav class="nav" aria-label="Secciones">
          <a routerLink="/tareas" routerLinkActive="is-active"><span class="nav-index">01</span>Tareas</a>
        </nav>
        <div class="sidebar-foot">
          <span class="foot-label">Sede</span>
          <span>Cartagena de Indias, Colombia</span>
          <span class="foot-stack">.NET · Azure · Web · Móvil</span>
        </div>
      </aside>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    .layout { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }
    .sidebar {
      position: sticky; top: 0; height: 100vh; box-sizing: border-box;
      display: flex; flex-direction: column; gap: 32px; padding: 40px 32px;
      background: var(--brand-navy); color: #fff;
    }
    .brand { display: flex; flex-direction: column; line-height: 1; color: inherit; text-decoration: none; }
    .brand-word { font-size: 48px; font-weight: 800; letter-spacing: -2.5px; }
    .brand-dot { display: inline-block; width: 12px; height: 12px; margin-left: 3px; border-radius: 50%; background: var(--brand-yellow); }
    .brand-sub { margin-top: 6px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.5em; text-transform: uppercase; color: #b2b9c6; }
    .tagline { margin: 0; font-size: 17px; line-height: 1.4; color: #dbe2ee; }
    .nav { display: flex; flex-direction: column; border-top: 1px solid rgb(255 255 255 / 14%); }
    .nav a {
      display: flex; align-items: baseline; gap: 14px; padding: 14px 0;
      border-bottom: 1px solid rgb(255 255 255 / 14%);
      color: #fff; text-decoration: none; font-weight: 600;
    }
    .nav a.is-active { box-shadow: inset 3px 0 0 var(--brand-yellow); padding-left: 14px; }
    .nav-index { font-family: var(--font-mono); font-size: 12px; color: var(--brand-yellow); }
    .sidebar-foot { margin-top: auto; display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #dbe2ee; }
    .foot-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #7b869a; }
    .foot-stack { margin-top: 8px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--brand-yellow); }
    .content { min-width: 0; padding: 48px 56px; box-sizing: border-box; max-width: 1180px; }

    @media (max-width: 900px) {
      .layout { grid-template-columns: 1fr; }
      .sidebar { position: static; height: auto; flex-direction: row; flex-wrap: wrap; align-items: center; gap: 16px; padding: 20px 16px; }
      .brand-word { font-size: 32px; letter-spacing: -1.5px; }
      .brand-dot { width: 8px; height: 8px; }
      .brand-sub { font-size: 9px; letter-spacing: 0.42em; }
      .tagline, .sidebar-foot { display: none; }
      .nav { margin-left: auto; border-top: 0; flex-direction: row; }
      .nav a { border-bottom: 0; padding: 8px 0; }
      .nav a.is-active { box-shadow: inset 0 -2px 0 var(--brand-yellow); padding-left: 0; }
      .content { padding: 28px 16px; }
    }
  `,
})
export class AppComponent {}
