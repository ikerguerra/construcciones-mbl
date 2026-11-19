---
id: DOC-EST-005
tipo: guia
titulo: Estilo fotografía y dirección de arte — Coherencia visual de obras
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Estilo fotografía y dirección de arte

En este diseño **la fotografía es el único elemento que aporta color a la web** (junto al tono madera `--wood: #b8642a` y luz cálida `--warm: #f0b46c`). Sustituir adecuadamente los marcadores `.ph` de [[mbl-maqueta.html]] es crítico para mantener el aspecto premium de marca.

## Criterios visuales de selección fotográfica ([[PA-003]] resuelta)
1. **Banco mixto de arquitectura y reformas reales**: combinar el logotipo oficial y las fotografías propias aportadas por el titular con una selección curada de las mejores imágenes extraídas del WordPress actual (reformas integrales, cocinas, baños, fachadas, locales), descartando cualquier dependencia del feed embebido de Instagram.
2. **Iluminación y temperatura cromática**:
   - **Hero y bloque oscuro**: tomas arquitectónicas con contraste dramático, luz cálida interior al atardecer o iluminación arquitectónica bien equilibrada que armonice con fondos oscuros y overlays.
   - **Historia, servicios y galería**: tomas diurnas limpias, líneas rectas horizontales/verticales bien encuadradas, maderas naturales, piedra/cerámica mate y griferías contemporáneas.
3. **Prohibido en producción**:
   - Mantener marcadores CSS `.ph` o imágenes de stock genéricas de viviendas estadounidenses ajenas a la tipología edificatoria asturiana cuando existan fotos reales de obra.
   - Collages sobrecargados, marcas de agua externas o textos incrustados dentro de la imagen.

## Requisitos técnicos de entrega de imagen
- Formato de archivo fuente mínimo `1920px` de ancho para Hero y `1200px` para tarjetas/artículos.
- Compilación automática a `AVIF`/`WebP` con `object-fit: cover` y `aspect-ratio` fijo para `CLS = 0`.
- Nombre de archivo SEO en minúsculas con guiones (ej. `reforma-integral-salon-gijon-mbl.jpg`) y atributo `alt` descriptivo indicando estancia, material o trabajo realizado y ubicación en Asturias.
