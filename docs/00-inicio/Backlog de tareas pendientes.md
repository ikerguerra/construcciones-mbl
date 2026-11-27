---
id: DOC-INI-005
tipo: inicio
titulo: Backlog de tareas pendientes — Construcciones MBL
estado: vigente
creado: 2026-11-26
actualizado: 2026-11-27
---

# Backlog de tareas pendientes

Registro vivo de ajustes visuales, técnicos, de marca, contenidos y despliegue pendientes para completar el paso a producción de **Construcciones MBL** (`https://construccionesmbl.com/`).

## Dinámica de trabajo
- Cuando el usuario pregunte si existen **tareas pendientes**, el asistente debe leer esta nota, listar las tareas con estado `pendiente`, diferenciar cuáles pueden ejecutarse de inmediato y cuáles requieren resolver antes una pregunta abierta (`PA-*`), y **ofrecer una o varias opciones concretas para elegir** cuál abordar en ese momento.
- Al completar una tarea, actualizar su estado a `completada`, registrar el cambio en [[Historial de cambios]] si corresponde, regenerar los índices y validar con `boveda.py`.

---

## Tareas funcionales, visuales, SEO y de marca (`T-001`..`T-007`)

| ID | Prioridad | Área | Título | Estado | Dependencias / PA |
|---|---|---|---|---|---|
| `T-001` | **alta** | UI / CSS | Corregir estado `:hover` del botón «Escribir por WhatsApp» | `pendiente` | Ninguna (ejecutable ya) |
| `T-002` | **alta** | UI / CSS | Corregir estilos de la tarjeta «Visítanos o Solicita Asesoramiento» en `/empresa/` | `pendiente` | Ninguna (ejecutable ya) |
| `T-003` | **alta** | Marca / E-E-A-T | Retirar toda referencia a «20 años» / «Desde 2005» / «dos décadas» y aplicar nuevo posicionamiento | `pendiente` | Requiere resolver [[PA-025]] |
| `T-004` | **alta** | SEO / UX Fotografía | Análisis completo SEO + UX de todas las ubicaciones fotográficas de la web (3 opciones por hueco) | `pendiente` | Ninguna (ejecutable ya) |
| `T-005` | **alta** | Contenidos / Medios | Curación, sustitución y ordenación de las imágenes definitivas en la web | `pendiente` | Depende de `T-004` y [[PA-022]] |
| `T-006` | **alta** | SEO Técnico / Medios | Renombrado SEO integral de todos los archivos de imagen y atributos `alt` | `pendiente` | Depende de `T-005` |
| `T-007` | **alta** | Portafolio | Documentar correctamente los proyectos realmente ejecutados | `pendiente` | Requiere resolver [[PA-026]] y [[PA-021]] |

---

## Tareas de pre-despliegue ya registradas en el SRS (`T-008`..`T-011`)

| ID | Prioridad | Área | Título | Estado | Artefactos / PA |
|---|---|---|---|---|---|
| `T-008` | **alta** | Infraestructura | Homologar plataforma de despliegue (`Cloudflare Pages` vs. `Vercel`) para `POST /api/lead` y `301`/`410` | `completada` (`v1.3.3`) | [[PA-024]], [[RF-MIG-004]], [[ADR-007]] |
| `T-009` | **alta** | Migración SEO | Incorporar las 3 reglas `301` adicionales de WordPress en `_redirects` y `vercel.json` | `completada` (`v1.3.2`–`v1.3.3`) | [[RF-MIG-001]], [[CA-MIG-001]] |
| `T-010` | **alta** | Legal / E-E-A-T | Completar CIF definitivo y Registro Mercantil de `MBL CONSTRUCCIONES S.L.` en `src/data/empresa.ts` | `pendiente` | [[PA-001]], [[RF-MIG-003]] |
| `T-011` | **media** | Entorno / Resend | Configurar variables de entorno en hosting y activación de **Resend** (Fase A/B) *(32 reseñas GBP ya sincronizadas en `src/data/empresa.ts`)* | `pendiente` | [[RF-PROY-003]], [[IE-002]] |

---

## Detalle de tareas (`T-001`..`T-007`)

### `T-001` — Corregir estado `:hover` del botón «Escribir por WhatsApp»
- **Evidencia observada**: En `src/pages/contacto.astro` (líneas 148–156), el enlace `Escribir por WhatsApp →` usa `.btn-dark` (`src/styles/global.css`, líneas 206–224). Debe revisarse su comportamiento `:hover` (contraste de texto/fondo, herencia de enlaces o coherencia visual) junto con `src/components/WhatsAppFloat.astro` y el botón de WhatsApp en `src/components/Header.astro` (línea 318).
- **Criterio de cierre**: Estado `:hover` y `:focus-visible` con contraste WCAG 2.1 AA/AAA verificado en escritorio y móvil y `0` errores en `npm run build` y `npm run check`.

### `T-002` — Corregir estilos de la tarjeta «Visítanos o Solicita Asesoramiento» en `/empresa/`
- **Evidencia observada**: En `src/pages/empresa.astro` (líneas 172–190), el contenedor utiliza variables CSS inexistentes en `src/styles/tokens.css` (`--color-surface`, `--color-border`, `--font-heading`), radio fijo `14px` y botones `.pill` / `.pill-white` diseñados para superficies oscuras sobre fondo claro.
- **Solución prevista**: Alinear con [[Guia de estilos]] sustituyendo por variables y radios reales (`--bg-tint` / `--border-sage` + `--r-lg` + `.btn-dark` / `.btn-outline`, o bloque oscuro `.promo-strip` manteniendo `.pill` / `.pill-white`).
- **Criterio de cierre**: Tarjeta visualmente coherente con el resto de `/empresa/` y resto del sitio, contraste AA/AAA en botones y `0` errores en `npm run build`.

### `T-003` — Retirar referencias a «20 años de experiencia» / «Desde 2005» y replantear posicionamiento
- **Dependencia previa**: Resolver [[PA-025]] para elegir el enfoque de compensación comercial y la nueva métrica principal.
- **Ubicaciones exactas a modificar**:
  - `src/data/empresa.ts`: línea 75 (`{ valor: '+20', etiqueta: 'Años de experiencia en Asturias' }`) y línea 115 (bio de `equipo-tecnico`).
  - `src/pages/index.astro`: línea 190 (`+20 años de oficio`) y línea 224 (`más de dos décadas de oficio`).
  - `src/pages/empresa.astro`: líneas 21 (`description`), 53 (`Desde 2005`), 59 (`más de 20 años de experiencia`), 140 (`Más de Dos Décadas`) y 142 (`Fundada en 2005`).
  - `src/pages/llms.txt.ts`: línea 44 (`Más de 20 años de experiencia`).
  - `src/content/servicios/rehabilitacion-de-casas-de-pueblo-en-asturias.md`: línea 64 (`más de dos décadas`).
  - Documentación SRS: [[Estado]] y requisitos/notas que mantengan el texto de `+20 años`. *(Nota: no eliminar referencias técnicas sobre durabilidad de materiales de `20-30 años` en artículos del blog).*
- **Criterio de cierre**: `0` menciones falsas a 20 años o fundación en 2005 y textos sustituidos por la propuesta de valor aprobada en [[PA-025]].

### `T-004` — Análisis completo SEO + UX de todas las ubicaciones fotográficas (3 opciones por hueco)
- **Alcance**: Auditar todos los emplazamientos con fotografía de la web (Hero principal y subpáginas, Historia, Método MBL, 6–8 Especialidades/Servicios, Proyectos, Galería, Reseñas, Landings locales, `/empresa/` y cabeceras del Blog).
- **Entregable**: Informe en `docs/90-anexos/auditoria/Analisis fotografico SEO UX por ubicacion.md` que proponga para **cada hueco**:
  1. **3 opciones concretas de fotografía** con descripción visual detallada.
  2. **Nombre de archivo SEO propuesto** (`palabra-clave-asturias.webp`) y texto `alt` optimizado.
  3. **Justificación UX** vinculada a la intención del usuario y conversión en esa sección.
- **Criterio de cierre**: Todas las ubicaciones cubiertas con 3 opciones y nomenclatura SEO listas para validación del titular en `T-005`.

### `T-005` — Curación, sustitución y ordenación de las imágenes definitivas en la web
- **Dependencia previa**: Completar `T-004`, confirmar selección con el usuario y resolver [[PA-022]].
- **Alcance**: Retirar imágenes descartadas, incorporar las fotografías definitivas aportadas/seleccionadas y ajustar el orden visual en galerías, carruseles, servicios y fichas.
- **Criterio de cierre**: Todas las secciones muestran únicamente fotografías aprobadas y ordenadas, con `verify-build.py` en `0` errores.

### `T-006` — Renombrado SEO integral de todos los archivos de imagen y atributos `alt`
- **Dependencia previa**: Completar `T-005`.
- **Alcance**: Renombrar todos los ficheros en `src/assets/images/` (y `public/` si procede) con nombres semánticos en español orientados a búsqueda local en Asturias (`reforma-integral-salon-gijon-asturias.webp`, etc.), actualizar todas las importaciones en `.astro`/`.ts` y campos `imagen`/`galeria` en `src/content/`, y verificar ausencia de rutas huérfanas.
- **Criterio de cierre**: `npm run build`, `npm run check` y `npm run verify` superados con `0` errores.

### `T-007` — Documentar correctamente los proyectos realmente ejecutados
- **Dependencia previa**: Resolver [[PA-026]] y [[PA-021]].
- **Alcance**: Sustituir o depurar las 8 fichas de `src/content/proyectos/*.md` para reflejar exclusivamente obras reales ejecutadas por Construcciones MBL (título, municipio real, superficie, desafío inicial, solución ejecutada, partidas reales, galería de fotos propias y bandera `detalleActivo`).
- **Criterio de cierre**: Portafolio 100 % verídico sin datos ficticios ni extrapolados, validado en build y en [[CA-PROY-001]].
