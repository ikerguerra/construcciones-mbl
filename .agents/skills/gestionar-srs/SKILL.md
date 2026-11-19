---
name: gestionar-srs
description: >-
  Redacta, modifica o retira objetivos, actores, necesidades, casos de uso, requisitos (RF/RNF), entidades, criterios de aceptación (CA) y ADRs cumpliendo ISO/IEC/IEEE 29148. Usar siempre que cambie el alcance, requisitos funcionales/no funcionales o arquitectura en docs/.
---

# Gestionar artefactos del SRS (ISO/IEC/IEEE 29148)

Garantiza que toda evolución de requisitos o arquitectura mantenga la estructura atómica, neutralidad tecnológica en requisitos y trazabilidad unidireccional exigida por `docs/00-inicio/Convenciones.md`.

## Reglas operativas

1. Revisar `docs/00-inicio/Convenciones.md` y la plantilla correspondiente en `docs/99-plantillas/` antes de crear un nuevo artefacto.
2. **IDs estables y nombres únicos**: el nombre de archivo sin `.md` debe coincidir exactamente con `id:` en notas tipadas (`obj`, `actor`, `nec`, `cu`, `rf`, `rnf`, `ie`, `ca`, `adr`, `pa`) y ser único en toda la bóveda. Para retirar un elemento usar `estado: descartado`.
3. **Redacción verificable y agnóstica**:
   - Todo `RF` y `RNF` describe un único comportamiento verificable comenzando por `El sistema debe…`.
   - Prohibido acoplar nombres de frameworks, librerías o proveedores dentro de `RF` o `RNF`; las elecciones tecnológicas van exclusivamente en `docs/12-decisiones/` (`ADR-*`) y `docs/14-stack/`.
4. **Trazabilidad en un solo sentido** (wikilinks entre comillas en frontmatter YAML):
   - `NEC` → `objetivos` + `actores`
   - `CU` → `actores` + `necesidades`
   - `RF` / `RNF` → `necesidades` (y `casos_uso` opcional en `RF`)
   - `IE` → `requisitos`
   - `CA` → `verifica` (formato Gherkin verificable; todo `RF`/`RNF` debe quedar cubierto por al menos un `CA`)
   - `ADR` → `afecta`
5. Si cambia un `ADR`, reflejar su impacto en `docs/14-stack/Stack.md` y `docs/14-stack/web/Stack web.md`.

## Verificación

- Ejecutar `python docs/90-anexos/scripts/boveda.py indices`, `validar` y `listar`.
- Confirmar `Errores: 0`, `100.0%` de cobertura verificable en `docs/11-trazabilidad/Matriz de trazabilidad.md` y ausencia de avisos de requisitos sin `CA`.
