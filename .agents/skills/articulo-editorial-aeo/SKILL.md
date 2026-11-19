---
name: articulo-editorial-aeo
description: >-
  Guía la creación, migración o refresco trimestral de artículos en Innovación Sostenible aplicando el flujo editorial SEO/GEO/AEO propio de Construcciones MBL. Usar al redactar un artículo nuevo, adaptar los 22 posts existentes o actualizar guías por content decay.
---

# Producción y refresco de artículos AEO/GEO

Implementa artículos hiperlocales de alta calidad para Asturias en `Innovación Sostenible` sin recurrir a generación automática masiva ni redes externas de intercambio de enlaces.

## Referencias obligatorias

- Proceso completo: `docs/90-anexos/guias/Flujo editorial SEO GEO AEO.md`.
- Plantilla de partida: `docs/99-plantillas/Plantilla articulo MDX.md`.
- Seguimiento off-page asociado: `docs/90-anexos/guias/Guia de autoridad off-page local.md`.

## Pasos

1. **Intención y no canibalización**: confirmar la palabra clave principal en Asturias, su servicio destino del cluster y verificar que no duplica otra guía ni página comercial (`PA-018`).
2. **Autoría y datos reales**: asignar un autor verificado de la colección de autores (nunca `3fwu9`), al menos dos anclajes locales de Asturias (licencias municipales, clima, subvenciones o tipología edificatoria) y precios coherentes con `src/data/tarifas.ts`.
3. **Estructura *answer-first* desde la plantilla**:
   - `H1` único claro + caja inicial **En resumen** (`40–60` palabras con cifra, plazo o criterio clave).
   - Tabla de contenidos navegable por anclas + `H2` redactados como preguntas o intenciones claras.
   - Mínimo una tabla comparativa HTML nativa (`€`, `€/m²`, semanas).
   - Enlazado interno obligatorio: `1` enlace contextual hacia la página de servicio principal, `1` CTA al simulador `/calcula-el-precio-de-tu-reforma-en-asturias/` y `2` enlaces a guías relacionadas.
   - Bloque de `3–5` FAQs en frontmatter sincronizado con `FAQPage`.
4. **Metadatos y activos**: `meta_titulo` (`50–60`), `meta_descripcion` (`145–160`), `slug` ASCII limpio sin tildes rotas ni símbolos, e imagen propia optimizada con `alt` descriptivo.
5. **Refresco trimestral**: al actualizar guías anuales o que pierdan clics, actualizar tabla/subvenciones y `fecha_actualizacion` (`dateModified`).

## Verificación

- Ejecutar `npx astro check` y `npm run build` confirmando que el artículo supera la validación Zod y aparece en `sitemap` y `/llms.txt`.
- Comprobar que los enlaces internos hacia servicio, simulador y artículos relacionados resuelven con `200 OK`.
