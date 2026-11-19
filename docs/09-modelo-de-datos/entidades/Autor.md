---
id: ENT-005
tipo: entidad
titulo: Entidad Autor
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# Autor

Perfil real de autoría para señales E-E-A-T y marcado `Person`/`Organization` en artículos, sustituyendo al usuario técnico `3fwu9` ([[PA-010]]).

| Atributo | Tipo | Obligatorio | Descripción / Regla |
|---|---|---|---|
| `id` | string | Sí | Identificador de autor |
| `nombre` | string | Sí | Nombre y apellidos o dirección técnica real |
| `cargo` | string | Sí | Rol dentro de MBL (p. ej. Dirección de Obra / Aparejador) |
| `bio_eeat` | string | Sí | Trayectoria y especialización verificable |
| `especialidades[]` | lista | No | Áreas técnicas cubiertas |
| `avatar` | asset | No | Fotografía profesional optimizada |
