---
id: ENT-001
tipo: entidad
titulo: Entidad Servicio
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# Servicio

Representa cada especialidad publicada en `/servicios/` y su landing principal (`reformas-integrales-en-asturias`, `reformas-de-cocinas-en-asturias`, `reformas-de-banos-en-asturias`, `construccion-de-viviendas-en-asturias`, `reformas-parciales-en-asturias`, `reforma-de-locales-comerciales-en-asturias`) o landing local opcional.

| Atributo | Tipo | Obligatorio | Descripción / Regla |
|---|---|---|---|
| `id` | string | Sí | Identificador estable (`reformas-integrales`, etc.) |
| `slug` | string | Sí | Ruta canónica sin barra inicial |
| `titulo` | string | Sí | Encabezado `<h1>` principal |
| `meta_titulo` | string (50–60) | Sí | Título SEO único |
| `meta_descripcion` | string (145–160) | Sí | Descripción SEO única |
| `resumen_aeo` | string | Sí | Bloque respuesta directa 40–60 palabras |
| `tabla_precios[]` | lista | Sí | Escenarios (superficie, rango €, incluye) |
| `plazo_estimado` | string | Sí | Duración orientativa |
| `garantia` | string | Sí | Garantía escrita aplicable ([[PA-017]]) |
| `fases_proceso[]` | lista | Sí | Pasos ordenados de ejecución |
| `imagen_hero` | asset + alt | Sí | Imagen propia optimizada |
