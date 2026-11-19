---
id: ENT-002
tipo: entidad
titulo: Entidad Proyecto
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# Proyecto

Representa una obra real ejecutada por Construcciones MBL para mostrar en la galería de portada y en `/proyectos/`.

| Atributo | Tipo | Obligatorio | Descripción / Regla |
|---|---|---|---|
| `id` | string | Sí | Identificador único de proyecto |
| `slug` | string | Sí | Identificador URL-safe |
| `titulo` | string | Sí | Nombre descriptivo de la obra |
| `categoria` | enum | Sí | `reforma-integral | cocinas | banos | vivienda-nueva | parciales | locales` |
| `municipio` | string | Sí | Concejo en Asturias (`Gijón`, `Oviedo`, `Avilés`, etc.) |
| `superficie_m2` | number | No | Superficie aproximada |
| `duracion` | string | No | Plazo de ejecución real |
| `resumen` | string | Sí | Descripción corta para tarjeta y detalle |
| `imagenes[]` | lista | Sí | Fotos propias locales con `alt` único ([[PA-003]]) |
| `destacado` | boolean | Sí | Visible en *Editor's Choice* / galería de Home |
