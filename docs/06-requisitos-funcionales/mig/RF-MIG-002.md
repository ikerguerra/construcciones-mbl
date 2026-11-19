---
id: RF-MIG-002
tipo: rf
titulo: Normalización de dominio canónico, protocolo HTTPS y barra final
estado: borrador
prioridad: alta
modulo: mig
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-001]]"
  - "[[NEC-005]]"
casos_uso:
  - "[[CU-006]]"
---

# RF-MIG-002 — Normalización de dominio canónico, protocolo HTTPS y barra final

El sistema debe resolver en un único salto `301` las peticiones bajo `http://` o `www.construccionesmbl.com` hacia el dominio canónico definitivo `https://construccionesmbl.com/` y mantener una política uniforme de barra final (`/`) coherente con el atributo `<link rel="canonical">` de cada página (resuelto en [[PA-006]]).
