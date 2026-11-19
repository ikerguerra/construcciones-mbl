---
name: seo-geo-aeo-mbl
description: >-
  Implementa y audita el posicionamiento técnico SEO, SEO local en Asturias, Schema.org JSON-LD para GEO, /llms.txt y estructuración AEO. Usar al configurar SeoHead, datos estructurados, sitemaps, landings locales, tablas de precios o FAQs.
---

# SEO, GEO y AEO — Construcciones MBL

Asegura que cada página generada maximice su visibilidad orgánica tradicional en Asturias (Gijón, Oviedo, Avilés) y su citabilidad en motores generativos y de respuestas (`ADR-006`).

## Referencias obligatorias

- Consultar `docs/14-stack/web/Web SEO GEO AEO.md`, `docs/12-decisiones/ADR-006.md` y los requisitos `RNF-SEO-001`..`006` y `RNF-GEO-001`..`004`.

## Lista de control técnico

1. **Metadatos `<SeoHead>` únicos por URL**:
   - `<title>` entre `50` y `60` caracteres con palabra clave al inicio y marca breve al final (sin sufijos concatenados ni exceso de emojis).
   - `<meta name="description">` única de `145` a `160` caracteres con beneficio en Asturias y llamada a la acción.
   - `<link rel="canonical">` absoluto con barra final `/`, Open Graph (`og:*`), Twitter Cards y `noindex, nofollow` en `/mensaje-enviado/`.
2. **HTML semántico y enlazado interno**:
   - Exactamente **un `<h1>` por página** antes que cualquier `<h2>`/`<h3>`, jerarquía descendente sin saltos y migas de pan visibles en páginas interiores.
   - Todas las URLs indexables a `<= 3` clics desde portada y enlazadas entre servicios y artículos sin páginas huérfanas.
3. **Consistencia NAP y SEO Local**:
   - Mostrar idénticos Razón Social, marca aprobada, `Av. Argentina 132 (Cristasa of. 221), 33213 Gijón, Asturias` y `+34 684 675 898` en footer, contacto, legales y Schema (`Place ID: ChIJN_H9_Jyih2MRXyPsrrG4cWg`).
4. **Grafo JSON-LD (`@graph`) modular**:
   - Conectar mediante `@id` el nodo `GeneralContractor` (logo de alta resolución, coordenadas `43.5357, -5.6615`, horario, `areaServed`, `sameAs` y `aggregateRating` idéntico al visible en pantalla).
   - Emitir nodos específicos según plantilla: `WebSite`, `Service` + `Offer`, `FAQPage` (solo con FAQs visibles en la página), `BlogPosting` + `Person` (`Autor`) y `BreadcrumbList`.
5. **AEO y rastreabilidad IA**:
   - Incluir caja inicial *En resumen* (40–60 palabras), tablas HTML nativas (`<table>`/`<thead>`) para tarifas/comparativas, `sitemap-index.xml` limpio (sin `noindex` ni `/tag/`), `robots.txt` y `/llms.txt` generado desde colecciones.

## Verificación

- Validar sintaxis y entidades de todos los bloques `application/ld+json` generados en `dist/`.
- Confirmar ausencia de `meta description` vacías, títulos duplicados, múltiples `H1` o desajustes entre reseñas visibles y `aggregateRating`, y respuesta `200 OK` de `/llms.txt` y `/robots.txt`.
