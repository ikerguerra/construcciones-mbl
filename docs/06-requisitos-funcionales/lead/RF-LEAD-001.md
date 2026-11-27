---
id: RF-LEAD-001
tipo: rf
titulo: Simulador interactivo de estimación de reforma en Asturias
estado: borrador
prioridad: critica
modulo: lead
creado: 2026-11-19
actualizado: 2026-11-27
necesidades:
  - "[[NEC-004]]"
  - "[[NEC-002]]"
casos_uso:
  - "[[CU-002]]"
---

# RF-LEAD-001 — Simulador interactivo de estimación de reforma en Asturias

El sistema debe ofrecer en `/calcula-el-precio-de-tu-reforma-en-asturias/` una herramienta interactiva unificada orientada tanto a captación SEO (URL canónica única con redirección `301` desde `/calculadora-presupuesto-reforma/`, resuelta en [[PA-023]]) como a conversión hacia visita técnica y presupuesto cerrado, integrando dos modos accesibles: (1) un modo rápido que adapta dinámicamente sus campos al tipo de obra seleccionado (eliminando errores heredados como pedir *"metros cuadrados de tu cocina"* para otras reformas), calcula una horquilla orientativa inmediata a partir de una tabla coherente y unificada de tarifas y muestra confirmación inline tras enviar la solicitud ([[PA-005]]); y (2) un modo técnico-fiscal avanzado con cálculo de PEM, ICIO por concejo, IVA (10 % o 21 %), desglose por capítulos y generación de informe imprimible/PDF.

> [!warning] Hipótesis
> Las cifras base iniciales del simulador y las páginas de servicio emplearán rangos orientativos coherentes definidos técnicamente hasta que el equipo de MBL valide los precios oficiales definitivos en [[PA-009]].
