---
id: DOC-ALC-002
tipo: supuestos
titulo: Supuestos, restricciones y dependencias
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Supuestos y restricciones

## 1. Restricciones confirmadas
- **Identidad visual**: la web debe respetar la línea estética, proporciones, paleta monocroma y sistema tipográfico documentados en [[mbl-maqueta.html]] y [[Guia de estilos]].
- **Idioma único**: el contenido de lanzamiento se redactará exclusivamente en español (`es-ES`) para el ámbito geográfico del Principado de Asturias.
- **No pérdida orgánica**: la migración no puede dejar URLs válidas existentes en WordPress respondiendo `404` sin redirección `301` o código `410` justificado.
- **Privacidad y legislación española**: todo formulario de captación y toda carga de analítica/marketing deben cumplir LSSI-CE y RGPD (consentimiento previo al disparo de etiquetas no esenciales).
- **Independencia de cuentas e integraciones**: dado que el WordPress actual no pertenece al titular del nuevo desarrollo, se descartan explícitamente `GTM-TG8LZ5L8`, CookieYes y los conectores de formularios heredados; toda medición, verificación en Search Console y entrega de leads deberá configurarse con **cuentas e identificadores propios** mediante variables de entorno.

## 2. Supuestos provisionales (pendientes de confirmar)

> [!warning] Hipótesis
> Se asume provisionalmente que el dominio canónico seguirá siendo `https://construccionesmbl.com/` (sin `www.`) con barra final en todas las URLs canónicas para igualar el comportamiento actual de WordPress. Confirmar en [[PA-006]].

> [!warning] Hipótesis
> Se asume provisionalmente que el hosting elegido para Astro soportará reglas de redirección `301`/`410` en el borde (CDN/edge) y un endpoint o webhook para procesar formularios sin mantener un servidor WordPress ni PHP vivo. Confirmar en [[PA-004]] y [[PA-006]].

> [!warning] Hipótesis
> Se asume provisionalmente que Construcciones MBL aportará fotografías reales propias de sus reformas (y logotipo en SVG) para sustituir los marcadores `.ph` de [[mbl-maqueta.html]] y eliminar la dependencia directa del widget de Instagram. Confirmar en [[PA-003]].

> [!warning] Hipótesis
> Se asume provisionalmente que los rangos de precios orientativos y las condiciones de la oferta de cambio de bañera a plato de ducha serán revisados y unificados por el cliente antes de pasar a producción. Confirmar en [[PA-009]] y [[PA-014]].

## 3. Dependencias externas
- Acceso al registrador/DNS de `construccionesmbl.com` para el corte de producción y verificación de Search Console ([[IE-006]], [[PA-006]]).
- Provisión de los nuevos identificadores propios de Google Tag Manager (GTM), GA4 y verificación de propiedad en Google Search Console para configurar el sitio mediante variables de entorno (descartando `GTM-TG8LZ5L8` del WordPress anterior; [[IE-002]], [[PA-012]]).
- Acceso a la ficha de Google Business Profile `ChIJN_H9_Jyih2MRXyPsrrG4cWg` para mantener consistencia NAP y reseñas ([[IE-004]], [[PA-013]]).
