---
id: CA-PROY-001
tipo: ca
titulo: Portfolio filtrable con fichas de detalle activables sin embed de Instagram
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-21
verifica:
  - "[[RF-PROY-001]]"
  - "[[RF-PROY-002]]"
---

# CA-PROY-001 — Portfolio filtrable con fichas de detalle activables sin embed de Instagram

```gherkin
Característica: Galería de proyectos realizados en Asturias y fichas individuales opcionales
  Escenario: Filtrado de proyectos por tipología sin carga de scripts sociales de terceros
    Dado que el visitante abre "/proyectos/"
    Cuando selecciona la pestaña "Cocinas" o "Baños y duchas"
    Entonces la galería muestra exclusivamente los proyectos de la categoría seleccionada con imágenes servidas localmente y atributo alt descriptivo
    Y en la petición de red de la página no se ejecutan scripts de feed embebido de Instagram

  Escenario: Acceso a ficha de detalle individual de proyecto y desactivación configurable
    Dado que la configuración de detalle de proyectos está activada
    Cuando el visitante pulsa sobre "Ver ficha y galería de obra" en un proyecto
    Entonces accede a "/proyectos/<slug>/" con reto inicial, solución ejecutada, partidas realizadas, galería fotográfica de obra y formulario de contacto
    Y cuando el interruptor global o por proyecto está desactivado no se generan rutas de detalle ni enlaces a dichas fichas
```
