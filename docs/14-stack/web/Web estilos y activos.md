---
id: DOC-STK-WEB-002
tipo: stack
titulo: Web — Estilos CSS, tipografía autoalojada y optimización de activos
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Web — Estilos y activos

- **Hojas de estilo**: CSS modular con Custom Properties (`tokens.css` + estilos por componente en Astro) siguiendo exactamente la escala visual de [[Guia de estilos]] y [[mbl-maqueta.html]]. No se requiere un framework pesado si el sistema de diseño ya está definido por tokens; como alternativa válida solo si agiliza utilidades repetitivas, puede usarse Tailwind CSS v4 mapeado a los mismos tokens.
- **Tipografías**:
  - `Bebas Neue` (títulos display) e `Inter` (`400`, `500`, `600`, cursiva opcional en citas breves) autoalojadas (`@fontsource/bebas-neue` y `@fontsource/inter` o archivos `.woff2` locales con subconjunto latino).
  - Prohibido bloquear el render con peticiones en cascada hacia `fonts.googleapis.com` si se puede servir `.woff2` local con `font-display: swap` y `<link rel="preload">` para las variantes críticas (`RNF-REND-003`).
- **Imágenes y multimedia**:
  - Optimización mediante `<Image />` / `<Picture />` (`astro:assets` / Sharp) generando variantes `AVIF` y `WebP` responsive con `width` y `height` explícitos (`RNF-SEO-006`, `RNF-REND-001`).
  - Imagen principal del Hero con `loading="eager"` y `fetchpriority="high"`; resto de imágenes bajo el pliegue con `loading="lazy"` y `decoding="async"`.
  - Iconografía mediante SVG inline limpio (sin cargar librerías enteras de iconos ni depender de emojis como sustitutos de iconos de interfaz).
