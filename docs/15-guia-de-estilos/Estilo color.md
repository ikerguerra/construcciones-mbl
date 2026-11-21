---
id: DOC-EST-001
tipo: guia
titulo: Estilo color — Paleta corporativa MBL (verde bosque/salvia) y reglas WCAG AA
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-21
---

# Estilo color

Sobre la arquitectura editorial de [[mbl-maqueta.html]] se aplica la **paleta corporativa oficial de Construcciones MBL** derivada de su logotipo y marca en verde bosque profundo, verde hoja sostenible, piedra/salvia clara y blanco puro, verificada al 100 % bajo **WCAG 2.1 AA/AAA** y sin tonos naranjas.

## Tokens oficiales en `src/styles/tokens.css`

| Token CSS | Valor | Uso principal y contraste verificado |
|---|---|---|
| `--black` | `#0f1d14` | Fondo verde bosque carbón para `.dark`, `.foot`, `.nav-solid`, `.promo-strip`, `.cookie-banner` y modo sticky |
| `--ink` | `#111a14` | Texto principal sobre fondos claros (`17.77:1` **AAA** sobre blanco) |
| `--color-primary` | `#164624` | Verde bosque corporativo MBL para botones primarios, tabs activos, métricas `.stat`, precios y pill text (`10.85:1` **AAA**) |
| `--color-primary-hover` | `#0f331a` | Estado hover de botones primarios (`13.8:1` **AAA**) |
| `--color-secondary` | `#3e6b47` | Verde hoja MBL para kickers, bordes hover en tarjetas y detalles verificados (`6.18:1` **AA**) |
| `--white` | `#ffffff` | Lienzo base, secciones claras y texto principal sobre `--black` (`16.7:1` **AAA**) |
| `--bg` | `#eef3ee` | Superficie salvia suave en `.stat`, `.sec-kicker`, `.resumen-aeo`, `.eeat-card`, `.toc-box` y cabeceras de tabla |
| `--bg-tint` | `#f3f7f4` | Banda salvia muy suave para alternar secciones claras (Zonas, FAQs, formulario lateral en servicios, proyectos relacionados) |
| `--muted` | `#516158` | Etiquetas secundarias y subtítulos sobre blanco (`6.56:1` **AA**) y sobre `--bg` (`5.80:1` **AA**) |
| `--line` / `--border-sage` | `#d6ddd8` / `#c6d9cb` | Divisores, bordes de tarjetas limpias, FAQs y pestañas |
| `--border-dark` | `#243a2c` | Separadores internos de `.foot`, `.nav-wrap.is-sticky` y `.promo-strip` |
| `--ink-on-dark-muted` | `#c2cec6` | Texto secundario legible sobre `--black` (`10.7:1` **AAA**) |
| `--glass` / `--glass-b` | `rgba(15, 29, 20, .34)` / `rgba(196, 228, 203, .40)` | Píldoras y campos del selector Hero |
| `--wood` | `#2d6a3e` | Color oficial de anillo de foco accesible (`:focus-visible`, `6.35:1` **AA** sobre blanco) |
| `--warm` | `#86d195` | Verde claro luminoso para kickers, iconos `.card-badge`, estrellas/puntuación GBP sobre fondos oscuros `#0F1D14` (`9.70:1` **AAA**) |
| Marca de agua (`.dark .ghost`) | `rgba(194, 206, 198, .06)` | Texto decorativo `ASTURIAS` sobre `#0F1D14` (`aria-hidden="true"`) |
| Marca de agua galería (`.gallery-ghost`) | `rgba(22, 70, 36, .055)` | Texto decorativo suave tras galería sobre blanco |

## Reglas de contraste y accesibilidad (`RNF-ACC-001`)
- **Sobre `#ffffff` y `#eef3ee`**: usar `--ink` (`#111a14`) o `--color-primary` (`#164624`) para titulares/datos y `--muted` (`#516158`) para auxiliares (`>= 4.5:1`).
- **Sobre `#0f1d14`**: usar `#ffffff` en titulares/CTAs, `--ink-on-dark-muted` (`#c2cec6`) en textos secundarios y `--warm` (`#86d195`) en etiquetas destacadas (`9.70:1` **AAA**).
- **Sobre fotografía**: tarjetas con overlay `linear-gradient(transparent 34%, rgba(10, 24, 15, .90) 95%)` y Hero con `linear-gradient(180deg, rgba(10, 24, 15, .46) 0%, rgba(10, 24, 15, .28) 38%, rgba(10, 24, 15, .86) 100%)`.
- **Indicador de foco**: `:focus-visible { outline: 2px solid var(--wood); outline-offset: 3px; }`.
