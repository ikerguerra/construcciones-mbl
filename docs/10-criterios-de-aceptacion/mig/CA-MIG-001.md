---
id: CA-MIG-001
tipo: ca
titulo: Redirecciones 301/410 de las 393 URLs y adecuación de rutas legales y noindex
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-19
verifica:
  - "[[RF-MIG-001]]"
  - "[[RF-MIG-002]]"
  - "[[RF-MIG-003]]"
---

# CA-MIG-001 — Redirecciones 301/410 de las 393 URLs y adecuación de rutas legales y noindex

```gherkin
Característica: Continuidad de indexación y saneamiento legal post-migración
  Escenario: Respuesta HTTP correcta para el inventario heredado de WordPress
    Dado el listado completo de las 393 URLs de los sitemaps originales de WordPress
    Cuando se realizan peticiones HTTP contra el entorno desplegado (incluyendo http:// y www.)
    Entonces ninguna URL válida devuelve 404 inesperado, las URLs con slug saneado devuelven 301 en un único salto hacia su URL canónica y las rutas retiradas devuelven 410 o 301 según mapa aprobado

  Escenario: Exclusión de /mensaje-enviado/ y datos legales completos
    Dado un rastreo de "/mensaje-enviado/", "/aviso-legal/", "/politica-de-privacidad/" y "/politica-de-cookies/"
    Cuando se inspeccionan sus cabeceras y contenido
    Entonces "/mensaje-enviado/" incluye la meta robots "noindex, nofollow" y está ausente del sitemap XML
    Y "/aviso-legal/" muestra el CIF completo validado de MBL CONSTRUCCIONES S.L.
```
