---
id: CA-NAV-002
tipo: ca
titulo: Secuencia editorial de portada y selector rápido del Hero
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-NAV-002]]"
  - "[[RF-NAV-003]]"
---

# CA-NAV-002 — Secuencia editorial de portada y selector rápido del Hero

```gherkin
Característica: Portada editorial adaptada de mbl-maqueta
  Escenario: Renderizado completo de bloques en portada
    Dado que el visitante accede a "/"
    Cuando la página termina de renderizarse
    Entonces muestra el Hero con selector rápido, bloque Nuestra Historia con 4 métricas, escaparate de servicios por pestañas, bloque oscuro diferencial, proyectos destacados/galería, testimonios y FAQs

  Escenario: Navegación desde el selector rápido del Hero
    Dado que el visitante está en el Hero de "/"
    Cuando selecciona tipo de obra, zona en Asturias y pulsa buscar/continuar
    Entonces el sistema redirige al servicio correspondiente o al simulador con los parámetros preseleccionados
```
