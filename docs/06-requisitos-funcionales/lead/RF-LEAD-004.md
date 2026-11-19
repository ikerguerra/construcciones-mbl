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

El sistema debe validar las solicitudes recibidas desde formularios y simulador, enviarlas de forma fiable al destino operativo acordado (notificación a `info@construccionesmbl.com` y/o hoja de registro), mostrar una confirmación explícita al usuario y ofrecer alternativa de llamada o WhatsApp si ocurriera un fallo de red.

> [!warning] Hipótesis
> Se asume provisionalmente la integración con un endpoint ligero que mantenga la notificación por correo y registro estructurado equivalente al actual flujo hacia Google Sheets, pendiente de [[PA-004]].
