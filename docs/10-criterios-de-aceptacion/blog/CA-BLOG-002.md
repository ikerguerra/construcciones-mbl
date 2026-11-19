---
id: CA-BLOG-002
tipo: ca
titulo: Estructura AEO y autoría verificable en artículos
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-BLOG-003]]"
  - "[[RF-BLOG-004]]"
---

# CA-BLOG-002 — Estructura AEO y autoría verificable en artículos

```gherkin
Característica: Optimización AEO y E-E-A-T en artículos del blog
  Escenario: Presencia de resumen directo, tabla de contenidos y autoría real
    Dado que un usuario o motor de respuesta accede a un artículo publicado
    Cuando inspecciona el cuerpo HTML del artículo
    Entonces encuentra un bloque inicial de respuesta directa (40-60 palabras), tabla de contenidos navegable, tablas HTML válidas y sección FAQ si aplica
    Y muestra un autor real con cargo y biografía verificable sin ninguna aparición del texto "3fwu9"
```
