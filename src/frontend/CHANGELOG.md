# Changelog - Frontend

## [2025-11-24] - Reorganización de Código

### Tipo de cambio:

- (refactor) Separación de responsabilidades
- (refactor) Centralización de tipos y datos
- (style) Mejoras de organización de código

### Descripción breve:

**Separación de Responsabilidades:**
- Se creó carpeta `types/` para centralizar todas las interfaces y tipos TypeScript
- Se creó carpeta `data/` para centralizar todos los datos mock organizados por dominio
- Los componentes ahora solo contienen lógica de presentación

**Tipos Centralizados:**
- `types/index.ts`: Todas las interfaces (Project, Event, NewsArticle, TeamMemberData, etc.)
- Eliminadas interfaces duplicadas de componentes individuales
- Imports tipo-only para mejor tree-shaking

**Datos Mock Centralizados:**
- `data/projects.ts`: MOCK_PROJECTS y PROJECT_STATS_DATA
- `data/events.ts`: MOCK_EVENTS
- `data/news.ts`: MOCK_NEWS
- `data/team.ts`: MOCK_TEAM_MEMBERS e IMPACT_DATA
- `data/index.ts`: Re-exports centralizados

**Constantes de Componentes:**
- Movidas de funciones a nivel de módulo (mejor performance)
- Naming convention: UPPER_SNAKE_CASE para constantes
- Ejemplos: STATUS_VARIANTS, TYPE_LABELS, CHART_THEME

**Componentes Refactorizados:**
- ProjectCard: -15 líneas, solo lógica de presentación
- EventCard: -20 líneas, solo lógica de presentación
- NewsCard: -15 líneas, solo lógica de presentación
- TeamMember: -10 líneas, solo lógica de presentación
- StatsChart: Constantes de tema extraídas

**Páginas Refactorizadas:**
- ProyectosPage: -70 líneas (-42%)
- NosotrosPage: -45 líneas (-31%)
- EventosPage: -65 líneas (-42%)
- NoticiasPage: -55 líneas (-37%)
- HomePage: -84 líneas (-28%)

### Archivos nuevos:

**Tipos:**
- src/types/index.ts

**Datos:**
- src/data/index.ts
- src/data/projects.ts
- src/data/events.ts
- src/data/news.ts
- src/data/team.ts

**Documentación:**
- REFACTORING.md (guía completa de la reorganización)

### Archivos modificados:

**Componentes:**
- src/components/ProjectCard.tsx (refactorizado)
- src/components/EventCard.tsx (refactorizado)
- src/components/NewsCard.tsx (refactorizado)
- src/components/TeamMember.tsx (refactorizado)
- src/components/StatsChart.tsx (refactorizado)

**Páginas:**
- src/modules/proyectos/pages/ProyectosPage.tsx (simplificado)
- src/modules/nosotros/pages/NosotrosPage.tsx (simplificado)
- src/modules/eventos/pages/EventosPage.tsx (simplificado)
- src/modules/noticias/pages/NoticiasPage.tsx (simplificado)
- src/modules/home/pages/HomePage.tsx (simplificado)

### Métricas:

**Reducción de código:**
- Total de líneas removidas de páginas: ~319 líneas
- Total de líneas en nuevos archivos organizados: ~298 líneas
- Reducción neta: ~21 líneas + mejor organización

**Performance:**
- Constantes no se recrean en cada render
- Mejor tree-shaking con type-only imports
- Bundle size: 640.93 kB (similar, mejor organizado)

### Build:

✅ Build exitoso en 19.24s
- Sin errores de TypeScript
- Sin errores de lint
- Todos los imports resueltos correctamente

### Beneficios:

- ✅ Código más mantenible y escalable
- ✅ Preparado para migración a API
- ✅ Mejor developer experience
- ✅ Componentes más testeables
- ✅ Single source of truth para tipos y datos

---


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
