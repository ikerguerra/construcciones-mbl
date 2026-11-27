---
id: DOC-STK-WEB-005
tipo: stack
titulo: Web — Formularios, simulador de reformas, analítica y consentimiento
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-27
---

# Web — Formularios e integraciones

- **Calculadora y simulador unificado** (`/calcula-el-precio-de-tu-reforma-en-asturias/`, [[PA-005]], [[PA-023]]):
  - Consolida en una sola URL canónica (con redirección `301` desde `/calculadora-presupuesto-reforma/` en `_redirects` y `vercel.json`) dos modos accesibles con pestañas ARIA (`#desglose-pem`):
    1. **Simulador rápido** (`SimuladorReforma.astro`): horquilla inmediata desde `src/data/tarifas.ts`, pre-relleno desde `HeroQuickSelector` (`?tipo=...&zona=...&m2=...&calidad=...`), salto directo al modo avanzado y **confirmación inline**.
    2. **Desglose técnico-fiscal completo** (`BudgetCalculator.astro` + `budgetEngine.ts`): cálculo de PEM ÷ 1,19, ICIO de 18 concejos asturianos, IVA (10 % o 21 % según art. 91 Ley IVA), patologías frecuentes, descarga en PDF (`LeadCaptureModal.astro`) e interconexión por query params (`src/lib/calculators/urlState.ts`) con Licencias TROTU, IRPF y Aerotermia.
- **Endpoint de recepción de leads** (`IE-001`, [[ADR-005]], [[PA-004]], [[PA-024]]):
  - Lógica Web-Standard compartida (`src/lib/server/leadHandler.ts`, ruta `/api/lead`) expuesta en **Cloudflare Pages Functions** (`functions/api/lead.ts`) y en **Vercel Functions** (`api/lead.ts`), con validación estricta en servidor, campo *honeypot* oculto, respuesta JSON `405` ante métodos distintos de `POST` y confirmación **inline** en página.
  - Envío mediante **Resend** (API HTTP nativa en capa gratuita, óptima para edge) hacia `LEADS_TO_EMAIL` (`info@construccionesmbl.com`).
  - **Auto-respuesta al cliente**: envío de correo automático de confirmación al solicitante activable/desactivable mediante la variable de entorno **`SEND_AUTO_REPLY`** (`"true"` / `"false"`).
  - Reenvío opcional vía webhook a una nueva hoja Google Sheets propia (`SHEETS_WEBHOOK_URL`).
- **Consentimiento y medición (`IE-002`, [[PA-012]])**:
  - Banner de consentimiento nativo ultraligero en español (`role="region"` en barra horizontal compacta que no solapa `.search` ni `.wa-float`, `localStorage` + Google Consent Mode v2 por defecto `denied` para `analytics_storage` y `ad_storage`) con botones equivalentes `>= 44 px` en primer nivel, `aria-expanded` en preferencias y Política de Cookies actualizada (sustituyendo definitivamente a CookieYes), auditado en contexto limpio mediante Chrome DevTools MCP (`cookie-debugging`, [[Auditoria Chrome DevTools Astro]]).
  - Carga diferida de las **cuentas propias** de GTM y/o GA4 mediante variables de entorno opcionales (`PUBLIC_GTM_ID`, `PUBLIC_GA4_ID`, inocuas mientras permanezcan vacías para configurarlas tras la puesta a punto; descartado `GTM-TG8LZ5L8`) tras aceptación o bajo Consent Mode v2, emitiendo eventos `dataLayer` limpios (`submit_contacto`, `submit_simulador`, `click_telefono`, `click_whatsapp`).
- **WhatsApp y teléfono**:
  - Enlaces semánticos `tel:+34684675898` y `https://wa.me/34684675898`, con botón flotante SVG ligero CSS puro (sin librerías externas).

## Operativa diferida de Resend por fases (sin acceso inicial al DNS de `construccionesmbl.com`)

Mientras la gestión DNS de `construccionesmbl.com` permanezca en manos del gestor anterior hasta el corte final, `RESEND_FROM_EMAIL` no puede usar `@construccionesmbl.com` (fallaría por dominio no verificado) y el remitente de pruebas `onboarding@resend.dev` devuelve `HTTP 403` ante cualquier destinatario distinto al email con el que se registró la cuenta de Resend. El despliegue en [leadHandler.ts](../../../src/lib/server/leadHandler.ts) permite resolver ambos escenarios únicamente por variables de entorno sin tocar código:

1. **Fase A — Pre-producción en Vercel (`construccionesmbl.vercel.app`) con subdominio personal temporal**:
   - En Resend (`Domains → Add Domain`), dar de alta un subdominio dedicado de un dominio personal bajo control propio (p. ej. `mbl.<dominio-personal>` o `notify.<dominio-personal>`) eligiendo la región **Ireland (`eu-west-1`)** para aislar reputación y no alterar el registro SPF raíz.
   - Publicar los registros DNS proporcionados por Resend (`DKIM TXT`, `SPF TXT` y `MX` de `Return-Path`, más `DMARC` opcional). Si el dominio personal utiliza Cloudflare DNS, mantener esos registros con nube gris (**DNS only**, sin proxy naranja) hasta ver el estado **Verified**.
   - Configurar en Vercel las variables privadas de entorno (ver `.env.example`):
     - `RESEND_API_KEY`: clave generada en Resend.
     - `RESEND_FROM_EMAIL`: `Construcciones MBL <web@mbl.<dominio-personal>>` (el dominio tras `@` debe coincidir exactamente con el subdominio verificado).
     - `LEADS_TO_EMAIL`: correo personal durante las pruebas internas y `info@construccionesmbl.com` en validación con cliente.
     - `SEND_AUTO_REPLY`: `true` (habilita y valida también el correo automático al visitante con `reply_to` apuntando a `LEADS_TO_EMAIL` y al cliente en sentido inverso).
     - *(Opcional)* `SHEETS_WEBHOOK_URL`: volcado paralelo a hoja Google Sheets propia independiente del DNS.
   - Probar en vivo un envío real desde `/contacto/` y `/calcula-el-precio-de-tu-reforma-en-asturias/` verificando recepción, `reply_to` y auto-respuesta.

2. **Fase B — Lanzamiento definitivo y corte DNS en Cloudflare Pages (`construccionesmbl.com`)**:
   - Al asumir el control DNS de `construccionesmbl.com`, añadir y verificar en Resend el subdominio definitivo `send.construccionesmbl.com` (o `construccionesmbl.com`, manteniendo intactos los registros `MX` del correo corporativo según [[ADR-007]]).
   - Actualizar `RESEND_FROM_EMAIL` a `Construcciones MBL <web@send.construccionesmbl.com>` (o `<web@construccionesmbl.com>`), confirmar `LEADS_TO_EMAIL=info@construccionesmbl.com` y `SEND_AUTO_REPLY=true` en **Cloudflare Pages** (y en Vercel si se mantiene de respaldo), y redesplegar sin cambios de código.
