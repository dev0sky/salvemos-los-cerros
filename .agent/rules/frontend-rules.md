# Reglas del Frontend
**Stack:** React + Vite
**Gestor de paquetes:** pnpm
**Arquitectura:** SOLID + Modularización estricta
**Objetivo:** Mantener un front-end mantenible, escalable, testeable y libre de ambigüedades.

---

## 1. Principios Fundamentales

### 1.1. SOLID aplicado al Front-End
1.  **S – Single Responsibility**
    *   Cada componente debe hacer una sola cosa.
    *   Cada archivo debe corresponder a una única responsabilidad.

2.  **O – Open/Closed**
    *   Componentes y módulos abiertos para extensión, cerrados para modificación.
    *   La configuración y comportamientos variables deben venir de props o composición.

3.  **L – Liskov Substitution**
    *   Todo componente debe ser sustituible por otro equivalente sin romper la aplicación.

4.  **I – Interface Segregation**
    *   Los componentes no deben recibir props innecesarias.
    *   Los hooks deben dividirse si manejan responsabilidades distintas.

5.  **D – Dependency Inversion**
    *   Evitar dependencias directas entre capas.
    *   Para llamadas a APIs o servicios, abstraer en módulos independientes.

---

## 2. Estructura del Proyecto
Estructura recomendada:

```
src/
└── frontend/
    ├── assets/
    ├── components/
    ├── ui/
    ├── shared/
    ├── modules/
    │   ├── auth/
    │   ├── dashboard/
    │   └── users/
    ├── hooks/
    ├── layouts/
    ├── services/
    ├── utils/
    ├── constants/
    ├── router/
    ├── styles/
    ├── main.tsx
    ├── app.tsx
    └── tests/
```

### Reglas:
*   **Un archivo por componente**.
*   **Un directorio por módulo**.
*   **Los componentes UI deben ser desacoplados (presentational components)**.
*   **Los contenedores o componentes lógicos deben ir en los módulos específicos**.

---

## 3. Routing
*   Se debe usar **`react-router-dom`** obligatoriamente.
*   Las rutas deben declararse en un módulo dedicado:

```
src/frontend/router/index.tsx
```

*   Las rutas deben ser declarativas y centralizadas.
*   No se permiten “rutas mágicas” escritas inline.
*   Todas las rutas deben provenir de un archivo de constantes de rutas:

```
src/frontend/constants/routes.ts
```

---

## 4. Gestión de Paquetes
*   **Uso estricto de pnpm**.
*   Prohibido usar npm o yarn.
*   Los lockfiles deben mantenerse bajo control de versiones.

---

## 5. Variables de Entorno
*   Usar variables de entorno únicamente cuando la configuración dependa del entorno de ejecución (dev/stage/prod).
*   Deben definirse usando prefijo obligatorio:

```
VITE_APP_*
```

*   Se gestionan desde:

```
.env
.env.development
.env.production
```

*   Prohibido hardcodear valores configurables dentro del código.

---

## 6. Magic Strings
**Prohibidas completamente.**
Todo valor repetitivo o crítico debe extraerse:

### Archivos permitidos:
*   `src/frontend/constants/strings.ts`
*   `src/frontend/constants/routes.ts`
*   `src/frontend/constants/config.ts`
*   `src/frontend/constants/errors.ts`

### Ejemplo:
```ts
export const API_ENDPOINTS = {
  LOGIN: '/api/v1/login',
  USERS: '/api/v1/users',
};
```

---

## 7. Modularización de Componentes
### Reglas:
*   Componentes pequeños, reusables y desacoplados.
*   Dividir entre UI Components y Feature Components.
*   UI Components nunca deben incluir lógica de negocio.
*   Los Feature Components deben vivir en `modules/*.`

---

## 8. Manejo de Servicios / APIs
Toda interacción HTTP debe pasar por un servicio dedicado:

```
src/frontend/services/api.ts
```

*   No se permiten `fetch`/`axios` en componentes.
*   No se permiten servicios que dependan del UI directamente.
*   Respetar principio de inversión de dependencias separando:
    *   Adaptadores
    *   Servicios
    *   Modelos

---

## 9. Hooks
*   Cada hook debe tener un propósito claro.
*   Nomenclatura estricta: `useSomething.ts`.
*   Prohibido mezclar lógica de distintos dominios en un mismo hook.

---

## 10. Estilos
*   El styling se realizará usando TailwindCSS 4.
*   Las clases deben ser declarativas, limpias y evitar duplicación.
*   Prohibido crear estilos inline extensos que rompan el patrón del proyecto.

---

## 11. Testing
*   Las vistas y componentes deben tener tests de integración con Playwright.
*   Tests unitarios permitidos con Vitest cuando corresponda.
*   Cada módulo debe mantener:

```
src/frontend/modules/<modulo>/tests/CHANGELOG.md
```

*   Los tests deben actualizarse tras cualquier cambio que afecte comportamiento.

---

## 12. Flujo de Trabajo del Front-End
*   Crear o modificar componente.
*   Actualizar constantes requeridas.
*   Actualizar rutas si aplica.
*   Crear/actualizar hooks o servicios necesarios.
*   Implementar tests (unitarios + e2e según caso).
*   Registrar cambios en:
    *   `CHANGELOG.md`
    *   `src/frontend/modules/<modulo>/tests/CHANGELOG.md` del módulo correspondiente.

---

## 13. Versión
v1.0 — Reglas del Front-End React/Vite bajo arquitectura SOLID y modularización estricta.
