---
id: ENT-008
tipo: entidad
titulo: Entidad Promocion
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# Promocion

Modelo para campañas con vigencia acotada como el *Cambio Exprés de Bañera por Plato de Ducha en 48 horas* ([[PA-009]]).

| Atributo | Tipo | Obligatorio | Descripción / Regla |
|---|---|---|---|
| `id` | string | Sí | Identificador único |
| `servicio` | ref [[Servicio]] | Sí | Servicio asociado |
| `titulo` | string | Sí | Título de campaña |
| `precio_oferta` | number | Sí | Importe cerrado promocional |
| `precio_anterior` | number | No | Importe de referencia |
| `fecha_inicio` | date | Sí | Fecha de inicio ISO |
| `fecha_fin` | date | Sí | Fecha límite; si expira, la compilación impide mostrarla como vigente |
| `condiciones[]` | lista | Sí | Qué incluye y exclusiones claras |
