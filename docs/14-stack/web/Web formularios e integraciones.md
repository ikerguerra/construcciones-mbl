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
  - Componente interactivo ligero (TypeScript vanilla o isla Preact/Svelte mínima `< 15 KB`) que adapta dinámicamente los campos según `tipo_obra`, calcula la horquilla orientativa desde `src/data/tarifas.ts` (sujeto a [[PA-005]]) y envía el resumen junto al lead.
  - Pre-relleno automático desde query params procedentes del selector rápido del Hero (`?tipo=...&zona=...&m2=...&calidad=...`).
- **Endpoint de recepción de leads** (`IE-001`, sujeto a [[PA-004]]):
  - Función serverless (`/api/lead`) con validación Zod en servidor, campo *honeypot* oculto, límite básico de frecuencia / verificación anti-bot no intrusiva, envío por correo transaccional a `info@construccionesmbl.com` y reenvío opcional a Google Sheets webhook.
- **Consentimiento y medición (`IE-002`)**:
  - Gestor nativo ligero (`localStorage` + actualización Google Consent Mode v2 por defecto `denied` para `analytics_storage` y `ad_storage`) con botones equilibrados en primer nivel.
  - Carga diferida de las **cuentas propias** de GTM y/o GA4 mediante variables de entorno (`PUBLIC_GTM_ID`, `PUBLIC_GA4_ID`, descartando el contenedor `GTM-TG8LZ5L8` del WordPress anterior; sujeto a [[PA-012]]) tras interacción o bajo Consent Mode v2, emitiendo eventos `dataLayer` limpios (`submit_contacto`, `submit_simulador`, `click_telefono`, `click_whatsapp`).
- **WhatsApp y teléfono**:
  - Enlaces semánticos `tel:+34684675898` y `https://wa.me/34684675898`, con botón flotante SVG ligero CSS puro (sin librerías externas).
