---
id: CA-PROY-002
tipo: ca
titulo: Testimonios reales coherentes con Google Business Profile
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-PROY-003]]"
---

# CA-PROY-002 — Testimonios reales coherentes con Google Business Profile

```gherkin
Característica: Prueba social y reseñas verificadas
  Escenario: Coincidencia entre reseñas visibles, Schema.org y enlace a Google
    Dado que el visitante visualiza la sección de opiniones de clientes
    Cuando compara la nota media y número total de reseñas mostradas en pantalla con el JSON-LD de la página
    Entonces ambos muestran exactamente los mismos valores verificados y enlazan a la ficha Place ID "ChIJN_H9_Jyih2MRXyPsrrG4cWg"
    Y los botones de navegación entre testimonios responden por clic y por teclado
```
