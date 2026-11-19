---
id: ENT-003
tipo: entidad
titulo: Entidad Articulo
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# Articulo

Representa cada artículo editorial de *Innovación Sostenible* (partiendo de los 22 artículos migrados desde WordPress).

| Atributo | Tipo | Obligatorio | Descripción / Regla |
|---|---|---|---|
| `id` | string | Sí | Identificador estable (hereda ID WP si aplica) |
| `slug` | string | Sí | Slug ASCII limpio sin tildes perdidas ni `%c2%b2` |
| `slug_heredado_wp` | string | No | Ruta original exacta para generar regla `301` si difiere |
| `categoria` | ref [[CategoriaBlog]] | Sí | Categoría primaria |
| `autor` | ref [[Autor]] | Sí | Autor real verificado (sin `3fwu9`, [[PA-010]]) |
| `servicio_relacionado` | ref [[Servicio]] | Sí | Enlace interno hacia servicio objetivo |
| `titulo` | string | Sí | `<h1>` del artículo |
| `meta_titulo` | string (50–60) | Sí | Título SEO único |
| `meta_descripcion` | string (145–160) | Sí | Descripción SEO única |
| `resumen_aeo` | string | Sí | Caja inicial *En resumen* (40–60 palabras) |
| `fecha_publicacion` | date | Sí | Fecha ISO `YYYY-MM-DD` |
| `fecha_actualizacion` | date | Sí | Fecha ISO `YYYY-MM-DD` |
| `faqs[]` | lista | No | Preguntas frecuentes del artículo para `FAQPage` |
| `imagen_portada` | asset + alt | Sí | Imagen optimizada |
