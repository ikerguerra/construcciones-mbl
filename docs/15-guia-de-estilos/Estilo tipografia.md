---
id: DOC-EST-002
tipo: guia
titulo: Estilo tipografía — Jerarquía Bebas Neue + Inter y legibilidad editorial
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-21
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
| `H1` Hero (portada) | `Bebas Neue` · `400` | `uppercase` · `line-height: 0.96` · `letter-spacing: .008em` | `clamp(42px, 5.4vw, 102px)` |
| `H1` Artículos de blog (centrado) | `Bebas Neue` · `400` | `uppercase` · `line-height: 1.04` · `text-wrap: balance` | `clamp(36px, 4.6vw, 64px)` |
| `H2` Títulos de sección (`.sec-title`, `.dark h2`) | `Bebas Neue` · `400` | `uppercase` · `line-height: 1` · `letter-spacing: .01em` | `clamp(34px, 3.8vw, 52px)` |
| Cifras de estadísticas (`.stat strong`) | `Bebas Neue` · `400` | `line-height: 1` (marcadas con `<strong>`/`<span>`, **no** como `<h2>` para respetar `RNF-SEO-003`) | `clamp(44px, 4vw, 56px)` |
| Subtítulos de bloque y citas principales | `Inter` · `400–600` | Normal (sentence case) · `line-height: 1.25` | `22px–30px` |
| Cuerpo de lectura en páginas de servicio y artículos | `Inter` · `400` | Normal (sin cursiva corrida) · `line-height: 1.72` | `15.5px–16.5px` |
| UI (píldoras, pestañas, precios, botones) | `Inter` · `500` | Sentence case | `13px–14px` |
| Tarjetas de servicio/proyecto | `Inter` · `500` (título) / `400` (resumen) | Sentence case | `19px–20px` título · `13px` resumen |
| Marca de agua (`.dark .ghost` / `.gallery-ghost`) | `Bebas Neue` · `400` | `uppercase` · `line-height: .85` (`footer` sin marca de agua) | `clamp(120px, 20vw, 290px)` (`.dark`) |
