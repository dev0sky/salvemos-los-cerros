# Changelog - Frontend

## [2025-11-24] - Módulo de Galería y Mejoras de Imágenes

### Tipo de cambio:

- (feat) Módulo de galería completo con lightbox
- (feat) Integración de API de imágenes (static.photos)
- (feat) Imágenes en todos los componentes de cards
- (fix) Tamaños de imágenes y botones en cards
- (refactor) Servicio de imágenes centralizado

### Descripción breve:

**Módulo de Galería:**
- Página de galería con grid responsive (1/2/3 columnas)
- Filtros por categoría (Todas, Proyectos, Eventos, Naturaleza, Equipo)
- Lightbox para visualización de imágenes a pantalla completa
- Navegación con teclado (← → ESC) y botones
- 9 imágenes de muestra con metadata completa
- Animaciones de entrada y hover effects

**Servicio de Imágenes:**
- Integración con `https://static.photos/` para imágenes de prueba
- Servicio centralizado `imageService.ts` con funciones reutilizables
- Temas predefinidos: NATURE, CLEANUP, REFORESTATION, WORKSHOP, etc.
- Separación de responsabilidades: API calls fuera de componentes

**Imágenes en Cards:**
- ProjectCard: 6 proyectos con imágenes temáticas
- EventCard: 7 eventos con imágenes relevantes
- NewsCard: 6 noticias con imágenes
- Todas las imágenes usando aspect-ratio 4:3 para consistencia

**Mejoras de Layout:**
- Cards con aspect-ratio 4:3 (responsive)
- Eliminados márgenes negativos problemáticos
- Padding consistente de 24px (p-6) en contenido
- Botones con `whitespace-nowrap` para evitar wrap
- Badges con `flex-wrap` y `gap-2` para flexibilidad

### Archivos nuevos:

**Servicios:**
- src/services/imageService.ts

**Componentes:**
- src/components/Lightbox.tsx

**Páginas:**
- src/modules/galeria/pages/GaleriaPage.tsx

**Tipos:**
- src/types/gallery.ts (luego integrado en index.ts)

**Datos:**
- src/data/gallery.ts

### Archivos modificados:

**Componentes:**
- src/components/ProjectCard.tsx (imágenes + layout)
- src/components/EventCard.tsx (imágenes + layout)
- src/components/NewsCard.tsx (imágenes + layout)

**Datos:**
- src/data/projects.ts (agregadas imágenes)
- src/data/events.ts (agregadas imágenes)
- src/data/news.ts (agregadas imágenes)
- src/data/index.ts (export MOCK_GALLERY)

**Tipos:**
- src/types/index.ts (agregado GalleryImage)

**Rutas:**
- src/constants/routes.ts (agregada ruta /galeria)
- src/constants/strings.ts (agregado NAV_GALERIA)

**Core:**
- src/App.tsx (ruta de galería)
- src/layouts/MainLayout.tsx (link de galería en nav)

### Características del Lightbox:

- ✅ Visualización a pantalla completa
- ✅ Navegación anterior/siguiente con botones
- ✅ Navegación con teclado (← → ESC)
- ✅ Click fuera para cerrar
- ✅ Información de imagen (título, descripción, fecha, fotógrafo)
- ✅ Contador de posición (ej: "3 / 9")
- ✅ Animaciones suaves entre imágenes (Framer Motion)

### Mejoras de Cards:

**Antes:**
- Altura fija de imágenes (h-48)
- Márgenes negativos (-m-6)
- Botones que hacían wrap
- Layout inconsistente

**Ahora:**
- Aspect ratio 4:3 responsive
- Sin márgenes negativos
- Botones con whitespace-nowrap
- Layout consistente con flex-col

### API de Imágenes:

**URL Format:**
```
https://static.photos/800x600?nature,forest,trees
https://static.photos/1200x800?conservation,wildlife,nature
```

**Funciones:**
- `getStaticPhoto(topic, width, height)` - Imagen por tema
- `getStaticPhotoById(id, width, height)` - Imagen por ID

### Build:

✅ Build exitoso en 27.29s
- Bundle size: 651.18 kB (gzip: 211.35 kB)
- CSS: 25.93 kB (gzip: 5.43 kB)

### Beneficios:

- ✅ Galería funcional con experiencia de usuario premium
- ✅ Imágenes consistentes en toda la aplicación
- ✅ Servicio centralizado para fácil mantenimiento
- ✅ Cards con layout profesional y responsive
- ✅ Separación de responsabilidades (API calls aislados)
- ✅ Preparado para migración a imágenes reales

---

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
