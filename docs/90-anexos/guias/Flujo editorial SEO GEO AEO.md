---
id: DOC-GUI-001
tipo: guia
titulo: Flujo editorial reproducible SEO, GEO y AEO — Construcciones MBL
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Flujo editorial reproducible SEO, GEO y AEO

> Guía operativa para crear, optimizar y refrescar contenidos en **Innovación Sostenible** y landings locales de Construcciones MBL, aplicando las buenas prácticas de optimización automática modernas sin depender de SaaS externos ni generar contenido masivo genérico (*scaled content*).

---

## 1. Principios editoriales y cadencia
- **Calidad hiperlocal sobre volumen industrial**: frente a la publicación automática de ~30 artículos genéricos al mes, Construcciones MBL prioriza **2 a 4 piezas mensuales** revisadas por dirección técnica/comercial con precios reales en Asturias, normativa municipal y experiencia de obra real.
- **Cero canibalización**: antes de redactar un nuevo artículo o landing, verificar que no compite por la misma intención que una página de servicio (`/*-en-asturias/`) ni con otro artículo ya existente ([[PA-018]]).
- **Plantilla obligatoria**: todo artículo nuevo parte de [[Plantilla articulo MDX]] para cumplir automáticamente la validación de esquema en compilación (`RNF-MANT-001`) y el diseño editorial de [[Guia de estilos]].

---

## 2. Flujo de producción en 6 fases

### Fase 1 — Detección de oportunidades y clustering en Asturias
1. Revisar mensualmente consultas reales en **Google Search Console** (impresiones altas con CTR bajo o posiciones 5–20) y preguntas frecuentes reales recibidas de clientes en Gijón, Oviedo y Avilés.
2. Clasificar cada pieza dentro de un cluster ligado a un servicio principal:
   - *Reforma integral* → `/reformas-integrales-en-asturias/`
   - *Cocinas* → `/reformas-de-cocinas-en-asturias/`
   - *Baños y plato de ducha* → `/reformas-de-banos-en-asturias/` y landing exprés
   - *Construcción unifamiliar* → `/construccion-de-viviendas-en-asturias/`
   - *Reformas parciales y aislamiento* → `/reformas-parciales-en-asturias/`
   - *Locales comerciales* → `/reforma-de-locales-comerciales-en-asturias/`
3. Elegir un único objetivo de palabra clave principal y 3–5 preguntas secundarias reales.

### Fase 2 — Briefing con datos verificados (E-E-A-T)
1. Confirmar rangos de precio desde la fuente única de tarifas (`RNF-MANT-002`) sin inventar cifras.
2. Incluir al menos **dos anclajes locales verificables** del Principado de Asturias (clima húmedo, licencias de obra menor/mayor en ayuntamientos asturianos, subvenciones vigentes o tipologías edificatorias frecuentes).
3. Asignar autor real con cargo y especialidad en [[Autor]] (eliminando cualquier firma genérica o técnica tipo `3fwu9`, [[PA-010]]).

### Fase 3 — Redacción estructurada AEO / GEO
Toda pieza debe construirse siguiendo el patrón *answer-first*:
1. **Encabezado `H1` único** alineado con la búsqueda principal (`50–65` caracteres visibles claros).
2. **Caja inicial *En resumen* (40–60 palabras)**: responde de forma directa al título con cifra, plazo o regla principal para que Google e IAs puedan citar el fragmento sin ambigüedad (`RNF-GEO-002`).
3. **Tabla de contenidos navegable** mediante anclas a los `H2`.
4. **Encabezados `H2` orientados a pregunta o intención directa** (p. ej. *¿Cuánto cuesta…?*, *¿Qué licencia hace falta en…?*, *¿Cuánto tarda…?*).
5. **Al menos una tabla HTML nativa (`<table>` con `<thead>`)** comparando calidades, materiales, precios en `€` o `€/m²` y plazos en semanas.
6. **Enlazado interno obligatorio**:
   - Mínimo **1 enlace contextual** hacia la página de [[Servicio]] principal del cluster (entre los primeros 2–3 bloques).
   - Mínimo **1 enlace** al simulador `/calcula-el-precio-de-tu-reforma-en-asturias/` con CTA claro.
   - **2 enlaces relacionados** hacia otras guías complementarias del mismo cluster.
7. **Bloque FAQ final (3–5 preguntas)** sincronizado con `FAQPage` en JSON-LD (`RNF-GEO-001`).

### Fase 4 — Metadatos y checklist previo a publicación
- `meta_titulo`: único, entre **50 y 60 caracteres**, palabra clave al inicio, marca breve al final, sin emojis excesivos.
- `meta_descripcion`: única, entre **145 y 160 caracteres**, con beneficio claro en Asturias y llamada a la acción.
- `slug`: solo minúsculas ASCII sin tildes ni símbolos especiales (`guia`, `m2`, `banera`, nunca `gua` ni `%c2%b2`).
- `imagen_portada` y fotos de cuerpo: locales y optimizadas con `alt` descriptivo único y nombre de archivo descriptivo (`RNF-SEO-006`).
- Revisión humana de tono: evitar frases genéricas vacías de IA y asegurar rigor técnico en español natural.

### Fase 5 — Validación automática en build y distribución
1. La compilación ejecuta la validación tipada de esquema (`Zod` / `RNF-MANT-001`): rechaza títulos ausentes, fechas inválidas o referencias a categorías/autores/servicios inexistentes.
2. El build regenera automáticamente `sitemap-index.xml`, `sitemap-0.xml` y `/llms.txt` (`RNF-GEO-004`).
3. Solicitar indexación en Google Search Console tras verificar `200 OK` y marcado JSON-LD válido en producción.

### Fase 6 — Ciclo trimestral de refresco (*content decay*)
Cada **90 días** revisar los artículos y servicios existentes:
- Detectar URLs con caída de impresiones o clics en Search Console o cambios normativos/anuales (p. ej. ayudas o actualización de tarifas).
- Actualizar datos reales, tabla comparativa y preguntas frecuentes, actualizando `fecha_actualizacion` (`dateModified` en `BlogPosting`) y manteniendo siempre coherencia con los precios oficiales de la empresa.
