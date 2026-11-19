---
id: CA-MANT-001
tipo: ca
titulo: Validación de esquemas en build y fuente única de datos corporativos
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RNF-MANT-001]]"
  - "[[RNF-MANT-002]]"
---

# CA-MANT-001 — Validación de esquemas en build y fuente única de datos corporativos

```gherkin
Característica: Integridad de contenidos y fuente única de verdad
  Escenario: Detección de metadatos ausentes o datos duplicados en compilación
    Dado el conjunto de colecciones de servicios, proyectos, artículos, autores, testimonios y configuración global
    Cuando se modifica una entrada omitiendo su meta_descripcion, asignando un autor inexistente o introduciendo una oferta con formato inválido y se ejecuta la compilación
    Entonces la compilación falla explícitamente indicando la colección y el campo erróneo
    Y con datos válidos todas las menciones al teléfono, dirección, estadísticas y tarifas provienen del origen centralizado único
```
