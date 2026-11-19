---
name: gestionar-pa
description: >-
  Crea nuevas preguntas abiertas (PA-NNN) cuando faltan datos de negocio o hay contradicciones, o resuelve preguntas abiertas existentes propagando la respuesta a todo el SRS. Usar cada vez que surja incertidumbre o cuando el usuario conteste a una o varias PA.
---

# Gestionar preguntas abiertas (`PA-NNN`)

Mantiene el principio de cero invención de datos de negocio, precios o configuraciones, garantizando trazabilidad completa entre las respuestas del cliente y los artefactos afectados en `docs/`.

## Cuándo crear una pregunta abierta

1. Consultar `docs/13-preguntas-abiertas/Indice de preguntas abiertas.md` para obtener el siguiente identificador `PA-NNN` libre (nunca reutilizar ni renumerar IDs existentes).
2. Crear la nota correspondiente en `docs/13-preguntas-abiertas/` (nombrada `PA-NNN.md`) siguiendo `docs/99-plantillas/Plantilla pregunta abierta.md` con:
   - `estado: abierta` y `prioridad:` (`bloqueante`, `alta`, `media` o `baja`).
   - `afecta:` listando todos los artefactos impactados entre comillas (`"[[RF-...]]"`, `"[[ADR-...]]"`, etc.).
   - Evidencia real observada, opciones concretas con recomendación técnica y preguntas específicas.
3. En cada requisito, supuesto o interfaz afectada, envolver la suposición provisional con:
   ```markdown
   > [!warning] Hipótesis
   > Suposición provisional pendiente de [[PA-NNN]].
   ```

## Cuándo resolver una pregunta abierta

1. Abrir la nota de la pregunta en `docs/13-preguntas-abiertas/` (`PA-NNN.md`), cambiar `estado: resuelta`, actualizar `actualizado:` y añadir una sección `## Resolución` con la decisión exacta del usuario y la fecha.
2. **Propagar** obligatoriamente la respuesta a cada nota listada en `afecta:`:
   - Sustituir las hipótesis provisionales por el requisito o dato definitivo y eliminar el bloque `> [!warning] Hipótesis` ya resuelto.
   - Si desbloquea una decisión en `docs/12-decisiones/`, pasar el `ADR-NNN` de `propuesto` a `aceptado` y actualizar las notas de `docs/14-stack/` correspondientes.
3. Si se resuelve un bloque relevante o todas las `PA` bloqueantes, añadir nueva versión en `docs/00-inicio/Historial de cambios.md` y actualizar `docs/00-inicio/Estado.md`.

## Verificación

- Ejecutar `python docs/90-anexos/scripts/boveda.py indices`, `validar` y `listar` con `Errores: 0`.
- Verificar que el conteo de preguntas abiertas/resueltas en `docs/00-inicio/Estado.md` y `docs/13-preguntas-abiertas/Indice de preguntas abiertas.md` se actualiza automáticamente y refleja las preguntas restantes.
- Registrar el commit local si el cambio implica nueva versión del historial.
