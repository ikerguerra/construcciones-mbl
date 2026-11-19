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

El sistema debe publicar en `/innovacion-sostenible/` el listado de artículos editoriales filtrable por las categorías temáticas consolidadas, manteniendo la estructura de ruta `/{categoria}/{slug}/` en artículos, redirigiendo `301` las subcategorías y categorías redundantes de un solo artículo hacia su categoría principal, excluyendo la categoría vacía `uncategorized` y devolviendo `410 Gone` para las 340 páginas de etiquetas (`/tag/*`), resuelto en [[PA-002]] y [[PA-015]].
