---
id: DOC-STK-WEB-005
tipo: stack
titulo: Web — Formularios, simulador de reformas, analítica y consentimiento
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Web — Formularios e integraciones

- **Simulador interactivo** (`/calcula-el-precio-de-tu-reforma-en-asturias/`):
  - Componente interactivo ligero (TypeScript vanilla o isla Preact/Svelte mínima `< 15 KB`) orientado a SEO y captación de visita técnica/presupuesto cerrado, que adapta dinámicamente los campos según `tipo_obra`, calcula la horquilla orientativa inmediata desde la fuente unificada `src/data/tarifas.ts`, envía el resumen junto al lead y muestra **confirmación inline** ([[PA-005]]).
  - Pre-relleno automático desde query params procedentes del selector rápido del Hero (`?tipo=...&zona=...&m2=...&calidad=...`).
- **Endpoint de recepción de leads** (`IE-001`, [[ADR-005]], [[PA-004]]):
  - Función serverless en **Cloudflare Pages Functions** (`functions/api/lead.ts`, ruta `/api/lead`) con validación Zod en servidor, campo *honeypot* oculto, limitación/anti-bot no intrusiva y confirmación **inline** en página.
  - Envío mediante **Resend** (API HTTP nativa en capa gratuita, óptima para edge) hacia `LEADS_TO_EMAIL` (`info@construccionesmbl.com`).
  - **Auto-respuesta al cliente**: envío de correo automático de confirmación al solicitante activable/desactivable mediante la variable de entorno **`SEND_AUTO_REPLY`** (`"true"` / `"false"`).
  - Reenvío opcional vía webhook a una nueva hoja Google Sheets propia (`SHEETS_WEBHOOK_URL`).
- **Consentimiento y medición (`IE-002`, [[PA-012]])**:
  - Banner de consentimiento nativo ultraligero en español (`localStorage` + Google Consent Mode v2 por defecto `denied` para `analytics_storage` y `ad_storage`) con botones equilibrados en primer nivel y Política de Cookies actualizada (sustituyendo definitivamente a CookieYes).
  - Carga diferida de las **cuentas propias** de GTM y/o GA4 mediante variables de entorno opcionales (`PUBLIC_GTM_ID`, `PUBLIC_GA4_ID`, inocuas mientras permanezcan vacías para configurarlas tras la puesta a punto; descartado `GTM-TG8LZ5L8`) tras aceptación o bajo Consent Mode v2, emitiendo eventos `dataLayer` limpios (`submit_contacto`, `submit_simulador`, `click_telefono`, `click_whatsapp`).
- **WhatsApp y teléfono**:
  - Enlaces semánticos `tel:+34684675898` y `https://wa.me/34684675898`, con botón flotante SVG ligero CSS puro (sin librerías externas).
