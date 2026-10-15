# FrontEnd PrensTecnologi

Aplicación Angular 19 con Angular Material y **arquitectura vertical** (Vertical Slice / Feature-Driven). La primera funcionalidad es un Dashboard de Gestión de Tareas.

- Solo componentes, directivas y pipes standalone (sin NgModules).
- Control de flujo moderno (`@if`, `@for`, `@switch`).
- Estado con Signals (`signal`, `computed`, `effect`); RxJS solo en la capa HTTP.
- Inyección con `inject()`.
- Tema Material 3 en SCSS nativo, con modo oscuro según el sistema.

## Empezar

```bash
npm install
npm start          # http://localhost:4200
npm run build      # build de producción en dist/
npm test           # pruebas unitarias (Karma)
```

## Estructura

```text
src/app/
├── app.component.ts        # shell: toolbar + <router-outlet>
├── app.config.ts           # router, HttpClient, animaciones de Material
├── app.routes.ts           # carga perezosa de cada feature
├── core/http/              # infraestructura transversal (interceptor de errores)
└── features/
    └── tasks/              # slice autocontenido
        ├── tasks.routes.ts # entrada pública del slice + providers
        ├── models/         # interfaces y tipos
        ├── data-access/    # servicio HTTP simulado + store con signals
        ├── ui/             # componentes, pipe y directiva de presentación
        └── feature/        # página contenedora (tasks-dashboard)
```

## Reglas de la arquitectura

1. Una feature no importa archivos de otra. Lo compartido va a `shared/` (UI genérica) o `core/` (infraestructura).
2. Servicios y stores se proveen en la ruta del slice, no en `root`.
3. Los componentes de `ui/` reciben `input()` y emiten `output()`; solo `feature/` inyecta el store.
4. Para una feature nueva, copia la forma de `features/tasks/` y regístrala con `loadChildren` en `app.routes.ts`.

## Backend real

`TasksApiService` simula HTTP con latencia. Para conectar una API, añade `private readonly http = inject(HttpClient);` y sustituye cada `simulate()` por la llamada comentada.
