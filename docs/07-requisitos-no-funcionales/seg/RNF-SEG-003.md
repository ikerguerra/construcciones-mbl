---
id: RNF-SEG-003
tipo: rnf
titulo: Cabeceras HTTP de seguridad y transporte cifrado HTTPS
estado: borrador
prioridad: alta
categoria: seg
creado: 2026-11-19
actualizado: 2026-11-19
necesidades:
  - "[[NEC-008]]"
---

# RNF-SEG-003 — Cabeceras HTTP de seguridad y transporte cifrado HTTPS

El sistema debe servirse íntegramente bajo HTTPS con certificado válido, sin contenido mixto, y entregar cabeceras de endurecimiento HTTP (`Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options` / `frame-ancestors` y política de seguridad de contenidos adecuada).
