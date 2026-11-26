---
id: RF-MIG-004
tipo: rf
titulo: Verificación pre-despliegue en vivo del endpoint de leads, redirecciones 301/410 y datos corporativos sincronizados
estado: borrador
prioridad: critica
modulo: mig
creado: 2026-11-26
actualizado: 2026-11-26
necesidades:
  - "[[NEC-001]]"
  - "[[NEC-004]]"
  - "[[NEC-008]]"
  - "[[NEC-009]]"
casos_uso:
  - "[[CU-002]]"
  - "[[CU-005]]"
  - "[[CU-006]]"
---

# RF-MIG-004 — Verificación pre-despliegue en vivo del endpoint de leads, redirecciones 301/410 y datos corporativos sincronizados

El sistema debe superar en el entorno de alojamiento definitivo, como condición bloqueante previa al cambio de registros DNS de `construccionesmbl.com`, una verificación técnica en vivo que acredite los cinco puntos detectados en [[Auditoria comparativa WordPress vs Astro Vercel]]: (1) que el endpoint receptor de formularios (`/api/lead`) se encuentra operativo en el servidor (`HTTP 200`/`422` en lugar de `404`) con las credenciales de envío y auto-respuesta configuradas; (2) que el motor de enrutamiento de la plataforma activa ejecuta efectivamente en un único salto todas las redirecciones `301` y bajas `410 Gone`; (3) que el mapa de redirecciones `301` incluye también el enlace roto heredado `/reformas-de-ba%C3%B1os-en-asturias` (hacia `/reformas-de-banos-en-asturias/`), la ruta heredada `/reformas-de-banos/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/` (hacia su ubicación canónica en `/vivienda-sostenible/`) y `/wp-sitemap.xml` (hacia `/sitemap-index.xml`); (4) que los textos provisionales `PA-001` han sido reemplazados por el CIF completo y los datos del Registro Mercantil de `MBL CONSTRUCCIONES S.L.`; y (5) que el contador centralizado de reseñas refleja las `32` valoraciones reales vigentes en Google Business Profile.

> [!warning] Hipótesis
> Ya se encuentran implementadas en el repositorio la ampliación del mapa declarativo `301` ([[RF-MIG-001]]) y la sincronización de las `32` reseñas verificadas ([[RF-PROY-003]]); sigue pendiente homologar en [[PA-024]] si el despliegue final se ejecuta en Cloudflare Pages o en Vercel (incorporando `vercel.json` y función serverless compatible), recibir el CIF completo y datos registrales del titular en [[PA-001]] y configurar las variables de entorno definitivas en el alojamiento.
