---
id: RNF-SEG-002
tipo: rnf
titulo: Protección antispam y validación segura en el envío de leads
estado: borrador
prioridad: alta
categoria: seg
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-008]]"
  - "[[NEC-004]]"
---

# RNF-SEG-002 — Protección antispam y validación segura en el envío de leads

El sistema debe proteger todos los formularios de contacto y el simulador frente a envíos automatizados (mediante validación en servidor, campo trampa *honeypot*, limitación de tasa o verificación invisible no intrusiva) y sanear todas las entradas antes de enviarlas o almacenarlas sin exponer claves privadas en el navegador.
