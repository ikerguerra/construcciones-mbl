---
id: DOC-STK-WEB-006
tipo: stack
titulo: Web — Hosting estático/edge, redirecciones 301/410 y CI/CD
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Web — Hosting y despliegue

- **Plataforma objetivo** (sujeto a [[PA-006]] y [[ADR-007]]):
  - Despliegue en CDN edge (Cloudflare Pages o Vercel/Netlify) con build automatizado desde repositorio Git.
  - Dominio canónico `https://construccionesmbl.com/` con redirección automática `301` desde `http://` y `www.construccionesmbl.com`.
- **Gestión declarativa de las 393 URLs heredadas (`RF-MIG-001`)**:
  - Fichero de migración en repositorio (`src/data/redirecciones.ts` o `_redirects` generado en build) validado frente a los 4 XML archivados en `docs/90-anexos/sitemaps/` para garantizar cobertura total (`301` en 1 salto para slugs saneados y `410`/`301` para `/tag/*` y `/author/3fwu9/` según [[PA-002]]).
- **Cabeceras HTTP de seguridad (`_headers`, `RNF-SEG-003`)**:
  - `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` y `Content-Security-Policy` adaptada a GTM/endpoint.
  - Cabeceras de caché inmutable (`max-age=31536000, immutable`) para activos con hash en `/_astro/` y caché corta/revalidada para HTML.
- **Comprobaciones automáticas en CI**:
  1. `astro check` + `astro build` (validación Zod de colecciones y generación de HTML + sitemap).
  2. Test automatizado de cobertura de redirecciones respecto a `docs/90-anexos/sitemaps/*.xml` y verificación de enlaces internos rotos.
  3. Auditoría Lighthouse CI (CWV + Accessibility + SEO).
