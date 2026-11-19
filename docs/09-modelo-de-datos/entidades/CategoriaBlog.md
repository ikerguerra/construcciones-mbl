---
id: ENT-004
tipo: entidad
titulo: Entidad CategoriaBlog
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# CategoriaBlog

Representa las categorías editoriales activas del blog *Innovación Sostenible* (excluyendo `uncategorized` y evitando los 340 tags).

| Atributo | Tipo | Obligatorio | Descripción / Regla |
|---|---|---|---|
| `id` | string | Sí | Slug único de categoría |
| `nombre` | string | Sí | Nombre visible en español |
| `descripcion_seo` | string | Sí | Texto introductorio único para la página de archivo |
| `categoria_padre` | ref [[CategoriaBlog]] | No | Soporte jerárquico (p. ej. `ventanas` bajo `aislamiento-termico`) |
