---
id: CA-GEO-002
tipo: ca
titulo: Legibilidad AEO, bloques de respuesta directa y señales E-E-A-T
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RNF-GEO-002]]"
  - "[[RNF-GEO-003]]"
---

# CA-GEO-002 — Legibilidad AEO, bloques de respuesta directa y señales E-E-A-T

```gherkin
Característica: Respuesta directa AEO y autoría E-E-A-T
  Escenario: Estructuración semántica para extracción por motores de respuesta
    Dado cualquier artículo de Innovación Sostenible o página de servicio
    Cuando se inspecciona su DOM estático sin JavaScript
    Entonces contiene un bloque inicial de resumen de 40-60 palabras, tablas HTML nativas para rangos comparativos, fechas visibles de publicación/actualización y ficha de autor o dirección técnica real verificable
```
