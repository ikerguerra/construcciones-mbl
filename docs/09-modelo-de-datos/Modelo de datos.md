---
id: DOC-MOD-001
tipo: modelo
titulo: Modelo de datos lógico del sitio web Construcciones MBL
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
---

# Modelo de datos lógico

El sitio corporativo se modela alrededor de colecciones tipadas estáticas en repositorio y una entidad transaccional de entrada para solicitudes de presupuesto. Las especificaciones detalladas de cada entidad residen en `docs/09-modelo-de-datos/entidades/`.

```mermaid
erDiagram
    CategoriaBlog ||--o{ Articulo : clasifica
    Autor ||--o{ Articulo : redacta
    Servicio ||--o{ Articulo : relaciona
    Servicio ||--o{ Proyecto : categoriza
    Servicio ||--o{ PreguntaFrecuente : incluye
    Servicio ||--o| Promocion : activa
    Servicio ||--o{ SolicitudLead : origina

    Servicio {
        string id PK
        string slug
        string titulo
        string meta_titulo
        string meta_descripcion
        string rango_precio
        string plazo_estimado
        string garantia
    }

    Proyecto {
        string id PK
        string slug
        string titulo
        string municipio_asturias
        string categoria_servicio
        string fecha_obra
        string imagen_principal
    }

    Articulo {
        string id PK
        string slug
        string slug_heredado_wp
        string titulo
        string meta_titulo
        string meta_descripcion
        string resumen_aeo
        string fecha_publicacion
        string fecha_actualizacion
        boolean destacado
    }

    CategoriaBlog {
        string id PK
        string slug
        string nombre
        string descripcion_seo
    }

    Autor {
        string id PK
        string nombre
        string cargo
        string bio_eeat
        string especialidad
    }

    Testimonio {
        string id PK
        string autor_nombre
        string municipio
        string servicio_relacionado
        number valoracion
        string fecha
        string origen
    }

    PreguntaFrecuente {
        string id PK
        string pregunta
        string respuesta
        string ambito
        number orden
    }

    Promocion {
        string id PK
        string titulo
        number precio_oferta
        number precio_anterior
        string fecha_inicio
        string fecha_fin
        boolean activa
    }

    SolicitudLead {
        string id PK
        string origen
        string nombre
        string email
        string telefono
        string tipo_obra
        number metros_m2
        string ubicacion
        boolean acepta_rgpd
    }

    Redireccion {
        string origen_wp PK
        string destino_astro
        number codigo_http
        string motivo
    }
```

## Catálogo de entidades
- [[Servicio]]
- [[Proyecto]]
- [[Articulo]]
- [[CategoriaBlog]]
- [[Autor]]
- [[Testimonio]]
- [[PreguntaFrecuente]]
- [[Promocion]]
- [[SolicitudLead]]
- [[Redireccion]]
