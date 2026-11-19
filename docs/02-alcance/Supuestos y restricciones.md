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
- **Dominio canónico y plataforma aprobada**: la web se servirá en **Cloudflare Pages** bajo `https://construccionesmbl.com/` (sin `www.` y con barra final `/`), usando **Cloudflare Pages Functions** + **Resend** para leads (`SEND_AUTO_REPLY` configurable) y retirando el enlace público a `Webmail` ([[PA-004]], [[PA-006]], [[ADR-007]]).
- **Portfolio y activos locales sin embed de Instagram**: las fotografías combinan material propio aportado por el titular y una selección curada de las mejores imágenes del WordPress actual optimizadas localmente (`AVIF`/`WebP`), sin widgets externos de Instagram ([[PA-003]]).

## 2. Supuestos provisionales (pendientes de confirmar)

> [!warning] Hipótesis
> Se asume provisionalmente que el CIF completo y los datos del Registro Mercantil de `MBL CONSTRUCCIONES S.L.` serán entregados por el cliente antes de publicar en producción ([[PA-001]]).

> [!warning] Hipótesis
> Se asume provisionalmente que los rangos de precios orientativos coherentes unificados en `src/data/tarifas.ts` (y el importe promocional configurable de cambio de bañera a plato de ducha) podrán ajustarse cuando MBL confirme sus tarifas comerciales definitivas ([[PA-009]], [[PA-017]]).

## 3. Dependencias externas
- Coordinación del cambio de registros DNS de `construccionesmbl.com` con el gestor actual de WordPress para el corte hacia Cloudflare Pages preservando intactos los registros `MX` del correo corporativo ([[IE-006]], [[PA-006]]).
- Provisión de los nuevos identificadores propios de Google Tag Manager (GTM), GA4 y verificación de propiedad en Google Search Console para configurar el sitio mediante variables de entorno (descartando `GTM-TG8LZ5L8` del WordPress anterior; [[IE-002]], [[PA-012]]).
- Acceso a la ficha de Google Business Profile `ChIJN_H9_Jyih2MRXyPsrrG4cWg` para mantener consistencia NAP y reseñas ([[IE-004]], [[PA-013]]).
