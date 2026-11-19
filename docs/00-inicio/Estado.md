---
id: DOC-INI-002
tipo: inicio
titulo: Estado del SRS — Construcciones MBL
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Estado del proyecto

## Cifras del SRS
<!-- AUTO:cifras -->
- **Versión del SRS**: `0.4.0` (último hito: `2026-11-19` · generación de índices: `2026-11-19`)
- **Preguntas abiertas**: 13 abiertas (0 bloqueantes, 9 altas, 4 medias, 0 bajas) · 5 resueltas/cerradas

| Tipo de artefacto | Cantidad |
|---|---|
| Objetivos (`OBJ-*`) | 6 |
| Actores (`ACT-*`) | 5 |
| Necesidades (`NEC-*`) | 10 |
| Casos de uso (`CU-*`) | 8 |
| Requisitos funcionales (`RF-*`) | 23 |
| Requisitos no funcionales (`RNF-*`) | 20 |
| Interfaces externas (`IE-*`) | 6 |
| Entidades del modelo de datos | 10 |
| Criterios de aceptación (`CA-*`) | 20 |
| Decisiones de arquitectura (`ADR-*`) | 7 |
| Preguntas abiertas (`PA-*`) | 18 |
<!-- /AUTO:cifras -->

## Lo ya decidido
- La fase 1 del proyecto comprende **exclusivamente la web corporativa pública en Astro**, migrando `https://construccionesmbl.com/` desde WordPress ([[OBJ-001]], [[ADR-001]]).
- El sistema visual adopta la estética editorial de [[mbl-maqueta.html]]: marco redondeado, alto contraste monocromo blanco/negro, tipografía display condensada en mayúsculas (`Bebas Neue`) combinada con cuerpo legible (`Inter`) y color aportado exclusivamente por la fotografía arquitectónica ([[ADR-002]], [[Guia de estilos]]).
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
- Todos los requisitos funcionales y no funcionales quedan trazados desde objetivos de negocio hasta criterios de aceptación en Gherkin y cubiertos por la [[Matriz de trazabilidad]].

## Siguiente paso
1. Resolver con el usuario el **Bloque 2 (`PA-007` a `PA-014`)** y el **Bloque 3 (`PA-015` a `PA-018`)** de [[Indice de preguntas abiertas]].
2. Aprobar o ajustar las decisiones pendientes (`ADR-003`, `ADR-004`, `ADR-006`).
3. Inicializar el proyecto **Astro** en la raíz siguiendo [[Stack web]] y [[Guia de estilos]], extraer/optimizar las imágenes del WordPress actual, migrar contenidos y verificar el mapa `301`/`410` + criterios `CA-*`.
