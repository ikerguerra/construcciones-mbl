---
id: DOC-EST-000
tipo: guia
titulo: Guía de estilos visual — Construcciones MBL (desde mbl-maqueta)
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Guía de estilos — Construcciones MBL

Sistema visual oficial derivado de [[mbl-maqueta.html]] y aprobado en [[ADR-002]]. Mantiene una **estética editorial arquitectónica de alto contraste**: interfaz estrictamente monocroma (negro, blanco, grises) dentro de un marco redondeado sobre fondo neutro, donde toda la calidez cromática procede de la fotografía real de reformas e interiores en Asturias.

## Equivalencia de la maqueta *RealWorld* → *Construcciones MBL*

| Bloque en [[mbl-maqueta.html]] | Equivalente en Construcciones MBL | Notas de adaptación |
|---|---|---|
| Logo `"REALWORLD"` | Logotipo `Construcciones MBL` ([[PA-003]], [[PA-014]]) | Centrado en nav; logotipo oficial aportado + marca unificada `Construcciones MBL` |
| Nav en píldoras (`Home`, `About Us`, `Collection`, `Let's Talk`) | `Inicio`, `Servicios`, `Proyectos`, `Innovación Sostenible`, `Contacto`, CTA `Calcula tu reforma` | Máximo 5–6 píldoras limpias + acceso telefónico `684 675 898` |
| Hero (`Discover the top real estate...`) | `Reformas Integrales y Construcción en Asturias` (`H1` único) | Mantiene lead lateral y badge de confianza (`+20 años`, garantía escrita) |
| Buscador 4 filtros (`Category`, `Location`, `Type`, `Price`) | Selector rápido de proyecto (`Tipo de obra`, `Zona en Asturias`, `Superficie aprox.`, `Calidad`) | Conecta directo con el simulador preseleccionado vía query params ([[PA-007]]) |
| *Our Story* + 4 stats + 3 imágenes | *Nuestra historia* (`+20 años`, `+260 proyectos`, `48 h` ducha exprés, `Hasta 10 años` garantía) | Párrafo en lectura confortable (no cursiva pequeña prolongada) + bloque equipo técnico |
| *Top Picks* (tabs + 6 tarjetas) | *Nuestros servicios en Asturias* (tabs filtrables + 6 especialidades + plato de ducha opcional) | Píldora superior de plazo/garantía, pie con rango orientativo |
| Sección oscura `.dark` + marca `"DREAMHOME"` | *Construimos con presupuesto cerrado y garantía* + marca `"ASTURIAS"` ([[PA-014]]) | Carrusel/pasos del método MBL + CTA |
| *Editor's Choice* + *Portfolio gallery* | *Proyectos destacados en Asturias* + galería visual de obras reales | Fotos propias + mejores fotos optimizadas de WordPress, sin embed Instagram ([[PA-003]]) |
| *Testimonial* | *Opiniones reales en Asturias* + acordeón de *Preguntas frecuentes (FAQs)* | Carrusel nativo coherente con Google Business Profile (`4.9 / 29`, [[PA-013]]) |
| Footer oscuro + `"REALWORLD"` gigante | Footer corporativo con NAP de Gijón, servicios, blog, legales y `"CONSTRUCCIONES MBL"` | Incluye enlace de configuración de cookies; sin enlace público a `Webmail` ([[PA-006]], [[PA-014]]) |

## Documentos temáticos
- [[Estilo color]]
- [[Estilo tipografia]]
- [[Estilo espaciado y layout]]
- [[Estilo componentes]]
- [[Estilo fotografia y direccion de arte]]
