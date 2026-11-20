---
id: DOC-EST-001
tipo: guia
titulo: Estilo color — Paleta monocroma, glassmorphism y reglas WCAG AA
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Estilo color

La interfaz de usuario es **monocroma (blanco, negro y escala de grises)** para ceder el protagonismo visual a la fotografía de arquitectura y materiales nobles (madera, piedra, luz cálida).

## Tokens oficiales extraídos de `mbl-maqueta.html`

| Token CSS | Valor | Uso principal |
|---|---|---|
| `--black` | `#000000` | Fondo de bloques oscuros (`.dark`, `.foot`), pestaña activa (`.tab.on`), botones primarios |
| `--ink` | `#0a0a0a` | Color de texto principal sobre fondos claros |
| `--white` | `#ffffff` | Lienzo base a pantalla completa, secciones claras, texto principal sobre fondo negro |
| `--bg` | `#f2f2f2` | Superficies neutras suaves de apoyo y páginas de error/estado |
| `--muted` | `#6b6b6b` | Etiquetas secundarias y subtítulos sobre blanco (`contraste ~5.3:1`) |
| `--line` | `#e4e4e4` | Bordes suaves de pestañas inactivas, divisores y tablas |
| `--glass` | `rgba(255, 255, 255, .12)` | Fondo translúcido de píldoras y campos del buscador en Hero |
| `--glass-b` | `rgba(255, 255, 255, .35)` | Borde fino de píldoras, campos Hero y badge de precio en tarjeta |
| `--wood` | `#b8642a` | Acento cálido en fotografía y color oficial de foco accesible (`:focus-visible`) |
| `--warm` | `#f0b46c` | Acento de iluminación interior en fotografía crepuscular |
| Marca de agua (`.dark`) | `rgba(255, 255, 255, .06)` | Texto decorativo gigante sobre `#000000` (`aria-hidden="true"`) |
| Marca de agua (`.foot`) | `#161616` | Texto decorativo gigante en pie de página sobre `#000000` |
| Buscador/input footer | `#1a1a1a` | Campo oscuro en footer |
| Divisores en oscuro | `#333333` | Línea superior de barra legal en footer |

## Reglas de contraste y accesibilidad (`RNF-ACC-001`)
- **Sobre `#ffffff`**: usar `--ink` (`#0a0a0a`) para cuerpo e `--muted` (`#6b6b6b` o `#595959` en tamaños `< 14px`) para garantizar ratio `>= 4.5:1`.
- **Sobre `#000000`**: usar `#ffffff` en titulares/CTAs y `#cccccc` / `#bbbbbb` en texto secundario (nunca `#6b6b6b` sobre negro).
- **Sobre fotografía**: toda tarjeta (`.card`) aplica el overlay `linear-gradient(transparent 45%, rgba(0, 0, 0, .85))` y el Hero aplica `linear-gradient(180deg, rgba(0, 0, 0, .20), rgba(0, 0, 0, .78))` para asegurar legibilidad de texto blanco independientemente de la luminosidad de la foto.
- **Indicador de foco**: `:focus-visible { outline: 2px solid var(--wood); outline-offset: 3px; }`.
