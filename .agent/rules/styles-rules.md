---
trigger: always_on
---

# Guía de Estilo para Agente
**Framework:** TailwindCSS v4
**Referencia Visual:** Layout tipo “Naturaleza Viva” (estructura limpia, modular, espaciosa, con acentos de color y bloques bien definidos).

---

## 1. Principios de Diseño
1.  **Claridad visual:**
    *   Interfaces limpias con jerarquía semántica clara.
    *   Uso consistente de espaciados, tipografía y colores.
2.  **Modularidad:**
    *   Cada componente debe poder reutilizarse y encajar con los demás sin ajustes manuales.
3.  **Enfoque en contenido:**
    *   Bloques con títulos grandes, subtítulos descriptivos y CTAs destacadas.
4.  **Equilibrio:**
    *   Alternancia entre secciones de fondo claro y tarjetas con sombras suaves.
5.  **Consistencia:**
    *   Todos los elementos deben compartir un sistema unificado de espaciado, bordes, tipografía y colores.

---

## 2. Paleta de Color
Colores inspirados en una paleta marrón elegante y moderna:

| Uso               | Color                 | Tailwind (custom) |
| :---------------- | :-------------------- | :---------------- |
| Primario          | #6F4E37 (marrón café) | `primary`         |
| Secundario        | #B8A79B (marrón topo) | `secondary`       |
| Fondo Principal   | #FDF5E6 (crema suave) | `surface`         |
| Fondo Tarjetas    | #FFFAF0 (blanco floral)| `card`            |
| Texto Principal   | #4A3B30 (marrón oscuro)| `text-main`       |
| Texto Secundario  | #70625A (marrón grisáceo)| `text-muted`      |
| Borde Suave       | #E0D8D0 (beige claro) | `border-soft`     |

Extensión recomendada en `tailwind.config`:

```js
theme: {
  extend: {
    colors: {
      primary: '#6F4E37',
      secondary: '#B8A79B',
      surface: '#FDF5E6',
      card: '#FFFAF0',
      'text-main': '#4A3B30',
      'text-muted': '#70625A',
      'border-soft': '#E0D8D0',
    }
  }
}
```

## 3. Tipografía
Estilo limpio, geométrico y moderno:

Familias sugeridas:
*   Inter (ideal)
*   Plus Jakarta Sans
*   Manrope

Escala tipográfica:

| Uso               | Clase                     | Observaciones                     |
| :---------------- | :------------------------ | :-------------------------------- |
| Título principal  | `text-4xl font-bold`      | Siempre claro y dominante         |
| Subtítulos        | `text-xl font-semibold`   | Deben tener contraste visual      |
| Texto cuerpo      | `text-base text-text-main`| Legible y equilibrado             |
| Texto secundario  | `text-sm text-text-muted` | Para descripciones largas         |
| Botones           | `text-sm font-semibold`   | Corto y directo                   |

## 4. Layout / Spacing
El diseño de la imagen usa mucho aire y bloques bien definidos.

Reglas:
*   Padding externo de secciones: `py-12 md:py-20`.
*   Padding interno de tarjetas: `p-6 md:p-8`.
*   Espaciado entre elementos verticales: `space-y-4` o `space-y-6`.
*   Ancho máximo de contenido: `max-w-7xl mx-auto`.

Grid base:
*   Listados: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
*   Secciones mixtas: `lg:grid lg:grid-cols-3`.

## 5. Componentes Base
### 5.1. Card

```html
<div class="bg-card rounded-2xl shadow-sm border border-border-soft p-6 space-y-3">
  <h3 class="text-xl font-semibold text-text-main">Título</h3>
  <p class="text-text-muted text-sm">Descripción aquí.</p>
</div>
```

### 5.2. Hero Block

```html
<section class="bg-surface rounded-3xl p-10 md:p-16 flex flex-col gap-6">
  <h1 class="text-4xl font-bold max-w-xl text-text-main">Título Destacado</h1>
  <p class="text-text-muted max-w-lg">Descripción secundaria clara y concisa.</p>
  <button class="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90">
    Acción
  </button>
</section>
```

### 5.3. Botones

```html
<button class="bg-primary text-white rounded-xl px-5 py-2.5 font-semibold hover:opacity-90">
  Acción
</button>

<button class="border border-primary text-primary rounded-xl px-5 py-2.5 font-semibold hover:bg-primary/10">
  Secundario
</button>
```

## 6. Estilo de Imágenes
*   Bordes suaves: `rounded-2xl`.
*   Separación entre imágenes y texto: `mt-4`.
*   Imágenes de carrusel: usan bordes redondeados y proporción consistente.
*   Mantener aspect ratios: `aspect-video`, `aspect-[4/3]`.

## 7. Secciones Relevantes Inspiradas en la Imagen
### 7.1. Sponsor Strip

```html
<div class="w-full flex flex-wrap items-center justify-center gap-10 py-8">
  <img class="h-10 opacity-80" src="/logo.png" alt="Sponsor">
</div>
```

### 7.2. Preguntas Frecuentes

```html
<div class="bg-card border border-border-soft rounded-2xl p-6">
  <button class="w-full flex items-center justify-between text-left py-4 border-b border-border-soft">
    <span class="text-text-main font-medium">¿Pregunta?</span>
    <span class="text-primary">+</span>
  </button>
</div>
```

## 8. Sombras y Bordes
Debe sentirse ligero, moderno y limpio.

*   Sombra estándar: `shadow-sm`.
*   Sombra flotante para componentes destacados: `shadow-lg/10`.
*   Bordes: `border border-border-soft`.

## 9. Interacciones
Hover:
*   Ligero cambio de opacidad: `hover:opacity-90`.
*   Levantamiento suave: `hover:-translate-y-0.5 transition`.

Focus:
*   Anillo visible: `focus:ring-2 focus:ring-primary/40`.

## 10. Tono General del UI
Profesional, limpio y orientado a información.

*   Secciones muy separadas, fácil escaneo visual.
*   Colores suaves con énfasis primario como guía del usuario.
*   Tarjetas como bloques principales de contenido estructurado.

## 11. Reglas del Agente (para consistencia interna)
Cuando genere UI:
*   Usar exclusivamente utilidades de Tailwind 4.
*   Respetar esta guía tipográfica, de colores y espaciados.
*   Seguir el patrón modular mostrado.

Cuando produzca ejemplos:
*   Mantener componentes autocontenidos y consistentes.
*   Mantener un estilo visual alineado al diseño "Naturaleza Viva":
    *   Bordes redondeados, mucho espacio, tipografía clara, tarjetas limpias.
