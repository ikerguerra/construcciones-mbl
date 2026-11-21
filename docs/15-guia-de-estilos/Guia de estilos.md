---
id: DOC-EST-000
tipo: guia
titulo: Guía de estilos visual — Construcciones MBL (desde mbl-maqueta)
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-21
---

# Guía de estilos — Construcciones MBL

Sistema visual oficial derivado de [[mbl-maqueta.html]] y aprobado en [[ADR-002]]. Conserva la **estructura editorial arquitectónica a pantalla completa sobre fondo blanco** con bloques destacados redondeados (`36px`) y margen lateral uniforme de `16px`, aplicando la **paleta corporativa verde bosque/salvia de Construcciones MBL** (`#0F1D14`, `#164624`, `#3E6B47`, `#86D195`, `#EEF3EE`, WCAG 2.1 AA/AAA) junto a fotografía real de reformas en Asturias.

## Equivalencia de la maqueta *RealWorld* → *Construcciones MBL*

| Bloque en [[mbl-maqueta.html]] | Equivalente en Construcciones MBL | Notas de adaptación |
|---|---|---|
| Logo `"REALWORLD"` | Logotipo gráfico centrado `Construcciones MBL` ([[PA-003]], [[PA-014]]) | Solo logotipo centrado (sin texto auxiliar `CONSTRUCCIONES MBL` al lado); al superar el Hero aparece como barra fija superior con animación fluida |
| Nav en píldoras (`Home`, `About Us`, `Collection`, `Let's Talk`) | `Inicio`, `Servicios` (desplegable con 7 especialidades + catálogo), `Proyectos`, `Guías`, `Contacto`, CTA `Calcula tu reforma` | Submenú accesible por foco/hover en escritorio y desplegado en menú móvil |
| Hero (`Discover the top real estate...`) | `Reformas Integrales y Construcción en Asturias con Presupuesto Cerrado` (`H1` único) | Ocupa el alto y ancho completo del viewport con velo verde bosque oscuro y titular de ancho completo |
| Buscador 4 filtros (`Category`, `Location`, `Type`, `Price`) | Selector rápido de proyecto (`Tipo de obra`, `Zona en Asturias`, `Superficie aprox.`, `Nivel de calidades`) | Conecta directo con el simulador preseleccionado vía query params ([[PA-007]]) |
| *Our Story* + 4 stats + zig-zag 2 filas | *Nuestra historia* (`+20 años`, `+260 proyectos`, `48 h` ducha exprés, `Hasta 10 años` garantía) | Tarjetas estadísticas en salvia suave `--bg`, kickers tipo píldora verde y texto limpio |
| *Top Picks* (tabs + 6 tarjetas) | *Nuestros servicios en Asturias* (tabs filtrables + 6 especialidades + banda plato de ducha 48 h) | Tarjetas verticales con iconos SVG de reloj y enlace `↗`, precio debajo |
| Sección oscura `.dark` + marca `"ASTURIAS"` | *Construimos con presupuesto cerrado y garantía* + marca `"ASTURIAS"` ([[PA-014]]) | Pasos del método MBL sobre `#0F1D14` con acentos `--warm` verde claro `#86D195` y flechas SVG |
| *Editor's Choice* + *Portfolio gallery* | *Proyectos destacados* (enlazados a ficha individual `/proyectos/[slug]/` activable) + galería asimétrica (`2 + 1`) | Fotos propias optimizadas sin embed Instagram ([[PA-003]]); detalle de proyecto desactivable |
| *Testimonial* | *Opiniones reales en Asturias* + ficha verificada Google Maps + acordeón *FAQs* centrado (`860px`) | Reseñas reales con 5 estrellas, sello verificado y selector rápido por cliente (`4.9 / 29`, [[PA-013]]) |
| Footer oscuro sin marca de agua inferior | Footer corporativo con logotipo, CTA superior, NAP Gijón en 4 columnas, enlaces legales y sin texto de fondo `'CONSTRUCCIONES MBL'` | Incluye botón `Configurar cookies`; sin enlace público a `Webmail` ([[PA-006]]) |

## Documentos temáticos
- [[Estilo color]]
- [[Estilo tipografia]]
- [[Estilo espaciado y layout]]
- [[Estilo componentes]]
- [[Estilo fotografia y direccion de arte]]
