---
id: DOC-INI-003
tipo: inicio
titulo: Convenciones de la bóveda SRS
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Convenciones de la bóveda SRS

Este documento fija la estructura, el formato de metadatos y las reglas de trazabilidad verificadas automáticamente por [[boveda.py]].

## 1. Idioma, nombres y enlaces
- Todo el contenido está en **español** y codificado en UTF-8 (`\n`).
- Todo archivo `.md` fuera de `99-plantillas/` y `90-anexos/generados/` debe tener un **nombre de archivo único** en toda la bóveda para permitir wikilinks directos `[[Nombre]]`.
- En las notas tipadas (`obj`, `actor`, `nec`, `cu`, `rf`, `rnf`, `ie`, `ca`, `adr`, `pa`), el nombre del archivo sin extensión debe coincidir exactamente con el campo `id` (ejemplo: `RF-NAV-001.md` ↔ `id: RF-NAV-001`).
- Los wikilinks dentro del frontmatter YAML se escriben siempre entre comillas: `"[[NEC-001]]"`.

## 2. Frontmatter mínimo obligatorio
Toda nota validada debe incluir al inicio:
```yaml
id: RF-NAV-001
tipo: rf
titulo: Navegación principal adaptada
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
```
Valores recomendados para `estado`: `borrador`, `propuesto`, `aceptado`, `vigente`, `abierta`, `resuelta`, `descartado`.

## 3. Reglas de redacción
- **Requisitos (`RF` y `RNF`)**: comportamiento atómico y verificable redactado en tercera persona con `El sistema debe…`. No incluir marcas ni frameworks de implementación en el enunciado del requisito; esas decisiones pertenecen a `12-decisiones/` y `14-stack/`.
- **Incertidumbre y datos pendientes**: si falta un dato de negocio o hay discrepancias en la fuente actual, no se inventa. Se documenta una pregunta abierta (`PA-NNN`) y toda asunción provisional en el SRS se envuelve con el aviso:
```markdown
> [!warning] Hipótesis
> Suposición provisional pendiente de [[PA-NNN]].
```

## 4. Trazabilidad en un solo sentido
Para evitar redundancias y ciclos de edición, las relaciones en frontmatter apuntan **siempre en una dirección**:
- `OBJ-*`: no enlaza hacia abajo.
- `ACT-*`: no enlaza hacia abajo.
- `NEC-*` → `objetivos: ["[[OBJ-NNN]]"]` y `actores: ["[[ACT-NNN]]"]`.
- `CU-*` → `actores: ["[[ACT-NNN]]"]` y `necesidades: ["[[NEC-NNN]]"]`.
- `RF-*` → `necesidades: ["[[NEC-NNN]]"]` y (opcional) `casos_uso: ["[[CU-NNN]]"]`.
- `RNF-*` → `necesidades: ["[[NEC-NNN]]"]`.
- `IE-*` → `requisitos: ["[[RF-...]]", "[[RNF-...]]"]`.
- `CA-*` → `verifica: ["[[RF-...]]", "[[RNF-...]]"]`.
- `ADR-*` → `afecta: ["[[...]]"]`.
- `PA-*` → `prioridad: bloqueante|alta|media|baja` y `afecta: ["[[...]]"]`.

## 5. Bloques generados automáticamente
Los bloques delimitados por `<!-- AUTO:nombre -->` y `<!-- /AUTO:nombre -->` en [[Estado]], [[Matriz de trazabilidad]], [[Decisiones pendientes]] e [[Indice de preguntas abiertas]] se regeneran con `python docs/90-anexos/scripts/boveda.py indices` y **nunca** deben editarse manualmente.
