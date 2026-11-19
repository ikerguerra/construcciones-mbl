---
id: RNF-REND-001
tipo: rnf
titulo: Cumplimiento estricto de Core Web Vitals en móvil y escritorio
estado: borrador
prioridad: critica
categoria: rend
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-008]]"
  - "[[NEC-005]]"
---

# RNF-REND-001 — Cumplimiento estricto de Core Web Vitals en móvil y escritorio

El sistema debe alcanzar en auditorías automatizadas de rendimiento valores en umbral verde de Core Web Vitals tanto en móvil como en escritorio: `LCP <= 2,5 s` (objetivo `< 1,5 s`), `INP <= 200 ms` y `CLS <= 0,1`, junto con un tiempo de respuesta inicial del servidor (`TTFB`) inferior a `200 ms`.
