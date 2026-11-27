---
id: DOC-AUD-005
tipo: auditoria
titulo: Análisis fotográfico SEO y UX por ubicación (3 opciones por hueco)
estado: vigente
creado: 2026-11-27
actualizado: 2026-11-27
---

# Análisis fotográfico SEO y UX por ubicación (`T-004`)

Auditoría integral de **todas las ubicaciones fotográficas** de `construccionesmbl.com` para orientar la selección definitiva (`T-005`) y el renombrado SEO de archivos (`T-006`), proponiendo **3 opciones visuales concretas**, un **nombre de archivo SEO** (`palabra-clave-entidad-asturias.webp`), un borrador de atributo **`alt`** y la **intención UX** esperada en cada momento del recorrido del usuario.

> [!note] Criterios transversales de nomenclatura y calidad (`T-006` / `RNF-SEO-006`)
> - **Formato de archivo**: minúsculas, guiones medios `-`, sin tildes/ñ, sin genéricos tipo `IMG_1234`, siguiendo el patrón `<servicio-o-tema>-<detalle-visual>-<localidad-asturias>.webp`.
> - **Atributo `alt`**: descripción natural y fiel de la escena en `10–18` palabras combinando qué se ve, material/solución y ámbito geográfico real en Asturias (sin *keyword stuffing*).
> - **Cero duplicidades**: evitar reutilizar exactamente la misma foto entre el Hero, la sección Historia, Servicios, Localidades secundarias y Blog.

---

## 1. Portada (`/`) — `src/pages/index.astro`

### 1.1 Hero principal (fondo a pantalla completa `.hero-bg`)
- **Archivo actual**: `src/assets/images/proyectos/obra-bano-mbl-wide.webp` *(duplicado en Historia Foto 2 y `/empresa/` Garantía)*.
- **UX esperada**: Impacto aspiracional en menos de 1 segundo; debe transmitir amplitud, luz natural, acabado limpio de alto nivel y dejar zonas oscuras o uniformes arriba para el degradado del menú y abajo para el titular + selector rápido.
- **3 opciones propuestas**:
  1. **Salón-comedor reformado integralmente con luz natural (Recomendada)**: vivienda luminosa en Gijón/Oviedo con suelo continuo cálido, carpintería blanca y vista despejada.
     - *Archivo SEO*: `reforma-integral-salon-luminoso-asturias.webp`
     - *`alt`*: `Salón comedor tras reforma integral en vivienda de Asturias con suelo continuo y luz natural`
  2. **Cocina abierta contemporánea integrada con salón**: mobiliario en madera/mate, isla central iluminada y perspectiva amplia ideal para recortes 16:9.
     - *Archivo SEO*: `reforma-cocina-abierta-medida-asturias.webp`
     - *`alt`*: `Cocina moderna abierta al salón reformada integralmente por Construcciones MBL en Asturias`
  3. **Vivienda unifamiliar o exterior rehabilitado al atardecer**: fachada blanca/piedra con ventanales RPT amplios y verde asturiano de fondo (refuerza obra nueva y rehabilitación).
     - *Archivo SEO*: `construccion-rehabilitacion-vivienda-asturias.webp`
     - *`alt`*: `Vivienda unifamiliar renovada con ventanales eficientes en entorno verde de Asturias`

### 1.2 Nuestra Historia — Foto 1 (bloque editorial superior)
- **Archivo actual**: `src/assets/images/proyectos/obra-reforma-integral-1.webp`.
- **UX esperada**: Cercanía, profesionalidad y método; mostrar transformación tangible de un interior residencial real que respalde el relato de transparencia sin incertidumbre.
- **3 opciones propuestas**:
  1. **Detalle de carpintería, puerta lacada y pavimento recién entregado**: ángulo arquitectónico medio que refleja precisión de remates.
     - *Archivo SEO*: `acabados-reforma-integral-vivienda-gijon.webp`
     - *`alt`*: `Acabados en carpintería lacada y suelo recién instalado en reforma integral en Gijón`
  2. **Dirección técnica revisando planos junto a obra limpia y protegida**: humaniza la marca (`E-E-A-T`) mostrando orden y control diario en obra.
     - *Archivo SEO*: `direccion-tecnica-reforma-asturias.webp`
     - *`alt`*: `Revisión técnica con planos y medición sobre obra ordenada de Construcciones MBL en Asturias`
  3. **Distribuidor o hall de piso antiguo transformado en espacio abierto**: muestra ganancia espacial y luminosa frente al estado previo habitual en pisos asturianos.
     - *Archivo SEO*: `distribucion-piso-reformado-oviedo-asturias.webp`
     - *`alt`*: `Pasillo y zona de día ampliados tras reforma completa de piso en Asturias`

### 1.3 Nuestra Historia — Foto 2 (junto a métricas clave)
- **Archivo actual**: `src/assets/images/proyectos/obra-bano-mbl-wide.webp` *(duplicada con el Hero)*.
- **UX esperada**: Respaldar visualmente las cifras clave (plazo 48 h, garantías, presupuestos cerrados) con un espacio técnico impecable diferente al Hero.
- **3 opciones propuestas**:
  1. **Baño de formato apaisado con grifería empotrada y porcelánico rectificado (no usado en Hero)**: transmite limpieza ejecutiva y precisión en fontanería/impermeabilización.
     - *Archivo SEO*: `bano-porcelanico-rectificado-asturias.webp`
     - *`alt`*: `Baño contemporáneo con revestimiento porcelánico rectificado y grifería empotrada en Asturias`
  2. **Cocina terminada con encimera continua e iluminación LED bajo mueble**: refuerza la capacidad multidisciplinar (fontanería, electricidad, mobiliario).
     - *Archivo SEO*: `cocina-iluminacion-led-reforma-asturias.webp`
     - *`alt`*: `Cocina reformada con encimera continua e iluminación LED integrada en Asturias`
  3. **Ventana oscilo-batiente de PVC con RPT e interior recién pintado**: enlaza con eficiencia energética, aislamiento y acabados sin humedad.
     - *Archivo SEO*: `aislamiento-ventanas-eficientes-asturias.webp`
     - *`alt`*: `Ventana eficiente instalada con acabado interior liso frente a humedad en Asturias`

### 1.4 Bloque Oscuro «Método MBL» (`.dark-img-wrap`)
- **Archivo actual**: `src/assets/images/proyectos/proyecto-local-comercial-gijon-1.webp`.
- **UX esperada**: Rigor técnico y ejecución real de obra (contraste visual con las fotos aspiracionales de resultado final); debe justificar el método paso a paso con nivel láser, orden y dirección de obra.
- **3 opciones propuestas**:
  1. **Ejecución técnica en obra con nivel láser y trasdosado / alicatado en curso (Recomendada)**: refuerza precisión milimétrica y transparencia constructiva.
     - *Archivo SEO*: `ejecucion-obra-nivel-laser-gijon.webp`
     - *`alt`*: `Ejecución técnica con nivel láser en reforma supervisada por Construcciones MBL en Gijón`
  2. **Toma de medidas inicial en vivienda con equipo técnico**: acompaña a la perfección la Fase 01 ("Visita técnica gratuita") y transmite cercanía.
     - *Archivo SEO*: `medicion-tecnica-reforma-asturias.webp`
     - *`alt`*: `Toma de mediciones y diagnóstico previo en obra de reforma en Asturias`
  3. **Suelo radiante / impermeabilización vista antes del acabado final**: enseña lo que normalmente queda oculto (calidad de instalaciones).
     - *Archivo SEO*: `instalacion-tecnica-obra-asturias.webp`
     - *`alt`*: `Instalación técnica de fontanería e impermeabilización previa al acabado en Asturias`

### 1.5 Galería de Obras (5 diapositivas en carrusel + miniaturas)
- **Archivos actuales**: `obra-bano-mbl-14.webp`, `obra-cocina-mbl-1.webp`, `proyecto-alicatado-bano-1.webp`, `obra-cocina-mbl-2.webp`, `obra-ducha-mampara.webp`.
- **UX esperada**: Variedad real de gremios y estancias para demostrar versatilidad sin repetir encuadres idénticos.
- **3 opciones por enfoque de serie**:
  1. **Serie multi-estancia equilibrada (Recomendada)**: Salón integral (`obra-1`) + Cocina moderna (`obra-2`) + Baño porcelánico completo (`obra-3`) + Ducha 48 h con mampara (`obra-4`) + Local comercial acabado (`obra-5`).
     - *Archivos SEO*: `galeria-salon-integral-asturias.webp`, `galeria-cocina-moderna-gijon.webp`, `galeria-bano-porcelanico-asturias.webp`, `galeria-cambio-ducha-oviedo.webp`, `galeria-local-comercial-asturias.webp`
  2. **Serie detalle constructivo («antes oculto / acabado final»)**: alternar 3 interiores terminados con 2 tomas de detalle de oficio (juntas rectificadas, encuentro de carpintería).
     - *Archivos SEO*: `detalle-reforma-salon-asturias.webp`, `detalle-alicatado-rectificado-bano.webp`, `detalle-encimera-cocina-medida.webp`, `detalle-plato-ducha-antideslizante.webp`, `detalle-iluminacion-local-gijon.webp`
  3. **Serie geográfica por concejos**: 1 estancia destacada por concejo principal (Gijón, Oviedo, Avilés, Siero, Villaviciosa) para apoyar SEO local en `alt`.
     - *Archivos SEO*: `reforma-piso-centro-gijon.webp`, `reforma-cocina-oviedo.webp`, `reforma-bano-aviles.webp`, `reforma-unifamiliar-siero.webp`, `rehabilitacion-vivienda-villaviciosa.webp`

### 1.6 Sección de Reseñas Google (`.testi-img`)
- **Archivo actual**: `src/assets/images/proyectos/proyecto-bano-moderno-asturias.webp`.
- **UX esperada**: Credibilidad emocional vinculada al cliente satisfecho; escena cálida y habitada que acompañe la insignia flotante `4,9 / 5`.
- **3 opciones propuestas**:
  1. **Vivienda habitada y cálida tras entrega (salón con iluminación natural cálida) (Recomendada)**: conecta con la sensación de "hogar terminado y disfrutado".
     - *Archivo SEO*: `resultado-reforma-vivienda-clientes-asturias.webp`
     - *`alt`*: `Vivienda luminosa entregada tras reforma integral con valoración de clientes en Asturias`
  2. **Cocina con mobiliario cálido e iluminación ambiental**: estancia aspiracional con muy buena legibilidad debajo para la tarjeta `.gbp-badge-card`.
     - *Archivo SEO*: `cocina-entregada-clientes-asturias.webp`
     - *`alt`*: `Cocina entregada en Asturias tras reforma integral respaldada por reseñas de clientes`
  3. **Baño de estética tipo spa en tonos neutros/piedra**: sensación de confort y limpieza que refuerza satisfacción post-entrega.
     - *Archivo SEO*: `bano-moderno-entregado-asturias.webp`
     - *`alt`*: `Baño moderno entregado en Asturias con mampara minimalista y cerámica rectificada`

---

## 2. Servicios (`/servicios/`, 8 fichas `/[servicio]/` y Landing Ducha 48 h)

| Ubicación | Archivo actual | Opción 1 (Recomendada) | Opción 2 | Opción 3 | Nombre SEO propuesto & UX |
|---|---|---|---|---|---|
| **Hub `/servicios/` (Hero)** | `servicios/hero-servicios-construcciones-mbl.webp` | Vista panorámica de apartamento recién reformado integralmente en tonos neutros | Cocina + salón abierto mostrando coordinación de gremios | Equipo técnico supervisando obra terminada en Gijón | `servicios-reformas-construccion-asturias.webp` · Visión global de calidad y versatilidad |
| **Reformas Integrales** | `hero-home-construcciones-mbl.webp` *(duplicada/genérica s/PA-022)* | Salón amplio recién reformado con carpintería blanca y tarima/vinílico | Piso urbano asturiano redistribuido en espacio diáfano | Detalle de salón + cocina conectada con iluminación empotrada | `reformas-integrales-vivienda-asturias.webp` · Deseo de transformación total del hogar (resolver `PA-022`) |
| **Reformas de Cocinas** | `servicios/servicio-cocinas-asturias.webp` | Cocina moderna en madera cálida y blanco con encimera de cuarzo/porcelánico | Cocina con península e iluminación bajo muebles altos | Cocina compacta optimizada para piso en Gijón/Oviedo | `reforma-cocinas-medida-asturias.webp` · Funcionalidad diaria y ergonomía |
| **Reformas de Baños** | `servicios/hero-reformas-banos-asturias.webp` | Baño completo con mueble suspendido, espejo retroiluminado y ducha de obra | Baño pequeño luminoso con cerámica gran formato sin juntas gruesas | Ducha a ras de suelo con hornacina iluminada y grifería negra/cromo | `reforma-banos-modernos-asturias.webp` · Limpieza, amplitud e impermeabilización |
| **Cambio Bañera por Ducha 48 h** | `servicios/servicio-plato-ducha-48h.webp` | Plato de ducha de resina extraplano con mampara transparente antical | Comparativa visual limpia (zona ducha accesible sin escalón + barra) | Plato pizarra antideslizante clase 3 con columna termostática | `cambio-banera-plato-ducha-48h-asturias.webp` · Seguridad, accesibilidad y rapidez sin grandes obras |
| **Construcción de Viviendas** | `servicios/servicio-construccion-viviendas.webp` | Chalet unifamiliar contemporáneo terminado en parcela verde asturiana | Estructura moderna de vivienda unifamiliar con porche y SATE | Casa modular/tradicional actualizada con ventanales panorámicos | `construccion-vivienda-unifamiliar-asturias.webp` · Solidez estructural (LOE 10 años) e integración rural/urbana |
| **Reformas Parciales** | `servicios/servicio-reformas-parciales.webp` | Renovación de tarima/vinílico, puertas lacadas y pintura lisa en salón | Dormitorio o despacho renovado con armario empotrado a medida | Cambio de carpintería exterior PVC RPT con remate limpio de albañilería | `reformas-parciales-piso-asturias.webp` · Renovación rápida sin desalojar la vivienda |
| **Locales Comerciales** | `proyectos/proyecto-local-comercial-interior.webp` *(revisar PA-022)* | Local comercial terminado y luminoso listo para apertura (clínica/tienda/oficina) | Fachada comercial accesible a cota cero con escaparate limpio | Zona de atención al cliente con tabiquería fonoabsorbente e iluminación | `reforma-locales-comerciales-asturias.webp` · Imagen comercial lista para obtener licencia de apertura |
| **Rehabilitación Casas de Pueblo** | `blog/reformar-casa-antigua-asturias.webp` *(duplicada de blog)* | Casa tradicional asturiana de piedra rejuntada y cubierta rehabilitada | Interior con muro de mampostería visto combinado con viga de madera y suelo nuevo | Casona rural con carpintería eficiente manteniendo estética tradicional | `rehabilitacion-casas-piedra-asturias.webp` · Respeto arquitectónico + solución a humedades y cubierta |
| **Fachadas y Tejados** | `blog/rehabilitacion-fachadas-tejados.webp` *(duplicada de blog)* | Fachada con sistema SATE acabado monocapa limpio en edificio/unifamiliar | Cubierta de teja cerámica nueva con panel sándwich e impermeabilización | Vivienda unifamiliar tras rehabilitación térmica exterior completa | `rehabilitacion-fachadas-sate-tejados-asturias.webp` · Protección frente a lluvia/viento atlántico y ahorro térmico |

---

## 3. Landings Locales (`src/content/localidades/*.md`)

Actualmente **Siero, Villaviciosa y Llanera reutilizan** las fotos de Oviedo, Gijón y Avilés. Conviene dar una imagen diferenciada a cada concejo para reforzar la relevancia local:

| Concejo | Archivo actual | Opción 1 (Recomendada SEO Local) | Opción 2 | Opción 3 | Nombre SEO & UX |
|---|---|---|---|---|---|
| **Gijón** (`/reformas-en-gijon/`) | `local-gijon-asturias.webp` | Panorámica arquitectónica residencial de Gijón (San Lorenzo / zona urbana) | Piso urbano luminoso reformado en zona centro/La Arena | Reforma de vivienda frente al litoral con carpintería estanca | `reformas-integrales-gijon-asturias.webp` · Pertenencia local y edificios urbanos costeros |
| **Oviedo** (`/reformas-en-oviedo/`) | `local-oviedo-asturias.webp` | Interior contemporáneo de piso señorial reformado en Oviedo | Panorámica urbana residencial de Oviedo y entornos | Salón con aislamientos acústicos y ventanales RPT en vivienda urbana | `reformas-integrales-oviedo-asturias.webp` · Piso clásico actualizado con confort térmico |
| **Avilés** (`/reformas-en-aviles/`) | `local-aviles-asturias.webp` | Edificios residenciales rehabilitados / centro urbano de Avilés | Piso familiar renovado en comarca de Avilés / Llaranes | Fachada y carpinterías protegidas frente a salinidad costera | `reformas-viviendas-aviles-asturias.webp` · Renovación familiar y control de condensación |
| **Siero** (`/reformas-en-siero/`) | `local-oviedo-asturias.webp` *(duplicado)* | Chalet/adosado reformado en Lugones / La Fresneda / Pola de Siero | Cocina abierta luminosa en vivienda unifamiliar del centro asturiano | Porche exterior y rehabilitación energética en entorno residencial de Siero | `reformas-viviendas-siero-lugones-asturias.webp` · Vivienda unifamiliar y adosados del concejo |
| **Villaviciosa** (`/reformas-en-villaviciosa/`) | `local-gijon-asturias.webp` *(duplicado)* | Casa de aldea / vivienda unifamiliar rehabilitada en entorno verde de Villaviciosa | Fachada rústica en piedra y cubierta de teja en zona costera/rural | Baño y cocina modernos integrados en vivienda tradicional del concejo | `reformas-rehabilitacion-villaviciosa-asturias.webp` · Casas rurales, segundas residencias y humedad |
| **Llanera** (`/reformas-en-llanera/`) | `local-aviles-asturias.webp` *(duplicado)* | Vivienda unifamiliar moderna con jardín en Soto de Llanera / Posada | Reforma de nave/local u oficina en eje empresarial de Llanera | Salón acristalado eficiente con aerotermia en vivienda unifamiliar | `reformas-chalets-viviendas-llanera-asturias.webp` · Chalets unifamiliares y naves del área central |

---

## 4. Página Corporativa `/empresa/` — `src/pages/empresa.astro`

| Hueco en `/empresa/` | Archivo actual | Opción 1 (Recomendada) | Opción 2 | Opción 3 | Nombre SEO & UX |
|---|---|---|---|---|---|
| **Hero `/empresa/`** | `hero-servicios-construcciones-mbl.webp` *(duplicado)* | Toma real de obra limpia o despacho técnico en Cristasa (Gijón) | Retrato grupal / coordinación de dirección de obra con planos | Interior emblemático acabado en Asturias | `equipo-oficina-tecnica-construcciones-mbl-gijon.webp` · Confianza corporativa y cercanía humana (`E-E-A-T`) |
| **Bloque «Nuestro Enfoque»** | `proyecto-local-comercial-gijon-1.webp` *(duplicado)* | Borja / dirección técnica revisando presupuesto por partidas y planos | Comprobación de niveles y control de calidad durante ejecución | Muestrario real de materiales (cerámica, madera, PVC) en oficina | `direccion-obra-presupuesto-cerrado-gijon.webp` · Transparencia frente a improvisación |
| **Bloque «Garantía por Escrito»** | `obra-bano-mbl-wide.webp` *(duplicado)* | Entrega de dossier técnico / detalle de acabado perfecto sellado | Boletín de instalaciones y comprobación final de estanqueidad/juntas | Vivienda limpia tras entrega final lista para entrar a vivir | `garantia-escrita-entrega-obra-asturias.webp` · Seguridad jurídica y respaldo post-entrega |

---

## 5. Portafolio de Proyectos (`/proyectos/` y 8 fichas `/proyectos/[slug]/`)

Cada ficha real que permanezca o se incorpore tras `PA-026` (`T-007`) necesita **1 portada + 3 fotos de galería** (y par **Antes/Después** opcional según `PA-021`) sin reutilizar exactamente las mismas imágenes entre proyectos distintos:

| Proyecto actual (`src/content/proyectos/`) | Portada actual | 3 opciones de cobertura recomendada por obra real | Patrón de nombres SEO (`1 portada + 3 galería`) |
|---|---|---|---|
| `reforma-integral-vivienda-asturias.md` | `obra-reforma-integral-1.webp` | (1) Salón acabado como portada; (2) Cocina o comedor integrado; (3) Paso/carpintería lacada o foto «Antes» del salón | `reforma-integral-<concejo>-salon.webp`, `-cocina.webp`, `-carpinteria.webp`, `-antes.webp` |
| `local-comercial-accesible-gijon.md` | `proyecto-local-comercial-gijon-1.webp` | (1) Local terminado accesible como portada; (2) Acceso a cota cero desde calle; (3) Iluminación y aseo adaptado | `reforma-local-<actividad>-gijon-fachada.webp`, `-interior.webp`, `-acceso.webp`, `-aseo.webp` |
| `bano-moderno-impermeabilizado-asturias.md` | `proyecto-bano-moderno-asturias.webp` | (1) Vista general baño terminado; (2) Detalle lámina impermeabilizante previa; (3) Grifería empotrada y mueble suspendido | `reforma-bano-moderno-<concejo>-general.webp`, `-impermeabilizacion.webp`, `-ducha.webp`, `-mueble.webp` |
| `cocina-abierta-medida-asturias.md` | `obra-cocina-mbl-1.webp` | (1) Cocina abierta al salón; (2) Detalle mobiliario sin tiradores y encimera; (3) Zona electrodomésticos integrados / Antes | `reforma-cocina-abierta-<concejo>-vista.webp`, `-encimera.webp`, `-almacenaje.webp`, `-antes.webp` |
| `ducha-mampara-antical-asturias.md` | `obra-ducha-mampara.webp` | (1) Plato antideslizante + mampara terminada; (2) Detalle válvula desagüe y sellado; (3) Bañera antigua previa («Antes») | `cambio-banera-ducha-<concejo>-final.webp`, `-mampara.webp`, `-griferia.webp`, `-antes.webp` |
| `alicatado-porcelanico-bano-asturias.md` | `proyecto-alicatado-bano-1.webp` | (1) Paramento porcelánico rectificado terminado; (2) Inglete / encuentro en esquina; (3) Colocación con cuñas autonivelantes | `alicatado-porcelanico-<concejo>-general.webp`, `-inglete.webp`, `-nivelacion.webp`, `-suelo.webp` |
| `cocina-funcional-madera-calida.md` | `obra-cocina-mbl-2.webp` | (1) Frente principal acabado madera cálida; (2) Iluminación LED sobre zona trabajo; (3) Fontanería/desagües renovados antes de montar | `reforma-cocina-madera-<concejo>-frente.webp`, `-iluminacion.webp`, `-encimera.webp`, `-previo.webp` |
| `acondicionamiento-local-pladur-gijon.md` | `proyecto-local-comercial-gijon-2.webp` | (1) Interior acabado pintado y nivelado; (2) Detalle tabique acústico PYL + lana mineral; (3) Techo registrable e iluminación LED | `acondicionamiento-local-pyl-gijon-final.webp`, `-aislamiento.webp`, `-techo.webp`, `-previo.webp` |

---

## 6. Blog *Innovación Sostenible* (23 artículos en `src/content/blog/`)

Cada artículo usa una portada propia (`aspect-ratio` horizontal para tarjetas `.zona-card-img` y esquema `BlogPosting` compatible con Google Discover `>= 1200 px` ancho):

| Slug del artículo | Archivo actual | 3 opciones de fotografía (Recomendada 1.ª) | Nombre SEO propuesto | Objetivo UX |
|---|---|---|---|---|
| `10-errores-a-evitar-en-una-reforma-integral-de-vivienda` | `errores-evitar-reforma-integral.webp` | (1) Técnico revisando planos en obra real; (2) Contrato por partidas y calendario; (3) Obra ordenada vs desorden previo | `errores-reforma-integral-planificacion-asturias.webp` | Autoridad práctica desde el primer segundo |
| `5-materiales-sostenibles-que-estan-revolucionando-la-reforma-de-banos` | `materiales-sostenibles-banos.webp` | (1) Baño con piedra natural/mineral y madera certificada; (2) Grifería aireadora eco y cerámica reciclada; (3) Bodegón de muestras sostenibles | `materiales-sostenibles-reforma-bano-asturias.webp` | Inspiración visual eco-moderna |
| `aislamiento-termico-en-asturias-2026-guia-definitiva-para-ahorrar-energia` | `aislamiento-termico-asturias.webp` | (1) Trasdosado con lana mineral en cámara; (2) Fachada con placas SATE en colocación; (3) Cámara termográfica / puente térmico resuelto | `aislamiento-termico-lana-mineral-asturias.webp` | Demostrar eficacia térmica tangible |
| `ayudas-y-subvenciones-para-reformas-en-asturias-2026-guia-definitiva` | `ayudas-subvenciones-reformas-asturias.webp` | (1) Certificado energético A/B junto a vivienda reformada; (2) Vivienda unifamiliar con envolvente y aerotermia; (3) Asesoramiento técnico de expediente | `ayudas-subvenciones-reforma-energetica-asturias.webp` | Claridad documental y ahorro real |
| `cambio-de-banera-por-plato-de-ducha-en-asturias-2026-guia-completa` | `cambio-banera-plato-ducha.webp` | (1) Ducha a ras sin barreras con mampara transparente; (2) Comparativa bañera antigua vs plato resina; (3) Detalle textura antideslizante pizarra | `guia-cambio-banera-ducha-asturias.webp` | Resolver miedo a obras molestas |
| `casas-prefabricadas-y-minicasas-en-asturias-es-legal-donde-se-pueden-instalar-guia-2026` | `casas-prefabricadas-minicasas-asturias.webp` | (1) Vivienda modular contemporánea en finca verde asturiana; (2) Cimentación por losa hormigonada en parcela; (3) Interior amplio de vivienda modular | `casas-modulares-parcela-edificable-asturias.webp` | Realismo normativo y urbanístico |
| `casos-de-exito-asi-ahorran-nuestros-clientes-con-sus-hogares-sostenibles` | `casos-exito-hogares-sostenibles.webp` | (1) Vivienda renovada con aerotermia y ventanales amplios; (2) Salón eficiente con suelo radiante; (3) Equipo exterior aerotermia integrado discretamente | `caso-exito-ahorro-energetico-vivienda-asturias.webp` | Prueba de ahorro verificable |
| `como-afecta-una-reforma-al-seguro-del-hogar-en-asturias-lo-que-debes-saber-guia-2026` | `reforma-seguro-hogar-asturias.webp` | (1) Revisión de planos y póliza sobre escritorio limpio; (2) Inspección de fontanería nueva presurizada; (3) Entrega de vivienda asegurada tras obra | `reforma-seguro-hogar-cobertura-asturias.webp` | Seguridad jurídica ante siniestros |
| `como-convivir-con-las-obras-en-casa-guia-de-supervivencia-para-reformas-en-asturias` | `convivir-con-obras-casa.webp` | (1) Suelos protegidos con cartón/fieltro y puertas selladas; (2) Zona de paso limpia durante reforma parcial; (3) Operarios manteniendo limpieza diaria | `proteccion-limpieza-obra-vivienda-asturias.webp` | Reducir ansiedad por polvo y ruido |
| `como-elegir-suelo-para-tu-reforma-en-asturias-tipos-durabilidad-y-precio-por-m2-guia-2026` | `como-elegir-suelo-reforma.webp` | (1) Muestrario comparado porcelánico, vinílico SPC y tarima; (2) Encuentro limpio de pavimento en salón; (3) Instalación flotante con manta aislante | `muestrario-suelos-porcelanico-spc-tarima-asturias.webp` | Facilitar comparación material |
| `como-elegir-ventanas-para-tu-casa-en-asturias-materiales-acristalamiento-e-instalacion-guia-2026` | `como-elegir-ventanas-asturias.webp` | (1) Sección de perfil PVC con rotura de puente térmico instalado; (2) Ventanal doble acristalamiento con lluvia exterior; (3) Sellado perimetral con cinta expansiva | `ventanas-pvc-rotura-puente-termico-asturias.webp` | Evidenciar estanqueidad térmica/acústica |
| `como-reformar-una-casa-antigua-en-asturias-paso-a-paso` | `reformar-casa-antigua-asturias.webp` | (1) Rehabilitación de estructura de madera y piedra vista; (2) Casona tradicional asturiana antes/durante consolidación; (3) Salón cálido combinando piedra y diseño actual | `rehabilitar-casa-antigua-piedra-asturias.webp` | Valorizar patrimonio rural sin patologías |
| `cuanto-cuesta-construir-una-casa-en-asturias-precios-reales-por-m2` | `cuanto-cuesta-construir-casa-asturias.webp` | (1) Vivienda unifamiliar terminada en parcela inclinada; (2) Fase de estructura/forjado con paisaje asturiano; (3) Planos técnicos y desglose de presupuesto | `precio-construir-casa-obra-nueva-asturias.webp` | Transparencia de costes llave en mano |
| `cuanto-cuesta-reformar-una-cocina-en-asturias-2026-guia-actualizada` | `cuanto-cuesta-reformar-cocina.webp` | (1) Cocina con isla, muebles lacados y encimera piedra; (2) Distribución en L con muebles altos al techo; (3) Renovación previa de tomas y electricidad | `precio-reformar-cocina-medida-asturias.webp` | Visualizar rangos básico vs premium |
| `guia-de-mantenimiento-para-tu-nuevo-plato-de-ducha-cuidalo-y-durara-toda-la-vida` | `mantenimiento-plato-ducha.webp` | (1) Plato mineral limpio y mampara cristal sin cal; (2) Detalle rejilla inoxidable y silicona limpia; (3) Limpieza suave con bayeta de microfibra | `mantenimiento-plato-ducha-resina-asturias.webp` | Cuidado sencillo post-venta |
| `reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles` | `humedades-condensacion-banos-cocinas.webp` | (1) Baño luminoso con extractor silencioso y ventana eficiente; (2) Membrana impermeabilizante aplicada antes de alicatar; (3) Techo antihumedad impecable sin moho | `evitar-humedades-condensacion-banos-asturias.webp` | Solucionar problema climático local |
| `reforma-integral-en-asturias-cuando-merece-la-pena-hacerla-guia-2026` | `cuando-merece-pena-reforma-integral.webp` | (1) Salón comedor diáfano recién reformado en piso urbano; (2) Comparativa piso antiguo tabicado vs espacio abierto; (3) Piso luminoso listo para habitar | `cuando-reformar-vivienda-integral-asturias.webp` | Ayudar en la decisión comprar vs reformar |
| `reformas-de-locales-comerciales-en-asturias-2026-de-la-idea-a-la-apertura` | `reformas-locales-comerciales-asturias.webp` | (1) Local comercial abierto con buena iluminación y pavimento continuo; (2) Local en bruto replanteado con nivel láser; (3) Rampa accesible y escaparate acabado | `reforma-local-comercial-apertura-asturias.webp` | Transmitir cumplimiento normativo y rapidez |
| `reformas-integrales-en-gijon-guia-definitiva-antes-de-empezar` | `reformas-integrales-gijon.webp` | (1) Arquitectura residencial de Gijón / San Lorenzo; (2) Interior luminoso de piso reformado en Gijón; (3) Camioneta / acopio ordenado cumpliendo normativa municipal | `guia-reformas-integrales-gijon-asturias.webp` | Contexto hiperlocal en Gijón |
| `rehabilitacion-de-fachadas-y-tejados-en-asturias-2026-soluciones-definitivas` | `rehabilitacion-fachadas-tejados.webp` | (1) Fachada con SATE recién revestido y cubierta renovada; (2) Cubierta inclinada de teja nueva con aislamiento térmico; (3) Detalle canalón e impermeabilización | `rehabilitacion-fachada-sate-tejado-asturias.webp` | Confianza en clima lluvioso |
| `suelo-vinilico-en-asturias-ventajas-tipos-y-por-que-debes-confiar-en-un-profesional` | `suelo-vinilico-asturias.webp` | (1) Lama vinílica SPC imitación roble instalada de forma continua hasta cocina; (2) Autonivelado previo del soporte; (3) Detalle rodapié blanco y junta estanca | `suelo-vinilico-spc-instalado-asturias.webp` | Subrayar importancia del soporte nivelado |
| `tarima-flotante-o-suelo-vinilico-guia-definitiva-para-elegir-el-mejor-suelo-para-tu-casa-en-asturias` | `tarima-o-suelo-vinilico.webp` | (1) Dos lamas enfrentadas (tarima laminada vs vinílico SPC); (2) Salón cálido con pavimento madera continuo; (3) Prueba de resistencia al agua sobre vinílico | `comparativa-tarima-flotante-suelo-vinilico-asturias.webp` | Decisión rápida entre ambas opciones |
| `vivienda-sostenible-en-asturias-2026-como-construir-y-reformar-con-futuro` | `vivienda-sostenible-asturias.webp` | (1) Vivienda eficiente integrada con entorno verde asturiano; (2) Salón pasivo con máximo aprovechamiento solar; (3) Instalación aerotérmica + recuperación de calor | `vivienda-sostenible-eficiente-asturias.webp` | Posicionamiento de futuro y ahorro energético |

---

## 7. Imagen social / Open Graph (`public/og-default.jpg`, `1200×630 px`)

- **UX esperada**: Vista previa impecable al compartir enlaces en WhatsApp, Google Discover o LinkedIn, con lectura clara en miniatura.
- **3 opciones propuestas**:
  1. **Composición corporativa verde bosque + fotografía estrella de reforma integral (Recomendada)**: fondo limpio de reforma luminosa con banda izquierda `#0F1D14` y logotipo `Construcciones MBL` + claim *Reformas Integrales y Construcción en Asturias*.
     - *Archivo SEO*: `og-reformas-construccion-construcciones-mbl-asturias.jpg`
  2. **Fotografía limpia sin texto de la mejor obra integral**: ideal para vista natural en Discover sin recorte de texto.
     - *Archivo SEO*: `og-reforma-integral-vivienda-asturias.jpg`
  3. **Composición Antes / Después sutil en horizontal**: alto CTR cuando se comparten enlaces de proyectos en redes sociales.
     - *Archivo SEO*: `og-antes-despues-reforma-asturias.jpg`

---

## 8. Resumen ejecutivo de duplicidades a resolver en `T-005` y `T-006`
1. **Desacoplar `obra-bano-mbl-wide.webp`**: actualmente aparece simultáneamente en **Hero Home**, **Historia Foto 2** y **`/empresa/` Garantía**.
2. **Desacoplar fotos repetidas en Servicios**: sustituir `hero-home-construcciones-mbl.webp` (Reformas Integrales, `PA-022`), `blog/reformar-casa-antigua-asturias.webp` (Casas de Pueblo) y `blog/rehabilitacion-fachadas-tejados.webp` (Fachadas/Tejados) por imágenes exclusivas.
3. **Desacoplar landings locales secundarias**: asignar fotografías propias a **Siero**, **Villaviciosa** y **Llanera** en lugar de repetir las de Oviedo, Gijón y Avilés.
4. **Unificar nomenclatura (`T-006`)**: renombrar los 52 archivos de `src/assets/images/` aplicando los slugs SEO definidos en este análisis.
