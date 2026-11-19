---
id: CA-BLOG-001
tipo: ca
titulo: Migración de los 22 artículos y limpieza de taxonomías
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-BLOG-001]]"
  - "[[RF-BLOG-002]]"
---

# CA-BLOG-001 — Migración de los 22 artículos y limpieza de taxonomías

```gherkin
Característica: Revista editorial Innovación Sostenible
  Escenario: Disponibilidad de los 22 artículos migrados y enlazado interno
    Dado que se consulta el índice "/innovacion-sostenible/" y las categorías temáticas activas
    Cuando se recorre el catálogo editorial completo
    Entonces los 22 artículos originales están accesibles con enlaces internos hacia su servicio relacionado y hacia el simulador
    Y no existen páginas públicas para la categoría "uncategorized" ni archivos de etiquetas "/tag/"
```
