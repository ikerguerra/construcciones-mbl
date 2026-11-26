---
id: RF-MIG-001
tipo: rf
titulo: Tabla maestra de redirecciones 301 y bajas 410 para las 393 URLs de WordPress
estado: borrador
prioridad: critica
modulo: mig
creado: 2026-11-19
actualizado: 2026-11-26
necesidades:
  - "[[NEC-001]]"
casos_uso:
  - "[[CU-006]]"
---

# RF-MIG-001 — Tabla maestra de redirecciones 301 y bajas 410 para las 393 URLs de WordPress

El sistema debe mantener un inventario declarativo de redirecciones que cubra la totalidad de las URLs heredadas de WordPress: normalizar los 10 slugs defectuosos con tildes perdidas o `%c2%b2` mediante redirección `301` 1:1 directa hacia la nueva URL canónica, redirigir `301` el artículo 23º desde sus dos rutas heredadas (`/uncategorized/reforma-de-banos-y-cocinas-...` y `/reformas-de-banos/reforma-de-banos-y-cocinas-...`) hacia `/vivienda-sostenible/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/`, redirigir `301` el enlace roto detectado en la portada de WordPress (`/reformas-de-ba%C3%B1os-en-asturias` / `/reformas-de-baños-en-asturias`) hacia `/reformas-de-banos-en-asturias/`, redirigir `301` `/wp-sitemap.xml` hacia `/sitemap-index.xml`, devolver `410 Gone` para las etiquetas `/tag/*` y redirigir `301` hacia `/innovacion-sostenible/` o su categoría consolidada para `/author/3fwu9/`, `/category/uncategorized/` y las 4 subcategorías/categorías de un solo artículo, sin cadenas de salto múltiples (resuelto en [[PA-002]] y ampliado tras [[Auditoria comparativa WordPress vs Astro Vercel]]).

> [!warning] Hipótesis
> Las 3 reglas `301` adicionales detectadas en vivo (`/reformas-de-ba%C3%B1os-en-asturias` y variantes, `/reformas-de-banos/reforma-de-banos-y-cocinas-...` y `/wp-sitemap.xml`) ya están incorporadas al fichero declarativo de redirecciones y verificadas en compilación; queda pendiente activar y validar su ejecución HTTP en vivo sobre la plataforma de despliegue final según [[PA-024]] y [[RF-MIG-004]].
