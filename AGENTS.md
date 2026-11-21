# Reglas del workspace — Construcciones MBL

Proyecto de migración web de **Construcciones MBL** (`https://construccionesmbl.com/`) desde WordPress hacia **Astro (SSG)** con estética editorial basada en `mbl-maqueta.html` y posicionamiento **SEO, GEO y AEO**. Fase inicial: únicamente web corporativa en español (`es-ES`).

Al comenzar cualquier tarea, lee [CLAUDE.md](CLAUDE.md) y [docs/00-inicio/Estado.md](docs/00-inicio/Estado.md).

## Reglas críticas de cumplimiento obligatorio
1. **Cero datos inventados**: si falta información o hay incoherencias (precios, CIF, autoría, métricas), usa o crea una nota en `docs/13-preguntas-abiertas/` (`PA-NNN`) y marca lo provisional con `> [!warning] Hipótesis`.
2. **Independencia total del WordPress anterior**: prohibido reutilizar `GTM-TG8LZ5L8`, CookieYes, avisos en inglés o conectores Google Sheets del sitio previo; usar siempre cuentas e IDs propios por variables de entorno.
3. **Orden SRS → Astro**: no inicializar ni generar páginas definitivas de producción en Astro mientras sigan abiertas preguntas `bloqueante` (`PA-001`..`PA-006`), salvo autorización expresa del usuario.
4. **Validación de la bóveda**: tras cualquier cambio en `docs/`, ejecuta `python docs/90-anexos/scripts/boveda.py indices`, `validar` y `listar`, exigiendo `Errores: 0`.
5. **Control de versiones (Git)**: trabaja en `main` previa comprobación con `git fetch` y `git status -sb` (sin `pull` automático si está detrás/divergido). Realiza commits locales al cerrar hitos o nuevas versiones de `docs/00-inicio/Historial de cambios.md`. Nunca hagas `git push` sin confirmación explícita del usuario.

## Skills del proyecto (`.agents/skills/`)
- `validar-boveda`: regenera índices, valida el SRS y guía el cierre en Git.
- `gestionar-pa`: crea preguntas abiertas o resuelve `PA-NNN` propagando la respuesta al SRS.
- `gestionar-srs`: mantiene objetivos, requisitos, criterios de aceptación y ADRs (ISO/IEC/IEEE 29148).
- `astro-arquitectura-y-rendimiento`: estándares SSG, islas mínimas, Zod, fuentes/imágenes locales y CWV.
- `sistema-visual-mbl`: tokens, layout, tipografía y WCAG 2.1 AA desde `mbl-maqueta.html`.
- `seo-geo-aeo-mbl`: metadatos únicos, grafo JSON-LD, `/llms.txt`, sitemaps y estructura AEO.
- `migracion-wordpress-301`: mapa `301`/`410` de las 393 URLs y saneamiento del contenido heredado.
- `articulo-editorial-aeo`: flujo editorial de 6 fases y plantilla MDX para *Innovación Sostenible*.
- `auditoria-chrome-devtools`: auditoría en vivo con Chrome DevTools MCP (LCP/CLS, WCAG 2.1 AA, Consent Mode v2 y payloads `/api/lead`).
