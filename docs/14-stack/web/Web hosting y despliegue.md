---
id: DOC-STK-WEB-006
tipo: stack
titulo: Web — Hosting estático/edge, redirecciones 301/410 y CI/CD
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-27
---

# Web — Hosting y despliegue

- **Plataforma aprobada y compatibilidad dual** ([[PA-006]], [[PA-024]], [[ADR-007]]):
  - Despliegue productivo definitivo en **Cloudflare Pages** con build automatizado desde la rama `main` de GitHub (`public/_redirects`, `public/_headers`, `functions/api/lead.ts`, `functions/tag/[[path]].ts`).
  - Compatibilidad dual en **Vercel** para el entorno de pre-producción (`construccionesmbl.vercel.app`) mediante `vercel.json` (sin `trailingSlash: true`, rewrites `/tag/:path*` y `/tag/:path*/` → `/api/tag`), `api/lead.ts` y `api/tag.ts` (imports relativos explícitos con extensión `.js` bajo `api/tsconfig.json` `NodeNext` para Node ESM), replicando todas las reglas `301`, bajas `410 Gone` y cabeceras HTTP de seguridad.
  - Dominio canónico `https://construccionesmbl.com/` (**sin `www.`** y con **barra final `/`**) y redirección automática `301` desde `http://` y `www.construccionesmbl.com`.
  - Transición DNS coordinada con el gestor del WordPress previo manteniendo intactos los registros `MX` de correo; retirada del enlace público `Webmail` del footer.
- **Gestión declarativa de las 393 URLs heredadas y consolidaciones (`RF-MIG-001`, [[PA-023]])**:
  - Ficheros de migración sincronizados (`public/_redirects` y `vercel.json`, `50` reglas `301`) validados frente a los 4 XML archivados en `docs/90-anexos/sitemaps/`, las incidencias detectadas en auditoría (`398` URLs cubiertas en 1 salto `301` o `410` para `/tag/*` y `/author/3fwu9/` según [[PA-002]]) y la consolidación `301` desde `/calculadora-presupuesto-reforma/` hacia `/calcula-el-precio-de-tu-reforma-en-asturias/`.
- **Cabeceras HTTP de seguridad (`_headers` / `vercel.json`, `RNF-SEG-003`)**:
  - `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` y `Content-Security-Policy` adaptada a GTM/endpoint.
  - Cabeceras de caché inmutable (`max-age=31536000, immutable`) para activos con hash en `/_astro/` y caché corta/revalidada para HTML.
- **Comprobaciones automáticas en CI y pre-despliegue**:
  1. `astro check` + `tsc` (`check:functions` y `check:api`) + `astro build` (validación Zod de colecciones y generación de HTML + sitemap) + `npm test` (Vitest).
  2. `scripts/verify-build.py` (`npm run verify`): cobertura del 100 % sobre las 398 URLs heredadas, ausencia de `/calculadora-presupuesto-reforma/` en `dist/`, paridad completa de `vercel.json` (`50` reglas `301`, rewrites `/tag/:path*` y `/tag/:path*/` → `/api/tag`, extensiones ESM `.js` en `api/*.ts`, cabeceras y ausencia de `trailingSlash: true`), ausencia de cadenas prohibidas, metadatos únicos, JSON-LD, coherencia de `aggregateRating` entre portada, Schema.org y `/llms.txt`, y `dist/index.html < 70 KB` (`66,8 KB`).
  3. Auditoría en vivo con Chrome DevTools MCP (skill `auditoria-chrome-devtools`, documentada en [[Auditoria Chrome DevTools Astro]]): Lighthouse CI/MCP (`Accessibility 100`, `SEO 100`, `Agentic Browsing 100`), trace móvil `Fast 3G` (`LCP`, `CLS <= 0,01`, `0` `ForcedReflow`) y flujo RGPD Consent Mode v2 en contexto aislado.
