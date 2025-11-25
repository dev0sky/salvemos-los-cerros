# Changelog - Frontend

## [2025-11-24]

### Tipo de cambio:

- (feat) Inicialización del proyecto
- (fix) Versiones de dependencias

### Descripción breve:

- Se inicializó el proyecto React + Vite con TypeScript.
- Se configuró TailwindCSS v4 con el sistema de diseño "Naturaleza Viva".
- Se implementó la estructura de directorios modular (components, modules, layouts, router).
- Se creó la página de inicio (HomePage) y componentes base (Button, Card).
- Se corrigió `package.json` para usar versiones exactas en lugar de rangos (`^`).

### Archivos modificados:

- src/frontend/package.json
- src/frontend/vite.config.ts
- src/frontend/src/main.tsx
- src/frontend/src/App.tsx
- src/frontend/src/index.css
- src/frontend/src/components/ui/Button.tsx
- src/frontend/src/components/ui/Card.tsx
- src/frontend/src/modules/home/pages/HomePage.tsx
- src/frontend/src/layouts/MainLayout.tsx
- src/frontend/src/router/index.tsx
