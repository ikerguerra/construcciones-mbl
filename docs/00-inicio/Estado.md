---
id: DOC-INI-002
tipo: inicio
titulo: Estado del SRS — Construcciones MBL
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-27
---

# Estado del proyecto

## Cifras del SRS
<!-- AUTO:cifras -->
- **Versión del SRS**: `1.3.8` (último hito: `2026-11-27` · generación de índices: `2026-11-27`)
- **Preguntas abiertas**: 7 abiertas (0 bloqueantes, 5 altas, 2 medias, 0 bajas) · 19 resueltas/cerradas

| Tipo de artefacto | Cantidad |
|---|---|
| Objetivos (`OBJ-*`) | 6 |
| Actores (`ACT-*`) | 5 |
| Necesidades (`NEC-*`) | 10 |
| Casos de uso (`CU-*`) | 8 |
| Requisitos funcionales (`RF-*`) | 24 |
| Requisitos no funcionales (`RNF-*`) | 20 |
| Interfaces externas (`IE-*`) | 6 |
| Entidades del modelo de datos | 10 |
| Criterios de aceptación (`CA-*`) | 20 |
| Decisiones de arquitectura (`ADR-*`) | 7 |
| Preguntas abiertas (`PA-*`) | 26 |
<!-- /AUTO:cifras -->

## Lo ya decidido
- La fase 1 del proyecto comprende **exclusivamente la web corporativa pública en Astro**, migrando `https://construccionesmbl.com/` desde WordPress ([[OBJ-001]], [[ADR-001]]).
- El sistema visual adopta la estructura editorial de [[mbl-maqueta.html]] a pantalla completa (Hero a alto y ancho del viewport, bloques con radios `36px`, cabecera con logotipo centrado sin texto, desplegable de servicios y aparición sticky fluida al superar el Hero) combinada con la **paleta corporativa WCAG 2.1 AA/AAA de Construcciones MBL** (verde bosque `#0F1D14` / `#164624`, verde hoja `#3E6B47` / `#86D195` sin tonos naranjas, superficies salvia `#EEF3EE`), iconos SVG en carruseles, animaciones ligeras, reseñas verificadas enriquecidas, FAQs y artículos centrados, formulario lateral en páginas de servicio y Footer sin marca de agua inferior ([[ADR-002]], [[Guia de estilos]]).
- Generación estática (`SSG`) orientada a Core Web Vitals máximos y JavaScript mínimo solo en islas interactivas ([[ADR-001]]).
- **Independencia total de cuentas respecto al WordPress anterior**: descartados `GTM-TG8LZ5L8`, CookieYes y el destino de formularios heredado; GTM, GA4, Search Console y envío de leads se configurarán con **identificadores y cuentas propios del titular** mediante variables de entorno ([[IE-002]], [[PA-012]]).
- **Estrategia editorial y off-page propia sin SaaS de intercambio**: adoptado el flujo editorial asistido AEO/GEO ([[Flujo editorial SEO GEO AEO]], [[Plantilla articulo MDX]]) y la guía de autoridad local segura centrada en Google Business Profile y citaciones en Asturias ([[Guia de autoridad off-page local]]), descartando redes automáticas de backlinks.
- **Skills y reglas del workspace**: incorporadas 8 skills especializadas en `.agents/skills/` y las reglas de entrada en `AGENTS.md` para gobernar la bóveda SRS, la migración `301`/`410`, el diseño de [[mbl-maqueta.html]], SEO/GEO/AEO, la producción editorial y la arquitectura Astro.
- **Bloque bloqueante resuelto (`PA-002`..`PA-006`) y `PA-001` acotada a pre-producción**:
  - Hosting aprobado en **Cloudflare Pages** con dominio canónico `https://construccionesmbl.com/` (sin `www.`, barra final `/`), corte DNS coordinado preservando MX y retirada del enlace `Webmail` del footer ([[ADR-007]], [[PA-006]]).
  - Migración SEO definida: `301` 1:1 para los 10 slugs saneados del blog, `410 Gone` para las 340 `/tag/*` y `301` a `/innovacion-sostenible/` para `/author/3fwu9/` y `/category/uncategorized/` ([[PA-002]]).
  - Activos visuales: logotipo y fotos propias del usuario + extracción/optimización local de las mejores imágenes del WordPress actual; eliminado el feed embebido de Instagram ([[PA-003]]).
  - Simulador y leads (`ADR-005`): simulador interactivo real en pantalla con tarifas orientativas coherentes unificadas y confirmación inline; endpoint en Cloudflare Pages Functions + **Resend** con auto-respuesta gobernable mediante `SEND_AUTO_REPLY` y webhook opcional a Google Sheets ([[PA-004]], [[PA-005]]).
  - Datos legales (`PA-001`): domicilio y correo confirmados; CIF completo y Registro Mercantil quedan pendientes únicamente para antes de publicar en producción (prioridad `alta`).
- **Bloque 2 resuelto (`PA-007`..`PA-014`) y `ADR-004` aceptado**:
  - UX/Marca (`PA-007`, `PA-014`): selector rápido del Hero (4 parámetros) hacia simulador preseleccionado; marca principal `Construcciones MBL`, marcas de agua `ASTURIAS` y `CONSTRUCCIONES MBL`. *(Rectificación 2026-11-26: la métrica `+20 años` queda invalidada por inexacta y pendiente de sustitución mediante [[PA-025]] / `T-003`).*
  - SEO local y ofertas (`PA-008`, `PA-009`): 3 landings locales en **Fase 1** (`/reformas-en-gijon/`, `/reformas-en-oviedo/`, `/reformas-en-aviles/`); landing/reclamo de Oferta Exprés 48h de plato de ducha incluida con interruptor configurable (`PUBLIC_SHOW_PROMO_DUCHA=true|false`).
  - Contenidos, E-E-A-T y reseñas (`PA-010`, `PA-011`, `PA-013`): Content Collections en Git + Zod sin CMS externo (`ADR-004`); autoría E-E-A-T (`Borja — Dirección de Construcciones MBL` y `Equipo Técnico`) + bloque de equipo; carrusel nativo sin Trustindex con cifras unificadas y `hasMap` público.
  - Analítica y cookies (`PA-012`): variables opcionales `PUBLIC_GTM_ID` / `PUBLIC_GA4_ID` listas para rellenar después y banner de consentimiento nativo ultraligero con Consent Mode v2.
- **Bloque 3 resuelto (`PA-015`..`PA-018`) y 7/7 ADRs aceptados (`SRS v1.0.0`)**:
  - Rutas del blog y Search Console (`PA-015`): nueva propiedad en Google Search Console tras el corte DNS; mantenido `/{categoria}/{slug}/` en artículos y consolidadas subcategorías/categorías de 1 post con `301` ([[ADR-003]]).
  - Alcance y garantías (`PA-016`, `PA-017`): sitio exclusivamente en español (`es-ES`, sin reservas multiidioma ni área privada) y garantías/financiación parametrizadas en `src/data/empresa.ts`.
  - Optimización AEO en bloque (`PA-018`, `ADR-006`): caja *En resumen*, tablas HTML limpias, FAQs `FAQPage`, revisión de menciones `2026` y análisis anti-canibalización de guías de suelos al extraer los 22 artículos.
- Todos los requisitos funcionales y no funcionales quedan trazados desde objetivos de negocio hasta criterios de aceptación en Gherkin y cubiertos al 100 % por la [[Matriz de trazabilidad]].
- **Implementación Astro v5 completada y evolucionada (`v1.2.0`)**:
  - 61 páginas estáticas compiladas en `dist/` (`53` páginas base + `8` fichas individuales de proyecto en `/proyectos/[slug]/` activables por configuración mediante `PUBLIC_SHOW_PROJECT_DETAILS` o `detalleActivo`), `0` errores en `astro check`, `tsc` y `verify-build.py`.
  - Logotipos vectoriales del cliente (`LogoMBL.svg`, `LogoMBL-Light.svg`, `ConstruccionesMBL.svg`), 10 fotografías propias optimizadas a WebP (`<= 1920 px`) y 42 fotografías reales de obras y artículos extraídas de WordPress en `src/assets/`.
  - 23 artículos migrados con título y contenido centrados, imágenes en guías relacionadas y estructura AEO/GEO completa; 6 páginas de servicio + landing permanente de ducha 48 h con formulario rápido de presupuesto lateral; 3 landings locales con imágenes en servicios; botón flotante de WhatsApp animado y reseñas Google verificadas enriquecidas.
  - Cobertura 100 % verificada sobre las **395 URLs heredadas** (`38` rutas directas `200`, `17` redirecciones `301` en 1 salto en `public/_redirects` y `340` etiquetas `/tag/*` con `410 Gone` mediante `functions/tag/[[path]].ts`).
- **Integración y auditoría en vivo con Chrome DevTools MCP (`v1.2.1`)**:
  - Incorporada la skill operativa `auditoria-chrome-devtools` en `.agents/skills/` (combinando `chrome-devtools`, `a11y-debugging`, `debug-optimize-lcp` y `cookie-debugging`) y documentados sus resultados reales en [[Auditoria Chrome DevTools Astro]].
  - Corregidos todos los hallazgos detectados en vivo: contraste `10.85:1` en botones `.btn-dark` dentro de `.prose`, barra horizontal de cookies sin solapamiento sobre el selector Hero ni `.wa-float`, precarga `.woff2` + fallbacks métricos en `tokens.css` (reduciendo el CLS móvil en `Fast 3G` de `0,25` a `0,01`), landmark `banner` de nivel superior, jerarquía de encabezados sin saltos (`heading-order`), `role="img"` en reseñas, `autocomplete` estándar, áreas táctiles `>= 44 px` y eliminación de `ForcedReflow` (`0 ms`), logrando **`100` en Accessibility, SEO y Agentic Browsing** en Lighthouse.
- **Cierre técnico parcial del checklist pre-despliegue (`v1.3.2`, [[RF-MIG-001]], [[RF-PROY-003]])**:
  - Añadidas a `public/_redirects` las 3 reglas `301` adicionales detectadas en el WordPress en vivo (`/reformas-de-ba%C3%B1os-en-asturias` y variantes con `ñ`, `/reformas-de-banos/reforma-de-banos-y-cocinas-...` y `/wp-sitemap.xml`).
  - Sincronizado `totalResenas: 32` (`4,9 / 5`) en `src/data/empresa.ts`, propagado automáticamente a portada, JSON-LD `AggregateRating` y `/llms.txt`.
  - Ampliada la verificación automática en `scripts/verify-build.py` (`398` URLs heredadas y coherencia de `aggregateRating`) y añadidos tests unitarios en `src/__tests__/empresaAndRedirects.test.ts`.
- **Resolución de [[PA-024]] y compatibilidad dual Cloudflare Pages + Vercel (`v1.3.3`)**:
  - Confirmado **Cloudflare Pages** como plataforma definitiva de producción ([[ADR-007]]) y habilitada **compatibilidad dual completa en Vercel** para pre-producción (`construccionesmbl.vercel.app`): lógica Web-Standard compartida en `src/lib/server/leadHandler.ts` y `src/lib/server/tagHandler.ts`, adaptadores `api/lead.ts` y `api/tag.ts` (`HTTP 410 Gone`), `vercel.json` (48 reglas `301`, rewrite `/tag/:path*` → `/api/tag` y cabeceras HTTP equivalentes sin `trailingSlash: true`), validación TypeScript (`npm run check:api`), verificación automática de paridad en `scripts/verify-build.py` y 7 tests unitarios en `src/__tests__/serverlessEndpoints.test.ts`.
- **Resolución de [[PA-023]] y consolidación canónica de calculadoras (`v1.3.4`)**:
  - Unificadas ambas calculadoras de presupuesto bajo la ruta canónica **`/calcula-el-precio-de-tu-reforma-en-asturias/`** combinando pestañas accesibles (`Modo 1 · Simulador rápido (2 min)` + `Modo 2 · Desglose completo (PEM + ICIO + IVA)`), salto con sincronización de parámetros entre modos y esquema `WebApplication` + `FAQPage` (`88` páginas estáticas, `86` títulos y descripciones únicas).
  - Eliminada la página duplicada `/calculadora-presupuesto-reforma/` del build estático y sitemap XML, añadiendo redirección `301` en 1 salto (con y sin `/`) en `public/_redirects` y `vercel.json` (`50` reglas `301` sincronizadas), consolidando `Header.astro`, `Footer.astro`, portada (`index.astro`), `/llms.txt`, `/empresa/` y los *deep-links* de `src/lib/calculators/urlState.ts`.
- **Auditoría en vivo en navegador, corrección ESM/routes en Vercel y optimización HTML de Home (`v1.3.5`)**:
  - Superada la auditoría completa en Chromium (`1440×900` y `375×812`) sobre las 6 plantillas representativas con `0` errores (`CLS 0`, `LCP 96–268 ms`, Consent Mode v2, calculadora unificada, captura `/api/lead`, contraste y tamaño táctil `>= 44 px`), corrigiendo `public/js/lightbox.js` para montar `<img>` solo al abrir el visor y evitar nodos sin `src` con `naturalWidth === 0` en el DOM cerrado.
  - Corregidos dos fallos detectados en la verificación HTTP de pre-producción (`construccionesmbl.vercel.app`): especificadores ESM `.js` explícitos en `api/lead.ts` y `api/tag.ts` + `NodeNext` en `api/tsconfig.json` (eliminando `HTTP 500 FUNCTION_INVOCATION_FAILED` bajo `"type": "module"`), y rewrite `/tag/:path*/` → `/api/tag` en `vercel.json` para servir `410 Gone` con barra final en lugar de `404`; **verificado en vivo** tras `push` (`6cf78df`) con `/api/lead` (`405`/`422`/`200` honeypot), `/tag/*` y `/tag/*/` (`410 noindex, nofollow`) y `301` operativos.
  - Reducido `dist/index.html` de `70 845 B` (`69,18 KB`) a `68 422 B` (`66,8 KB`, más de `3,1 KB` de margen bajo el umbral de `70 KB`) sustituyendo los 5 `<svg>` chevrones de `Header.astro` por `::after` en CSS puro, extrayendo estilos inline repetidos de `CookieBanner.astro` e `index.astro` a `global.css` y eliminando `viewBox` redundantes en `<svg><use>`.
- **Operativa diferida de correo transaccional con Resend (`v1.3.6`)**:
  - Confirmado mantener **Resend** (`fetch` HTTP nativo en [[Web formularios e integraciones]]) frente a Nodemailer (dependencia de sockets TCP/SMTP en Cloudflare Workers y credenciales de buzón) o Brevo.
  - Documentado en [[Web formularios e integraciones]] el despliegue en 2 fases sin cambios de código para sortear la falta de acceso DNS a `construccionesmbl.com` hasta el corte final: verificar un subdominio personal temporal en Resend (`mbl.<dominio-personal>`, región Irlanda) para probar envío y auto-respuesta en Vercel, y migrar `RESEND_FROM_EMAIL` al dominio `construccionesmbl.com` el día del corte DNS.

## Siguiente paso
1. **Backlog interactivo de ajustes pendientes ([[Backlog de tareas pendientes]], `T-001`..`T-011`)**: completadas `T-001` (hover botón WhatsApp), `T-002` (tarjeta corporativa en `/empresa/`), `T-004` (análisis SEO+UX con 3 opciones por ubicación en [[Analisis fotografico SEO UX por ubicacion]]), `T-008` y `T-009`. Quedan pendientes de resolución previa con el cliente: retirar menciones a 20 años (`T-003`, [[PA-025]]), curación/ordenación y renombrado SEO de imágenes (`T-005` → `T-006`, [[PA-022]]) y documentación verídica de proyectos reales (`T-007`, [[PA-026]] y [[PA-021]]).
2. **Checklist de requisitos pendientes de pre-despliegue (`RF-MIG-004` y `PA-001`)**:
   - **Completar datos legales (`PA-001`, `RF-MIG-003`)**: sustituir los avisos provisionales `PA-001` en `src/data/empresa.ts` por el `cif` completo y los datos del `registroMercantil` de `MBL CONSTRUCCIONES S.L.`.
   - **Activación diferida de Resend en Vercel y analítica (`PUBLIC_GTM_ID`, `PUBLIC_GA4_ID`)**: seguir la operativa de Fase A en [[Web formularios e integraciones]] (subdominio personal `mbl.<dominio-personal>` verificado en Resend + variables `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `LEADS_TO_EMAIL`, `SEND_AUTO_REPLY=true`) para validar la entrega real de formularios antes del corte DNS.
   - **Revisar decisiones de optimización restantes tras la reunión con MBL (`abierta`)**: servicios alto ticket ([[PA-019]]), coberturas contractuales ([[PA-020]]), material visual ([[PA-021]], [[PA-022]]), posicionamiento de marca ([[PA-025]]) e inventario verídico de proyectos ([[PA-026]]).
3. **Lanzamiento definitivo y corte DNS (`ADR-007`)**: al obtener acceso DNS de `construccionesmbl.com`, completar la Fase B de Resend (`send.construccionesmbl.com` / `construccionesmbl.com` en Cloudflare Pages preservando registros `MX`), cargar las variables en Cloudflare Pages, verificar [[CA-MIG-001]] y ejecutar el corte DNS hacia Cloudflare Pages.
