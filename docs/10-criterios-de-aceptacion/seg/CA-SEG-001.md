---
id: CA-SEG-001
tipo: ca
titulo: Consentimiento RGPD/AEPD, protección antispam y cabeceras HTTP
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RNF-SEG-001]]"
  - "[[RNF-SEG-002]]"
  - "[[RNF-SEG-003]]"
---

# CA-SEG-001 — Consentimiento RGPD/AEPD, protección antispam y cabeceras HTTP

```gherkin
Característica: Privacidad, seguridad en formularios y cabeceras de transporte
  Escenario: Bloqueo previo de cookies y botones equivalentes en banner
    Dado un navegador limpio sin cookies previas al cargar "/"
    Cuando se inspecciona la red y el almacenamiento del navegador antes de interactuar con el banner
    Entonces no se depositan cookies no esenciales ni se ejecutan etiquetas publicitarias
    Y el banner presenta en primer nivel opciones equivalentes de aceptar, rechazar y configurar

  Escenario: Endurecimiento HTTP y protección frente a spam
    Dado el servidor web de producción y los endpoints de envío
    Cuando se inspeccionan las cabeceras de respuesta y se envía una petición con campo honeypot relleno
    Entonces la respuesta incluye HSTS, X-Content-Type-Options nosniff, Referrer-Policy y CSP/frame-ancestors
    Y la petición automatizada es rechazada sin enviar correo ni registrar lead
```
