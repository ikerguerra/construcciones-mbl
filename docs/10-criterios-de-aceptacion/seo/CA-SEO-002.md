---
id: CA-SEO-002
tipo: ca
titulo: Enlazado interno hub-and-spoke, NAP local y optimización de imágenes
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RNF-SEO-004]]"
  - "[[RNF-SEO-005]]"
  - "[[RNF-SEO-006]]"
---

# CA-SEO-002 — Enlazado interno hub-and-spoke, NAP local y optimización de imágenes

```gherkin
Característica: Arquitectura interna, consistencia NAP y SEO de imágenes
  Escenario: Comprobación de profundidad de clic, NAP e imágenes
    Dado el grafo completo de enlaces internos del sitio compilado
    Cuando se ejecuta un rastreo completo desde "/"
    Entonces ninguna página indexable está a más de 3 clics ni queda huérfana, todas las páginas interiores muestran migas de pan y la información NAP coincide exactamente en footer, contacto, legales y JSON-LD
    Y el 100 % de las imágenes de contenido tienen formato moderno comprimido, dimensiones explícitas y atributo alt no vacío
```
