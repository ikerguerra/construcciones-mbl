---
id: DOC-AUD-001
tipo: auditoria
titulo: Auditoría web actual WordPress (construccionesmbl.com)
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Auditoría web actual WordPress (`construccionesmbl.com`)

> Auditoría técnica, on-page, de contenidos, **GEO** (Generative Engine Optimization) y **AEO** (Answer Engine Optimization) realizada el `2026-11-19` sobre los sitemaps adjuntos (`docs/90-anexos/sitemaps/`) y el HTML vivo de `https://www.construccionesmbl.com/` (redirección a `https://construccionesmbl.com/`).

---

## 1. Resumen ejecutivo

- **Evaluación general**: El sitio actual en WordPress (`WordPress 7.1.5` + tema Astra + `Elementor 4.4.1` + `Site Kit by Google`) presenta una base de contenido local útil en Asturias (17 páginas y 22 artículos), pero arrastra **graves carencias de SEO técnico, SEO on-page, rendimiento y rigor legal/comercial** que frenan tanto su posicionamiento en Google como su citabilidad en buscadores generativos (ChatGPT, Perplexity, AI Overviews).
- **5 problemas prioritarios detectados**:
  1. **Ausencia total de metadatos básicos**: `0` etiquetas `<meta name="description">`, `0` etiquetas Open Graph (`og:*`) y títulos concatenados de hasta ~290 caracteres con emojis repetidos en todo el sitio.
  2. **Hinchazón de indexación (*index bloat*) y URLs defectuosas**: `340` páginas de etiqueta (`/tag/...`) para solo `22` artículos, exposición de `/author/3fwu9/`, indexación de `/mensaje-enviado/` y **10 artículos con tildes perdidas o `%c2%b2` en el slug**.
  3. **Peso HTML excesivo e integraciones pesadas**: la portada entrega **354 KB de HTML puro** por el CSS inline de Elementor, widget externo de Trustindex y feed embebido de Instagram.
  4. **Datos estructurados planos e inconsistentes**: un único bloque JSON-LD `GeneralContractor` repetido sin variación en todas las URLs (sin `Service`, `FAQPage`, `BlogPosting` ni `BreadcrumbList`), con discrepancias numéricas (`27` reseñas / `5.0` en JSON-LD frente a `29` reseñas / `4.9` visibles en portada) y logo apuntando a un favicon de 270×270.
  5. **Defectos legales y de conversión**: CIF truncado literalmente como `B33` en Aviso Legal y Privacidad, oferta de plato de ducha caducada (`1 de Octubre 2026`), copy erróneo en Reformas Parciales (*"Así Trabajamos en tu Cocina"*), aviso de formulario en inglés y una «calculadora» que no calcula precios en tiempo real.
- **Victorias rápidas (*quick wins*) en Astro**: generación estática (`SSG`) con reducción drástica del HTML/JS, metas únicos y Open Graph, esquema JSON-LD modular por plantilla, limpieza de taxonomías (`/tag/` y `/author/`) con redirecciones 301/410, simulador interactivo real en cliente y bloques AEO de respuesta directa.

---

## 2. Datos corporativos reales extraídos

| Campo | Valor observado en producción | Fuente / Observación |
|---|---|---|
| Razón social | `MBL CONSTRUCCIONES S.L.` | [[Auditoria web actual WordPress]] / Aviso Legal y Privacidad |
| Marca comercial | `Construcciones MBL` / `MBL Construcciones` | Ambas variantes conviven en título, textos y reseñas (ver [[PA-014]]) |
| CIF publicado | `B33` *(incompleto/truncado)* | Defecto legal crítico → [[PA-001]] |
| Dirección física | `Av. Argentina 132 (Cristasa of.221), 33213 Gijón, Asturias` | Aviso Legal, Contacto, Footer y JSON-LD (`43.5357, -5.6615`) |
| Teléfono / WhatsApp | `684 675 898` (`+34 684 675 898`) | Cabecera, FAQ, Footer, JSON-LD, `wa.me/34684675898` |
| Email de contacto | `info@construccionesmbl.com` | Aviso Legal, Contacto, Footer, JSON-LD |
| Horario publicado | Lunes a Viernes: `10:00–14:00` y `16:00–19:00` | Footer y `OpeningHoursSpecification` |
| Área de servicio | Gijón, Oviedo, Avilés y todo el Principado de Asturias | JSON-LD `areaServed` y formulario simulador |
| Google Place ID | `ChIJN_H9_Jyih2MRXyPsrrG4cWg` | `hasMap` en JSON-LD (actualmente apunta a `writereview`) |
| Redes sociales | Instagram `@construccionesmbl` · Facebook `profile.php?id=61578248503214` | Enlaces en sitio y `sameAs` |
| Cifras corporativas | `+ 20` años de experiencia · `+ 260` proyectos finalizados | En `/calcula-el-precio.../` aparece `100+ Proyectos Realizados` (ver [[PA-014]]) |
| Garantías declaradas | `3 años` reformas integrales · `10 años` construcción de viviendas | FAQ #4 en Home (ver [[PA-017]]) |
| Identificadores técnicos | `GTM-TG8LZ5L8` · CookieYes (`cky-*`) · `wpcf7` → Google Sheets | Pertenecen al entorno WordPress anterior y **no se reutilizarán** en la nueva web; la migración usará cuentas e IDs propios del titular. Además, `Politica de Cookies` cita `utma_` obsoleta (ver [[PA-012]]) |

---

## 3. Inventario completo de URLs WordPress (`393` URLs en sitemaps)

### 3.1 Páginas estáticas (`17` en `wp-sitemap-posts-page-1.xml`)
1. `https://construccionesmbl.com/` (Inicio)
2. `https://construccionesmbl.com/servicios/`
3. `https://construccionesmbl.com/proyectos/`
4. `https://construccionesmbl.com/innovacion-sostenible/` (listado principal de artículos/blog)
5. `https://construccionesmbl.com/calcula-el-precio-de-tu-reforma-en-asturias/`
6. `https://construccionesmbl.com/contacto/`
7. `https://construccionesmbl.com/mensaje-enviado/` *(página de gracias indexable sin `noindex`)*
8. `https://construccionesmbl.com/aviso-legal/`
9. `https://construccionesmbl.com/politica-de-privacidad/`
10. `https://construccionesmbl.com/politica-de-cookies/`
11. `https://construccionesmbl.com/reformas-integrales-en-asturias/`
12. `https://construccionesmbl.com/reformas-de-cocinas-en-asturias/`
13. `https://construccionesmbl.com/reformas-de-banos-en-asturias/`
14. `https://construccionesmbl.com/construccion-de-viviendas-en-asturias/`
15. `https://construccionesmbl.com/reformas-parciales-en-asturias/`
16. `https://construccionesmbl.com/reforma-de-locales-comerciales-en-asturias/`
17. `https://construccionesmbl.com/cambio-de-banera-por-plato-de-ducha-en-asturias-oferta-expres-48-horas/`

### 3.2 Artículos de blog (`22` en `wp-sitemap-posts-post-1.xml`)
Todos siguen el patrón `/{categoria}/{slug}/` (publicados entre noviembre de 2025 y junio de 2026):
- **Slugs sanos (12)**:
  - `/reformas-de-banos/5-materiales-sostenibles-que-estan-revolucionando-la-reforma-de-banos/`
  - `/reformas-de-cocinas/cuanto-cuesta-reformar-una-cocina-en-asturias-2026-guia-actualizada/`
  - `/reforma-integral/casos-de-exito-asi-ahorran-nuestros-clientes-con-sus-hogares-sostenibles/`
  - `/reforma-integral/10-errores-a-evitar-en-una-reforma-integral-de-vivienda/`
  - `/reforma-integral/como-reformar-una-casa-antigua-en-asturias-paso-a-paso/`
  - `/reforma-integral/reformas-integrales-en-gijon-guia-definitiva-antes-de-empezar/`
  - `/ayudas-y-subvenciones/ayudas-y-subvenciones-para-reformas-en-asturias-2026-guia-definitiva/`
  - `/construccion-casa/vivienda-sostenible-en-asturias-2026-como-construir-y-reformar-con-futuro/`
  - `/reformas-locales-comerciales/reformas-de-locales-comerciales-en-asturias-2026-de-la-idea-a-la-apertura/`
  - `/mantenimiento/guia-de-mantenimiento-para-tu-nuevo-plato-de-ducha-cuidalo-y-durara-toda-la-vida/`
  - `/consejos-practicos/como-convivir-con-las-obras-en-casa-guia-de-supervivencia-para-reformas-en-asturias/`
  - `/reforma-integral/como-afecta-una-reforma-al-seguro-del-hogar-en-asturias-lo-que-debes-saber-guia-2026/`
- **Slugs defectuosos por pérdida de tildes o codificación (10)** → ver [[PA-002]]:
  - `/construccion-casa/cuanto-cuesta-construir-una-casa-en-asturias-precios-reales-por-m%c2%b2/` (`m²` URL-encoded)
  - `/aislamiento-termico/aislamiento-termico-en-asturias-2026-gua-definitiva-para-ahorrar-energia/` (`gua`)
  - `/reforma-integral/reforma-integral-en-asturias-cundo-merece-la-pena-hacerla-gua-2026/` (`cundo`, `gua`)
  - `/aislamiento-termico/rehabilitacin-de-fachadas-y-tejados-en-asturias-2026-soluciones-definitivas/` (`rehabilitacin`)
  - `/reformas-de-banos/cambio-de-baera-por-plato-de-ducha-en-asturias-2026-gua-completa/` (`baera`, `gua`)
  - `/aislamiento-termico/cmo-elegir-ventanas-para-tu-casa-en-asturias-materiales-acristalamiento-e-instalacin-gua-2026/` (`cmo`, `instalacin`, `gua`)
  - `/construccion-casa/casas-prefabricadas-y-minicasas-en-asturias-es-legal-dnde-se-pueden-instalar-gua-2026/` (`dnde`, `gua`)
  - `/reforma-integral/cmo-elegir-suelo-para-tu-reforma-en-asturias-tipos-durabilidad-y-precio-por-m-gua-2026/` (`cmo`, `m-gua`)
  - `/vivienda-sostenible/tarima-flotante-o-suelo-vinlico-guia-definitiva-para-elegir-el-mejor-suelo-para-tu-casa-en-asturias/` (`vinlico`)
  - `/vivienda-sostenible/suelo-vinlico-en-asturias-ventajas-tipos-y-por-qu-debes-confiar-en-un-profesional/` (`vinlico`, `por-qu`)

### 3.3 Taxonomías y archivos auxiliares (`354` URLs adicionales)
- **Categorías (`13` activas en sitemap + `uncategorized` vacía)**: `reformas-de-banos`, `reformas-de-cocinas`, `reforma-integral`, `construccion-casa`, `ayudas-y-subvenciones`, `vivienda-sostenible`, `aislamiento-termico`, `plato-de-ducha`, `reformas-locales-comerciales`, `aislamiento-termico/ventanas` (subcategoría), `mantenimiento`, `consejos-practicos`, `tarimas-y-suelos`.
- **Etiquetas (`340` en `wp-sitemap-taxonomies-post_tag-1.xml`)**: media de ~15,4 tags por post, la gran mayoría con un único artículo asignado.
- **Autor (`1` en `wp-sitemap-users-1.xml`)**: `/author/3fwu9/`.

---

## 4. Hallazgos de SEO técnico

| ID | Problema | Impacto | Evidencia | Solución recomendada | Prioridad |
|---|---|---|---|---|---|
| T-01 | *Index bloat* masivo por 340 páginas `/tag/` sin valor propio | Alto | `wp-sitemap-taxonomies-post_tag-1.xml` (340 URLs para 22 posts) | No migrar `/tag/`; responder `410 Gone` o `301` consolidado según [[PA-002]] y excluir de sitemap | Crítica |
| T-02 | Exposición de archivo de autor técnico `/author/3fwu9/` | Medio | `wp-sitemap-users-1.xml` y firma `"Por 3fwu9"` en posts | Eliminar `/author/3fwu9/` (`301`/`410`) y sustituir por autoría real en [[PA-010]] | Alta |
| T-03 | Página transaccional `/mensaje-enviado/` incluida en sitemap y sin `noindex` | Medio | `wp-sitemap-posts-page-1.xml` y `<meta name="robots" content="max-image-preview:large">` | Aplicar `noindex, nofollow` y excluirla del `sitemap.xml` | Alta |
| T-04 | 10 slugs de blog corruptos (tildes perdidas / `%c2%b2`) | Medio | `wp-sitemap-posts-post-1.xml` | Decidir en [[PA-002]] si se sanean a ASCII limpio con `301` 1:1 desde la URL exacta anterior | Alta |
| T-05 | Peso excesivo del documento HTML en portada (`354 KB`) + Elementor | Alto | Descarga directa de `https://construccionesmbl.com/` (`css_print_method-internal`) | Generación estática en Astro con HTML limpio, CSS crítico/bundle reducido y cero bloat | Crítica |
| T-06 | Carga de embeds de terceros (Trustindex + feed Instagram) | Alto | Scripts y tarjetas en Home y `/proyectos/` | Sustituir por activos locales optimizados y enlace/CTA verificable ([[PA-003]], [[PA-013]]) | Alta |
| T-07 | `robots.txt` y `sitemap.xml` aún orientados a WordPress | Medio | `Disallow: /wp-admin/` y `wp-sitemap.xml` | Nuevo `robots.txt` limpio y `@astrojs/sitemap` con solo URLs canónicas indexables | Alta |
| T-08 | Canibalización potencial en subcategorías de un solo post y sin arquitectura local | Alto | `13` categorías para `22` posts; no existen landings locales `/oviedo/`, `/gijon/`, `/aviles/` | Reordenar taxonomía del blog y definir estrategia local en [[PA-008]] | Alta |

---

## 5. Hallazgos de SEO On-Page

| ID | Problema | Impacto | Evidencia | Solución recomendada | Prioridad |
|---|---|---|---|---|---|
| O-01 | Ausencia total de `<meta name="description">` en todo el sitio | Crítico | `META DESC: []` en Home, servicios, proyectos, calculadora, blog y legales | Redactar meta descripciones únicas (145–160 caracteres) con propuesta de valor y CTA | Crítica |
| O-02 | `<title>` de portada de ~290 caracteres con emojis y usado como sufijo global | Alto | `<title>` empieza con `🏠 Construcciones MBL \| ...` y añade todo el eslogan en cada página | Títulos únicos de 50–60 caracteres por plantilla, marca breve al final, sin exceso de emojis | Crítica |
| O-03 | Ausencia total de etiquetas Open Graph y Twitter Cards | Medio | `OG TAGS: 0` verificado en artículos y páginas | Añadir `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `twitter:card` por página | Alta |
| O-04 | Jerarquía de encabezados invertida (`H3` antes que `H1` y cifras en `H2`) | Medio | En Home: `H3` *"Reformas Integrales..."* precede al `H1`; `+ 20` y `+ 260` marcados como `<h2>` | Estricto un único `<h1>` por página en la parte superior, seguido de `<h2> → <h3>` semánticos | Alta |
| O-05 | Duplicidad y canibalización interna entre páginas y artículos sobre plato de ducha / suelos | Medio | Existen 2 posts muy cercanos sobre suelo vinílico y oferta + artículo sobre plato de ducha | Definir enlazado interno hub-and-spoke claro y revisar consolidación en [[PA-018]] | Media |

---

## 6. Hallazgos de contenido, E-E-A-T, GEO y AEO

| Área | Hallazgo observado | Impacto en SEO / GEO / AEO | Acción propuesta |
|---|---|---|---|
| **E-E-A-T (Autoría)** | Los artículos firman como `"Por 3fwu9"` sin biografía ni titulación técnica | Penaliza confianza ante Google y reduce citación en IAs para consultas YMYL/inversiones | Crear entidad [[Autor]] con perfiles reales (p. ej. dirección técnica / Borja, ver [[PA-010]]) |
| **GEO (Entidades y Schema)** | JSON-LD `GeneralContractor` idéntico en toda la web, logo apunta a favicon 270×270, `hasMap` apunta a `writereview` y rating `5.0 / 27` no coincide con `4.9 / 29` visible | Impide desambiguar servicios, FAQs y artículos en el grafo de conocimiento y motores IA | Schema granular: `GeneralContractor` + `Service` + `FAQPage` + `BlogPosting` + `BreadcrumbList` + `Organization` coherente |
| **AEO (Respuesta directa)** | Los 22 artículos son largos pero no tienen bloque resumen inicial (*TL;DR* / respuesta directa de 40–60 palabras), tablas comparativas consistentes ni marcado `FAQPage` | Menor probabilidad de aparecer en fragmentos destacados y respuestas citadas por LLMs | Incorporar caja de respuesta directa (*En resumen*), tablas HTML de precios/plazos y FAQs estructuradas por servicio y post |
| **Contexto rastreable IA** | No existe archivo `llms.txt` ni resúmenes semánticos limpios de áreas de servicio y tarifas | Los agentes IA rastrean ruido de Elementor (354 KB) en lugar de datos estructurados | Publicar `/llms.txt` opcional y mantener HTML semántico limpio con `<main>`, `<article>`, `<dl>` y `<table>` |

---

## 7. Defectos funcionales, de coherencia y legales detectados

1. **CIF incompleto (`B33`)** en `/aviso-legal/` y `/politica-de-privacidad/` → incumplimiento LSSI-CE ([[PA-001]]).
2. **Política de Cookies desactualizada**: declara `utma_` de Google Analytics clásico mientras el sitio actual usa CookieYes (`cky-*`) y `GTM-TG8LZ5L8` (contenedor ajeno del entorno WordPress anterior que se descarta por completo, ver [[PA-012]]).
3. **Aviso de privacidad en inglés bajo formularios**: `"Your information will be securely sent to and stored in Google Sheets for the purpose of processing your form submission."` rompe idioma y coherencia RGPD ([[PA-004]]).
4. **Simulador que no simula**: `/calcula-el-precio-de-tu-reforma-en-asturias/` es un Contact Form 7 que solo promete enviar estimación por correo, y etiqueta el campo de superficie como `"Metros Cuadrados (Detalla de forma aproximada los metros cuadrados de tu cocina)"` incluso si el usuario elige reforma integral o construcción ([[PA-005]]).
5. **Copy erróneo en `/reformas-parciales-en-asturias/`**: el encabezado H2 dice `"📝 Así Trabajamos en tu Cocina"` (error de copiar y pegar desde la página de cocinas).
6. **Oferta caducada activa**: `/cambio-de-banera-por-plato-de-ducha-en-asturias-oferta-expres-48-horas/` muestra *"Oferta válida hasta 1 de Octubre 2026"* con precio `2300 €` (antes `2600 €`), caducada respecto a la fecha actual `2026-11-19` ([[PA-009]]).
7. **Inconsistencia de precios y estadísticas**:
   - Reforma integral 80 m² aparece entre `50.000€–65.000€` (60–80 m² en página de servicio) y `65.000€–75.000€` (80 m² en tabla de calculadora).
   - Construcción vivienda 120 m² figura como `250.000€–300.000€` en `/construccion-de-viviendas-en-asturias/` y como `200.000€–250.000€` en la calculadora.
   - Baño completo (6 m²) figura como `3.500€–5.500€` (4–6 m²) / `5.500€–8.500€` (6–8 m²) en servicio y `5.000€–9.000€` en calculadora.
   - Se mezcla `+ 260 proyectos finalizados` en Home/Servicios con `100+ Proyectos Realizados` en la calculadora ([[PA-014]]).

---

## 8. Estrategia base de migración URL (301 / 410)

| Patrón WordPress actual | Destino propuesto en Astro | Código HTTP | Dependencia |
|---|---|---|---|
| Las 16 páginas públicas principales (incl. `/`, servicios, `/proyectos/`, `/innovacion-sostenible/`, calculadora, contacto, legales) | Misma URL exacta con barra final configurable y canónico único | `200` (o `301` si cambia normalización) | [[ADR-003]] |
| `/mensaje-enviado/` | Confirmación inline o ruta `/mensaje-enviado/` con `noindex, nofollow` | `200` (`noindex`) | [[PA-004]] |
| Los 12 artículos con slug limpio | Misma URL `/{categoria}/{slug}/` (o estructura decidida en [[PA-015]]) | `200` / `301` | [[PA-015]] |
| Los 10 artículos con slug roto (`gua`, `m%c2%b2`, etc.) | Slug ASCII normalizado + redirección `301` exacta desde la URL antigua | `301` | [[PA-002]] |
| `/category/{cat}/` (12 categorías activas) | Archivo por categoría en Astro (`/innovacion-sostenible/categoria/{cat}/` o `/category/{cat}/`) | `200` / `301` | [[ADR-003]] |
| `/category/uncategorized/` y `/author/3fwu9/` | Redirección `301` a `/innovacion-sostenible/` | `301` | [[PA-010]] |
| 340 páginas `/tag/{slug}/` | `410 Gone` (preferido para limpiar índice) o `301` a categoría/blog | `410` / `301` | [[PA-002]] |
