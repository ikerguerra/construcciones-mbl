---
id: CA-LEAD-001
tipo: ca
titulo: Simulador interactivo de presupuestos sin etiquetas erróneas
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-LEAD-001]]"
---

# CA-LEAD-001 — Simulador interactivo de presupuestos sin etiquetas erróneas

```gherkin
Característica: Simulador de presupuesto en /calcula-el-precio-de-tu-reforma-en-asturias/
  Escenario: Adaptación contextual de campos según el tipo de obra
    Dado que el usuario accede al simulador de presupuestos
    Cuando selecciona "Reforma Integral de Vivienda" o "Construcción de Vivienda"
    Entonces el selector de superficie solicita los metros cuadrados del proyecto correspondiente y nunca muestra el texto erróneo "de tu cocina"
    Y calcula o valida el presupuesto orientativo de acuerdo con los rangos unificados de la web
```
