---
id: ENT-006
tipo: entidad
titulo: Entidad Testimonio
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# Testimonio

Reseña real verificada de cliente procedente de Google Business Profile o proyectos ejecutados en Asturias ([[PA-013]]).

| Atributo | Tipo | Obligatorio | Descripción / Regla |
|---|---|---|---|
| `id` | string | Sí | Identificador único |
| `autor_nombre` | string | Sí | Nombre público tal como aparece en la reseña |
| `municipio` | string | No | Localidad (p. ej. Gijón, Pola de Siero) |
| `servicio` | ref [[Servicio]] | No | Servicio asociado |
| `valoracion` | number (1–5) | Sí | Puntuación en estrellas |
| `cita` | string | Sí | Texto literal verificado |
| `fecha` | string | Sí | Fecha legible o ISO |
| `url_origen` | url | No | Enlace de verificación en Google Maps |
