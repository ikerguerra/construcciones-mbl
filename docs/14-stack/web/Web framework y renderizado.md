---
id: DOC-STK-WEB-001
tipo: stack
titulo: Web — Framework, renderizado SSG e islas interactivas
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-27
---

# Web — Framework y renderizado

- **Framework**: Astro (última rama estable v5.x sobre Node.js v22 LTS) en modo estático puro (`output: 'static'`) alojado en **Cloudflare Pages**, con lógica serverless Web-Standard compartida en `src/lib/server/` expuesta tanto en **Cloudflare Pages Functions** (`functions/`) para producción como en **Vercel Functions** (`api/`) para pre-producción ([[ADR-001]], [[ADR-005]], [[ADR-007]], [[PA-024]]).
- **Lenguaje**: TypeScript en modo estricto (`tsconfig.json` `strict`) para layouts, esquemas de datos, helpers SEO y lógica del simulador.
- **Arquitectura de renderizado**:
  - **Cero JS por defecto**: portada estática, páginas de servicios, artículos del blog, portfolio base y legales entregan HTML/CSS puro sin hidratación.
  - **Islas interactivas puntuales** (`client:visible` o `client:load` mínimo / scripts vanilla encapsulados):
    1. Menú móvil accesible (`<= 900px`) y desplegable de servicios.
    2. Selector rápido del Hero (`RF-NAV-003`).
    3. Pestañas de servicios en portada y filtros de categoría en `/proyectos/` y `/innovacion-sostenible/`.
    4. Carrusel de testimonios y acordeón FAQ (`<details>/<summary>` nativo preferido para cero JS).
    5. Simulador interactivo de reforma (`RF-LEAD-001`) y formularios con validación y envío asíncrono.
    6. Gestor ligero de consentimiento de cookies.
- **Normalización de rutas**: `trailingSlash: 'always'` para igualar el formato canónico actual de WordPress y evitar duplicidades `/ruta` vs `/ruta/` ([[RF-MIG-002]]).
