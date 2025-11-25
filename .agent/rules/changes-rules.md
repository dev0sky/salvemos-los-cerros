# Protocolo de Cambios del Agente
**Archivo principal:** `CHANGELOG.md`
**Objetivo:** Mantener un historial claro, verificable y coherente de todas las modificaciones del agente, sus funciones, sus pruebas y su estructura.

---

## 1. Registro Obligatorio de Cambios
1. **Cada cambio, sin excepción, debe registrarse en `CHANGELOG.md`.**
2. Formato recomendado para cada entrada:
   ```markdown
   ## [Fecha - AAAA/MM/DD]
   ### Tipo de cambio:
   - (fix) Corrección
   - (feat) Nueva funcionalidad
   - (update) Actualización
   - (refactor) Refactorización
   - (test) Cambio en pruebas
   ### Descripción breve:
   - Qué se cambió
   - Por qué
   - Impacto directo
   ### Archivos modificados:
   - ruta/archivo.ext
   ```
   Mantener las versiones ordenadas cronológicamente (descendente).

## 2. Detección de Cambios Manuales del Usuario
Antes de aplicar cualquier modificación:
Analizar si el usuario realizó cambios manuales entre interacciones.

Si detecta cambios:
- Documentarlos en `CHANGELOG.md`.
- Ajustar referencias internas afectadas (nombres, rutas, reglas, funciones, estilos, lógica).
- Nunca sobrescribir trabajo manual del usuario.

Prioridad:
- Mantener coherencia interna
- Respetar estructura existente
- Evitar alterar funcionalidad sin justificación

## 3. Manejo de Reestructuraciones
No realizar cambios radicales sin avisar.

Si se requiere una reestructuración mayor:
- Preguntar primero al usuario.
- Explicar el impacto y alternativas.
- Si el usuario no autoriza explícitamente → continuar sin cambios mayores.

## 4. Protocolo de Tests
### 4.1. Funciones de Front-End
Para cualquier función, componente o feature relacionado con front-end:
Generar tests automáticos usando Playwright.

Regla mínima de cobertura:
- Carga del componente
- Funcionalidad principal
- Errores/estados vacíos
- Flujo principal del usuario

Registrar los cambios del test en:
- `src/frontend/tests/CHANGELOG.md`

### 4.2. Funciones de Back-End
Dependiendo del lenguaje:
- Python: `pytest`
- Go: `testing` estándar
- Node/JS: `Vitest` o `Jest`
- Django: `TestCase` nativo + `pytest` opcional
- Rust: tests integrados del módulo

Cada feature nueva debe llevar:
- Prueba unitaria
- Prueba funcional (si aplica)
- Prueba de regresión si existe riesgo

Registrar cambios en:
- `src/backend/tests/CHANGELOG.md` correspondiente al módulo

## 5. Actualización de Tests tras Cambios
Cada modificación que altere:
- Interfaces
- Firmas de funciones
- Comportamiento
- Rutas
- Selectores front-end
- Datos esperados

Debe:
- Actualizar los tests correspondientes.
- Ejecutarlos para verificar que todo sigue funcional.
- Registrar en su `CHANGELOG.md`.

## 6. Estructura Recomendada
```
/README.md
/CHANGELOG.md
/src
   /frontend
       /CHANGELOG.md
       /tests
           /CHANGELOG.md
   /backend
       /CHANGELOG.md
       /tests
           /CHANGELOG.md
```

## 7. Reglas de Cohesión del Protocolo
- Mantener estructura estable; evitar cambios arbitrarios.
- Todo cambio debe tener un motivo rastreable.
- Nunca eliminar historial previo.
- Los tests son parte obligatoria del ciclo de cambios.
- Si un cambio no es registrable → no debe realizarse.

## 8. Flujo Estándar de Trabajo
1. Detectar cambios manuales del usuario
2. Generar la funcionalidad
3. Crear/actualizar tests
4. Ejecutar batería de pruebas
5. Registrar cambios en `CHANGELOG.md`
6. Registrar cambios del test en su `src/frontend/tests/CHANGELOG.md` o `src/backend/tests/CHANGELOG.md`
7. Confirmar consistencia del sistema

## 9. Versión
v1.0 — Protocolo de Cambios para Agentes con Control Rígido y Pruebas Automáticas.
