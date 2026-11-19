---
id: RF-BLOG-001
tipo: rf
titulo: Portada editorial de Innovación Sostenible y archivo por categorías limpias
estado: borrador
prioridad: alta
modulo: blog
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-001]]"
  - "[[NEC-006]]"
  - "[[NEC-009]]"
casos_uso:
  - "[[CU-004]]"
---

# RF-BLOG-001 — Portada editorial de Innovación Sostenible y archivo por categorías limpias

El sistema debe publicar en `/innovacion-sostenible/` el listado de artículos editoriales filtrable por las categorías temáticas vigentes, excluyendo la categoría vacía `uncategorized` y evitando generar páginas públicas de archivo para etiquetas superfluas (`/tag/`).

> [!warning] Hipótesis
> Con la retirada de las 340 etiquetas `/tag/` ya confirmada en [[PA-002]], se asume provisionalmente mantener las categorías activas consolidadas hasta definir la estructura de URL de artículos en [[PA-015]].
