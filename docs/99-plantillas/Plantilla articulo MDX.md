---
# Plantilla base para artículos de Innovación Sostenible en Astro (MDX/Markdown)
# Alinear el nombre de campos definitivo con src/content.config.ts (ADR-004 / Web contenidos y validacion).
id: "art-slug-corto"
slug: "slug-ascii-sin-tildes-ni-simbolos"
slug_heredado_wp: "" # Opcional: ruta exacta anterior si requiere regla 301
titulo: "Título H1 claro con intención principal en Asturias"
meta_titulo: "Título SEO único 50-60 caracteres | Construcciones MBL"
meta_descripcion: "Descripción única de 145-160 caracteres con propuesta de valor en Asturias y llamada a la acción."
categoria: "reforma-integral"
autor: "nombre-autor-verificado" # Ref a Autor (sin 3fwu9)
servicio_relacionado: "reformas-integrales-en-asturias"
fecha_publicacion: 2026-11-19
fecha_actualizacion: 2026-11-19
resumen_aeo: "Respuesta directa de 40 a 60 palabras con cifras reales, plazos orientativos o criterio técnico clave aplicable en Asturias."
imagen_portada: "./imagenes/nombre-descriptivo-asturias.webp"
imagen_alt: "Descripción exacta de la estancia o trabajo realizado en Asturias"
destacado: false
faqs:
  - pregunta: "¿Pregunta frecuente real del cliente en Asturias?"
    respuesta: "Respuesta directa, clara y verificable en 2-3 frases."
  - pregunta: "¿Cuál es el plazo o garantía habitual?"
    respuesta: "Plazo orientativo y garantía escrita aplicable según tarifas vigentes."
---

> [!info] En resumen
> Reproducir aquí automáticamente o en componente `<ResumenDirecto />` el contenido de `resumen_aeo` (40–60 palabras).

## Tabla de contenidos
*(Generada automáticamente por el layout desde los `H2`/`H3` del artículo.)*

## ¿Qué factores determinan [tema principal] en Asturias?
Desarrollo práctico adaptado al parque de viviendas asturiano, clima y normativa vigente, enlazando de forma natural con el servicio principal en [reformas integrales en Asturias](/reformas-integrales-en-asturias/).

## Comparativa orientativa de precios, materiales y plazos
| Opción / Gama | Rango orientativo | Plazo estimado | Ideal para |
|---|---|---|---|
| Gama estándar | `X.XXX € – X.XXX €` | `X semanas` | Descripción breve |
| Gama media | `X.XXX € – X.XXX €` | `X semanas` | Descripción breve |
| Gama premium | `X.XXX € – X.XXX €` | `X semanas` | Descripción breve |

*(Mantener coherencia exacta con la fuente única de tarifas en `RNF-MANT-002`.)*

## Pasos clave y errores frecuentes que debes evitar
1. **Paso o recomendación 1**: explicación concreta y accionable.
2. **Paso o recomendación 2**: licencias municipales y consideraciones técnicas.
3. **Paso o recomendación 3**: control de calidades, plazos y garantía por escrito.

## Calcula tu presupuesto orientativo en Asturias
Cierre orientado a conversión con enlace directo al [simulador de reforma](/calcula-el-precio-de-tu-reforma-en-asturias/) y a [contacto](/contacto/), más enlaces a dos guías relacionadas del mismo cluster.

## Preguntas frecuentes
*(Renderizadas mediante componente `<BloqueFaq />` desde el campo `faqs` del frontmatter para sincronizar vista HTML y esquema JSON-LD `FAQPage`.)*
