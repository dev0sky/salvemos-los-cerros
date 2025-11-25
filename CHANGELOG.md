# Changelog - Salvemos Los Cerros

## [2025-11-25]

### Tipo de cambio:

- (feat) Dockerización completa (Frontend + Backend)
- (feat) Internacionalización (i18n) en Frontend
- (feat) Mejoras de UX y manejo de errores

### Descripción breve:

- Se configuró el entorno de desarrollo con Docker Compose, orquestando frontend (Nginx) y backend (Gunicorn).
- Se implementó soporte multi-idioma (ES, EN, IT, FR) en el frontend con `i18next`.
- Se mejoró la experiencia de usuario con estados de carga granulares y manejo de errores robusto.

### Archivos modificados:

- docker-compose.yml
- src/backend/Dockerfile
- src/frontend/Dockerfile
- src/frontend/src/i18n/*
- src/frontend/src/components/ui/ErrorState.tsx

## [2025-11-24]

### Tipo de cambio:

- (feat) Frontend Initialization

### Descripción breve:

- Inicialización completa del frontend con React, Vite y TailwindCSS.
- Implementación de diseño "Naturaleza Viva".
- Configuración de reglas de frontend y changelogs.

### Archivos modificados:

- src/frontend/\*
