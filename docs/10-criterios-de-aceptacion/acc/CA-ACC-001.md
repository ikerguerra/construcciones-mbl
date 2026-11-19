---
id: CA-ACC-001
tipo: ca
titulo: Accesibilidad WCAG 2.1 AA, contraste sobre fotos y operación por teclado
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RNF-ACC-001]]"
  - "[[RNF-ACC-002]]"
---

# CA-ACC-001 — Accesibilidad WCAG 2.1 AA, contraste sobre fotos y operación por teclado

```gherkin
Característica: Accesibilidad digital WCAG 2.1 AA
  Escenario: Auditoría automática y recorrido por teclado completo
    Dado cualquier página pública en escritorio y móvil
    Cuando se audita contraste, estructura ARIA y navegación secuencial mediante Tab/Enter/Escape
    Entonces cero textos normales incumplen el ratio 4.5:1 (incluidos textos sobre imágenes y etiquetas con --muted), todos los controles interactivos tienen foco visible y etiqueta accesible y no existen errores críticos en axe-core/Lighthouse Accessibility
```
