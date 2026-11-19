---
id: RF-LEAD-004
tipo: rf
titulo: Entrega, registro y confirmación de leads recibidos
estado: borrador
prioridad: critica
modulo: lead
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-004]]"
  - "[[NEC-009]]"
casos_uso:
  - "[[CU-002]]"
  - "[[CU-005]]"
---

# RF-LEAD-004 — Entrega, registro y confirmación de leads recibidos

El sistema debe validar las solicitudes recibidas desde formularios y simulador, notificarlas de forma fiable al correo de recepción (`info@construccionesmbl.com`, con volcado estructurado opcional), permitir activar o desactivar por configuración sin modificar código un correo automático de confirmación al solicitante, mostrar una confirmación inline explícita tras el envío y ofrecer alternativa de llamada o WhatsApp si ocurriera un fallo de red (resuelto en [[PA-004]] y [[PA-005]]).
