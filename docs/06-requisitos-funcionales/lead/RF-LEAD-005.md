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

El sistema debe emitir eventos diferenciados (`submit_contacto`, `submit_simulador`, `click_telefono`, `click_whatsapp`) únicamente cuando el visitante haya aceptado la analítica en el gestor de consentimiento, o en modo restringido sin cookies conforme a señales de consentimiento aprobadas.

> [!warning] Hipótesis
> Se asume provisionalmente la configuración parametrizada mediante nuevos identificadores propios de analítica/etiquetado con señales de consentimiento v2 (descartando el contenedor heredado del WordPress anterior), pendiente de recibir los IDs definitivos en [[PA-012]].
