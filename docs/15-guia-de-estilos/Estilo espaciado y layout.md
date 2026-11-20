---
id: DOC-EST-003
tipo: guia
titulo: Estilo espaciado, radios, sombras y grid responsive
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Estilo espaciado y layout

## Tokens estructurales de `mbl-maqueta.html`
```css
--r-xl: 36px;
--r-lg: 24px;
--r-md: 18px;
--r-pill: 999px;
--gap: 24px;
--pad: 40px; /* 20px en <= 900px */
```

## Contenedor principal y ritmo vertical
- **Contenedor de página completa (`.frame`)**: ocupa el **100 % del ancho de la ventana** (`width: 100%; margin: 0;`) sobre fondo `--white`, sin caja flotante ni sombra exterior, manteniendo un `padding: 16px` (`12px` en `<= 900px`) que conserva el margen lateral uniforme alrededor de los bloques destacados (`.hero`, `.dark`, `.foot`).
- **Secciones (`.sec`)**: `padding: 64px var(--pad)` (`40px 20px` en móvil).
- **Gutter de rejillas**: `24px` constante en tarjetas, galería, historia y footer.
- **Radios por elemento**:
  - Hero, `.nav-solid`, `.dark`, `.foot`: `36px` (`--r-xl`; `24px` en `<= 900px`).
  - Tarjetas (`.card`), imágenes (`.ph` / `<img>`), contenedor buscador Hero: `24px` (`--r-lg`).
  - Campos internos del selector Hero y botón enviar: `18px` (`--r-md`).
  - Píldoras de navegación, tabs, badges de precio/rating, botones CTA: `999px` (`--r-pill`).
  - Controles circulares de carrusel (`.arr`, `34×34px` o `40×40px` táctil en móvil) e iconos sociales: `50%`.

## Puntos de ruptura (*breakpoints*)
- **Escritorio (`> 900px`)**: rejilla 2 columnas en Historia (`1fr 1.1fr`), `.dark` (`1fr 1.2fr`), Dual (`1fr 1.5fr`), Testimonios (`1fr 1fr`), 3 columnas en Tarjetas de servicio/proyecto y Galería, 4 columnas en Footer (`1fr 1fr 1fr 1.2fr`).
- **Móvil y tableta vertical (`<= 900px`)**:
  - Todas las rejillas principales pasan a `1fr` (1 columna).
  - La barra de navegación colapsa a un menú móvil accesible con logotipo visible y botón hamburguesa/cierre claro.
  - El selector rápido del Hero pasa a rejilla de 2 columnas con botón CTA a ancho completo (`height: 52px`).
  - Las tarjetas pueden presentar variante limpia apilada en móvil con imagen superior, título, rango orientativo, descripción y botón negro ancho completo (*VER SERVICIO* / *VER PROYECTO*).
