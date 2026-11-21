---
name: auditoria-chrome-devtools
description: >-
  Audita en vivo el sitio Astro compilado de Construcciones MBL con las skills de Chrome DevTools MCP (chrome-devtools, a11y-debugging, debug-optimize-lcp y cookie-debugging). Usar tras modificar UI, CSS, fuentes, imágenes, formularios, banner RGPD o antes de cerrar un hito.
---

# Auditoría en vivo con Chrome DevTools MCP — Construcciones MBL

Integra en el flujo del proyecto las metodologías oficiales de **Chrome DevTools MCP** (`chrome-devtools`, `a11y-debugging`, `debug-optimize-lcp` y `cookie-debugging`) sobre la previsualización estática compilada (`npm run build && npx astro preview`).

## Requisitos previos

1. Compilar y pasar la suite estática antes de inspeccionar en navegador:
   ```powershell
   npm run check; npm run check:functions; npm run build; npm run verify
   ```
2. Levantar el servidor de previsualización (`npx astro preview --port 4322`) en segundo plano y delegar la navegación al subagente `browser` sobre las **6 plantillas representativas**:
   - Portada: `/`
   - Simulador: `/calcula-el-precio-de-tu-reforma-en-asturias/`
   - Servicio con formulario lateral: `/reformas-integrales-en-asturias/`
   - Landing local: `/reformas-en-gijon/`
   - Artículo editorial AEO/GEO: `/reforma-integral/reforma-integral-en-asturias-cuando-merece-la-pena-hacerla-guia-2026/`
   - Contacto: `/contacto/`

## Protocolo de verificación (4 ejes)

### 1. Cookies RGPD y Consent Mode v2 (`cookie-debugging`)
Ejecutar siempre en una sesión limpia con `new_page(isolatedContext: "mbl-consent-audit")` y cerrar la página al finalizar:
1. **Estado previo al consentimiento**: confirmar `await cookieStore.getAll()` vacío (`0` cookies), `localStorage.getItem('mbl_consent_v1') === null`, `window.dataLayer` con `consent default` (`analytics_storage: 'denied'`, `ad_storage: 'denied'`) y **0 peticiones de red** hacia `googletagmanager.com`, `google-analytics.com`, `cookieyes`, `trustindex` o `fonts.googleapis.com`.
2. **No solapamiento en portada (`1440x900`)**: con `#mbl-cookie-banner` visible, verificar con `elementFromPoint` y `getBoundingClientRect()` que no cubre ninguno de los 5 controles del selector rápido del Hero (`.search`) ni el botón flotante `.wa-float`.
3. **Ciclo completo de consentimiento**:
   - Pulsar `#cookie-reject-all` → banner oculto, `mbl_consent_v1` con `"analytics":false`, `0` cookies y `0` peticiones externas.
   - Reabrir desde `[data-open-cookies]` en el footer → pulsar `#cookie-toggle-prefs` (verificar `aria-expanded="true"`) → activar analítica o pulsar `#cookie-accept-all` → confirmar `mbl_consent_v1` con `"analytics":true` y evento `consent update` (`analytics_storage: 'granted'`) en `dataLayer`.

### 2. Rendimiento, LCP y CLS (`debug-optimize-lcp`)
1. **Trace desktop (`1440x900`) y móvil (`375x812`, `Fast 3G`, `ignoreCache: true`)** con `performance_start_trace(reload: true, autoStop: true)`:
   - Verificar `LCP <= 2,5 s` (objetivo `< 1,5 s` en desktop/4G), `CLS <= 0,1` (objetivo `<= 0,01` gracias a `<link rel="preload" as="font">` y fallbacks `BebasFallback`/`InterFallback` en `src/styles/tokens.css`) y `0` `ForcedReflow` al arrancar.
   - Analizar `LCPBreakdown`, `RenderBlocking`, `DocumentLatency` y `LCPDiscovery` con `performance_analyze_insight`.
2. **Snippets DOM**: ejecutar *Identify LCP Element* (`IMG.hero-bg`) y *Audit Common Issues* (exigir `0` imágenes `loading="lazy"` en viewport inicial, `fetchpriority="high"` en Hero y `0` scripts bloqueantes en `<head>`).
3. **Red**: confirmar en `list_network_requests` carga temprana HTTP `200` de `bebas-neue-latin-400`, `inter-latin-400` e `inter-latin-500` en `.woff2` e imágenes `.webp` locales.

### 3. Accesibilidad WCAG 2.1 AA y Lighthouse (`a11y-debugging`)
1. Ejecutar `lighthouse_audit` (móvil y desktop) exigiendo `Accessibility = 100`, `SEO = 100` y `Agentic Browsing = 100` (`0` fallos en `aria-prohibited-attr`, `heading-order`, `agent-accessibility-tree` y `cumulative-layout-shift`).
2. **Landmarks y encabezados**: verificar `<header>` como landmark `banner` de nivel superior fuera de `<main id="contenido-principal">`, `<footer>` como `contentinfo`, y `0` saltos de jerarquía (`h1 → h2 → h3`) en páginas y artículos.
3. **Formularios**: ejecutar *Find Orphaned Form Inputs* (`0` inputs huérfanos) y confirmar `autocomplete="name"|"tel"|"email"` en campos personales.
4. **Contraste y áreas táctiles**: comprobar `>= 4.5:1` en texto normal (cuidando especialmente botones `.btn-dark`/`.btn-outline` dentro de `.prose`), áreas táctiles `>= 44x44 px` (`.pill`, `.arr`, `.hero-select-trigger`, `#hero-m2`, `.soc a`, `.nav-toggle`), navegación con `Tab`/`Escape` en el drawer móvil y **`0` issues nativos** en `list_console_messages(types: ["issue"])`.

### 4. Flujos de conversión, `/api/lead` y responsive
1. **Hero → Simulador**: cambiar parámetros en `.search`, pulsar `.go` y confirmar pre-relleno y recálculo en `/calcula-el-precio-de-tu-reforma-en-asturias/?tipo=...&zona=...&m2=...&calidad=...`.
2. **Validación y payload `/api/lead`**: probar validación HTML5 en vacío y capturar con `get_network_request` la petición `POST /api/lead` en simulador y formulario lateral (`FormularioRapidoServicio`), además de verificar manejo inline de errores (`role="status"`).
3. **Responsive y sticky**: confirmar `scrollWidth <= innerWidth` en `1440x900` y `375x812`, y activación limpia de `.nav-wrap.is-sticky` al hacer scroll tras el Hero.

## Referencias

- Informe técnico de referencia y comparativa antes/después: `docs/90-anexos/auditoria/Auditoria Chrome DevTools Astro.md`.
- Skills globales subyacentes: `chrome-devtools`, `a11y-debugging`, `debug-optimize-lcp`, `cookie-debugging`.
