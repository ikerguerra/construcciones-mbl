---
id: RF-MIG-003
tipo: rf
titulo: Exclusión de indexación de rutas transaccionales y páginas legales actualizadas
estado: borrador
prioridad: alta
modulo: mig
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-001]]"
  - "[[NEC-008]]"
casos_uso:
  - "[[CU-006]]"
  - "[[CU-007]]"
---

# RF-MIG-003 — Exclusión de indexación de rutas transaccionales y páginas legales actualizadas

El sistema debe marcar `/mensaje-enviado/` con directiva `noindex, nofollow` fuera del mapa del sitio XML y publicar las páginas `/aviso-legal/`, `/politica-de-privacidad/` y `/politica-de-cookies/` con los datos registrales completos de `MBL CONSTRUCCIONES S.L.` y el inventario real de cookies.

> [!warning] Hipótesis
> El CIF completo de `MBL CONSTRUCCIONES S.L.` queda bloqueado hasta recibir confirmación en [[PA-001]].
