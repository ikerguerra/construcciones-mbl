---
id: DOC-STK-WEB-000
tipo: stack
titulo: Stack web — Índice de arquitectura en Astro
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Stack web (Astro)

Índice técnico de la web corporativa de Construcciones MBL. Cada área detalla las herramientas, convenciones de código, dependencias de [[ADR-001]]..[[ADR-007]] y criterios de verificación.

| Área técnica | Alcance | ADR vinculado | Nota |
|---|---|---|---|
| Framework y renderizado | Astro SSG, TypeScript estricto, islas y layouts | [[ADR-001]] | [[Web framework y renderizado]] |
| Estilos y activos | CSS con tokens propios, fuentes locales e `astro:assets` | [[ADR-002]] | [[Web estilos y activos]] |
| Contenidos y validación | Content Collections con Zod, fuente única de NAP y tarifas | [[ADR-004]] | [[Web contenidos y validacion]] |
| SEO, GEO y AEO | `<SeoHead>`, JSON-LD modular, sitemap, `robots.txt`, `/llms.txt` | [[ADR-006]] | [[Web SEO GEO AEO]] |
| Formularios e integraciones | Simulador, endpoint de leads, GTM/Consent Mode v2, WhatsApp | [[ADR-005]] | [[Web formularios e integraciones]] |
| Hosting y despliegue | CDN edge, reglas `301`/`410`, cabeceras HTTP y CI/CD | [[ADR-003]], [[ADR-007]] | [[Web hosting y despliegue]] |
