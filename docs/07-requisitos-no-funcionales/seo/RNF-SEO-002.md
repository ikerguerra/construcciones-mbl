---
id: RNF-SEO-002
tipo: rnf
titulo: Generación automática de sitemap XML limpio y archivo robots.txt
estado: borrador
prioridad: critica
categoria: seo
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-001]]"
  - "[[NEC-005]]"
---

# RNF-SEO-002 — Generación automática de sitemap XML limpio y archivo robots.txt

El sistema debe publicar automáticamente un mapa del sitio XML que incluya exclusivamente URLs canónicas indexables (`200 OK`, excluyendo `/mensaje-enviado/`, borradores y taxonomías retiradas), junto con un archivo `robots.txt` limpio adaptado al nuevo sitio que referencie el sitemap oficial.
