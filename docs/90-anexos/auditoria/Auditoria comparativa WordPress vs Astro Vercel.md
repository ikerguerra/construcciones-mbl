---
id: DOC-AUD-004
tipo: auditoria
titulo: Auditoría comparativa en vivo WordPress actual vs. Astro en Vercel (Pre-lanzamiento)
estado: vigente
creado: 2026-11-26
actualizado: 2026-11-26
---

# Auditoría comparativa en vivo: WordPress (`construccionesmbl.com`) vs. Astro (`construccionesmbl.vercel.app`)

> Auditoría técnica, SEO/GEO/AEO, de conversión (CRO) y legal ejecutada en vivo el `2026-11-26` mediante Chrome DevTools sobre el sitio en producción en WordPress (`https://www.construccionesmbl.com/`) y el despliegue de pre-producción en Vercel (`https://construccionesmbl.vercel.app/`).

---

## 1. Telemetría comparativa en vivo (Portada)

| Métrica / Parámetro (Chrome DevTools) | WordPress (`construccionesmbl.com`) | Astro (`construccionesmbl.vercel.app`) | Mejora verificada |
|---|---|---|---|
| **TTFB** (*Time to First Byte*) | `550 ms` | **`90 ms`** | `-83,6 %` (`6,1x` más rápido) |
| **First Contentful Paint (FCP)** | `1.928 ms` | **`408 ms`** | `-78,8 %` (`4,7x` más rápido) |
| **DOM Interactive** | `1.953 ms` | **`222 ms`** | `-88,6 %` (`8,8x` más rápido) |
| **Load Event End** (carga completa) | `2.816 ms` | **`773 ms`** | `-72,5 %` (`3,6x` más rápido) |
| **Tamaño del documento HTML inicial** | `349.011 chars` (`~341 KB`) | **`71.440 chars` (`~70 KB`)** | `-79,5 %` HTML |
| **Nodos del DOM (`*`)** | `1.543 nodos` | **`860 nodos`** | `-44,3 %` complejidad DOM |
| **Peticiones HTTP iniciales** | `75 peticiones` | **`22 peticiones`** | `-70,7 %` peticiones |
| **Peso total decodificado** | `2.245.596 B` (`~2,25 MB`) | **`445.000 B` (`~445 KB`)** | `-80,2 %` peso en red |
| **Hojas de estilo CSS (`<link rel="stylesheet">`)** | `26 archivos CSS` | **`1 archivo CSS`** | `-96,1 %` hojas CSS |
| **Scripts JS ejecutados (`<script>`)** | `45 scripts JS` | **`6 micro-scripts JS`** | `-86,7 %` scripts JS |
| **URLs indexables de valor real en Sitemap** | `40 páginas/posts` (`+358` tags/categorías/autor) | **`87 páginas/guías/proyectos/calculadoras`** | `+117 %` páginas comerciales |

---

## 2. Nuevos defectos detectados en el WordPress actual (`construccionesmbl.com`)

Además de los hallazgos registrados en [[Auditoria web actual WordPress]], la inspección en vivo del DOM de producción reveló:
1. **Enlace roto (`HTTP 404`) en Reforma de Baños en Portada y `/servicios/`**: tanto el título como el botón *"Ampliar Información"* de la tarjeta *"🚿 Reforma de Baños"* apuntan a `/reformas-de-ba%C3%B1os-en-asturias` (con `ñ`), ruta que devuelve `HTTP 404` en WordPress.
2. **Galería de `/proyectos/` visualmente rota**: el plugin *Smash Balloon Instagram Feed* renderiza las 15 publicaciones con la imagen vacía `/wp-content/plugins/instagram-feed/img/placeholder.png` y los botones de filtro tienen `href=null`.
3. **Incumplimiento crítico RGPD/LSSI-CE con responsabilidad directa para `MBL CONSTRUCCIONES S.L.`**: en el DOM actual no se muestra ningún banner de cookies (`cookieBannerFound: false`), pero se ejecutan inmediatamente `GTM-TG8LZ5L8` y Google Site Kit (`GT-NFXCTFT7`), instalando las cookies `_ga` y `_ga_49834HB9X2` sin consentimiento previo. Conforme a los artículos 10 y 22.2 de la LSSI-CE y el RGPD, la responsabilidad sancionadora ante la AEPD (multas habituales de `1.500 € a 5.000 €` en pymes) recae directamente sobre la sociedad titular del sitio web (`MBL CONSTRUCCIONES S.L.`).
4. **Artículo 23º publicado bajo `/reformas-de-banos/` en WordPress**: el post `/reformas-de-banos/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/` figura en el sitemap actual de WordPress bajo la categoría `reformas-de-banos` (además de la referencia previa en `uncategorized`), mientras que en Astro su URL canónica es `/vivienda-sostenible/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/`.
5. **Incremento de reseñas en Google Business Profile**: el widget de WordPress muestra actualmente **32 reseñas** con nota media **4,9**, frente a las **29 reseñas** registradas inicialmente en `src/data/empresa.ts`.

---

## 3. Requisitos pendientes detectados en el despliegue de Astro (`construccionesmbl.vercel.app`) para el día del lanzamiento

La auditoría en vivo sobre `https://construccionesmbl.vercel.app/` confirmó que el sitio estático compila y sirve sus 87 URLs canónicas con `HTTP 200`, pero identificó **5 aspectos pendientes de realizar** antes del corte DNS debido a la discrepancia entre el entorno de pruebas en Vercel y la infraestructura diseñada para Cloudflare Pages ([[ADR-007]]):

| # | Aspecto pendiente de realizar | Evidencia en `construccionesmbl.vercel.app` | Requisitos / PAs vinculados |
|---|---|---|---|
| **1** | **Endpoint `/api/lead` devuelve `HTTP 404` en Vercel** | El backend `functions/api/lead.ts` está escrito para Cloudflare Pages Functions. Al estar desplegada la demo en Vercel como sitio estático sin funciones adaptadas, `POST /api/lead` responde `404 (x-vercel-error: NOT_FOUND)`. | [[RF-MIG-004]], [[RF-LEAD-004]], [[IE-001]], [[PA-024]] |
| **2** | **Inactividad de redirecciones `301` y bajas `410` en Vercel** | Las reglas están definidas en `public/_redirects` y `functions/tag/[[path]].ts` (formato Cloudflare Pages), ficheros que Vercel no procesa si no existe un `vercel.json` equivalente. Como resultado, los slugs heredados con erratas devuelven `404` en `vercel.app`. | [[RF-MIG-004]], [[RF-MIG-001]], [[IE-006]], [[PA-024]] |
| **3** | **Falta de 3 reglas `301` adicionales del WordPress vivo** | Deben añadirse al mapa declarativo de redirecciones (`public/_redirects` / `vercel.json`):<br>1. `/reformas-de-ba%C3%B1os-en-asturias` (y con `ñ`) $\rightarrow$ `/reformas-de-banos-en-asturias/`<br>2. `/reformas-de-banos/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/` $\rightarrow$ `/vivienda-sostenible/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/`<br>3. `/wp-sitemap.xml` $\rightarrow$ `/sitemap-index.xml` | [[RF-MIG-001]], [[RF-MIG-004]] |
| **4** | **Placeholders visibles de `PA-001` en textos legales** | En `/aviso-legal/` y `/politica-de-privacidad/` sigue visible el texto provisional `"Pendiente de confirmación definitiva antes de publicación en producción (PA-001)"` para el CIF y el Registro Mercantil. | [[RF-MIG-003]], [[RNF-MANT-002]], [[PA-001]] |
| **5** | **Sincronización del contador de reseñas (`29` $\rightarrow$ `32`) y credenciales de entorno** | Actualizar `totalResenas` de `29` a `32` en `src/data/empresa.ts` y confirmar las variables de entorno definitivas (`RESEND_API_KEY`, `LEADS_TO_EMAIL`, `PUBLIC_GTM_ID`, `PUBLIC_GA4_ID`). | [[RF-PROY-003]], [[RNF-MANT-002]], [[RF-MIG-004]] |
