---
id: DOC-EST-002
tipo: guia
titulo: Estilo tipografía — Jerarquía Bebas Neue + Inter y legibilidad editorial
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Estilo tipografía

Se combina una fuente display condensada de impacto arquitectónico (**Bebas Neue**) con una sans-serif geométrica de alta legibilidad (**Inter**).

## Familias tipográficas
```css
--f-display: 'Bebas Neue', 'Oswald', 'Arial Narrow', Impact, sans-serif;
--f-body: 'Inter', 'Helvetica Neue', Arial, sans-serif;
```
Ambas familias se sirven **autoalojadas en `.woff2`** (`RNF-REND-003`) con `font-display: swap`.

## Escala tipográfica y reglas de uso

| Rol | Familia y peso | Transformación y `line-height` | Tamaño |
|---|---|---|---|
| `H1` Hero (portada) | `Bebas Neue` · `400` | `uppercase` · `line-height: 1` · `letter-spacing: .005em` | `clamp(44px, 6.4vw, 96px)` |
| `H1` Páginas interiores / Blog | `Bebas Neue` · `400` | `uppercase` · `line-height: 1.02` | `clamp(38px, 5vw, 72px)` |
| `H2` Títulos de sección (`.sec-title`, `.dark h2`) | `Bebas Neue` · `400` | `uppercase` · `line-height: 1` · `letter-spacing: .01em` | `clamp(34px, 4.2vw, 56px)` |
| Cifras de estadísticas (`.stat b`) | `Bebas Neue` · `400` | `line-height: 1` (marcadas con `<strong>`/`<span>`, **no** como `<h2>` para respetar `RNF-SEO-003`) | `44px` |
| Subtítulos de bloque y citas principales | `Inter` · `400–500` | Normal (sentence case) · `line-height: 1.25` | `22px–30px` |
| Cuerpo de lectura en páginas de servicio y artículos | `Inter` · `400` | Normal (sin cursiva corrida) · `line-height: 1.65` · `max-width: 72ch` | `16px–17px` |
| Párrafos cortos editoriales de maqueta (`.lead`, `.story p`, `.testi p`) | `Inter` · `400` | Ajustado a `15px–16px` normal o cursiva puntual en entradilla breve para cumplir `RNF-ACC-001` | `15px–16px` |
| UI (píldoras, pestañas, precios, botones) | `Inter` · `500` | Sentence case (botón móvil destacado en mayúsculas) | `13px–14px` |
| Tarjetas de servicio/proyecto | `Inter` · `500` (título) / `400` (resumen) | Sentence case | `19px` título · `13px` resumen |
| Marca de agua (`.dark .ghost` / `.foot .big`) | `Bebas Neue` · `400` | `uppercase` · `line-height: .85–1` | `220px` (`.dark`) · `clamp(90px, 19vw, 260px)` (footer) |
