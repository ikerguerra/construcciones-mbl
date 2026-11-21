# CLAUDE.md — Documentación y desarrollo de Construcciones MBL

Este repositorio contiene el proyecto web de **Construcciones MBL** (`https://construccionesmbl.com/`), cuya meta es migrar el sitio actual en WordPress a una nueva web corporativa en **Astro** manteniendo una estética editorial de alto impacto basada en `mbl-maqueta.html` y logrando un posicionamiento **SEO, GEO y AEO** potencialmente alto.

En esta fase inicial se construye **únicamente la web corporativa** (sin aplicación móvil ni panel de gestión interno). Toda la especificación previa al desarrollo se documenta en la **bóveda SRS** ubicada en `docs/` siguiendo la norma **ISO/IEC/IEEE 29148**.

Todo el contenido de la documentación y del sitio web está en **español** y la documentación se redacta en Markdown plano compatible con Obsidian.

---

## Estado y punto de entrada
Este archivo se complementa con [AGENTS.md](AGENTS.md) (regla compacta automática del workspace) y no almacena cifras ni estado operativo del SRS para no quedar desfasado. Consulta siempre:
- **`docs/00-inicio/Inicio.md`**: punto de entrada a la bóveda.
- **`docs/00-inicio/Estado.md`**: cifras generadas automáticamente, lo ya decidido, el siguiente paso y las preguntas abiertas bloqueantes. Léelo antes de trabajar en el contenido del SRS o de iniciar el código en Astro.

---

## Mapa de la bóveda (`docs/`)
| Carpeta | Contenido |
|---|---|
| `docs/00-inicio/` | [Inicio](docs/00-inicio/Inicio.md), [Estado](docs/00-inicio/Estado.md), Convenciones e Historial de cambios |
| `docs/01-introduccion/` | Introducción (propósito, contexto de negocio, referencias) y Glosario |
| `docs/02-alcance/` | Alcance de la web (fase 1 y fuera de alcance), Supuestos y restricciones |
| `docs/03-objetivos/` | Objetivos de negocio y posicionamiento (`OBJ-001`..`OBJ-NNN`) |
| `docs/04-necesidades/` | Necesidades (`NEC-NNN`) y perfiles de usuario/motor en `actores/` (`ACT-NNN`) |
| `docs/05-casos-de-uso/` | Casos de uso (`CU-NNN`) |
| `docs/06-requisitos-funcionales/` | Requisitos funcionales por módulo (`nav/`, `serv/`, `proy/`, `blog/`, `lead/`, `mig/` → `RF-<MOD>-NNN`) y `Matriz de acceso.md` |
| `docs/07-requisitos-no-funcionales/` | Requisitos no funcionales por categoría (`seo/`, `geo/`, `rend/`, `acc/`, `seg/`, `mant/` → `RNF-<CAT>-NNN`) |
| `docs/08-interfaces-externas/` | Interfaces con servicios externos (`IE-NNN`: formularios, GTM/GA4, WhatsApp, GBP, redes, hosting/DNS) |
| `docs/09-modelo-de-datos/` | Modelo de datos (`erDiagram` Mermaid) y `entidades/` |
| `docs/10-criterios-de-aceptacion/` | Criterios de aceptación en formato Gherkin (`CA-<MOD>-NNN`) |
| `docs/11-trazabilidad/` | `Matriz de trazabilidad.md` (generada automáticamente) |
| `docs/12-decisiones/` | Registros de decisión de arquitectura (`ADR-NNN`) y `Decisiones pendientes.md` |
| `docs/13-preguntas-abiertas/` | Dudas de negocio, legales, de contenido y técnicas (`PA-NNN`) e `Indice de preguntas abiertas.md` |
| `docs/14-stack/` | `Stack.md` y carpeta `web/` (`Stack web.md` + una nota por área técnica de la web en Astro) |
| `docs/15-guia-de-estilos/` | `Guia de estilos.md` y notas `Estilo <tema>.md` adaptadas desde `mbl-maqueta.html` |
| `docs/90-anexos/` | `auditoria/` (auditoría del WordPress actual), `guias/` (flujo editorial SEO/GEO/AEO y autoridad off-page local), `maquetas/` (`mbl-maqueta.html`), `sitemaps/` (`wp-sitemap-*.xml`), `scripts/` (`boveda.py`) y `generados/` (`Listado de requisitos.md`, ignorada por Git) |
| `docs/99-plantillas/` | Plantillas Markdown por tipo de artefacto |

---

## Convenciones y reglas de trabajo
Consulta la referencia completa en `docs/00-inicio/Convenciones.md`. Reglas esenciales:

1. **No inventes datos de negocio, precios, cifras ni requisitos**: cuando falte información o exista una incoherencia en la web actual, crea o actualiza una nota en `docs/13-preguntas-abiertas/PA-NNN.md` y marca cualquier suposición provisional en el SRS con `> [!warning] Hipótesis`.
2. **IDs estables**: nunca renumeres ni reutilices IDs (`OBJ`, `ACT`, `NEC`, `CU`, `RF`, `RNF`, `IE`, `CA`, `ADR`, `PA`). Para retirar un elemento, cambia su frontmatter a `estado: descartado`.
3. **Un requisito = un comportamiento verificable**: redacta cada `RF` y `RNF` comenzando por `El sistema debe…` y **sin acoplar tecnologías de implementación** en el requisito. Las elecciones tecnológicas se documentan en `docs/12-decisiones/` (`ADR-NNN`) y `docs/14-stack/`.
4. **Relaciones en un solo sentido**: respeta la dirección de trazabilidad definida en `docs/00-inicio/Convenciones.md`. **No edites a mano** los bloques delimitados por `<!-- AUTO:… --> ... <!-- /AUTO:… -->`.
5. **Validación obligatoria tras cada cambio en la bóveda**: ejecuta desde la raíz del proyecto:
   ```powershell
   python docs/90-anexos/scripts/boveda.py indices
   python docs/90-anexos/scripts/boveda.py validar
   python docs/90-anexos/scripts/boveda.py listar
   ```
   No des un cambio documental por terminado si `validar` devuelve errores (`exit code != 0`). Revisa y explica cualquier aviso.
6. **Control de cambios**: actualiza `actualizado:` en el frontmatter de cada nota modificada y añade una fila en `docs/00-inicio/Historial de cambios.md` cuando el cambio sea relevante. Si varía lo decidido o el siguiente paso, actualiza `docs/00-inicio/Estado.md` (único sitio donde se escribe el estado).
7. **Wikilinks únicos**: todo `.md` en `docs/` (fuera de `99-plantillas/` y `90-anexos/generados/`) debe tener un nombre de archivo único en toda la bóveda para enlazar con `[[Nombre]]`. En el frontmatter YAML van siempre entre comillas: `"[[NEC-001]]"`.
8. **Archivos de referencia en raíz**: `mbl-maqueta.html` y los `wp-sitemap-*.xml` adjuntos en la raíz se conservan intactos como referencia original del usuario (con copia de trabajo en `docs/90-anexos/`).
9. **Orden antes de programar en Astro**: no inicializar ni generar páginas definitivas de Astro mientras existan preguntas abiertas con `prioridad: bloqueante` sin resolver con el usuario, salvo que el usuario autorice explícitamente trabajar sobre hipótesis marcadas.
10. **Control de versiones (Git)**: la rama de trabajo actual es `main` (con remoto `origin`). Comprueba `git fetch` y `git status -sb` antes de editar; si la rama local está por detrás del remoto (`behind`) o ha divergido, detente y avisa al usuario sin hacer `pull` automático. Se realizan **commits locales** por cada hito relevante del proyecto (especialmente cuando implique una nueva versión en `docs/00-inicio/Historial de cambios.md`), verificando antes `boveda.py` y el último número de versión. **Nunca ejecutes `git push`** sin confirmación explícita del usuario.

---

## Skills del proyecto (`.agents/skills/`)
| Skill | Ruta | Cuándo usarla |
|---|---|---|
| `validar-boveda` | `.agents/skills/validar-boveda/SKILL.md` | Tras editar `docs/` para regenerar índices, validar (`Errores: 0`) y cerrar commit de versión |
| `gestionar-pa` | `.agents/skills/gestionar-pa/SKILL.md` | Al abrir nuevas dudas o resolver `PA-NNN` propagando la decisión por el SRS |
| `gestionar-srs` | `.agents/skills/gestionar-srs/SKILL.md` | Al crear, editar o retirar requisitos (`RF`/`RNF`), `CA`, entidades o `ADR` |
| `astro-arquitectura-y-rendimiento` | `.agents/skills/astro-arquitectura-y-rendimiento/SKILL.md` | Al desarrollar en Astro: SSG, islas, Zod, activos locales, env vars y CWV |
| `sistema-visual-mbl` | `.agents/skills/sistema-visual-mbl/SKILL.md` | Al maquetar estilos, componentes de `mbl-maqueta.html` y verificar WCAG 2.1 AA |
| `seo-geo-aeo-mbl` | `.agents/skills/seo-geo-aeo-mbl/SKILL.md` | Al configurar `<SeoHead>`, grafo JSON-LD, `/llms.txt`, sitemaps y bloques AEO |
| `migracion-wordpress-301` | `.agents/skills/migracion-wordpress-301/SKILL.md` | Al trasladar contenido de WordPress, limpiar erratas y generar reglas `301`/`410` |
| `articulo-editorial-aeo` | `.agents/skills/articulo-editorial-aeo/SKILL.md` | Al crear, migrar o actualizar artículos en *Innovación Sostenible* |
| `auditoria-chrome-devtools` | `.agents/skills/auditoria-chrome-devtools/SKILL.md` | Al auditar en vivo rendimiento LCP/CLS, accesibilidad WCAG 2.1 AA, Consent Mode v2 y formularios con Chrome DevTools MCP |

---

## Búsquedas útiles
- **Auditoría completa de la web actual**: `docs/90-anexos/auditoria/Auditoria web actual WordPress.md`
- **Flujo editorial SEO/GEO/AEO**: `docs/90-anexos/guias/Flujo editorial SEO GEO AEO.md`
- **Guía de autoridad off-page local**: `docs/90-anexos/guias/Guia de autoridad off-page local.md`
- **Preguntas abiertas por resolver**: `docs/13-preguntas-abiertas/Indice de preguntas abiertas.md`
- **Estado y siguiente paso**: `docs/00-inicio/Estado.md`
- **Trazabilidad completa**: `docs/11-trazabilidad/Matriz de trazabilidad.md`
- **Listado plano de requisitos**: `docs/90-anexos/generados/Listado de requisitos.md`
- **Guía visual adaptada**: `docs/15-guia-de-estilos/Guia de estilos.md`
