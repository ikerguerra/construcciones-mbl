---
id: CA-REND-001
tipo: ca
titulo: Core Web Vitals en verde, HTML ligero y carga óptima de fuentes
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RNF-REND-001]]"
  - "[[RNF-REND-002]]"
  - "[[RNF-REND-003]]"
---

# CA-REND-001 — Core Web Vitals en verde, HTML ligero y carga óptima de fuentes

```gherkin
Característica: Rendimiento web y Core Web Vitals
  Escenario: Métricas Lighthouse/CWV y peso del documento en portada y artículos
    Dado el sitio compilado ejecutado en un entorno de preproducción o producción
    Cuando se ejecuta Lighthouse en perfil móvil y escritorio sobre "/", un servicio y un artículo
    Entonces LCP es menor o igual a 2,5 s, INP es menor o igual a 200 ms, CLS es menor o igual a 0,1 y el HTML inicial es inferior a 70 KB (reducción >80 % respecto a 354 KB)
    Y las fuentes Bebas Neue e Inter se sirven localmente con font-display swap y la imagen principal del Hero cuenta con fetchpriority="high"
```
