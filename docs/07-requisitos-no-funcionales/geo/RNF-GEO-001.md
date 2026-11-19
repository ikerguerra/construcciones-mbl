---
id: RNF-GEO-001
tipo: rnf
titulo: Grafo Schema.org JSON-LD granular y válido por plantilla
estado: borrador
prioridad: critica
categoria: geo
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-006]]"
  - "[[NEC-005]]"
---

# RNF-GEO-001 — Grafo Schema.org JSON-LD granular y válido por plantilla

El sistema debe inyectar en cada tipo de página un grafo JSON-LD válido en Schema.org que conecte mediante `@id` la entidad principal `GeneralContractor`/`LocalBusiness` (con logo real en alta resolución, coordenadas exactas y `aggregateRating` consistente con la cifra visible) con nodos específicos por ruta: `Service` y `Offer` en servicios, `FAQPage` donde existan preguntas frecuentes visibles, `BlogPosting` con `Person`/`Organization` en artículos y `BreadcrumbList` en páginas interiores.
