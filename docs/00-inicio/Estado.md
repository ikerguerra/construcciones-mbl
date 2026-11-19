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
- **Versión del SRS**: `0.2.0` (último hito: `2026-11-19` · generación de índices: `2026-11-19`)
- **Preguntas abiertas**: 18 abiertas (6 bloqueantes, 8 altas, 4 medias, 0 bajas) · 0 resueltas/cerradas

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
- Todos los requisitos funcionales y no funcionales quedan trazados desde objetivos de negocio hasta criterios de aceptación en Gherkin y cubiertos por la [[Matriz de trazabilidad]].

## Siguiente paso
1. Revisar con el usuario/cliente las **6 preguntas abiertas bloqueantes** (`PA-001` a `PA-006`) y las **8 de prioridad alta** (`PA-007` a `PA-014`) registradas en [[Indice de preguntas abiertas]].
2. Cerrar las decisiones propuestas (`ADR-003` a `ADR-007`) una vez respondidas las `PA-*` asociadas.
3. Inicializar el proyecto **Astro** en la raíz siguiendo [[Stack web]] y [[Guia de estilos]], trasladar el contenido saneado desde WordPress y ejecutar las pruebas de aceptación (`CA-*`) junto con el mapa de redirecciones `301`/`410`.
