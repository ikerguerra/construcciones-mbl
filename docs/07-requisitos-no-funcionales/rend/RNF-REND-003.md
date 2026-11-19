---
id: RNF-REND-003
tipo: rnf
titulo: Estrategia de carga óptima de tipografías e imágenes críticas
estado: borrador
prioridad: alta
categoria: rend
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-008]]"
  - "[[NEC-007]]"
---

# RNF-REND-003 — Estrategia de carga óptima de tipografías e imágenes críticas

El sistema debe servir las fuentes corporativas (`Bebas Neue` e `Inter`) autoalojadas con `font-display: swap` y subconjuntos latinos para evitar saltos de diseño (`CLS`) y peticiones bloqueantes externas, y aplicar carga prioritaria (`fetchpriority="high"` sin lazy-loading) únicamente sobre la imagen principal del Hero.
