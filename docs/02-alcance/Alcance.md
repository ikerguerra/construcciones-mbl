---
id: DOC-ALC-001
tipo: alcance
titulo: Alcance del proyecto — Fase 1 (Web corporativa Astro)
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Alcance del proyecto

## 1. Dentro del alcance (Fase 1)
La fase inicial cubre exclusivamente la **web corporativa pública de Construcciones MBL** migrada a Astro bajo el dominio `construccionesmbl.com`:

1. **Portada principal (`/`)** fiel al sistema editorial de [[mbl-maqueta.html]] adaptado al sector de construcción y reformas en Asturias:
   - Hero inmersivo con navegación en píldoras y selector/buscador rápido adaptado ([[PA-007]]).
   - Historia de empresa y 4 métricas clave verificables ([[PA-014]]).
   - Escaparate interactivo de servicios con pestañas por categoría (adaptación de *Top Picks*).
   - Bloque oscuro editorial de propuesta diferencial y proceso de trabajo.
   - Bloque dual: proyectos/especialidades destacadas + galería visual de obras.
   - Sección de testimonios reales verificados ([[PA-013]]) y preguntas frecuentes (FAQs).
   - Footer oscuro editorial con marca de agua corporativa, contacto, accesos legales y barra de acceso rápido.
2. **Arquitectura de servicios (7 páginas core)**:
   - Hub `/servicios/`.
   - `/reformas-integrales-en-asturias/`
   - `/reformas-de-cocinas-en-asturias/`
   - `/reformas-de-banos-en-asturias/`
   - `/construccion-de-viviendas-en-asturias/`
   - `/reformas-parciales-en-asturias/` (corrigiendo errata de copy detectada).
   - `/reforma-de-locales-comerciales-en-asturias/`
   - Landing comercial de cambio exprés de bañera por plato de ducha (sujeta a actualización en [[PA-009]]).
   - Landings locales para Gijón, Oviedo y Avilés sujetas a confirmación en [[PA-008]].
3. **Portfolio de proyectos (`/proyectos/`)** con filtros por tipología de reforma y fotografía propia optimizada ([[PA-003]]).
4. **Blog / Revista editorial *Innovación Sostenible*** (`/innovacion-sostenible/`):
   - Migración y mejora AEO/GEO de los 22 artículos existentes ([[PA-018]]).
   - Archivo por categorías limpias y perfil de autoría E-E-A-T ([[PA-010]], [[PA-015]]).
5. **Conversión y captación de leads**:
   - Página `/calcula-el-precio-de-tu-reforma-en-asturias/` con simulador usable y envío de solicitud ([[PA-004]], [[PA-005]]).
   - Página `/contacto/` con NAP completo, formulario accesible y canales directos (teléfono y WhatsApp).
   - Página `/mensaje-enviado/` (excluida de indexación).
6. **Cumplimiento legal y privacidad**:
   - `/aviso-legal/`, `/politica-de-privacidad/` y `/politica-de-cookies/` actualizados con CIF completo ([[PA-001]]) e inventario real de cookies.
   - Banner de consentimiento de cookies conforme a RGPD/AEPD y Consent Mode v2 ([[PA-012]]).
7. **Migración SEO, GEO y AEO completa**:
   - Mapa integral de redirecciones `301` y bajas `410` para todas las URLs heredadas de WordPress ([[PA-002]], [[ADR-003]]).
   - Schema.org JSON-LD granular por plantilla, `sitemap.xml`, `robots.txt`, Open Graph y soporte `llms.txt`.

## 2. Fuera del alcance de la Fase 1
- Desarrollo de aplicación móvil nativa o híbrida.
- Intranet o panel de gestión interno de obras, presupuestos o clientes ([[PA-016]]).
- Pasarela de pagos online o comercio electrónico.
- Versión multiidioma fuera de español (`es-ES`, [[PA-016]]).
- Migración de cuentas de correo corporativo (aunque debe preservarse la accesibilidad del servicio Webmail según [[PA-006]]).
