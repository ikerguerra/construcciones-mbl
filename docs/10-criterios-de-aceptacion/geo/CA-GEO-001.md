---
id: CA-GEO-001
tipo: ca
titulo: Validación Schema.org JSON-LD por plantilla y llms.txt
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RNF-GEO-001]]"
  - "[[RNF-GEO-004]]"
---

# CA-GEO-001 — Validación Schema.org JSON-LD por plantilla y llms.txt

```gherkin
Característica: Datos estructurados GEO y contexto para LLMs
  Escenario: Grafo JSON-LD específico por tipo de página y archivo llms.txt
    Dado el HTML generado para portada, servicios, artículos y contacto
    Cuando se valida el contenido de los bloques script application/ld+json
    Entonces cada plantilla expone su grafo específico sin errores de sintaxis (GeneralContractor, Service/Offer, FAQPage donde haya FAQs visibles, BlogPosting/Person y BreadcrumbList) con logo y puntuación coherentes
    Y la petición GET "/llms.txt" devuelve HTTP 200 con resumen estructurado en Markdown de servicios, precios y rutas canónicas
```
