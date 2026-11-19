---
id: DOC-INI-001
tipo: inicio
titulo: Inicio de la bóveda SRS — Construcciones MBL
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Bóveda SRS — Migración web de Construcciones MBL a Astro

Bienvenido a la documentación de requisitos (según **ISO/IEC/IEEE 29148**) y arquitectura para la nueva web corporativa de **Construcciones MBL** (`https://construccionesmbl.com/`).

## Punto de arranque recomendado
1. Lee [[Estado]] para conocer la versión actual, cifras del SRS y qué dudas bloquean la fase de implementación.
2. Revisa [[Auditoria web actual WordPress]] para entender la base real extraída de la web actual y los sitemaps.
3. Resuelve con el cliente/usuario las preguntas priorizadas en [[Indice de preguntas abiertas]] (empezando por `PA-001` a `PA-006`).
4. Consulta [[Matriz de trazabilidad]], [[Stack web]] y [[Guia de estilos]] antes de generar el código en Astro.

## Mapa rápido de secciones
- **Contexto y alcance**: [[Introduccion]], [[Glosario]], [[Alcance]], [[Supuestos y restricciones]]
- **Objetivos y usuarios**: [[OBJ-001]]..[[OBJ-006]], [[NEC-001]]..[[NEC-010]], [[CU-001]]..[[CU-008]]
- **Especificación**: `06-requisitos-funcionales/` (`RF-*`), `07-requisitos-no-funcionales/` (`RNF-*`), [[Matriz de acceso]]
- **Interfaces y datos**: `08-interfaces-externas/` (`IE-001`..`IE-006`), [[Modelo de datos]]
- **Verificación y trazabilidad**: `10-criterios-de-aceptacion/` (`CA-*`), [[Matriz de trazabilidad]]
- **Decisiones y dudas**: [[Decisiones pendientes]], [[Indice de preguntas abiertas]]
- **Arquitectura y diseño**: [[Stack]], [[Stack web]], [[Guia de estilos]]
- **Guías operativas y anexos**: [[Flujo editorial SEO GEO AEO]], [[Guia de autoridad off-page local]], [[mbl-maqueta.html]] y los 4 archivos `wp-sitemap-*.xml` en `90-anexos/sitemaps/`
