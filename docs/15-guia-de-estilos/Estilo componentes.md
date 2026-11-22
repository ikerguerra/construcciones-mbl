---
id: DOC-EST-004
tipo: guia
titulo: Estilo componentes — Patrones UI y adaptación a Astro
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-21
---

# Estilo componentes

Catálogo de componentes derivados de [[mbl-maqueta.html]] y ampliados para cubrir las necesidades SEO, GEO, AEO y de conversión de Construcciones MBL:

1. **Cabecera de navegación (`.nav-anchor`, `.nav-wrap`, `.pill`, `.nav-dropdown`)**:
   - Logotipo oficial centrado **sin texto auxiliar al lado** (`logo-mbl-full-light.svg`), píldoras con `--glass` / `--glass-b` y estado activo en blanco con texto `--color-primary`.
   - Enlace **Servicios** con desplegable `.nav-dropdown-menu` accesible (`:hover` y `:focus-within`) hacia las 7 especialidades + `/servicios/` (replicado en el cajón móvil `.mobile-drawer-sub`).
   - Tras superar la altura del Hero en el scroll, `.nav-wrap` pasa a modo fijo `.is-sticky` (`position: fixed; top: 12px; border-radius: 999px; background: rgba(15, 29, 20, .94)`) con animación fluida `mblNavSlideDown` y reserva previa de altura en `.nav-anchor` para evitar `CLS`.
2. **Selector rápido Hero (`.search`)**: contenedor translúcido verde bosque oscuro (`rgba(10, 24, 15, .44)`, `backdrop-filter: blur(14px)`, borde `rgba(213, 234, 216, .42)`, radio `26px`), 4 campos `.field` con `cursor: pointer`, área de clic completa en toda la caja, desplegables personalizados `.hero-select-menu` coherentes con el sistema visual (apertura hacia arriba en escritorio, hacia abajo en móvil) y botón blanco `.go` con texto `--color-primary` hacia el simulador preseleccionado.
3. **Pestañas filtrables (`.tabs` / `.tab`)**: píldoras con borde `1px solid var(--line)`, estado activo `--color-primary` sólido con texto blanco (`role="tablist"`, `role="tab"`, `aria-selected`) y animación `mblSlideFade` al alternar categoría.
4. **Tarjeta editorial de servicio / proyecto (`.card`)**: alto `430px` (`310–370px` en destacados `.choice-grid`), imagen `object-fit: cover`, overlay verde bosque oscuro, badge superior izquierdo (`.card-badge` con icono SVG reloj), icono SVG de enlace `.card-icon` arriba a la derecha, título, descripción breve y píldora inferior `.price`. Las tarjetas de proyectos enlazan a `/proyectos/[slug]/` cuando `isDetalleProyectosActive` está habilitado.
5. **Controles de carrusel (`.arr`) y autoplay**: botones circulares (`40px`) con **iconos SVG vectoriales** de flecha (`stroke-width="2"`), animación direccional (`mblSlideNext` / `mblSlidePrev` según botón pulsado) y avance automático por tiempo de lectura activado únicamente cuando la sección está visible (`IntersectionObserver`, pausado en hover/foco y respetando `prefers-reduced-motion`).
6. **Testimonios verificados (`.testi-card` + `.gbp-badge-card`)**: tarjeta salvia con 5 estrellas SVG, insignia *Cliente verificado en Google*, avatar fotográfico de Google cuando está disponible (`.who-avatar-img`, con respaldo inicial `.who-avatar`) y tarjeta flotante con puntuación `4,9 / 5` y enlace directo a Google Maps sobre la imagen lateral. Conectado opcionalmente en build con Google Places API (`GOOGLE_PLACES_API_KEY`) filtrando reseñas de 4 y 5 estrellas (`src/data/google-reviews.ts`).
7. **Botón flotante WhatsApp animado (`.wa-float`)**: muestra habitualmente el icono de WhatsApp en cápsula verde corporativo y expande suavemente el número `684 675 898` periódicamente cada `9,5 s` (y al hacer hover o foco), respetando `prefers-reduced-motion`.
8. **Acordeón FAQ centrado (`.faq-narrow` + `.faq-item`)**: ancho máximo acotado (`860px`) y centrado en la página con cabecera centrada y botón circular verde `+`/`−`.
9. **Entradas de blog centradas (`.article-hero-head` + `.article-centered-wrap`)**: título ampliado y centrado (`max-width: 1080px; text-wrap: balance`), contenido + TOC centrados (`max-width: 1140px`) y tarjetas de *Guías Relacionadas* con su imagen optimizada.
10. **Formulario lateral en páginas de Servicio y Proyecto (`FormularioRapidoServicio`)**: integrado a la derecha de *¿Qué Incluye Nuestro Servicio?* / ficha técnica mediante `.service-split-layout` (`minmax(0, 1fr) minmax(430px, 510px)`) con campos emparejados en 2 columnas (`.service-form-row`) para evitar altura excesiva, conectado a `/api/lead`.
11. **Desplegables corporativos unificados (`.mbl-select-wrap`, `.mbl-select-trigger`, `.mbl-select-menu`)**:
    - Todos los `<select>` de formularios, simuladores y calculadoras (`public/js/mbl-select.js`) adoptan la estética del sistema visual: disparador `.mbl-select-trigger` (`border-radius: var(--r-md)`, borde `#9eae9f`, foco en `--color-primary`, chevron verde) y panel desplegable verde bosque translúcido (`rgba(15, 29, 20, .97)`, `backdrop-filter: blur(14px)`, selección activa `--color-primary`, apertura inteligente hacia arriba o abajo según espacio visible), manteniendo accesibilidad por teclado y envío estándar de formularios.
12. **Componentes específicos AEO / Conversión**:
    - **Caja *En resumen* (AEO)**: fondo `--bg` (`#eef3ee`), borde izquierdo `4px solid var(--color-primary)`, radio `0 18px 18px 0`, `padding: 20px 24px`.
    - **Tablas comparativas de precios**: encabezados `--bg`, bordes `--line`, radio `18px`, scroll horizontal seguro en móvil.
    - **Banner de cookies RGPD/AEPD**: barra fija sobre `#0f1d14` con borde `--border-dark` y botones equivalentes (*Aceptar todas*, *Rechazar opcionales*, *Configurar*).
