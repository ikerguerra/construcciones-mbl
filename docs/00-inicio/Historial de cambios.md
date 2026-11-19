---
id: DOC-INI-004
tipo: inicio
titulo: Historial de cambios del SRS
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Historial de cambios

| Versión | Fecha | Descripción |
|---|---|---|
| 0.1.0 | 2026-11-19 | Creación inicial completa de la bóveda SRS ISO/IEC/IEEE 29148 para la migración de Construcciones MBL a Astro: adaptación de `CLAUDE.md`, auditoría WordPress/SEO/GEO/AEO, objetivos, actores, necesidades, casos de uso, 23 RF, 20 RNF, 6 IE, modelo de datos (10 entidades), 20 CA, 7 ADR, 18 preguntas abiertas (`PA-001`..`PA-018`), stack web Astro, guía de estilos desde `mbl-maqueta.html`, plantillas y script `boveda.py`. |
| 0.1.1 | 2026-11-19 | Aclaración de independencia de cuentas: descarte expreso de `GTM-TG8LZ5L8`, CookieYes y conectores heredados del WordPress anterior; configuración parametrizada por variables de entorno con IDs propios de GTM, GA4, Search Console y formularios (`Supuestos y restricciones`, `Estado`, `RF-LEAD-005`, `IE-002`, `PA-004`, `PA-012`, `PA-015`, `Web formularios e integraciones` y `Auditoria web actual WordPress`). |
| 0.2.0 | 2026-11-19 | Incorporación de la operativa editorial SEO/GEO/AEO sin SaaS externos (`Flujo editorial SEO GEO AEO`, `Plantilla articulo MDX`) y estrategia off-page local segura (`Guia de autoridad off-page local`), actualización de `ADR-006`, `Web SEO GEO AEO`, `Web contenidos y validacion`, `Inicio`, `Estado`, `CLAUDE.md` y política de commits automáticos por hito/versión. |
| 0.3.0 | 2026-11-19 | Incorporación de las 8 skills operativas del proyecto en `.agents/skills/` (`validar-boveda`, `gestionar-pa`, `gestionar-srs`, `astro-arquitectura-y-rendimiento`, `sistema-visual-mbl`, `seo-geo-aeo-mbl`, `migracion-wordpress-301`, `articulo-editorial-aeo`), creación de `AGENTS.md` en raíz y actualización de `CLAUDE.md` y `Estado.md`. |
| 0.4.0 | 2026-11-19 | Cierre del bloque bloqueante (`PA-002`..`PA-006` resueltas y `PA-001` acotada a pre-producción como prioridad `alta`), aceptación de `ADR-005` (simulador interactivo inline + Cloudflare Pages Functions + Resend + `SEND_AUTO_REPLY`) y `ADR-007` (Cloudflare Pages, `_redirects` `301`/`410`, coordinación DNS sin afectar MX y retirada de `Webmail`), y propagación completa a requisitos, interfaces, supuestos y stack web. |
