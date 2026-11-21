---
name: astro-arquitectura-y-rendimiento
description: >-
  Guía la inicialización e implementación técnica en Astro (SSG, islas interactivas, Content Collections con Zod, fuentes, imágenes, cuentas propias y Core Web Vitals). Usar al crear o modificar código Astro en src/, configuraciones, formularios o endpoints.
---

# Arquitectura Astro y rendimiento

Define los estándares técnicos obligatorios para construir la web de Construcciones MBL según `docs/14-stack/web/Stack web.md` y `docs/12-decisiones/ADR-001.md`.

## Requisitos previos

1. Comprobar en `docs/00-inicio/Estado.md` e `docs/13-preguntas-abiertas/Indice de preguntas abiertas.md` si existen preguntas `bloqueante` abiertas antes de escribir páginas definitivas de producción.
2. Revisar las decisiones de referencia: `docs/12-decisiones/ADR-001.md`, `ADR-004.md`, `ADR-005.md` y `ADR-007.md`, junto con `docs/14-stack/web/Web framework y renderizado.md`, `Web contenidos y validacion.md`, `Web estilos y activos.md`, `Web formularios e integraciones.md` y `Web hosting y despliegue.md`.

## Estándares de implementación

1. **Renderizado SSG e islas mínimas**: generar HTML estático (`trailingSlash: 'always'`) con cero JavaScript en páginas informativas; hidratar únicamente controles interactivos (menú móvil, filtros/tabs, carruseles, simulador, formularios y banner de consentimiento).
2. **Fuente única y validación Zod**:
   - Centralizar datos NAP, reseñas, estadísticas y tarifas en `src/data/empresa.ts` y `src/data/tarifas.ts` (evitando contradicciones entre páginas de servicio, simulador y JSON-LD).
   - Validar colecciones en `src/content.config.ts`, impidiendo compilar ofertas cuya `fechaFin` haya vencido.
3. **Activos y fuentes locales**:
   - Servir `Bebas Neue` e `Inter` localmente en `.woff2` con `font-display: swap`.
   - Usar `<Image />` / `<Picture />` (`AVIF`/`WebP`, dimensiones explícitas). Aplicar `loading="eager"` y `fetchpriority="high"` solo a la imagen crítica del Hero.
   - Prohibido cargar widgets externos pesados (Trustindex, embed de Instagram o CookieYes).
4. **Cuentas propias y formularios**:
   - Inyectar únicamente cuentas propias del titular mediante variables de entorno (`PUBLIC_GTM_ID`, `PUBLIC_GA4_ID`). **Prohibido** reutilizar `GTM-TG8LZ5L8`, CookieYes o conectores del WordPress anterior.
   - Proteger formularios con validación en servidor, *honeypot* / anti-spam ligero y textos RGPD íntegramente en español.

## Verificación

- Ejecutar `npx astro check` y `npm run build` sin errores de tipos ni validación Zod.
- Auditar en compilación/preview con la skill `auditoria-chrome-devtools` (`debug-optimize-lcp`, `cookie-debugging` y `a11y-debugging`): `LCP <= 2,5 s` (objetivo `< 1,5 s`), `INP <= 200 ms`, `CLS <= 0,1` (incluyendo móvil `Fast 3G` con precarga `.woff2` y fallbacks métricos), `0` `ForcedReflow`, HTML de portada `< 70 KB` y ausencia de cookies o peticiones de analítica antes del consentimiento.
