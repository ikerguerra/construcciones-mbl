---
id: DOC-INT-001
tipo: introduccion
titulo: Introducción al SRS — Construcciones MBL
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Introducción

## 1. Propósito
Este documento especifica los requisitos funcionales, no funcionales, de arquitectura de información, posicionamiento (**SEO, GEO y AEO**), diseño visual e integración técnica para migrar la presencia web de **Construcciones MBL** (`MBL CONSTRUCCIONES S.L.`) desde su sitio actual en WordPress + Elementor (`https://construccionesmbl.com/`) hacia una nueva plataforma web construida con **Astro** y alineada con el sistema visual de [[mbl-maqueta.html]].

Sirve como contrato técnico y funcional entre el equipo de desarrollo y el responsable del proyecto antes de inicializar el repositorio de código.

## 2. Contexto del negocio y situación de partida
**Construcciones MBL** es una empresa de reformas integrales, reformas de cocinas, baños, reformas parciales, adecuación de locales comerciales y construcción de viviendas unifamiliares radicada en **Gijón (Av. Argentina 132, Cristasa of. 221, 33213 Gijón, Asturias)**, con ámbito de actuación en todo el Principado de Asturias (Gijón, Oviedo, Avilés, Oriente y Occidente).

Según la [[Auditoria web actual WordPress]], el sitio actual publica 17 páginas, 22 artículos editoriales bajo la sección *Innovación Sostenible* y 13 categorías, pero sufre problemas estructurales graves:
- Rendimiento lastrado por 354 KB de HTML inicial (Elementor inline CSS + scripts de terceros).
- Cero etiquetas `<meta name="description">`, cero metadatos Open Graph y títulos concatenados de ~290 caracteres.
- 340 URLs de etiqueta (`/tag/`) que generan *index bloat*, 10 slugs con caracteres perdidos o codificados y firma de autor técnico (`3fwu9`).
- Defectos legales y de conversión (CIF incompleto `B33`, oferta caducada de plato de ducha, aviso de Google Sheets en inglés y simulador sin cálculo real en pantalla).

## 3. Referencias normativas y documentales
- **ISO/IEC/IEEE 29148**: estructura del SRS, trazabilidad y redacción verificable de requisitos.
- [[Auditoria web actual WordPress]]: diagnóstico técnico y de contenidos del WordPress en producción.
- [[mbl-maqueta.html]]: maqueta HTML/CSS aprobada como referencia estética base (adaptada en [[Guia de estilos]]).
- Sitemaps originales de WordPress archivados en `docs/90-anexos/sitemaps/`:
  - `wp-sitemap-posts-page-1.xml`
  - `wp-sitemap-posts-post-1.xml`
  - `wp-sitemap-taxonomies-category-1.xml`
  - `wp-sitemap-taxonomies-post_tag-1.xml`
- Sitio en producción de referencia: `https://construccionesmbl.com/`.
