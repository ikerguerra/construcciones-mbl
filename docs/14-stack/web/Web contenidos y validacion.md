---
id: DOC-STK-WEB-003
tipo: stack
titulo: Web — Contenidos tipados, validación Zod y fuente única de datos
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-26
---

# Web — Contenidos y validación

- **Astro Content Collections** (`src/content/`) gestionadas directamente en Git (sin CMS visual externo en Fase 1, [[ADR-004]], [[PA-011]]) con validación estricta en `src/content.config.ts` mediante **Zod**:
  - `servicios`: fichas de las 6 especialidades + hub + 3 landings locales en Fase 1 (`Gijón`, `Oviedo`, `Avilés`, [[PA-008]]).
  - `proyectos`: catálogo de obras con categoría, municipio, imágenes y flag `destacado`.
  - `blog`: los 22 artículos migrados (y nuevos) en Markdown/MDX con `slug`, `slugHeredadoWp`, `categoria`, `autor` (`borja-direccion` o `equipo-tecnico`, [[PA-010]]), `servicioRelacionado`, `metaTitle` (validación longitud `<= 65`), `metaDescription` (`120–165`), `resumenAeo`, `datePublished`, `dateModified`, `faqs[]` y `heroImage`.
  - `autores`, `categorias`, `testimonios`, `faqs` y `promociones`.
- **Fuente única de verdad** (`src/data/empresa.ts` y `src/data/tarifas.ts`):
  - Datos NAP verificados de `MBL CONSTRUCCIONES S.L.` (marca `Construcciones MBL`, razón social, CIF pendiente de pre-producción en [[PA-001]], dirección, teléfono, horario, coordenadas, `placeId`, `aggregateRating` unificado en `4.9 / 32` y bloque de dirección/equipo técnico).
  - Tabla única de rangos orientativos coherentes y coeficientes del simulador, consumida simultáneamente por el simulador, las tablas de páginas de servicio, el archivo `/llms.txt` y Schema.org (`RNF-MANT-002`).
- **Control en build e interruptor de promociones**:
  - Regla de validación para impedir publicar promociones con `fechaFin` vencida como oferta vigente ([[RF-SERV-003]], [[CA-MANT-001]]).
  - Interruptor configurable **`PUBLIC_SHOW_PROMO_DUCHA`** (`"true"` / `"false"`) + campo `activa` en `promociones` para activar/desactivar el reclamo de Oferta Exprés 48h de plato de ducha manteniendo viva la landing permanente de servicio ([[PA-009]]).
- **Flujo editorial**: la redacción y actualización de artículos en *Innovación Sostenible* sigue [[Flujo editorial SEO GEO AEO]] utilizando [[Plantilla articulo MDX]] como base.
