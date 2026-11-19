---
id: RF-MIG-001
tipo: rf
titulo: Tabla maestra de redirecciones 301 y bajas 410 para las 393 URLs de WordPress
estado: borrador
prioridad: critica
modulo: mig
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-001]]"
casos_uso:
  - "[[CU-006]]"
---

# RF-MIG-001 — Tabla maestra de redirecciones 301 y bajas 410 para las 393 URLs de WordPress

El sistema debe mantener un inventario declarativo de redirecciones que cubra las 393 URLs detectadas en los sitemaps de WordPress, devolviendo `301` directo hacia la nueva URL canónica para páginas, categorías y artículos saneados, y `410` o `301` consolidado para `/tag/*`, `/author/3fwu9/` y `/category/uncategorized/` sin cadenas de salto múltiples.

> [!warning] Hipótesis
> Se asume provisionalmente sanear los 10 slugs defectuosos con redirección `301` 1:1 y devolver `410 Gone` para las 340 etiquetas `/tag/`, pendiente de ratificación en [[PA-002]].
