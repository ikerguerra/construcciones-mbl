---
id: CA-PROY-001
tipo: ca
titulo: Portfolio filtrable con imágenes propias sin embed de Instagram
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-PROY-001]]"
  - "[[RF-PROY-002]]"
---

# CA-PROY-001 — Portfolio filtrable con imágenes propias sin embed de Instagram

```gherkin
Característica: Galería de proyectos realizados en Asturias
  Escenario: Filtrado de proyectos por tipología sin carga de scripts sociales de terceros
    Dado que el visitante abre "/proyectos/"
    Cuando selecciona la pestaña "Cocinas" o "Baños"
    Entonces la galería muestra exclusivamente los proyectos de la categoría seleccionada con imágenes servidas localmente y atributo alt descriptivo
    Y en la petición de red de la página no se ejecutan scripts de feed embebido de Instagram
```
