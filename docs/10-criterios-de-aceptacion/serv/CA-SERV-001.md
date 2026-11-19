---
id: CA-SERV-001
tipo: ca
titulo: Cobertura de páginas de servicio y corrección de erratas
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-SERV-001]]"
  - "[[RF-SERV-002]]"
---

# CA-SERV-001 — Cobertura de páginas de servicio y corrección de erratas

```gherkin
Característica: Páginas de servicios de Construcciones MBL
  Escenario: Disponibilidad y estructura homogénea de las 7 páginas de servicio
    Dado que un usuario visita "/servicios/" o cualquiera de las 6 páginas de especialidad en Asturias
    Cuando analiza el contenido principal de la página
    Entonces obtiene código HTTP 200 con resumen inicial, tabla de precios orientativos, plazo estimado, garantía escrita, fases del trabajo y FAQs
    Y en "/reformas-parciales-en-asturias/" no aparece el texto erróneo "Así Trabajamos en tu Cocina"
```
