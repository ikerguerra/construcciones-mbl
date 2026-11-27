---
id: CA-LEAD-001
tipo: ca
titulo: Simulador interactivo de presupuestos sin etiquetas erróneas
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-27
verifica:
  - "[[RF-LEAD-001]]"
---

# CA-LEAD-001 — Simulador interactivo de presupuestos sin etiquetas erróneas

```gherkin
Característica: Simulador y calculadora unificada en /calcula-el-precio-de-tu-reforma-en-asturias/
  Escenario: Adaptación contextual de campos según el tipo de obra
    Dado que el usuario accede al simulador de presupuestos
    Cuando selecciona "Reforma Integral de Vivienda" o "Construcción de Vivienda"
    Entonces el selector de superficie solicita los metros cuadrados del proyecto correspondiente y nunca muestra el texto erróneo "de tu cocina"
    Y calcula o valida el presupuesto orientativo de acuerdo con los rangos unificados de la web

  Escenario: Consolidación canónica de Modo rápido y Desglose PEM/ICIO/IVA (PA-023)
    Dado que el usuario accede por el enlace canónico "/calcula-el-precio-de-tu-reforma-en-asturias/" o por el ancla "#desglose-pem" (o mediante "301" desde "/calculadora-presupuesto-reforma/")
    Cuando alterna entre "Modo 1 · Simulador rápido (2 min)" y "Modo 2 · Desglose completo (PEM + ICIO + IVA)"
    Entonces ambos modos funcionan bajo la misma URL canónica sin duplicidad en sitemap XML y transfieren tipo de obra, zona/concejo y m² entre sí
```
