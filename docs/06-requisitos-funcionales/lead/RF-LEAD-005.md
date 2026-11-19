---
id: RF-LEAD-005
tipo: rf
titulo: Registro de eventos de conversión subordinado al consentimiento
estado: borrador
prioridad: alta
modulo: lead
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-010]]"
  - "[[NEC-008]]"
casos_uso:
  - "[[CU-002]]"
  - "[[CU-005]]"
---

# RF-LEAD-005 — Registro de eventos de conversión subordinado al consentimiento

El sistema debe emitir eventos diferenciados (`submit_contacto`, `submit_simulador`, `click_telefono`, `click_whatsapp`) hacia identificadores propios parametrizados por configuración (inocuos cuando no estén informados) únicamente cuando el visitante haya aceptado la analítica en el banner nativo ultraligero con señales de consentimiento v2 (resuelto en [[PA-012]]).
