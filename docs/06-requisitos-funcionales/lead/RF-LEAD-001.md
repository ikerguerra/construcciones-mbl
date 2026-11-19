---
id: RF-LEAD-001
tipo: rf
titulo: Simulador interactivo de estimación de reforma en Asturias
estado: borrador
prioridad: critica
modulo: lead
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-004]]"
  - "[[NEC-002]]"
casos_uso:
  - "[[CU-002]]"
---

# RF-LEAD-001 — Simulador interactivo de estimación de reforma en Asturias

El sistema debe ofrecer en `/calcula-el-precio-de-tu-reforma-en-asturias/` un simulador guiado que adapte dinámicamente sus campos al tipo de obra seleccionado (eliminando errores heredados como pedir *"metros cuadrados de tu cocina"* para otras reformas), permita indicar superficie, gama de calidades, ubicación en Asturias, trabajos específicos y plazo, y muestre el rango orientativo calculado o recoja la petición para dossier personalizado.

> [!warning] Hipótesis
> Se asume provisionalmente que el simulador mostrará una horquilla orientativa inmediata en pantalla antes de solicitar los datos de contacto para recibir el desglose completo, pendiente de validar fórmulas y rangos en [[PA-005]].
