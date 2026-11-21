---
id: DOC-AUD-002
tipo: auditoria
titulo: Auditoría Chrome DevTools MCP del sitio Astro (v1.2.1)
estado: vigente
creado: 2026-11-22
actualizado: 2026-11-22
---

# Auditoría Chrome DevTools MCP del sitio Astro (`v1.2.1`)

> Auditoría técnica en vivo ejecutada el `2026-11-22` sobre la compilación estática (`npm run build` + `astro preview` en `http://localhost:4322/`) aplicando las metodologías oficiales de **Chrome DevTools MCP** (`chrome-devtools`, `a11y-debugging`, `debug-optimize-lcp` y `cookie-debugging`), formalizada de forma permanente en la skill `auditoria-chrome-devtools`.

---

## 1. Alcance y páginas auditadas

Se inspeccionaron 6 rutas representativas de la arquitectura SSG (`dist/`, 61 páginas HTML generadas) tanto en escritorio (`1440x900`) como en emulación móvil (`375x812` y red `Fast 3G` sin caché):

1. Portada: `/`
2. Simulador interactivo: `/calcula-el-precio-de-tu-reforma-en-asturias/`
3. Página de servicio con formulario lateral: `/reformas-integrales-en-asturias/`
4. Landing local Asturias: `/reformas-en-gijon/`
5. Artículo editorial AEO/GEO: `/reforma-integral/reforma-integral-en-asturias-cuando-merece-la-pena-hacerla-guia-2026/`
6. Contacto: `/contacto/`

---

## 2. Resultados comparativos (Antes → Después)

| Métrica / Comprobación | Auditoría inicial (`v1.2.0`) | Re-verificación (`v1.2.1`) | Referencia SRS |
|---|---|---|---|
| **Lighthouse Accessibility (Móvil / Desktop)** | `95` / `95` | **`100` / `100`** | [[RNF-ACC-001]] |
| **Lighthouse SEO (Móvil / Desktop)** | `100` / `100` | **`100` / `100`** | [[RNF-REND-001]] |
| **Lighthouse Agentic Browsing (Móvil / Desktop)** | `57` / `67` | **`100` / `100`** | [[RNF-ACC-001]] |
| **Lighthouse Best Practices (Móvil / Desktop)** | `96` / `96` *(0 errores del sitio)* | **`96` / `96`** *(0 errores del sitio)* | [[RNF-SEG-002]] |
| **Lighthouse CLS Móvil** | `0,166` (`score: 0.71`) | **`0,005`** (`score: 1`) | [[RNF-REND-001]] |
| **Trace CLS Móvil (`375x812`, `Fast 3G`)** | `0,25` (`0,2464` por `@font-face`) | **`0,01`** (`0,0061`; **`0,0000` por fuentes**) | [[RNF-REND-001]] |
| **LCP Desktop (`1440x900`)** | `357 ms` (`IMG.hero-bg`) | `357 ms` (`IMG.hero-bg`, `fetchpriority="high"`) | [[RNF-REND-001]] |
| **LCP Resource Load Delay Móvil (`Fast 3G`)** | `150 ms` | **`37 ms`** *(precarga `.woff2` temprana)* | [[RNF-REND-001]] |
| **`ForcedReflow` en arranque (`Header`)** | `63 ms` | **`0` (`0 ms`)** | [[RNF-REND-001]] |
| **Contraste `a.btn-dark` dentro de `.prose`** | `1.00:1` *(texto invisible)* | **`10.85:1`** (`#ffffff` / `#164624`) | [[RNF-ACC-001]] |
| **Solapamiento `#mbl-cookie-banner` sobre `.search`** | Sí *(bloqueaba Zona / m² / Calidad)* | **Ninguno** (`13,5 px` de margen libre y `152,5 px` hasta `.wa-float`) | [[IE-002]] |
| **Áreas táctiles (`.pill`, `.arr`, `.hero-select-trigger`, `.soc a`, `.nav-toggle`)** | `22,4–42,4 px` | **`>= 44 px`** | [[RNF-ACC-001]] |
| **Saltos en jerarquía de encabezados (`heading-order`)** | Presentes en Footer, `[localidad]` y 22 artículos | **`0` saltos** en las plantillas auditadas | [[RNF-ACC-001]] |
| **Issues nativos de consola (`Lazy-loaded` / `autocomplete`)** | Presentes | **`0` issues** | [[RNF-SEG-002]] |

---

## 3. Verificación funcional de privacidad y conversión

### A. Banner de cookies RGPD y Google Consent Mode v2 (`cookie-debugging`)
Verificado en contexto aislado limpio (`isolatedContext`):
- **Antes de interactuar**: `cookieStore.getAll()` devolvió `0` cookies, `localStorage.getItem('mbl_consent_v1') === null`, `window.dataLayer` registró `consent default` con `analytics_storage: 'denied'` y `ad_storage: 'denied'`, y las **16/16 peticiones de red iniciales** fueron locales (`0` llamadas a GTM/GA4, CookieYes, Trustindex o Google Fonts).
- **Rechazo (`#cookie-reject-all`)**: oculta el banner, guarda `{"analytics":false,...}` en `mbl_consent_v1`, mantiene `0` cookies y `0` llamadas externas.
- **Reapertura y aceptación (`[data-open-cookies]` → `#cookie-toggle-prefs` → `#cookie-save-prefs`)**: `aria-expanded` cambia de `"false"` a `"true"`, guarda `{"analytics":true,...}` y emite `consent update` con `analytics_storage: 'granted'` en `dataLayer`.

### B. Selector rápido Hero, Simulador y `/api/lead`
- **Selector rápido (`HeroQuickSelector`)**: con `#mbl-cookie-banner` abierto en `1440x900`, los 5 controles (`.hero-select-trigger`, `#hero-m2`, `.go`) reciben clic directo (`elementFromPoint`) y navegan con query params validados hacia `/calcula-el-precio-de-tu-reforma-en-asturias/?tipo=...&zona=...&m2=...&calidad=...`, pre-rellenando y recalculando la horquilla al instante.
- **Validación y payload `/api/lead`**: comprobada la validación HTML5 en vacío y capturada la petición `POST /api/lead` (`Content-Type: application/json`) en simulador y formulario lateral (`FormularioRapidoServicio`), confirmando la estructura esperada por `functions/api/lead.ts` y la respuesta inline accesible (`role="status"`).
- **Responsive y cabecera fija**: `0` desbordamiento horizontal en las 6 rutas (`1440x900` y `375x812`) y transición limpia a `.nav-wrap.is-sticky` superando el Hero sin saltos de layout.

---

## 4. Correcciones aplicadas en `src/` (`v1.2.1`)

1. **Contraste de botones en artículos (`.prose a`)**: excluido `.btn-dark`, `.btn-outline`, `.pill` y `.btn-card` en `src/styles/global.css` para evitar que el verde de enlace sobreescriba al texto blanco.
2. **Despeje del banner de cookies (`CookieBanner.astro`, `BaseLayout.astro`, `global.css`)**: diseño en barra horizontal compacta en escritorio (`max-width: min(980px, calc(100vw - 260px))`) con clase síncrona `html.has-cookie-banner` en `<head>` que eleva el padding inferior del Hero de portada sin causar CLS.
3. **Eliminación de CLS por fuentes (`SeoHead.astro`, `tokens.css`)**: `<link rel="preload" as="font" type="font/woff2">` para `bebas-neue-latin-400`, `inter-latin-400` e `inter-latin-500`, combinados con `@font-face` `BebasFallback` (`size-adjust: 57.5%`) e `InterFallback` (`size-adjust: 104.7%`) calibrados con `fontTools` sobre los `.woff` locales.
4. **Landmarks semánticos de nivel superior (`BaseLayout.astro`, `Header.astro`, plantillas en `src/pages/`)**: `<header>` / `<Header slot="header" />` situado como landmark `banner` fuera de `<main id="contenido-principal">`, y cambio de `<aside role="dialog">` a `<div role="region">` con `aria-expanded` en `#cookie-toggle-prefs`.
5. **Accesibilidad ARIA y jerarquía de encabezados**: `role="img"` en `.testi-stars` (`src/pages/index.astro`), `<h2>` en columnas del footer (`src/components/Footer.astro`) y tarjetas iniciales de localidades (`src/pages/[localidad].astro`), y retirada del encabezado huérfano `#### Tabla de contenido` heredado de WordPress en 22 artículos de `src/content/blog/*.md`.
6. **Rendimiento JS, dimensiones SVG, `autocomplete` y áreas táctiles**: diferida la lectura inicial de `offsetHeight`/`offsetTop` en `Header.astro` mediante `requestAnimationFrame` (`0 ms` `ForcedReflow`), eliminado `loading="lazy"` y ajustado `height="70"` en el logo SVG del footer, añadido `autocomplete="name"|"tel"|"email"` en formularios, y ampliadas a `>= 44x44 px` las áreas interactivas `.pill`, `.arr`, `.nav-toggle`, `.soc a`, `.hero-select-trigger` y `#hero-m2`.
