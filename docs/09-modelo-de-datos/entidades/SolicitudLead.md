---
id: ENT-009
tipo: entidad
titulo: Entidad SolicitudLead
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# SolicitudLead

Carga útil enviada desde el formulario de contacto, el simulador de reformas o las landings de captación hacia [[IE-001]].

| Atributo | Tipo | Obligatorio | Descripción / Regla |
|---|---|---|---|
| `origen` | enum | Sí | `contacto | simulador | oferta-ducha | servicio` |
| `nombre` | string | Sí | Nombre del solicitante |
| `email` | email | Sí | Correo de respuesta |
| `telefono` | string | Condicional | Obligatorio en simulador; opcional en contacto rápido |
| `tipo_obra` | enum | Condicional | `integral | cocina | bano | vivienda-nueva | parcial | local` |
| `subtipo` | string | No | Subtipo dependiente de `tipo_obra` |
| `metros_m2` | number | Condicional | Superficie en m² |
| `calidad` | enum | No | `economica | media | premium` |
| `ubicacion` | enum | No | `gijon | oviedo | aviles | oriente | occidente | otra` |
| `trabajos[]` | lista | No | Partidas específicas marcadas |
| `plazo` | enum | No | `urgente | 1-3-meses | mas-3-meses | informacion` |
| `rango_estimado` | string | No | Horquilla calculada por el simulador |
| `mensaje` | string | No | Detalles libres del proyecto |
| `acepta_rgpd` | boolean | Sí | Debe ser `true` de forma explícita |
