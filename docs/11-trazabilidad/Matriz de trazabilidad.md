---
id: DOC-MAT-TRZ-001
tipo: matriz
titulo: Matriz de trazabilidad del SRS
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Matriz de trazabilidad

Esta matriz se genera y actualiza automáticamente ejecutando `python docs/90-anexos/scripts/boveda.py indices`. **No edites manualmente** el contenido comprendido entre los marcadores `AUTO`.

<!-- AUTO:matriz -->
### Cobertura desde objetivos

| Objetivo | Necesidades vinculadas | Requisitos derivados |
|---|---|---|
| [[OBJ-001]] — Migración completa desde WordPress sin pérdida de tráfico orgánico | [[NEC-001]], [[NEC-009]] | [[RF-BLOG-001]], [[RF-BLOG-002]], [[RF-BLOG-004]], [[RF-LEAD-004]], [[RF-MIG-001]], [[RF-MIG-002]], [[RF-MIG-003]], [[RF-SERV-002]], [[RF-SERV-003]], [[RNF-MANT-001]], [[RNF-MANT-002]], [[RNF-SEO-001]], [[RNF-SEO-002]], [[RNF-SEO-004]] |
| [[OBJ-002]] — Posicionamiento SEO técnico y SEO local líder en Asturias | [[NEC-002]], [[NEC-005]] | [[RF-BLOG-002]], [[RF-LEAD-001]], [[RF-MIG-002]], [[RF-NAV-001]], [[RF-NAV-002]], [[RF-NAV-004]], [[RF-SERV-001]], [[RF-SERV-002]], [[RF-SERV-003]], [[RF-SERV-004]], [[RNF-GEO-001]], [[RNF-MANT-002]], [[RNF-REND-001]], [[RNF-SEO-001]], [[RNF-SEO-002]], [[RNF-SEO-003]], [[RNF-SEO-004]], [[RNF-SEO-005]], [[RNF-SEO-006]] |
| [[OBJ-003]] — Alto posicionamiento en motores generativos y de respuestas (GEO y AEO) | [[NEC-006]], [[NEC-009]] | [[RF-BLOG-001]], [[RF-BLOG-002]], [[RF-BLOG-003]], [[RF-BLOG-004]], [[RF-LEAD-004]], [[RF-PROY-003]], [[RF-SERV-002]], [[RF-SERV-003]], [[RF-SERV-004]], [[RNF-GEO-001]], [[RNF-GEO-002]], [[RNF-GEO-003]], [[RNF-GEO-004]], [[RNF-MANT-001]], [[RNF-MANT-002]], [[RNF-SEO-003]] |
| [[OBJ-004]] — Identidad visual editorial de alto impacto basada en mbl-maqueta | [[NEC-003]], [[NEC-007]] | [[RF-NAV-001]], [[RF-NAV-002]], [[RF-NAV-003]], [[RF-NAV-004]], [[RF-PROY-001]], [[RF-PROY-002]], [[RF-PROY-003]], [[RNF-ACC-001]], [[RNF-GEO-003]], [[RNF-REND-003]], [[RNF-SEO-006]] |
| [[OBJ-005]] — Maximizar la captación y cualificación de leads de reforma y obra nueva | [[NEC-002]], [[NEC-003]], [[NEC-004]], [[NEC-010]] | [[RF-BLOG-002]], [[RF-LEAD-001]], [[RF-LEAD-002]], [[RF-LEAD-003]], [[RF-LEAD-004]], [[RF-LEAD-005]], [[RF-NAV-001]], [[RF-NAV-002]], [[RF-NAV-003]], [[RF-PROY-001]], [[RF-PROY-002]], [[RF-PROY-003]], [[RF-SERV-001]], [[RF-SERV-002]], [[RF-SERV-003]], [[RNF-GEO-003]], [[RNF-SEG-001]], [[RNF-SEG-002]], [[RNF-SEO-006]] |
| [[OBJ-006]] — Excelencia en rendimiento (Core Web Vitals), accesibilidad y cumplimiento legal | [[NEC-008]], [[NEC-010]] | [[RF-LEAD-002]], [[RF-LEAD-005]], [[RF-MIG-003]], [[RF-NAV-004]], [[RF-PROY-002]], [[RNF-ACC-001]], [[RNF-ACC-002]], [[RNF-REND-001]], [[RNF-REND-002]], [[RNF-REND-003]], [[RNF-SEG-001]], [[RNF-SEG-002]], [[RNF-SEG-003]] |

### Cobertura de requisitos

Cobertura verificable por criterios de aceptación (`CA-*`): **43/43 (100.0%)**.

| Requisito | Título | Prioridad | Necesidades | Criterios de aceptación | ADRs | PAs abiertas |
|---|---|---|---|---|---|---|
| [[RF-BLOG-001]] | Portada editorial de Innovación Sostenible y archivo por categorías limpias | alta | [[NEC-001]], [[NEC-006]], [[NEC-009]] | [[CA-BLOG-001]] | [[ADR-003]] | — |
| [[RF-BLOG-002]] | Migración de los 22 artículos existentes con enlazado interno a servicios | critica | [[NEC-001]], [[NEC-002]], [[NEC-009]] | [[CA-BLOG-001]] | [[ADR-004]] | — |
| [[RF-BLOG-003]] | Estructura AEO de artículo (respuesta directa, tabla de contenidos, tablas y FAQ) | alta | [[NEC-006]] | [[CA-BLOG-002]] | — | — |
| [[RF-BLOG-004]] | Autoría real E-E-A-T en reemplazo del identificador técnico 3fwu9 | alta | [[NEC-006]], [[NEC-001]] | [[CA-BLOG-002]] | — | — |
| [[RF-LEAD-001]] | Simulador interactivo de estimación de reforma en Asturias | critica | [[NEC-004]], [[NEC-002]] | [[CA-LEAD-001]] | [[ADR-005]] | — |
| [[RF-LEAD-002]] | Formulario de contacto corporativo y consentimiento RGPD en español | critica | [[NEC-004]], [[NEC-008]] | [[CA-LEAD-002]] | [[ADR-005]] | — |
| [[RF-LEAD-003]] | Canales de contacto directo por teléfono y WhatsApp | alta | [[NEC-004]] | [[CA-LEAD-003]] | — | — |
| [[RF-LEAD-004]] | Entrega, registro y confirmación de leads recibidos | critica | [[NEC-004]], [[NEC-009]] | [[CA-LEAD-002]] | [[ADR-005]] | — |
| [[RF-LEAD-005]] | Registro de eventos de conversión subordinado al consentimiento | alta | [[NEC-010]], [[NEC-008]] | [[CA-LEAD-003]] | — | — |
| [[RF-MIG-001]] | Tabla maestra de redirecciones 301 y bajas 410 para las 393 URLs de WordPress | critica | [[NEC-001]] | [[CA-MIG-001]] | [[ADR-003]], [[ADR-007]] | — |
| [[RF-MIG-002]] | Normalización de dominio canónico, protocolo HTTPS y barra final | alta | [[NEC-001]], [[NEC-005]] | [[CA-MIG-001]] | [[ADR-007]] | — |
| [[RF-MIG-003]] | Exclusión de indexación de rutas transaccionales y páginas legales actualizadas | alta | [[NEC-001]], [[NEC-008]] | [[CA-MIG-001]] | — | [[PA-001]] |
| [[RF-NAV-001]] | Cabecera de navegación en píldoras y menú responsive accesible | alta | [[NEC-002]], [[NEC-007]] | [[CA-NAV-001]] | — | — |
| [[RF-NAV-002]] | Portada editorial adaptada a Construcciones MBL | critica | [[NEC-002]], [[NEC-003]], [[NEC-007]] | [[CA-NAV-002]] | [[ADR-002]] | — |
| [[RF-NAV-003]] | Selector rápido interactivo en el Hero | alta | [[NEC-004]], [[NEC-007]] | [[CA-NAV-002]] | — | — |
| [[RF-NAV-004]] | Pie de página corporativo con NAP, accesos legales y buscador/acceso rápido | alta | [[NEC-005]], [[NEC-007]], [[NEC-008]] | [[CA-NAV-001]] | — | — |
| [[RF-PROY-001]] | Galería de proyectos realizados con filtrado por categoría | alta | [[NEC-003]], [[NEC-007]] | [[CA-PROY-001]] | — | — |
| [[RF-PROY-002]] | Sustitución del feed embebido de Instagram por activos locales optimizados | alta | [[NEC-003]], [[NEC-008]] | [[CA-PROY-001]] | — | — |
| [[RF-PROY-003]] | Sección de testimonios y reseñas de Google Business Profile verificables | alta | [[NEC-003]], [[NEC-006]] | [[CA-PROY-002]] | — | — |
| [[RF-SERV-001]] | Hub de servicios y 6 páginas principales por especialidad | critica | [[NEC-002]], [[NEC-005]] | [[CA-SERV-001]] | — | — |
| [[RF-SERV-002]] | Ficha estructurada de servicio con precios orientativos, plazos, proceso y garantías | alta | [[NEC-002]], [[NEC-006]], [[NEC-009]] | [[CA-SERV-001]] | — | — |
| [[RF-SERV-003]] | Gestión de vigencia de ofertas y landing exprés de plato de ducha | alta | [[NEC-002]], [[NEC-009]] | [[CA-SERV-002]] | — | — |
| [[RF-SERV-004]] | Arquitectura preparada para landings locales por municipio en Asturias | media | [[NEC-005]], [[NEC-006]] | [[CA-SERV-002]] | — | — |
| [[RNF-ACC-001]] | Cumplimiento WCAG 2.1 nivel AA y contraste sobre fotografías | alta | [[NEC-008]], [[NEC-007]] | [[CA-ACC-001]] | [[ADR-002]] | — |
| [[RNF-ACC-002]] | Navegación por teclado, foco visible y semántica ARIA en controles interactivos | alta | [[NEC-008]] | [[CA-ACC-001]] | — | — |
| [[RNF-GEO-001]] | Grafo Schema.org JSON-LD granular y válido por plantilla | critica | [[NEC-006]], [[NEC-005]] | [[CA-GEO-001]] | [[ADR-006]] | — |
| [[RNF-GEO-002]] | Contenido estructurado AEO de respuesta directa y tablas comparativas | alta | [[NEC-006]] | [[CA-GEO-002]] | [[ADR-006]] | — |
| [[RNF-GEO-003]] | Señales verificables de autoridad E-E-A-T y frescura editorial | alta | [[NEC-006]], [[NEC-003]] | [[CA-GEO-002]] | — | — |
| [[RNF-GEO-004]] | Fichero de contexto semántico llms.txt para agentes generativos | media | [[NEC-006]] | [[CA-GEO-001]] | [[ADR-006]] | — |
| [[RNF-MANT-001]] | Validación tipada de contenidos, precios y enlaces internos en compilación | alta | [[NEC-009]], [[NEC-001]] | [[CA-MANT-001]] | [[ADR-004]] | — |
| [[RNF-MANT-002]] | Fuente única de datos corporativos (NAP, estadísticas y tarifas) | alta | [[NEC-009]], [[NEC-005]] | [[CA-MANT-001]] | [[ADR-004]] | [[PA-001]] |
| [[RNF-REND-001]] | Cumplimiento estricto de Core Web Vitals en móvil y escritorio | critica | [[NEC-008]], [[NEC-005]] | [[CA-REND-001]] | [[ADR-001]] | — |
| [[RNF-REND-002]] | HTML estático ligero y cero JavaScript en páginas informativas | alta | [[NEC-008]] | [[CA-REND-001]] | [[ADR-001]] | — |
| [[RNF-REND-003]] | Estrategia de carga óptima de tipografías e imágenes críticas | alta | [[NEC-008]], [[NEC-007]] | [[CA-REND-001]] | [[ADR-002]] | — |
| [[RNF-SEG-001]] | Cumplimiento RGPD/AEPD en consentimiento de cookies y formularios | critica | [[NEC-008]], [[NEC-010]] | [[CA-SEG-001]] | — | — |
| [[RNF-SEG-002]] | Protección antispam y validación segura en el envío de leads | alta | [[NEC-008]], [[NEC-004]] | [[CA-SEG-001]] | [[ADR-005]] | — |
| [[RNF-SEG-003]] | Cabeceras HTTP de seguridad y transporte cifrado HTTPS | alta | [[NEC-008]] | [[CA-SEG-001]] | [[ADR-007]] | — |
| [[RNF-SEO-001]] | Metadatos title, meta description, canonical y Open Graph únicos por URL | critica | [[NEC-005]], [[NEC-001]] | [[CA-SEO-001]] | [[ADR-001]], [[ADR-006]] | — |
| [[RNF-SEO-002]] | Generación automática de sitemap XML limpio y archivo robots.txt | critica | [[NEC-001]], [[NEC-005]] | [[CA-SEO-001]] | [[ADR-003]] | — |
| [[RNF-SEO-003]] | Jerarquía única de encabezados H1–H3 y HTML semántico limpio | alta | [[NEC-005]], [[NEC-006]] | [[CA-SEO-001]] | — | — |
| [[RNF-SEO-004]] | Enlazado interno hub-and-spoke, migas de pan y cero páginas huérfanas | alta | [[NEC-005]], [[NEC-001]] | [[CA-SEO-002]] | — | — |
| [[RNF-SEO-005]] | Consistencia estricta NAP y señales de SEO Local en Asturias | critica | [[NEC-005]] | [[CA-SEO-002]] | — | [[PA-001]] |
| [[RNF-SEO-006]] | Optimización SEO de activos multimedia y atributos alt descriptivos | alta | [[NEC-005]], [[NEC-003]] | [[CA-SEO-002]] | — | — |
<!-- /AUTO:matriz -->
