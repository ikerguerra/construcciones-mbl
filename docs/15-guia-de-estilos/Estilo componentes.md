---
id: DOC-EST-004
tipo: guia
titulo: Estilo componentes — Patrones UI y adaptación a Astro
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Estilo componentes

Catálogo de componentes derivados de [[mbl-maqueta.html]] y ampliados para cubrir las necesidades SEO, GEO, AEO y de conversión de Construcciones MBL:

1. **Píldora de navegación (`.pill`)**: `padding: 9px 20px`, `border-radius: 999px`, `background: var(--glass)`, `border: 1px solid var(--glass-b)`, `backdrop-filter: blur(10px)`, texto blanco. Estado activo (`.pill.active`): fondo `#ffffff`, texto `#000000`. En páginas interiores con cabecera clara sobre blanco, variante invertida (`--ink` con borde `--line`, activo `#000` sobre blanco).
2. **Selector rápido Hero (`.search`)**: contenedor translúcido (`rgba(0,0,0,.25)`, `backdrop-filter: blur(14px)`, borde `--glass-b`, radio `24px`, `padding: 14px`), hasta 4 campos `.field` (etiqueta superior `11px` + valor `14px`) y botón cuadrado blanco `.go` (`min-width: 56–64px`) hacia el servicio o simulador.
3. **Pestañas filtrables (`.tabs` / `.tab`)**: píldoras con borde `1px solid var(--line)`, estado activo negro sólido con texto blanco (`role="tablist"`, `role="tab"`, `aria-selected`). Se utilizan en servicios de portada, en `/proyectos/` y en filtros de categoría de `/innovacion-sostenible/`.
4. **Tarjeta editorial de servicio / proyecto (`.card`)**: alto `360px` (`230px` en destacados apilados), imagen a sangre con `object-fit: cover`, overlay degradado inferior `linear-gradient(transparent 45%, rgba(0,0,0,.85))`, badge superior izquierdo (`.rate`: plazo o municipio), título `19px`, descripción breve y píldora inferior derecha (`.price`: rango orientativo o enlace *Ver más*).
5. **Controles de carrusel (`.arr`)**: botones circulares (`>= 40px` área táctil recomendada en móvil, visual `34–40px`) con variante clara sobre blanco y variante invertida sobre fondo negro.
6. **Componentes específicos AEO / Conversión (en coherencia visual con la maqueta)**:
   - **Caja *En resumen* (AEO)**: tarjeta blanca o gris `#f7f7f7` con borde izquierdo `3px solid #000`, radio `18px`, `padding: 20px 24px`, tipografía `Inter 16px`.
   - **Tablas comparativas de precios**: encabezados con fondo `#fafafa`, bordes `--line`, radio `18px`, scroll horizontal seguro en móvil (`.scroll`).
   - **Acordeón FAQ (`<details>/<summary>`)**: ítems limpios separados por `--line` con icono `+`/`−` rotatorio y cero JS requerido.
   - **Simulador de reforma**: tarjeta limpia en pasos o secciones claras usando los mismos radios (`18px`/`24px`) y botones píldora negros de alto contraste.
   - **Banner de cookies RGPD/AEPD**: barra o tarjeta discreta en la esquina inferior con fondo `#0a0a0a` / `#ffffff`, borde `--line`, y tres botones píldora de jerarquía visual equivalente (*Aceptar todas*, *Rechazar*, *Configurar*).
