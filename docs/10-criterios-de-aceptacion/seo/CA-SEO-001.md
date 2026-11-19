---
id: CA-SEO-001
tipo: ca
titulo: Metadatos SEO únicos, sitemap limpio y jerarquía H1–H3
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RNF-SEO-001]]"
  - "[[RNF-SEO-002]]"
  - "[[RNF-SEO-003]]"
---

# CA-SEO-001 — Metadatos SEO únicos, sitemap limpio y jerarquía H1–H3

```gherkin
Característica: SEO técnico y on-page en todas las URLs generadas
  Escenario: Auditoría automatizada de metadatos y encabezados sobre la compilación estática
    Dado el artefacto completo compilado en producción
    Cuando se analizan todas las páginas HTML públicas
    Entonces cada URL tiene un único H1 antes que cualquier H2/H3, un title único entre 50 y 60 caracteres, una meta description única entre 145 y 160 caracteres, canonical absoluto y etiquetas Open Graph completas
    Y el sitemap XML contiene únicamente URLs indexables con robots.txt válido
```
