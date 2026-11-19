---
id: RF-SERV-003
tipo: rf
titulo: Gestión de vigencia de ofertas y landing exprés de plato de ducha
estado: borrador
prioridad: alta
modulo: serv
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-002]]"
  - "[[NEC-009]]"
casos_uso:
  - "[[CU-001]]"
  - "[[CU-008]]"
---

# RF-SERV-003 — Gestión de vigencia de ofertas y landing exprés de plato de ducha

El sistema debe gobernar la visualización de promociones temporales mediante fecha de inicio y fin verificable, impidiendo mostrar fechas promocionales vencidas (como *"Oferta válida hasta 1 de Octubre 2026"* en `/cambio-de-banera-por-plato-de-ducha-en-asturias-oferta-expres-48-horas/`) y mostrando en su lugar el estado vigente o la tarifa estándar actualizada sin perder el posicionamiento de la URL.

> [!warning] Hipótesis
> Se asume provisionalmente que la landing de plato de ducha en 48 horas seguirá activa y que el cliente confirmará el precio cerrado actual y fecha límite en [[PA-009]].
