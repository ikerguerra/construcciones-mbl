---
id: DOC-STK-WEB-003
tipo: stack
titulo: Web — Contenidos tipados, validación Zod y fuente única de datos
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Web — Contenidos y validación

- **Astro Content Collections** (`src/content/`) con validación estricta en `src/content.config.ts` mediante **Zod**:
  - `servicios`: fichas de las 6 especialidades + hub + landings locales opcionales.
  - `proyectos`: catálogo de obras con categoría, municipio, imágenes y flag `destacado`.
  - `blog`: los 22 artículos migrados (y nuevos) en Markdown/MDX con `slug`, `slugHeredadoWp`, `categoria`, `autor`, `servicioRelacionado`, `metaTitle` (validación longitud `<= 65`), `metaDescription` (`120–165`), `resumenAeo`, `datePublished`, `dateModified`, `faqs[]` y `heroImage`.
  - `autores`, `categorias`, `testimonios`, `faqs` y `promociones`.
- **Fuente única de verdad** (`src/data/empresa.ts` y `src/data/tarifas.ts`):
  - Datos NAP verificados de `MBL CONSTRUCCIONES S.L.` (razón social, CIF tras [[PA-001]], dirección, teléfono, horario, coordenadas, `placeId`, `aggregateRating`).
  - Tabla única de rangos orientativos y coeficientes del simulador, consumida simultáneamente por el simulador, las tablas de páginas de servicio, el archivo `/llms.txt` y Schema.org (`RNF-MANT-002`).
- **Control en build**: regla de validación para que ninguna promoción con `fechaFin` vencida se publique como oferta activa ([[RF-SERV-003]], [[CA-MANT-001]]).
- **Flujo editorial**: la redacción y actualización de artículos en *Innovación Sostenible* sigue [[Flujo editorial SEO GEO AEO]] utilizando [[Plantilla articulo MDX]] como base.
