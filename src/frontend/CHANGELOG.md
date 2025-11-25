# Changelog - Frontend

## [2025-11-24] - Expansión de Aplicación

### Tipo de cambio:

- (feat) Nuevas rutas y páginas completas
- (feat) Migración de router a wouter
- (feat) Integración de nuevas bibliotecas
- (feat) Sistema de componentes expandido
- (feat) Animaciones y mejoras de UX
- (refactor) Reorganización de utilidades
- (style) Mejoras de diseño y CSS

### Descripción breve:

**Rutas y Páginas:**
- Se crearon 4 nuevas rutas: `/proyectos`, `/nosotros`, `/eventos`, `/noticias`
- ProyectosPage: Grid de proyectos con filtros (activo/completado/planificado) y gráfica de barras
- NosotrosPage: Página sobre nosotros con misión/visión, equipo y gráfica de impacto
- EventosPage: Calendario de eventos con filtros (próximos/pasados) y registro
- NoticiasPage: Feed de noticias con filtros por categoría y artículos destacados
- HomePage actualizada con secciones de preview para todas las nuevas páginas

**Router y Navegación:**
- Migración de `react-router-dom` a `wouter` (router más ligero)
- Navegación responsive con menú móvil animado
- Indicador de ruta activa con animación de layout
- Links funcionales entre todas las páginas

**Nuevos Componentes:**
- ProjectCard: Tarjeta de proyecto con barra de progreso animada
- EventCard: Tarjeta de evento con registro y capacidad
- NewsCard: Tarjeta de noticia con categorías
- TeamMember: Perfil de miembro del equipo
- Badge: Indicadores de estado con múltiples variantes
- StatsChart: Componentes de gráficas (BarChart, PieChart) con Nivo

**Bibliotecas Integradas:**
- `wouter@3.7.1` - Router ligero
- `framer-motion@12.23.24` - Animaciones
- `@tabler/icons-react@3.35.0` - Sistema de iconos
- `@nivo/core@0.99.0`, `@nivo/bar@0.99.0`, `@nivo/pie@0.99.0` - Visualización de datos
- `zustand@5.0.8` - Gestión de estado global
- `@tanstack/react-query@5.90.10` - Gestión de datos
- `nuqs@2.8.1` - Estado de query params

**Infraestructura:**
- Zustand store para filtros globales (proyectos, eventos, noticias)
- TanStack Query provider configurado para futuras integraciones API
- Utilidad centralizada `cn()` en `lib/utils.ts`
- Constantes expandidas en `routes.ts` y `strings.ts`

**Diseño y Animaciones:**
- Animaciones de entrada con Framer Motion en todas las páginas
- Efectos hover en tarjetas y botones
- Menú móvil con animación slide-down
- Scrollbar personalizado
- Keyframes CSS para animaciones adicionales
- Focus-visible styles para accesibilidad

### Archivos nuevos:

**Páginas:**
- src/modules/proyectos/pages/ProyectosPage.tsx
- src/modules/nosotros/pages/NosotrosPage.tsx
- src/modules/eventos/pages/EventosPage.tsx
- src/modules/noticias/pages/NoticiasPage.tsx

**Componentes:**
- src/components/ProjectCard.tsx
- src/components/EventCard.tsx
- src/components/NewsCard.tsx
- src/components/TeamMember.tsx
- src/components/StatsChart.tsx
- src/components/ui/Badge.tsx

**Infraestructura:**
- src/lib/utils.ts
- src/stores/useAppStore.ts

### Archivos modificados:

**Core:**
- src/main.tsx (agregado QueryClientProvider)
- src/App.tsx (migrado a wouter con Switch/Route)
- src/index.css (animaciones, scrollbar, variables)

**Layout:**
- src/layouts/MainLayout.tsx (menú móvil, navegación con wouter, animaciones)

**Componentes UI:**
- src/components/ui/Button.tsx (usa cn de lib/utils)
- src/components/ui/Card.tsx (usa cn de lib/utils)

**Páginas:**
- src/modules/home/pages/HomePage.tsx (secciones de preview, animaciones)

**Constantes:**
- src/constants/routes.ts (nuevas rutas)
- src/constants/strings.ts (strings para todas las páginas)

**Configuración:**
- package.json (nuevas dependencias, removidas antiguas)

### Archivos eliminados:

- src/router/index.tsx (reemplazado por wouter en App.tsx)

### Dependencias removidas:

- react-router-dom@6.22.3
- @remix-run/router@1.23.0

### Build:

✅ Build exitoso en 25.23s
- Bundle size: 642.66 kB (gzip: 209.56 kB)
- CSS: 22.26 kB (gzip: 4.87 kB)

---

## [2025-11-24] - Inicialización

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
