---
name: sistema-visual-mbl
description: >-
  Aplica y audita la identidad visual editorial derivada de mbl-maqueta.html (tokens CSS corporativos en verde bosque/salvia, tipografía Bebas Neue + Inter, espaciado, componentes, animaciones ligeras y accesibilidad WCAG 2.1 AA). Usar al maquetar secciones, estilos CSS, diseño responsive o revisar contraste visual.
---

# Sistema visual y accesibilidad de Construcciones MBL

Traduce la estética estructural de `mbl-maqueta.html` y `docs/12-decisiones/ADR-002.md` al catálogo de construcción y reformas integrando la paleta corporativa en verde bosque/salvia con rigor WCAG 2.1 AA/AAA.

## Referencias obligatorias

- Consultar `docs/15-guia-de-estilos/Guia de estilos.md` y sus cinco notas: `Estilo color.md`, `Estilo tipografia.md`, `Estilo espaciado y layout.md`, `Estilo componentes.md` y `Estilo fotografia y direccion de arte.md`.

## Reglas visuales y de accesibilidad

1. **Paleta corporativa verde bosque/salvia (sin naranja en UI)**: usar `--black: #0f1d14`, `--ink: #111a14`, `--color-primary: #164624`, `--color-secondary: #3e6b47`, `--white: #fff`, `--bg: #eef3ee`, `--bg-tint: #f3f7f4`, `--line: #d6ddd8`, `--warm: #86d195` (sobre oscuro) y `--wood: #2d6a3e` (foco `:focus-visible`).
2. **Proporciones, barra sticky y radios**: diseño a **pantalla completa** (`.frame` al `100 %` sobre `--white` con `padding: 16px`, `12px` en móvil), Hero a alto y ancho del viewport, bloques destacados con `--r-xl: 36px` (`24px` en móvil), tarjetas/imágenes `--r-lg: 24px`, campos `--r-md: 18px`, píldoras `--r-pill: 999px`. Cabecera con **logotipo centrado sin texto**, desplegable en *Servicios* y modo fijo `.is-sticky` fluido al superar el Hero. Sin marca de agua inferior en Footer.
3. **Componentes y centrado**: iconos SVG vectoriales en carruseles `.arr` y tarjetas, FAQs centradas en ancho acotado (`860px`), artículos centrados (`1080–1140px`) con imagen en guías relacionadas, botón WhatsApp con expansión animada del teléfono y animaciones respetando `prefers-reduced-motion`.
4. **Contraste WCAG 2.1 AA/AAA**:
   - Ratio `>= 4.5:1` en texto normal (`>= 3:1` en grande). Sobre `#0f1d14` usar `#fff`, `#c2cec6` o `#86d195` (nunca `--muted`).
   - Sobre imágenes de tarjetas y Hero aplicar siempre degradado protector verde bosque oscuro (`rgba(10, 24, 15, ...)`).
   - Mantener `:focus-visible { outline: 2px solid var(--wood); outline-offset: 3px; }` y navegación completa por teclado + ARIA.
5. **Fotografía real**: mantener el 100 % de fotografía real propia optimizada (`src/assets/`) sin marcadores `.ph`.

## Verificación

- Revisar en escritorio (`>= 1280px`) y móvil (`<= 900px` / `375px`) ausencia de desbordamiento horizontal, transiciones fluidas y `dist/index.html < 70 KB`.
- Confirmar contraste AA/AAA, foco visible por teclado y `0` errores en `npm run verify` y `npm run check`.
