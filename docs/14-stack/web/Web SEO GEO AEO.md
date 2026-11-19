---
id: DOC-STK-WEB-004
tipo: stack
titulo: Web — SEO técnico, Schema.org GEO y estructuración AEO
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Web — SEO, GEO y AEO

- **Componente `<SeoHead.astro>` centralizado**:
  - Emite `<title>` único, `<meta name="description">`, `<link rel="canonical">` absoluto, `<meta name="robots">` (`noindex, nofollow` en `/mensaje-enviado/`), `og:*` y `twitter:*`.
- **Generador de grafo JSON-LD (`src/lib/schema.ts`)**:
  - Emite un único bloque `<script type="application/ld+json">` con `@graph` interconectado por `@id` según plantilla:
    - Nodo global `GeneralContractor` (`https://construccionesmbl.com/#organization`) con `address`, `geo`, `openingHoursSpecification`, `areaServed`, `sameAs`, `aggregateRating` unificado y logo en alta resolución.
    - `WebSite` en portada.
    - `Service` + `Offer` en cada página de servicio.
    - `FAQPage` generado automáticamente a partir de los arrays `faqs[]` visibles en cada página o artículo.
    - `BlogPosting` + `Person` (`Autor`) en cada artículo de *Innovación Sostenible*.
    - `BreadcrumbList` sincronizado con el componente visual de migas de pan.
- **Rastreo e IAs**:
  - `@astrojs/sitemap` configurado con filtro para excluir `/mensaje-enviado/` y cualquier página `noindex`.
  - Endpoint estático `src/pages/llms.txt.ts` que genera `/llms.txt` en build desde las colecciones reales (`RNF-GEO-004`).
  - `public/robots.txt` limpio apuntando a `https://construccionesmbl.com/sitemap-index.xml`.
- **Componentes AEO reutilizables**:
  - `<ResumenDirecto />` (*En resumen* de 40–60 palabras al inicio de servicios y artículos).
  - `<TablaComparativa />` (tablas HTML semánticas con `<thead>` y `<caption>`).
  - `<BloqueFaq />` (acordeón accesible sincronizado con `FAQPage`).
- **Operativa editorial y seguimiento GEO/Off-page**:
  - Creación y refresco trimestral de artículos siguiendo [[Flujo editorial SEO GEO AEO]] y [[Plantilla articulo MDX]].
  - Autoridad local y control mensual en Search Console / GA4 / prompts IA siguiendo [[Guia de autoridad off-page local]] (sin redes automáticas de intercambio de backlinks).
