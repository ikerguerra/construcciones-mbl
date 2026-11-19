---
name: migracion-wordpress-301
description: >-
  Controla el traslado de contenidos desde WordPress sin pérdida orgánica, la limpieza de erratas heredadas y la generación/verificación del mapa completo de redirecciones 301 y bajas 410 para las 393 URLs de los sitemaps. Usar al migrar páginas, artículos o definir reglas de redirección.
---

# Migración WordPress y mapa 301/410

Evita errores `404`, cadenas de redirección o arrastre de defectos del sitio WordPress actual durante la migración a Astro (`ADR-003`).

## Fuentes maestras

- Auditoría e inventario completo: `docs/90-anexos/auditoria/Auditoria web actual WordPress.md`.
- Sitemaps originales adjuntos en `docs/90-anexos/sitemaps/`:
  - `wp-sitemap-posts-page-1.xml` (`17` páginas)
  - `wp-sitemap-posts-post-1.xml` (`22` artículos)
  - `wp-sitemap-taxonomies-category-1.xml` (`13` categorías)
  - `wp-sitemap-taxonomies-post_tag-1.xml` (`340` etiquetas `/tag/`)

## Procedimiento obligatorio

1. **Cobertura total de las 393 URLs**: mapear cada URL de los sitemaps más `/author/3fwu9/` según las decisiones de `docs/12-decisiones/ADR-003.md`, `PA-002` y `PA-015`:
   - Preservar rutas canónicas de páginas principales y artículos con slug limpio.
   - Normalizar los **10 slugs defectuosos** (`gua`, `cundo`, `rehabilitacin`, `baera`, `cmo`, `instalacin`, `dnde`, `vinlico`, `por-qu` y `m%c2%b2`) con redirección `301` 1:1 directa desde la URL heredada exacta.
   - Aplicar `410 Gone` (o `301` si se aprueba excepción en `PA-002`) a las 340 URLs `/tag/` y `301` a `/innovacion-sostenible/` para `/author/3fwu9/` y `/category/uncategorized/`.
2. **Normalización en un salto**: asegurar `301` directo desde `http://` y `www.construccionesmbl.com` hacia `https://construccionesmbl.com/` con política uniforme de barra final (`/`, `docs/14-stack/web/Web hosting y despliegue.md`).
3. **Saneamiento obligatorio de contenido y código heredado**:
   - Descartar todo CSS/markup de Elementor, `GTM-TG8LZ5L8`, CookieYes y avisos en inglés de Google Sheets.
   - Corregir `CIF: B33` (`PA-001`), H2 erróneo de cocina en `/reformas-parciales-en-asturias/`, etiqueta *"metros cuadrados de tu cocina"* en el simulador, oferta caducada de plato de ducha (`PA-009`), firma `3fwu9` (`PA-010`) y discrepancias de tarifas/cifras (`PA-009`, `PA-014`).

## Verificación

- Ejecutar comprobación automatizada contrastando todas las rutas de `docs/90-anexos/sitemaps/*.xml` contra las rutas estáticas de `dist/` y el fichero `_redirects`: cero URLs sin cobertura, cero bucles o cadenas de múltiples saltos `301`.
- Confirmar `noindex, nofollow` en `/mensaje-enviado/` y ausencia en `sitemap-index.xml`.
