---
id: ENT-010
tipo: entidad
titulo: Entidad Redireccion
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# Redireccion

Registro declarativo de cada URL heredada de WordPress (`393` URLs en sitemaps) para generar las reglas de enrutado del servidor estático/edge sin pérdida de autoridad SEO.

| Atributo | Tipo | Obligatorio | Descripción / Regla |
|---|---|---|---|
| `origen_wp` | string | Sí | Ruta original exacta (incl. caracteres codificados como `m%c2%b2`) |
| `destino_astro` | string | Condicional | Ruta canónica nueva (vacía si `codigo_http == 410`) |
| `codigo_http` | enum | Sí | `301` o `410` |
| `tipo_origen` | enum | Sí | `pagina | articulo | categoria | tag | autor` |
| `motivo` | string | Sí | Justificación de migración (slug saneado, consolidación, *index bloat*) |
