---
name: sistema-visual-mbl
description: >-
  Aplica y audita la identidad visual editorial derivada de mbl-maqueta.html (tokens CSS, tipografía Bebas Neue + Inter, espaciado, componentes y accesibilidad WCAG 2.1 AA). Usar al maquetar secciones, estilos CSS, diseño responsive o revisar contraste visual.
---

# Sistema visual y accesibilidad de Construcciones MBL

Traduce la estética aprobada en `docs/90-anexos/maquetas/mbl-maqueta.html` y `docs/12-decisiones/ADR-002.md` al catálogo de construcción y reformas manteniendo rigor WCAG 2.1 AA.

## Referencias obligatorias

- Consultar `docs/15-guia-de-estilos/Guia de estilos.md` (equivalencia de bloques *RealWorld → Construcciones MBL*) y sus cinco notas: `Estilo color.md`, `Estilo tipografia.md`, `Estilo espaciado y layout.md`, `Estilo componentes.md` y `Estilo fotografia y direccion de arte.md`.

## Reglas visuales y de accesibilidad

1. **Interfaz monocroma y color en fotografía**: usar estrictamente `--black` (`#000`), `--ink` (`#0a0a0a`), `--white` (`#fff`), `--bg` (`#f2f2f2`), `--line` (`#e4e4e4`) y glassmorphism (`--glass` / `--glass-b`). El color cálido (`--wood`, `--warm`) aporta coherencia fotográfica y foco accesible.
2. **Proporciones y radios**: marco `.frame` `max-width: 1280px` (`--r-xl: 36px`), tarjetas/imágenes `--r-lg: 24px`, campos `--r-md: 18px`, píldoras `--r-pill: 999px`, gutter `--gap: 24px`, padding de sección `64px 40px` (`40px 20px` en `<= 900px`).
3. **Tipografía correcta y semántica**: `Bebas Neue` para display/títulos en mayúsculas e `Inter` para cuerpo y UI. Marcar cifras estadísticas (`.stat b`) con `<strong>`/`<span>`, **nunca como `<h2>`**. Evitar cursiva pequeña prolongada en textos largos para mantener lectura confortable.
4. **Contraste WCAG 2.1 AA**:
   - Ratio `>= 4.5:1` en texto normal (`>= 3:1` en grande). Sobre negro usar `#fff`, `#ccc` o `#bbb` (nunca `--muted`).
   - Sobre imágenes de tarjetas y Hero aplicar siempre degradado protector (`transparent 45% → rgba(0,0,0,.85)` en tarjetas).
   - Mantener `:focus-visible { outline: 2px solid var(--wood); outline-offset: 3px; }` y navegación completa por teclado + ARIA en pestañas, menús, carruseles y acordeones.
5. **Fotografía real**: sustituir el 100 % de los marcadores `.ph` por fotografía propia optimizada ([[PA-003]]) antes de producción.

## Verificación

- Revisar en escritorio (`>= 1280px`) y móvil (`<= 900px` / `375px`) ausencia de desbordamiento horizontal y coherencia con la maqueta.
- Confirmar contraste AA, foco visible por teclado y puntuación sin errores críticos en auditoría de accesibilidad (`CA-ACC-001`).
