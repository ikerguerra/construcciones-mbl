---
id: DOC-EST-003
tipo: guia
titulo: Estilo espaciado, radios, sombras y grid responsive
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-21
---

# Estilo espaciado y layout

## Tokens estructurales (`src/styles/tokens.css` y `mbl-maqueta.html`)
```css
--r-xl: 36px;
--r-lg: 24px;
--r-md: 18px;
--r-pill: 999px;
--gap: 24px;
--pad: 40px; /* 20px en <= 900px */
--content-max: 1640px;
--pad-x: max(clamp(28px, 4vw, 64px), calc((100% - var(--content-max)) / 2));
```

## Contenedor principal y ritmo vertical
- **Contenedor de página completa (`.frame`)**: ocupa el **100 % del ancho de la ventana** (`width: 100%; margin: 0;`) sobre fondo `--white`, sin caja flotante ni sombra exterior, manteniendo un `padding: 16px` (`12px` en `<= 900px`) alrededor de `.hero`, `.dark`, `.sec-tint` y `.foot`.
- **Hero de portada (`.hero`)**: ocupa también el **alto completo del viewport** (`min-height: calc(100vh - 32px)` / `max(640px, calc(100svh - 32px))`), con `.hero-main` centrado verticalmente y `.hero-bottom` abajo, `overflow: visible` (y radios aplicados en `.hero-bg` / `.hero::after`) para permitir el despliegue del menú de Servicios.
- **Secciones (`.sec`)**: `padding: 72px var(--pad-x)` (`44px 12px` en móvil). Bandas `.sec-tint` sobre `#f3f7f4` redondeadas a `36px`.
- **Acotado centrado específico**:
  - Bloques FAQ (`.faq-narrow`): `max-width: 860px; margin-inline: auto;` con cabecera centrada.
  - Cabecera de artículos (`.article-hero-head`): `max-width: 1080px; margin: 0 auto 28px; text-align: center;`.
  - Cuerpo de artículos (`.article-centered-wrap`): `max-width: 1140px; margin-inline: auto;` con `.article-layout` (`minmax(0, 760px) 320px`).
  - Detalle de servicios/proyectos (`.service-split-layout`): `minmax(0, 1fr) 390px` para alojar `<FormularioRapidoServicio />` a la derecha.
- **Footer (`.foot`)**: cabecera de marca + CTA superior (`.foot-head`), 4 columnas (`.fgrid` `1.25fr 1fr 1fr 1.15fr`) y barra `.legal` directa abajo, **sin marca de agua gigante de fondo**.
- **Animaciones de entrada y transición**: `[data-reveal]` mediante `IntersectionObserver` ligero (`opacity` + `translateY(20px)`, `CLS = 0`), transición `mblSlideFade` en cambios de pestañas/carruseles y `prefers-reduced-motion: reduce` respetado.

## Puntos de ruptura (*breakpoints*)
- **Escritorio (`> 1080px`)**: rejillas multi-columna a ancho fluido (`--pad-x`), barra sticky en píldora fija al superar Hero.
- **Tableta (`<= 1080px`)**: `.fgrid` del Footer pasa a `2` columnas.
- **Móvil (`<= 900px` / `<= 640px`)**:
  - `.story-row`, `.dark-grid`, `.choice-grid`, `.gallery`, `.testi`, `.zonas-grid`, `.eeat-grid`, `.article-layout`, `.service-split-layout`, `.project-gallery-grid` pasan a `1` columna; `.fgrid` a `1` columna en `<= 640px`.
  - `.nav` colapsa a menú móvil con logotipo centrado y submenú de servicios desplegado en el cajón.
  - `.project-meta-strip` pasa a `2×2`.
