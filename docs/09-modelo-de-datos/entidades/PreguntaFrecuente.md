---
id: ENT-007
tipo: entidad
titulo: Entidad PreguntaFrecuente
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# PreguntaFrecuente

Par pregunta-respuesta reutilizable tanto en el bloque visual de FAQs como en la generación automática del nodo `FAQPage` en JSON-LD.

| Atributo | Tipo | Obligatorio | Descripción / Regla |
|---|---|---|---|
| `id` | string | Sí | Identificador único |
| `ambito` | enum | Sí | `general | servicio | promocion | articulo` |
| `referencia_id` | string | No | Slug de servicio o artículo vinculado |
| `pregunta` | string | Sí | Enunciado natural de búsqueda |
| `respuesta` | string | Sí | Respuesta directa y precisa en español |
| `orden` | number | Sí | Posición de visualización |
