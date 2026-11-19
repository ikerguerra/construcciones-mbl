---
id: RF-PROY-002
tipo: rf
titulo: Sustitución del feed embebido de Instagram por activos locales optimizados
estado: borrador
prioridad: alta
modulo: proy
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-003]]"
  - "[[NEC-008]]"
casos_uso:
  - "[[CU-003]]"
---

# RF-PROY-002 — Sustitución del feed embebido de Instagram por activos locales optimizados

El sistema debe eliminar la carga de scripts e imágenes externas desde el feed embebido de Instagram en portada y `/proyectos/`, sustituyéndolo por un portfolio propio servido localmente con texto alternativo descriptivo y un enlace externo seguro hacia `@construccionesmbl`.

> [!warning] Hipótesis
> Se asume provisionalmente que el cliente suministrará fotografías propias de obras reales para poblar el portfolio local sin depender de la API de Instagram, sujeto a [[PA-003]].
