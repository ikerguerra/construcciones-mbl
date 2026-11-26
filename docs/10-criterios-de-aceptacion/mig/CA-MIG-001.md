---
id: CA-MIG-001
tipo: ca
titulo: Redirecciones 301/410 de las 393 URLs y adecuación de rutas legales y noindex
estado: borrador
creado: 2026-11-19
actualizado: 2026-11-26
verifica:
  - "[[RF-MIG-001]]"
  - "[[RF-MIG-002]]"
  - "[[RF-MIG-003]]"
  - "[[RF-MIG-004]]"
---

# CA-MIG-001 — Redirecciones 301/410 de las 393 URLs y adecuación de rutas legales y noindex

```gherkin
Característica: Continuidad de indexación, saneamiento legal y verificación pre-despliegue
  Escenario: Respuesta HTTP correcta para el inventario heredado de WordPress
    Dado el listado completo de las URLs heredadas de WordPress (incluyendo los 10 slugs con erratas, el artículo movido desde "/reformas-de-banos/", el enlace roto "/reformas-de-ba%C3%B1os-en-asturias" y "/wp-sitemap.xml")
    Cuando se realizan peticiones HTTP contra el entorno desplegado (incluyendo http:// y www.)
    Entonces ninguna URL válida devuelve 404 inesperado, las URLs con slug saneado o ruta antigua devuelven 301 en un único salto hacia su URL canónica y las 340 rutas "/tag/*" devuelven 410 Gone

  Escenario: Exclusión de /mensaje-enviado/, datos legales completos y reseñas sincronizadas
    Dado un rastreo de "/mensaje-enviado/", "/aviso-legal/", "/politica-de-privacidad/", "/politica-de-cookies/" y la portada "/"
    Cuando se inspeccionan sus cabeceras y contenido antes del cambio de DNS
    Entonces "/mensaje-enviado/" incluye la meta robots "noindex, nofollow" y está ausente del sitemap XML
    Y "/aviso-legal/" y "/politica-de-privacidad/" muestran el CIF completo y datos registrales de MBL CONSTRUCCIONES S.L. sin ningún texto "PA-001"
    Y el contador visible y el nodo JSON-LD AggregateRating coinciden en "32" reseñas verificadas

  Escenario: Operatividad en vivo del endpoint /api/lead en la plataforma de alojamiento
    Dado el entorno de pre-producción o producción desplegado en la plataforma elegida
    Cuando un formulario de contacto, servicio o simulador envía una solicitud POST a "/api/lead"
    Entonces el servidor procesa la petición devolviendo HTTP 200 (o 422 ante datos inválidos) y nunca HTTP 404
```
