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

El sistema debe mantener un inventario declarativo de redirecciones que cubra las 393 URLs detectadas en los sitemaps de WordPress: normalizar los 10 slugs defectuosos con redirección `301` 1:1 directa hacia la nueva URL canónica, devolver `410 Gone` para las 340 etiquetas `/tag/*` (salvo excepción puntual acreditada en Search Console) y redirigir `301` hacia `/innovacion-sostenible/` para `/author/3fwu9/` y `/category/uncategorized/`, sin cadenas de salto múltiples (resuelto en [[PA-002]]).
