---
id: DOC-AUD-003
tipo: auditoria
titulo: Auditoría y Estrategia de Contenido — Construcciones MBL
estado: vigente
creado: 2026-11-22
actualizado: 2026-11-22
---

# Auditoría y Estrategia de Contenido — Construcciones MBL

- **Fecha:** 2026-11-22
- **Modo de ejecución:** `Modo A (Auditoría de web existente)`
- **Arquetipo:** `escaparate` (web corporativa de servicios y obras en Asturias con suite `webapp` de calculadoras interactivas)
- **URL analizada:** `https://construccionesmbl.com/` (compilación estática Astro v5 SSG con 83 rutas generadas en `dist/`)
- **Contexto adicional aportado:** Bóveda SRS completa en `docs/` (`SRS v1.2.1`), inventario de contenidos (`src/pages/`, `src/content/`, `src/data/`), auditoría visual previa ([auditoria-imagenes.md](../../../auditoria-imagenes.md)), sitemaps heredados (395 URLs) e investigación web en vivo de competidores en Asturias y referentes nacionales.

---

## 1. Resumen Ejecutivo

- **Diagnóstico en 3 líneas:** Construcciones MBL cuenta con una base técnica y AEO/GEO sobresaliente (suite de 4 calculadoras fiscales/técnicas únicas en Asturias, 18 landings de licencias por concejo, `/llms.txt` estructurado y datos reales de `TARIFAS`), por encima de la mayoría de reformistas asturianos. Sin embargo, su principal activo diferenciador está semioculto en el footer sin integración en el Header ni en las páginas comerciales/blog, faltan *money pages* para búsquedas de alto ticket muy disputadas en Asturias (fachadas/SATE/tejados, casas de piedra/aldea y concejos residenciales como Siero, Villaviciosa o Llanera) y las fichas de proyecto aún no explotan comparativas *Antes / Después*, desglose financiero orientativo ni prueba humana tras retirar el bloque de equipo.
- **Top 3 prioridades de mayor retorno:**
  1. **Desbloquear la visibilidad y el CRO de la Suite de 4 Calculadoras:** incluir un acceso claro en la navegación superior, destacar las herramientas desde la Home, servicios y artículos del blog, unificar o diferenciar sin canibalización `/calcula-el-precio-de-tu-reforma-en-asturias/` frente a `/calculadora-presupuesto-reforma/`, y añadir envío directo del desglose (PEM + ICIO + IRPF) por email/WhatsApp como micro-conversión de alto valor.
  2. **Crear las 5 *Money Pages* que captura la competencia o hoy solo existen como artículo informativo:** `/rehabilitacion-fachadas-tejados-asturias/`, `/rehabilitacion-casas-pueblo-asturias/`, y las páginas locales de alto ticket de unifamiliar/reforma `/reformas-en-siero/`, `/reformas-en-villaviciosa/` y `/reformas-en-llanera/`.
  3. **Convertir `/proyectos/[slug]/` en Casos de Éxito BOFU y sanear activos visuales y editoriales:** añadir comparativa visual *Antes / Después*, rango de inversión `[DATO_CLIENTE]` y testimonio verificado en cada obra, sustituir las fotografías genéricas/de oficinas en Reformas Integrales y Locales Comerciales, y reemplazar las FAQs plantilla repetidas en artículos clave del blog.

### Cuadro de Puntuación (6 Pilares)

| Pilar | Puntuación (0–10) | Hallazgo principal (con evidencia) |
|---|---|---|
| 1. Claridad y Propuesta de Valor (Test 5 s) | **8,5 / 10** | Hero directo (*«Reformas Integrales y Construcción en Asturias con Presupuesto Cerrado»*, ámbito Gijón/Oviedo/Avilés y selector rápido de 4 parámetros), lastrado levemente por falta de mención visible arriba del pliegue a las calculadoras fiscales/ICIO y garantías diferenciales explícitas (p. ej. seguro RC / penalización). |
| 2. Arquitectura, Intención y Canibalización | **7,5 / 10** | Sólida cobertura de 7 servicios principales, 3 capitales, 18 concejos de licencias e ICIO y 23 guías; pero presenta huecos comerciales claros (fachadas/tejados/SATE, casas de aldea/piedra, Siero/Villaviciosa/Llanera, comunidades), 2 URLs que compiten por «calcular presupuesto» y 3 artículos solapados sobre suelos. |
| 3. Copywriting, Persuasión y CRO | **7,5 / 10** | Buenos precios orientativos visibles (`650–1.050 €/m²`, `1.190 €`), formulario lateral en servicios y selector rápido; falla en no integrar las 4 calculadoras avanzadas en el embudo comercial/editorial y en no ofrecer una captura de resultado/dossier dentro de cada herramienta. |
| 4. E-E-A-T y Señales de Confianza | **7,0 / 10** | Respaldo verificado de `4,9/5` en Google (29 reseñas), oficina física en Cristasa (Gijón) y `8` fichas de proyecto; debilitado por la retirada de `EquipoEEAT` sin sustituirlo por una página `/nosotros/` o firma visible de dirección de obra, `PA-001` pendiente (CIF definitivo), ausencia de imágenes *Antes/Después* y 2 fotos de servicio poco aspiracionales. |
| 5. AEO y GEO (Respuestas e IA) | **9,0 / 10** | Referente en su categoría: `ResumenDirecto` en prácticamente todas las plantillas, tablas HTML nativas con tarifas 2026, `/llms.txt` y JSON-LD modular (`@graph`); margen de mejora en sustituir FAQs genéricas repetidas en varios artículos del blog y en añadir las 4 herramientas y 18 concejos de ICIO a `/llms.txt`. |
| 6. Coherencia de Voz y Encaje con Arquetipo | **8,5 / 10** | Tono técnico cercano, realista y adaptado a la problemática climática y normativa asturiana (salitre costero, humedad, TROTU, IE). Solo pierde uniformidad en restos de tono genérico en FAQs de algunos artículos heredados y falta de identidad visual humana. |

*(Puntuación media global: **8,0 / 10** — Muy por encima de la media local en arquitectura AEO/herramientas, con potencial rápido de subida a **9+/10** al corregir visibilidad, *money pages* y prueba social).*

---

## 2. Radiografía del Negocio e ICP

- **Modelo y ticket:** Empresa constructora y de reformas llave en mano con foco **B2C** (propietarios de vivienda habitual, segunda residencia o vivienda heredada) y línea complementaria **B2B** (adecuación de locales comerciales, oficinas y comunidades de propietarios). Compra de **alta consideración** y ticket elevado: desde **1.190 €** (cambio de bañera por plato de ducha 48 h) y **3.800–14.500 €** (baños y cocinas) hasta **37.200–182.300 €** en reforma integral y **> 200.000 €** en construcción de vivienda unifamiliar.
- **Ámbito geográfico y posicionamiento:** Principado de Asturias, con base operativa en La Calzada / Gijón (`Av. Argentina 132, Cristasa of. 221`) y cobertura diaria en el eje central metropolitano (**Gijón, Oviedo, Avilés, Siero, Llanera**) y áreas residenciales/rurales próximas (**Villaviciosa, Castrillón, Langreo, Mieres**). Posicionamiento basado en **presupuesto cerrado por partidas en 48 horas, coordinación integral de gremios y garantía escrita** (3 años en reformas, 10 años estructural LOE).
- **Decisor / ICP principal:**
  - *Perfil A (Urbano 35–60 años):* Propietario o comprador de piso de los años 60–90 en Gijón, Oviedo o Avilés que busca modernizar distribución, eficiencia térmica y eliminar humedades antes de entrar a vivir.
  - *Perfil B (Patrimonio / Rural / Unifamiliar):* Propietario o heredero de vivienda unifamiliar o casa de piedra/aldea (Somió, Deva, Villaviciosa, Siero, Llanera) o autopromotor con parcela urbanizable.
  - *Perfil C (Accesibilidad / Rápido):* Hogar con personas mayores que necesita sustituir bañera por ducha antideslizante en 48 h sin obras largas.
  - *Perfil D (Negocio B2B):* Emprendedor o franquicia que alquila un bajo comercial y necesita licencia de apertura, insonorización y cumplimiento de accesibilidad PMR en plazo estricto.
- **Disparadores de búsqueda (*Triggers*):** Firma de arras o compraventa de piso antiguo; aparición de condensaciones/moho o goteras tras el invierno asturiano; necesidad de bajar la factura energética (subvenciones / deducción IRPF 20–60 %); cambio de etapa vital (accesibilidad o teletrabajo); apertura comercial con alquiler corriendo.
- **Objeciones reales que frenan la conversión:**
  1. **Miedo a los «ya que estamos» y desviaciones de presupuesto:** temor a recibir un presupuesto barato inicial que luego sube un 20–40 % en obra por partidas omitidas.
  2. **Pánico a retrasos interminables y descoordinación entre gremios:** vivir meses fuera de casa esperando al fontanero, electricista o carpintero.
  3. **Laberinto burocrático municipal y normativo:** desconocer si hace falta Declaración Responsable o proyecto de arquitecto, cuánto cuesta el ICIO en su concejo o si Patrimonio/Costas bloquea la obra (Cimadevilla, casco antiguo de Oviedo, entornos costeros).
  4. **Incertidumbre técnica frente al clima asturiano:** dudas sobre si la reforma resolverá de verdad la humedad por capilaridad, puentes térmicos o condensaciones.
  5. **Desconfianza en la solvencia y personas que entran en su vivienda:** temor a empresas sin seguro de responsabilidad civil, subcontratas opacas o desaparición postventa tras cobrar.
- **Conversiones:**
  - **Macro-conversión:** Solicitud de visita técnica gratuita y presupuesto cerrado por partidas (formulario web, teléfono directo `684 675 898` o WhatsApp con datos precargados).
  - **Micro-conversiones:** Cálculo de horquilla en el simulador rápido o calculadora completa PEM+ICIO+IVA; consulta de trámite municipal en su concejo; cálculo de deducción IRPF (20/40/60 %); comparativa de ahorro con aerotermia; lectura de guías locales y visualización de proyectos.

---

## 3. Inteligencia Competitiva

Se han analizado **5 competidores reales** representativos de tres perfiles: competidores locales directos en Gijón/Oviedo/Asturias, líderes orgánicos de nichos en Asturias y referentes aspiracionales a nivel nacional.

### Matriz Comparativa

| Competidor | Perfil (Directo / SERP / Referente) | Propuesta Above the Fold | Arquitectura de URLs | Contenido / Herramientas | Señales E-E-A-T | CRO / Captación |
|---|---|---|---|---|---|---|
| **[Attica Reformas](https://atticareformas.com/)** | Directo (Gijón) | Reformas integrales llave en mano y diseño/carpintería a medida en Gijón. | Simple: Home + servicios básicos (integrales, cocinas, baños, carpintería) + contacto. | Portafolio fotográfico visual; **sin blog técnico** ni calculadoras ni precios públicos. | Muestra acabados cuidados de carpintería y enfoque estético local en Gijón. | Formulario de contacto tradicional y teléfono; alta fricción (obliga a llamar para tener cualquier referencia de precio). |
| **[Level House Reformas](https://levelhousereformas.com/)** | Directo / SERP (Lugones, Oviedo, Gijón, Siero, Cuencas) | Reformas integrales, baños, cocinas y reclamo comercial de «reformas sin obras». | Páginas por servicio + **múltiples landings geográficas locales** (Oviedo, Gijón, Avilés, Siero, Mieres, Langreo, La Felguera). | Cobertura específica de pladur, falsos techos, fachadas y «sin obras»; sin calculadoras fiscales ni tablas AEO. | Cobertura amplia en toda el área central de Asturias desde Lugones. | Teléfono y formulario estándar; capta búsquedas geolocalizadas fuera de las 3 grandes ciudades donde MBL aún no tiene landing de servicio. |
| **[Goncesco Constructora](https://goncesco.es/)** | Directo / SERP (Oviedo y Asturias) | Reformas integrales, comunidades de vecinos, fachadas, cubiertas y diseño 3D. | Servicios diferenciados para particulares, **comunidades de propietarios**, rehabilitación de fachadas/tejados y accesibilidad. | Destaca **infografía 3D**, trabajos verticales, eliminación de barreras y reparación de humedades/redes generales; sin herramientas interactivas. | Proyectos en Oviedo y Gijón; fuerte especialidad técnica en edificios y envolvente. | Orientado a petición de estudio/presupuesto y visualización 3D previa. |
| **[Construcciones Teito](https://construccionesteito.com/)** | Directo (Gijón / Vivienda Unifamiliar) | Construcción de viviendas unifamiliares, chalets a medida, estructuras de madera y reformas integrales en Asturias. | Estructura orientada a obra nueva, reformas, naves/locales, **estructuras en madera (porches/cubiertas)** y cierre de fincas. | Contenido enfocado a gestión de suelo, trámites rurales y reparación de siniestros; sin calculadoras ni comparadores. | Larga trayectoria en Gijón y especialidad muy tangible en edificación y madera. | Captación consultiva directa; fuerte atractivo para propietarios de parcela o casa rural. |
| **[Kubo Reformas](https://kuboreformas.com/) & [Middö](https://middo.es/)** | Referentes aspiracionales (Madrid / Barcelona) | Presupuesto desglosado por gamas, **calculadora online visible en el primer pantallazo** y «Antes y Después» reales con planos. | Arquitectura modular por servicio, distritos/zonas, **Casos de Éxito detallados (Antes/Después + planos)**, y herramientas digitales (`Render Express` / calculadora por partidas). | Calculadoras conectadas a email/CRM, planos originales vs. reformados, comparativas claras de calidades y guías de ITE/normativa. | Seguro RC con aseguradora nombrada, interlocutor técnico/arquitecto único asignado, servicio postventa rápido y garantías contractuales explícitas. | Múltiples micro-conversiones (calculadora rápida, estimador visual) integradas en cada ficha de servicio y proyecto antes de pedir visita. |

### Paridad de Mercado (Mínimo exigible hoy)
1. **Presupuesto cerrado desglosado por partidas y servicio «llave en mano»:** Todos los competidores directos en Gijón y Oviedo prometen precio cerrado y coordinación de gremios; ya no diferencia por sí solo, es el estándar de entrada.
2. **Especialización climática asturiana:** Mencionar aislamiento, ventanas RPT y solución de humedades es habitual en las SERPs locales.
3. **Páginas dedicadas por municipio clave:** Competidores como Level House capturan tráfico comercial en Siero, Mieres o Langreo más allá de Gijón, Oviedo y Avilés.
4. **Cobertura de fachadas, tejados y rehabilitación rural:** Goncesco y Teito compiten activamente por obras exteriores de ticket muy alto (cubiertas, fachadas, casas de aldea, porches/cierre de fincas).

### Brechas de Diferenciación (*White Space* — Dónde ganar rápido)
1. **Transparencia interactiva fiscal y normativa (Ventaja actual infrautilizada de MBL):** Ningún competidor asturiano analizado ofrece en abierto un **Simulador de Presupuesto con PEM + ICIO real de 18 concejos + IVA (10 %/21 %)** ni calculadoras de **Deducción IRPF (20/40/60 %)** y **Aerotermia CTE**. Sacar estas 4 herramientas del footer y convertirlas en puerta de entrada principal pone a MBL años luz por delante en Asturias.
2. **Casos de Éxito reales con «Antes y Después» + inversión aproximada + solución de humedad:** Frente a galerías estáticas de fotos bonitas sin contexto financiero (como Attica o el estado actual de MBL), mostrar el estado previo del piso de los años 70 en Gijón/Oviedo, qué patología tenía y el resultado final multiplica la credibilidad y la conversión.
3. **Landing transaccional específica para Casas de Aldea / Piedra y Fachadas + SATE:** Existe enorme demanda cualitativa en Asturias de rehabilitación de casonas de piedra y envolventes térmicas (SATE + cubierta) con acceso a deducción IRPF del 60 %. Hoy Goncesco o Teito compiten por ese cliente pero sin herramientas de IRPF/ICIO integradas; MBL solo tiene dos artículos de blog informativos sin landing comercial a la que enviar ese tráfico.
4. **Prueba de blindaje contractual tangible (Seguro RC + Cronograma + Garantía escrita visible):** Imitar a referentes como Middö detallando *cómo* funciona exactamente la garantía de 3 años/10 años, la póliza de Responsabilidad Civil y el calendario de pagos por hitos elimina la objeción #1 y #5 del ICP.

---

## 4. Diagnóstico Detallado por Pilares

### 1. Claridad y Propuesta de Valor (Test 5 s) — **8,5 / 10**
- **Fortalezas observadas:** En `src/pages/index.astro`, el `<h1>` (*«Reformas Integrales y Construcción en Asturias con Presupuesto Cerrado»*), el kicker territorial (*«Gijón · Oviedo · Avilés · Todo el Principado de Asturias»*), el lead (*«presupuesto cerrado por partidas, dirección técnica diaria y garantía por escrito»*) y el selector interactivo `HeroQuickSelector` dejan cristalino en menos de 5 segundos qué hace MBL, dónde opera y cómo empezar. Las cifras (`+20 años`, `+260 proyectos`, `48 h`, `Hasta 10 años`) refuerzan la lectura instantánea.
- **Fricciones detectadas:**
  - Las 4 calculadoras estratégicas (PEM+ICIO, Licencias TROTU, IRPF, Aerotermia) **no existen visualmente en el Header ni en el cuerpo de la Home** (`Header.astro:44-107` solo enlaza a `Calcula tu reforma` hacia `/calcula-el-precio-de-tu-reforma-en-asturias/`; `Footer.astro:127-135` es el único sitio global donde aparecen las 4 herramientas nuevas).
  - La propuesta de valor no explicita la **cobertura de seguro RC**, **tramitación completa de subvenciones/IRPF** ni un diferenciador tangible del contrato cerrado arriba del pliegue.

### 2. Arquitectura, Intención y Canibalización — **7,5 / 10**
- **Fortalezas observadas:** Arquitectura clara de servicio (`/[servicio]/`), localidad (`/[localidad]/`), proyecto (`/proyectos/[slug]/`), 23 guías categorizadas (`/[categoria]/[slug]/`) y clúster programático `/licencia-obra-asturias/[concejo]/` con 18 concejos. Cobertura 100 % cuidada de migración (`301`/`410`) para evitar pérdida de histórico.
- **Brechas y riesgos de canibalización detectados:**
  1. **Canibalización de calculadoras de presupuesto:** Coexisten `/calcula-el-precio-de-tu-reforma-en-asturias/` (HeroQuickSelector + SimuladorReforma) y `/calculadora-presupuesto-reforma/` (Módulo 1 BudgetCalculator con PEM, ICIO e IVA), ambas optimizadas en `<title>` y `H1` para calcular el precio/presupuesto de reforma en Asturias (`src/pages/calcula-el-precio-de-tu-reforma-en-asturias.astro` vs `src/pages/calculadora-presupuesto-reforma.astro`). Compiten entre sí en Google y confunden al usuario en el Footer (`Footer.astro:129-133`).
  2. **Canibalización en el cluster de suelos:** Hay 3 artículos compitiendo por intención muy cercana sin jerarquía clara ni servicio comercial de pavimentos/parciales claro: `como-elegir-suelo-para-tu-reforma-en-asturias...`, `suelo-vinilico-en-asturias...` y `tarima-flotante-o-suelo-vinilico...`.
  3. **Huecos de *Money Pages* (Intención Transaccional sin URL dedicada):**
     - **Rehabilitación de fachadas, tejados y SATE en Asturias** (solo existe como post del blog apuntando a `/construccion-de-viviendas-en-asturias/`, desalineado para alguien que quiere arreglar una cubierta o poner SATE).
     - **Rehabilitación de casas antiguas / casas de piedra / aldea** (búsqueda emblemática asturiana; hoy el post apunta genéricamente a `/reformas-integrales-en-asturias/`).
     - **Landings locales en concejos de alto ticket y población del área central:** **Siero (Lugones/Pola de Siero)**, **Villaviciosa** (segunda residencia y chalets), **Llanera**, **Castrillón** y **Cuencas (Langreo/Mieres)** ya tienen página de licencia ICIO (`/licencia-obra-asturias/siero/`), pero **no tienen landing comercial de servicio** (`/reformas-en-siero/`, `/reformas-en-villaviciosa/`, `/reformas-en-llanera/`).
     - **Ventanas, aislamiento térmico y control de humedades** (post de ventanas y aislamiento tienen alta demanda transaccional en Asturias; requieren landing específica o bloque transaccional robusto en parciales/eficiencia).
     - **Comunidades de propietarios / Accesibilidad (ascensores, portales, fachadas):** Nicho de alto valor captado actualmente por Goncesco.

### 3. Copywriting, Persuasión y CRO — **7,5 / 10**
- **Fortalezas observadas:** Precios orientativos claros y consistentes (`TARIFAS`), tablas de rangos reales por tamaño de vivienda, formulario lateral `FormularioRapidoServicio` visible junto al contenido en fichas de servicio y proyectos, y botón flotante de WhatsApp.
- **Fricciones detectadas:**
  - **Desconexión entre Blog/Servicios y las 4 Calculadoras:** Ninguno de los 23 posts (`src/content/blog/*.md`) ni las páginas `[servicio].astro` / `[localidad].astro` insertan CTA contextual hacia `/calculadora-deducciones-irpf-reforma/`, `/comparador-aerotermia-asturias/` o `/licencia-obra-asturias/`. Un usuario leyendo sobre ayudas 2026 o reforma de cocina no descubre la calculadora de IRPF ni la de ICIO.
  - **Falta de micro-conversión de salida en herramientas:** Las herramientas muestran el resultado en pantalla, pero conviene ofrecer envío inmediato del desglose (PEM + ICIO + IRPF + estimación por partidas) por correo/WhatsApp para no perder leads en etapa de investigación (`MOFU`).
  - **Objeciones de garantía insuficientemente desarmadas:** Se menciona «garantía por escrito (hasta 3 años / 10 años LOE)», pero no se explica qué ocurre si hay un retraso, cómo se fraccionan los pagos por hitos certificados ni la cobertura del Seguro de Responsabilidad Civil `[DATO_CLIENTE]`.

### 4. E-E-A-T y Señales de Confianza — **7,0 / 10**
- **Fortalezas observadas:** Ficha real de Google Business (`4,9/5` con `29` reseñas y enlace directo comprobable), dirección física exacta en Gijón, horario comercial y 8 obras documentadas.
- **Debilidades críticas:**
  - **Huella humana eliminada:** Al suprimir el componente `EquipoEEAT` y unificar la autoría del blog únicamente en `Dirección de Construcciones MBL`, la web perdió rostro humano (quién dirige técnicamente las obras, titulaciones o años reales de los responsables, póliza RC o certificaciones de instaladores). No existe una página `/empresa/` o `/sobre-nosotros/` ni `/garantias-y-proceso/` que supla esa cercanía mostrando el equipo técnico real, el seguro de RC y la oficina en Cristasa.
  - **Proyectos sin prueba visual transformadora (*Antes / Después*) ni presupuesto orientativo:** En `src/pages/proyectos/[slug].astro`, se narra «Desafío» y «Solución» con galería posterior, pero **no hay comparativa visual de estado previo vs. terminado** ni indicación orientativa de la inversión o ahorro conseguido.
  - **Fricciones visuales detectadas en `auditoria-imagenes.md`:** Las tarjetas principales de *Reformas Integrales* (`hero-reformas-integrales-asturias.webp` — mesa con planos) y *Locales Comerciales* (`hero-reformas-locales-comerciales.webp` — perfilería metálica sin terminar) proyectan frialdad administrativa o obra en crudo en lugar del resultado habitable/comercial prometido. Adicionalmente, `PA-001` (CIF y Registro Mercantil definitivos en `empresa.ts`) sigue marcado como pendiente antes de salir a producción.

### 5. AEO y GEO (Respuestas e IA) — **9,0 / 10**
- **Fortalezas observadas:** Estructura modelo para motores generativos y fragmentos destacados: `ResumenDirecto` de 40–60 palabras en portada de servicios, localidades, proyectos y blog; tablas `<table>` semánticas limpias con datos cuantitativos `2026`; JSON-LD completo con `GeneralContractor`, `Service`, `WebApplication` y `FAQPage`; y endpoint `/llms.txt`.
- **Oportunidades rápidas de mejora:**
  - **FAQs genéricas repetidas en artículos técnicos:** En `rehabilitacion-de-fachadas-y-tejados-en-asturias-2026-soluciones-definitivas.md` y `como-reformar-una-casa-antigua-en-asturias-paso-a-paso.md` (y potencialmente otros posts migrados) aparecen exactamente las 4 mismas preguntas genéricas de «¿Qué incluye una reforma integral?» en lugar de preguntas reales de fachadas, SATE, tejados o casas de piedra. Esto resta autoridad temática frente a Google y LLMs.
  - **`/llms.txt` incompleto respecto al arsenal real del sitio (`src/pages/llms.txt.ts`):** Lista los servicios, las 3 localidades principales y los 23 posts, pero **omite las 4 nuevas calculadoras interactivas** (`/calculadora-presupuesto-reforma/`, `/licencia-obra-asturias/`, `/calculadora-deducciones-irpf-reforma/`, `/comparador-aerotermia-asturias/`) y las **18 guías locales de licencias e ICIO** (`/licencia-obra-asturias/[concejo]/`), que son precisamente las páginas de mayor valor citable para LLMs cuando alguien pregunta por impuestos o trámites de obra en Asturias.

### 6. Coherencia de Voz y Encaje con Arquetipo — **8,5 / 10**
- **Fortalezas observadas:** Excelente equilibrio entre diseño editorial de alto impacto y claridad utilitaria. El tono de voz evita el lenguaje hueco de catálogo («líderes indiscutibles», «calidad insuperable») y habla con propiedad de la realidad asturiana (bajantes en pisos de los 70, humedad por capilaridad, REBT, declaración responsable TROTU, zonas CTE C1/D1/E1).
- **Puntos de ajuste:** Mantener este mismo tono sobrio y técnico al sustituir las FAQs genéricas heredadas de WordPress y dotar de voz práctica a las nuevas fichas de casos de éxito y páginas de confianza (`/proceso-y-garantias/`).

---

## 5. Estrategia de Arquitectura, Clusters y Activos Diferenciadores

### Mapa de URLs y Contenidos

| URL propuesta | Intención | Embudo | Demanda (Cualitativa) | Acción | Objetivo / Nota estratégica |
|---|---|---|---|---|---|
| `/` | Navegacional / Comercial | BOFU | Alta (SERP) | **Optimizar** | Visibilizar módulo de 4 herramientas Asturias 2026, reemplazar imágenes marcadas en `auditoria-imagenes.md` y añadir bloque de garantías contractuales (plazos/RC). |
| `/calculadora-presupuesto-reforma/` vs `/calcula-el-precio-de-tu-reforma-en-asturias/` | Comercial / Herramienta | MOFU / BOFU | Alta (SERP) | **Fusionar / Diferenciar** | Evitar canibalización: consolidar la experiencia interactiva completa en `/calcula-el-precio-de-tu-reforma-en-asturias/` (URL heredada con tracción) redirigiendo con `301` o convirtiendo `/calculadora-presupuesto-reforma/` en la versión única oficial con selector rápido + desglose PEM/ICIO/IVA. |
| `/reformas-integrales-en-asturias/` | Transaccional | BOFU | Alta (SERP) | **Optimizar** | Sustituir hero por vivienda terminada, añadir tabla comparativa «Presupuesto abierto vs. Presupuesto cerrado MBL», enlace directo a calculadora PEM+IRPF y caso de éxito embebido. |
| `/proyectos/[slug]/` (8 actuales + nuevos) | Comercial / Prueba social | MOFU / BOFU | Media (SERP) | **Reescribir plantilla** | Transformar de galería simple a Caso de Éxito con comparativa *Antes / Después*, inversión orientativa `[DATO_CLIENTE]`, partida técnica resuelta y testimonio vinculado. |
| `/rehabilitacion-fachadas-tejados-asturias/` | Transaccional | BOFU | Alta (SERP) | **Crear nueva** | Captar demanda de SATE, cubiertas, goteras, comunidades y fachadas ventiladas (brecha frente a Goncesco/Level House) enlazando con deducción IRPF 60 %. |
| `/rehabilitacion-casas-pueblo-asturias/` | Transaccional | BOFU | Media-Alta (Nicho rentable) | **Crear nueva** | Captar propietarios de casonas de piedra, hórreos/anexos y casas rurales en Asturias (alto ticket). Conecta el post de casas antiguas a una *money page* real. |
| `/aislamiento-ventanas-humedades-asturias/` *(o bloque transaccional dedicado)* | Transaccional / Comercial | BOFU / MOFU | Alta (SERP) | **Crear nueva** | Atender directamente la demanda invernal asturiana de condensaciones, capilaridad, SATE interior y ventanas PVC/RPT enlazando con IRPF 20–40 %. |
| `/reformas-en-siero/` | Transaccional Local | BOFU | Alta (SERP local) | **Crear nueva** | Atacar búsquedas en Lugones, Pola de Siero y urbanizaciones (La Fresneda) donde Level House ya posiciona y MBL cuenta con casos reales (Ana en Pola de Siero). |
| `/reformas-en-villaviciosa/` | Transaccional Local | BOFU | Media (Alto ticket) | **Crear nueva** | Captar reformas de segunda residencia, casas rurales y unifamiliares en la comarca de la sidra y costa centro-oriental. |
| `/reformas-en-llanera/` | Transaccional Local | BOFU | Media (Alto ticket) | **Crear nueva** | Captar unifamiliares (Soto de Llanera, Pruvia, Lugo de Llanera) y naves/locales del eje central industrial. |
| `/sobre-nosotros-garantias/` *(o `/empresa-y-garantias/`)* | Navegacional / Confianza | MOFU / BOFU | Media (Marca) | **Crear nueva** | Reemplazar el vacío de `EquipoEEAT`: mostrar oficina técnica en Cristasa, metodología de dirección de obra, seguro RC `[DATO_CLIENTE]`, garantía escrita 3/10 años y condiciones de financiación. |
| `/reforma-en-comunidades-y-accesibilidad-asturias/` *(o `/reformas-comunidades-asturias/`)* | Transaccional B2B | BOFU | Media (Alto ticket) | **Crear nueva** | Competir con Goncesco en bajada de ascensores a cota cero, portales, bajantes comunitarias y cubiertas de comunidades en Gijón y Oviedo. |
| `/suelos/...` (3 posts actuales del blog) | Informacional / Comparativa | TOFU / MOFU | Media (SERP) | **Consolidar / Enlazar** | Definir `tarima-flotante-o-suelo-vinilico...` como guía pilar comparativa, diferenciar `suelo-vinilico-en-asturias...` hacia baños/cocinas/locales y `como-elegir-suelo...` hacia precios y calidades 2026 con tabla única cruzada. |
| `/innovacion-sostenible/` y 23 artículos (revisión AEO) | Informacional | TOFU / MOFU | Alta combinada | **Optimizar** | Sustituir FAQs genéricas repetidas por FAQs específicas en cada artículo + insertar módulo dinámico CTA hacia la calculadora/servicio pertinente de ese post. |
| `/llms.txt` | Descubrimiento GEO | Todos | IA / Agentes | **Optimizar** | Añadir sección `## Calculadoras interactivas y licencias municipales (2026)` listando las 4 herramientas y el índice/enlaces a las 18 guías de ICIO por concejo. |
| **Nuevas guías editoriales (Cluster Calendario)** | Informacional / BOFU | MOFU / BOFU | Media–Alta | **Crear nuevas** | 1) *Cuánto cuesta rehabilitar una casa de piedra en Asturias (2026)*; 2) *Subvenciones y deducciones IRPF SATE y ventanas en Asturias: pasos reales*; 3) *Presupuesto cerrado vs. presupuesto por administración: guía para no perder dinero*; 4) *Reforma en comunidad de vecinos en Asturias: permisos y horario de obras*; 5) *Licencia de apertura y reforma de local comercial en Gijón y Oviedo*. |

### Estrategia de Enlazado Interno (Hub & Spoke)

1. **Cluster 1 — Reforma Integral y Presupuestos (Money Hub: `/reformas-integrales-en-asturias/`):**
   - *Spokes:* Posts de «cuándo merece la pena», «10 errores», «convivir con obras», «seguro del hogar», «casas antiguas» + `/reformas-en-gijon/`, `/reformas-en-oviedo/`, `/reformas-en-aviles/`, `/reformas-en-siero/`.
   - *Conversión enlazada:* Cada artículo inserta al 50 % de lectura un bloque contextual hacia `/calculadora-presupuesto-reforma/` (o URL unificada) y al cierre enlaza con anchor descriptivo hacia `/reformas-integrales-en-asturias/` y un caso de éxito real (`/proyectos/reforma-integral-vivienda-asturias/`).
2. **Cluster 2 — Eficiencia, Aislamiento y Ayudas (Money Hubs: `/rehabilitacion-fachadas-tejados-asturias/` y `/aislamiento-ventanas-humedades-asturias/`):**
   - *Spokes:* Guías de aislamiento térmico, rehabilitación de fachadas/tejados, ventanas, humedades en baños/cocinas y ayudas 2026.
   - *Conversión enlazada:* Conexión bidireccional obligatoria con `/calculadora-deducciones-irpf-reforma/` y `/comparador-aerotermia-asturias/` usando anchors como *«calcula cuánto recuperas en tu IRPF (40 % o 60 %)»*.
3. **Cluster 3 — Normativa y Licencias Municipales (Hub: `/licencia-obra-asturias/`):**
   - *Spokes:* Las 18 fichas `/licencia-obra-asturias/[concejo]/`.
   - *Conversión enlazada:* Cada concejo debe enlazar hacia su landing local si existe (Gijón, Oviedo, Avilés y futuras Siero, Villaviciosa, Llanera) y hacia el simulador de presupuesto preseleccionando ese mismo concejo (`?zona=Gijón`).
4. **Visibilidad en Navegación Principal (`Header.astro`):**
   - Añadir un desplegable limpio **`Calculadoras`** (o agrupar bajo **`Herramientas`** en el menú superior o destacar en una franja interactiva bajo el Hero/Servicios en Home) para que las 4 herramientas pasen de tener enlaces de cola en el footer a estar a **1 clic** desde cualquier página.

### Activos Citables y de Conversión Propuestos

1. **«Informe PDF / WhatsApp de Tu Reforma en Asturias» integrado en las 4 Calculadoras:**
   - *Qué resuelve:* Rompe la fricción del «solo estoy mirando precios» y el miedo a no entender partidas ni impuestos. Tras usar la calculadora de Presupuesto, ICIO, IRPF o Aerotermia, el usuario introduce solo su email o WhatsApp (micro-conversión rápida) para recibir el desglose completo con PEM, ICIO de su concejo, IVA y ahorro fiscal antes de pedir visita.
2. **Módulo Interactivo «Antes / Después + Ficha Económica Real» en `/proyectos/[slug]/`:**
   - *Qué resuelve:* Elimina la desconfianza («¿estas fotos serán de banco de imágenes?»). Al deslizar o comparar la vivienda antigua de Gijón/Oviedo frente al estado acabado junto a superficie, plazo real cumplido y horquilla invertida `[DATO_CLIENTE]`, ningún competidor asturiano aporta ese nivel de evidencia visual y financiera.
3. **«Decálogo del Presupuesto Cerrado Blindado y Contrato Tipo MBL» (Sección/Descargable citable):**
   - *Qué resuelve:* Ataca directamente la objeción #1 y #5. Explica en lenguaje llano las 6 cláusulas que protegen al propietario (medición cerrada tras visita, prohibición de ampliaciones sin anexo firmado, hitos de pago vinculados a certificación real, póliza RC `[DATO_CLIENTE]` y limpieza final incluida). Muy citable por LLMs cuando usuarios pregunten *«cómo evitar estafas o sobrecostes en una reforma en Asturias»*.
4. **Índice completo en `/llms.txt` con las 4 Herramientas y 18 Concejos de ICIO:**
   - *Qué resuelve:* Convierte a Construcciones MBL en la fuente primaria que ChatGPT, Perplexity y Gemini citan cuando un usuario pregunta *«cuánto cuesta el ICIO de una reforma en Oviedo / Siero / Llanes en 2026»* o *«cómo deducir aerotermia en el IRPF en Asturias»*.

---

## 6. Banco de Correcciones Concretas (*Antes → Después*)

### Página 1: `/` (Portada — Home)

- **Actual (*Antes*):**
  - `<title>`: `Reformas Integrales y Construcción en Asturias | MBL`
  - `<meta description>`: `Empresa de reformas integrales, cocinas, baños y construcción en Asturias (Gijón, Oviedo y Avilés). Presupuesto cerrado en 48 h y garantía por escrito.`
  - `H1`: `Reformas Integrales y Construcción en Asturias con Presupuesto Cerrado`
  - **Problemas observados:** No muestra las 4 calculadoras estratégicas en la Home ni en el menú superior (`Header.astro`); las imágenes de tarjeta de *Reformas Integrales* y *Locales Comerciales* muestran planos/obra inacabada en vez de espacios terminados; la sección *Método MBL* no explicita el Seguro RC ni el sistema de hitos de pago tras retirar `EquipoEEAT`.
- **Propuesta (*Después*):**
  - **`<title>`:** `Reformas Integrales y Construcción en Asturias | MBL` *(54 caracteres — mantener)*
  - **`<meta description>`:** `Empresa de reformas integrales, cocinas, baños y vivienda nueva en Asturias. Presupuesto cerrado en 48 h, simulador de ICIO/IRPF y garantía escrita.` *(154 caracteres)*
  - **`H1`:** `Reformas Integrales y Construcción en Asturias con Presupuesto Cerrado`
  - **Subtítulo (Hero derecha):** `Transformamos pisos, casas rurales, cocinas, baños y locales en Gijón, Oviedo, Avilés y toda Asturias con presupuesto cerrado por partidas, seguro de responsabilidad civil y garantía escrita.`
  - **CTA Primario / Secundario + Microcopy:**
    - *Primario (HeroQuickSelector):* `Calcular presupuesto en 1 minuto →` (*Microcopy:* `Sin registro obligatorio · Basado en tarifas reales 2026 en Asturias`).
    - *Secundario (nuevo bloque de Herramientas):* `Calcula tu ICIO, deducción IRPF y ahorro con aerotermia`.
  - **Esquema de secciones (`H2` / `H3`) propuesto:**
    1. Hero + Selector rápido (`HeroQuickSelector`).
    2. **Nuestra Historia** + Métricas limpias (sin tarjetas verdes, tal como ya se ajustó).
    3. **Nuestros Servicios** (sustituyendo fotos de Integrales y Locales por obras terminadas + añadiendo tarjetas o acceso a *Fachadas/Tejados* y *Casas de Pueblo*).
    4. **NUEVO BLOQUE — Suite de Herramientas Asturias 2026 (4 tarjetas compactas):** *«Planifica Tu Obra Sin Sorpresas Antes de Pedir Presupuesto»* (enlazando directamente a Presupuesto+PEM, Licencias/ICIO de los 18 concejos, Deducciones IRPF 20–60 % y Comparador Aerotermia).
    5. **Bloque Oscuro Método MBL** (manteniendo carrusel vertical con progreso y añadiendo bullet/mención explícita a *Seguro RC de `[DATO_CLIENTE]` €, pagos por hito certificado y cero anticipos opacos*).
    6. **Proyectos Destacados** (con insignia *Antes/Después* en fichas que dispongan de fotos).
    7. **Explora Nuestra Galería de Obras** (con Lightbox activo y fotos ajustadas a proporción de contenedor según `auditoria-imagenes.md`).
    8. **Opiniones reales de clientes en Asturias** (`4,9/5` Google).
    9. **Reformas en Gijón, Oviedo, Avilés y Área Central** (Gijón, Oviedo, Avilés + acceso rápido a Siero, Villaviciosa y Llanera).
    10. **Consejos, Precios y Normativa en Asturias** + **FAQs AEO**.
  - **Bloque FAQ / AEO (añadir o actualizar en `FAQS_GENERALES`):**
    - *Pregunta:* `¿Qué cubre exactamente el presupuesto cerrado y la garantía escrita de Construcciones MBL?`
    - *Respuesta directa (51 palabras):* `El presupuesto cerrado detalla cada partida y material elegido en contrato tras nuestra visita técnica gratuita, evitando desviaciones por omisiones. Al finalizar emitimos garantía por escrito de hasta 3 años en reformas e instalaciones y 10 años estructurales en obra nueva (LOE), respaldada por nuestro seguro de responsabilidad civil.`
  - **Bloque E-E-A-T / Prueba social:** Incorporar junto a *Método MBL* o tras *Testimonios* una banda sobria de credenciales verificables: *Sede técnica física en Cristasa (Gijón)* · *Póliza de Responsabilidad Civil de `[DATO_CLIENTE]`* · *Garantía escrita 3 / 10 años* · *`4,9/5` en Google Maps*.
- **Justificación estratégica:** Pone la suite de calculadoras (ventaja única en Asturias) frente al usuario en los primeros desplazamientos, corrige la pérdida de confianza humana tras retirar `EquipoEEAT` y alinea la estética de tarjetas con la aspiración del cliente.

---

### Página 2: `/reformas-integrales-en-asturias/`

- **Actual (*Antes*):**
  - `<title>`: `Reformas Integrales en Asturias | Construcciones MBL`
  - `<meta description>`: `Empresa de reformas integrales en Asturias (Gijón, Oviedo y Avilés). Presupuesto cerrado por partidas, gestión de licencias y garantía de hasta 3 años.`
  - `H1`: `Reformas Integrales en Asturias Llave en Mano`
  - **Problemas observados:** Hero visual genérico (mesa con planos y flexómetro), no enlaza con el módulo fiscal de IRPF ni licencias TROTU, y no incluye una comparativa clara que desarme cómo trabaja MBL frente a reformistas que suben el presupuesto a mitad de obra.
- **Propuesta (*Después*):**
  - **`<title>`:** `Reformas Integrales en Asturias con Presupuesto Cerrado | MBL` *(59 caracteres)*
  - **`<meta description>`:** `Reformas integrales llave en mano en Gijón, Oviedo, Avilés y Asturias desde 650 €/m². Presupuesto cerrado en 48 h, licencias municipales y garantía de 3 años.` *(158 caracteres)*
  - **`H1`:** `Reformas Integrales en Asturias Llave en Mano con Presupuesto Cerrado`
  - **Subtítulo:** `Renovamos viviendas completas en Asturias gestionando planos, licencia urbanística, gremios propios y soluciones antihumedad bajo contrato con fecha de entrega cerrada.`
  - **CTA Primario / Secundario + Microcopy:**
    - *Primario:* `Calcular mi reforma con PEM e ICIO →` (hacia `/calculadora-presupuesto-reforma/?tipo=reforma-integral`).
    - *Secundario:* `Solicitar visita técnica gratuita` (scroll al formulario lateral o WhatsApp). *Microcopy:* `Visita en Gijón, Oviedo, Avilés y resto de Asturias · Presupuesto desglosado en 48 h sin compromiso`.
  - **Esquema de secciones (`H2` / `H3`):**
    1. Resumen Directo AEO (`650–1.050 €/m²`, plazo 8–14 semanas, garantía 3 años).
    2. Cuerpo editorial + `FormularioRapidoServicio` lateral.
    3. **NUEVO `H2`: Presupuesto Abierto vs. Presupuesto Cerrado Blindado MBL (Tabla comparativa de objeciones):** Partidas detalladas, imprevistos en bajantes/tabiques antiguos, pagos por hito de obra, plazo firmado y seguro RC `[DATO_CLIENTE]`.
    4. `H2`: ¿Qué Incluye Nuestro Servicio? (lista técnica actual + mención a ensayo de estanqueidad e aislamiento frente a humedad atlántica).
    5. `H2`: Precios y Plazos Orientativos (tabla actual + enlace directo a `Calculadora de Deducciones IRPF 20/40/60 %` para reformas con mejora energética).
    6. **NUEVO `H2`: Caso Real de Reforma Integral en Asturias** (tarjeta destacada de `/proyectos/reforma-integral-vivienda-asturias/` con foto Antes/Después `[DATO_CLIENTE]` e inversión orientativa `[DATO_CLIENTE]`).
    7. `H2`: Así Trabajamos en Tu Proyecto (4 pasos) + Artículos Relacionados + Otros Servicios + FAQs.
  - **Bloque FAQ / AEO (añadir pregunta clave de objeción real):**
    - *Pregunta:* `¿Qué ocurre si aparece un problema oculto en bajantes o estructura durante la reforma de un piso antiguo en Asturias?`
    - *Respuesta directa (53 palabras):* `Durante la visita técnica previa revisamos patologías visibles e instalaciones para minimizar imprevistos. Si al demoler surge un vicio oculto estructural o comunitario, paralizamos esa partida concreta, emitimos una valoración técnica transparente y nunca ejecutamos ni cobramos ningún trabajo adicional sin tu aprobación previa por escrito.`
  - **Bloque E-E-A-T:** Enlace a la ficha real de Gijón `88 m²` + enlace directo a `Comprobar licencias e ICIO de tu concejo` + `[DATO_CLIENTE]` (cifra de póliza RC y año de constitución oficial).
- **Justificación estratégica:** Ataca directamente las objeciones #1 (sobrecostes), #2 (plazos) y #3 (licencias) en la principal página de captación transaccional de la empresa.

---

### Página 3: `/proyectos/[slug]/` (Plantilla de Casos de Éxito)

- **Actual (*Antes*):**
  - Muestra ficha técnica básica (Especialidad, Ubicación, Superficie, Plazo), texto «Desafío» y «Solución», lista de trabajos y galería de imágenes del resultado terminado con Lightbox.
  - **Problemas observados:** Carece de fotografías del «Antes», no ofrece una horquilla económica orientativa para que el cliente calibre su presupuesto, y no vincula la opinión del cliente de esa obra.
- **Propuesta (*Después*):**
  - **`<title>`:** `{titulo} en {municipio} ({superficie}) | Caso Real MBL` *(≤ 60 caracteres)*
  - **`<meta description>`:** `Caso real de {categoria} en {municipio} ({superficie}) en {plazo}. Descubre el antes y después, solución técnica aplicada y pide presupuesto similar.` *(~145–160 caracteres)*
  - **`H1`:** `{titulo} ({superficie} en {municipio})`
  - **Subtítulo:** `{resumen} Ejecutado en {plazo} bajo presupuesto cerrado por partidas y garantía por escrito.`
  - **CTA Primario / Secundario + Microcopy:**
    - *Primario:* `Calcular una obra similar a esta →` (pre-rellena tipo, m² y municipio en la calculadora).
    - *Secundario:* `Consultar precio exacto para mi inmueble` (*Microcopy:* `Usa este proyecto como referencia real para tu vivienda`).
  - **Esquema de secciones (`H2` / `H3`):**
    1. Strip de métricas ampliado: `Especialidad` · `Ubicación` · `Superficie` · `Plazo cumplido` · **`Inversión orientativa: [DATO_CLIENTE]`** · **`Mejora térmica/ahorro: [DATO_CLIENTE]`**.
    2. **NUEVO `H2`: Transformación Visual: Antes y Después de la Obra** (comparador o pareja lado a lado con fotografías del estado previo `[DATO_CLIENTE]` y resultado final con Lightbox).
    3. `H2`: Punto de Partida (El Desafío) y Solución Constructiva Aplicada.
    4. `H2`: Partidas Ejecutadas y Materiales Instalados (mencionando marcas/gamas reales `[DATO_CLIENTE]`).
    5. **NUEVO `H2`: Opinión del Propietario y Garantía Emitida** (vincular reseña real verificada si corresponde a esa obra `[DATO_CLIENTE]`).
    6. Galería completa + Otros Proyectos + CTA Calculadora.
  - **Bloque FAQ / AEO (dinámico por proyecto):**
    - *Pregunta:* `¿Cuánto tardaría y costaría aproximadamente una obra similar de {superficie} en {municipio}?`
    - *Respuesta directa (48 palabras):* `Una intervención equivalente a este proyecto en {municipio} ({superficie}) tiene un plazo habitual de {plazo} desde el inicio de obra y se sitúa en la horquilla de {rango_servicio} según calidades elegidas y estado previo de instalaciones, incluyendo gestión municipal de licencia y garantía por escrito.`
  - **Bloque E-E-A-T:** Fotografías reales previas a la demolición `[DATO_CLIENTE]` + datos verificables de ejecución y testimonio del cliente `[DATO_CLIENTE]`.
- **Justificación estratégica:** Replica la mejor práctica de los referentes nacionales (Kubo / Middö) demostrando capacidad técnica con evidencia visual irrefutable del estado previo vs. final.

---

### Página 4 (NUEVA): `/rehabilitacion-fachadas-tejados-asturias/`

- **Actual (*Antes*):** *Inexistente como página comercial — solo existe un artículo informativo en el blog (`/aislamiento-termico/rehabilitacion-de-fachadas-y-tejados-en-asturias-2026-soluciones-definitivas/`) que apunta erróneamente a `/construccion-de-viviendas-en-asturias/`.*
- **Propuesta (*Después*):**
  - **`<title>`:** `Rehabilitación de Fachadas, SATE y Tejados en Asturias | MBL` *(60 caracteres)*
  - **`<meta description>`:** `Especialistas en rehabilitación de fachadas SATE, fachadas ventiladas, cubiertas y eliminación de goteras en Asturias. Presupuesto cerrado y gestión de ayudas.` *(159 caracteres)*
  - **`H1`:** `Rehabilitación de Fachadas y Tejados en Asturias con Garantía Estanca`
  - **Subtítulo:** `Protege tu vivienda o comunidad frente a la lluvia y humedad atlántica con sistemas SATE, renovación de cubiertas y tramitación técnica de ayudas e IRPF del 60 %.`
  - **CTA Primario / Secundario + Microcopy:**
    - *Primario:* `Solicitar inspección gratuita de fachada o tejado →` (*Microcopy:* `Diagnóstico técnico de filtraciones e informe de soluciones en 48 h`).
    - *Secundario:* `Calcular deducción IRPF del 40 % – 60 %` (enlace directo a `/calculadora-deducciones-irpf-reforma/`).
  - **Esquema de secciones (`H2` / `H3`):**
    1. Resumen Directo AEO (rango orientativo `€/m²` de SATE y cubierta `[DATO_CLIENTE]`, reducción demanda energética 35–55 %, deducción hasta 60 % IRPF).
    2. `H2`: Soluciones para Fachadas en Clima Atlántico (SATE térmico continuo, fachada ventilada, reparación de morteros y balcones, tratamientos anticarbonatación).
    3. `H2`: Reparación e Impermeabilización Integral de Tejados y Cubiertas (teja cerámica/pizarra, panel sándwich, láminas transpirables bajo teja, canalones de zinc/aluminio).
    4. `H2`: Precios Orientativos y Subvenciones / Deducciones IRPF 2026 en Asturias (tabla HTML comparativa + CTA directo a la calculadora de IRPF).
    5. `H2`: Gestión de Licencias de Ocupación de Vía Pública, Andamios y Comunidades de Propietarios.
    6. Formulario lateral + FAQs específicas del servicio.
  - **Bloque FAQ / AEO:**
    - *Pregunta:* `¿Qué diferencia hay entre aplicar SATE o pintura impermeable en una fachada húmeda de Asturias?`
    - *Respuesta directa (52 palabras):* `La pintura impermeable solo sella temporalmente la superficie exterior y no frena el frío ni las condensaciones interiores. El sistema SATE envuelve el edificio con placas aislantes continuas, elimina puentes térmicos, corta la entrada de lluvia y reduce hasta un 50 % la calefacción permitiendo además deducir hasta el 60 % en IRPF.`
  - **Bloque E-E-A-T:** Casos reales de fachada/cubierta ejecutados en Asturias `[DATO_CLIENTE]`, ficha de garantías en estanqueidad `[DATO_CLIENTE]` y referencia de seguro de responsabilidad civil.
- **Justificación estratégica:** Ataca directamente el nicho de ticket alto dominado en Oviedo y Gijón por Goncesco y Level House y aprovecha el tráfico orgánico de los artículos de aislamiento y fachadas enviándolo a una landing coherente que además potencia la calculadora de IRPF.

---

### Página 5 (NUEVA): `/rehabilitacion-casas-pueblo-asturias/`

- **Actual (*Antes*):** *Inexistente como landing transaccional — existe únicamente el post de blog `/reforma-integral/como-reformar-una-casa-antigua-en-asturias-paso-a-paso/` que enlaza genéricamente a `/reformas-integrales-en-asturias/`.*
- **Propuesta (*Después*):**
  - **`<title>`:** `Rehabilitación de Casas Antiguas y de Piedra en Asturias | MBL` *(62 → acortar a `Rehabilitación de Casas Antiguas y Piedra en Asturias | MBL` — 59 caracteres)*
  - **`<meta description>`:** `Reforma y rehabilitación integral de casas de pueblo, casonas de piedra y quintanas en Asturias. Diagnóstico estructural, humedades, tejado y presupuesto cerrado.` *(160 caracteres)*
  - **`H1`:** `Rehabilitación de Casas Antiguas y de Piedra en Asturias`
  - **Subtítulo:** `Recuperamos viviendas rurales, casonas y fincas en toda Asturias conservando su piedra y madera originales, resolviendo humedades de capilaridad y logrando confort térmico actual.`
  - **CTA Primario / Secundario + Microcopy:**
    - *Primario:* `Solicitar inspección técnica previa en la vivienda →` (*Microcopy:* `Revisamos cubierta, vigas, muros de piedra e instalaciones antes de presupuestar`).
    - *Secundario:* `Simular presupuesto y ahorro IRPF →`.
  - **Esquema de secciones (`H2` / `H3`):**
    1. Resumen Directo AEO (`800–1.350 €/m²` según estado estructural, actuación de fuera hacia dentro, drenajes y cubierta).
    2. `H2`: Inspección Técnica Previa: Cómo Evitamos Sorpresas en Casas de Piedra (cimentación, humedad por capilaridad, carcoma/vigas de castaño o roble, forjados).
    3. `H2`: Respeto al Encanto Asturiano con Eficiencia Moderna (encintado de muros de mampostería con morteros de cal transpirables, carpinterías de madera/PVC imitación madera con RPT, aerotermia y suelo radiante).
    4. `H2`: Trámites en Suelo Rural, Consejería de Cultura y Licencias Municipales en Asturias (TROTU, catastro, cambio de uso o rehabilitación en concejos rurales).
    5. `H2`: Rango Orientativo de Costes por Alcance de Rehabilitación (Tabla comparativa: rehabilitación parcial térmica vs. rehabilitación integral con cubierta nueva `[DATO_CLIENTE]`).
    6. Formulario lateral + Enlace a guía paso a paso y nuevas landings de Siero/Villaviciosa/Llanera + FAQs específicas.
  - **Bloque FAQ / AEO:**
    - *Pregunta:* `¿Cómo se eliminan las humedades en los muros de piedra antiguos sin taparlos con pladur húmedo?`
    - *Respuesta directa (54 palabras):* `En muros de mampostería asturiana combinamos drenaje perimetral exterior, inyecciones o cámaras ventiladas en base del muro y revestimientos con mortero de cal transpirable en lugar de plásticos o yesos cerrados. Así el muro respira, evapora la humedad residual de forma controlada y evita desprendimientos o moho detrás de los tabiques.`
  - **Bloque E-E-A-T:** Obras reales en entornos rurales de Asturias (Somió, Villaviciosa, Siero) `[DATO_CLIENTE]`, experiencia en estructura de madera y piedra `[DATO_CLIENTE]`.
- **Justificación estratégica:** Captura una de las búsquedas más rentables y emocionales de Asturias (compradores o herederos de casonas rurales y segundas residencias) con competencia local muy fragmentada en SEO/AEO.

---

## 7. Hoja de Ruta Priorizada (Impacto vs. Esfuerzo)

### Quick Wins (Impacto Alto / Esfuerzo Bajo — Semana 1)
- [ ] **Exponer las 4 Calculadoras en navegación y cuerpo de web:** añadir enlace/desplegable `Herramientas` o `Calculadoras` en `Header.astro`, insertar módulo de 4 tarjetas en `index.astro` y enlaces contextuales al final de `[servicio].astro` y de los 23 posts del blog.
- [ ] **Sanear FAQs genéricas heredadas en el blog:** revisar y reescribir las `faqs:` frontmatter de los posts que conservan preguntas genéricas idénticas (`rehabilitacion-de-fachadas-y-tejados...`, `como-reformar-una-casa-antigua...` y verificar el resto de los 23 Markdown) por preguntas reales de cada temática.
- [ ] **Actualizar `/llms.txt` (`src/pages/llms.txt.ts`):** incorporar la nueva sección con las 4 calculadoras interactivas y la lista/índice de las 18 guías de licencias e ICIO por concejo.
- [ ] **Resolver las 2 imágenes 🔄 CAMBIAR detectadas en `auditoria-imagenes.md`:** sustituir `hero-reformas-integrales-asturias.webp` (mesa con planos) y `hero-reformas-locales-comerciales.webp` (tabiquería metálica vacía) por fotos de vivienda terminada y local finalizado `[DATO_CLIENTE]`.
- [ ] **Cerrar `PA-001` antes del corte DNS:** confirmar CIF y datos del Registro Mercantil en `src/data/empresa.ts`.

### Mejoras Estructurales (Impacto Alto / Esfuerzo Medio — Semanas 2 a 4)
- [ ] **Resolver canibalización de calculadoras de presupuesto:** unificar `/calcula-el-precio-de-tu-reforma-en-asturias/` y `/calculadora-presupuesto-reforma/` en un único endpoint canónico (manteniendo `301` desde la otra URL) que combine la inmediatez del selector y el desglose PEM+ICIO+IVA.
- [ ] **Añadir captura de lead suave en las 4 Calculadoras:** botón opcional *«Recibir este informe detallado con partidas, ICIO e IRPF por WhatsApp / Email»* sin bloquear el cálculo gratuito.
- [ ] **Crear las nuevas *Money Pages* prioritarias:**
  - `/rehabilitacion-fachadas-tejados-asturias/`
  - `/rehabilitacion-casas-pueblo-asturias/`
  - `/reformas-en-siero/`, `/reformas-en-villaviciosa/` y `/reformas-en-llanera/`
  - `/sobre-nosotros-garantias/` (supliendo la ausencia de `EquipoEEAT` con solvencia institucional, póliza RC, proceso por hitos y sede real en Cristasa).
- [ ] **Evolucionar `/proyectos/[slug]/`:** añadir comparador visual *Antes / Después*, campo de rango de inversión orientativa y testimonio del cliente asociado.

### Activos de Autoridad y Escala (Largo Plazo — Mes 2+)
- [ ] **Crear landings secundarias de expansión comercial:** `/aislamiento-ventanas-humedades-asturias/` y `/reformas-comunidades-asturias/` (accesibilidad cota cero y portales).
- [ ] **Desplegar los 5 artículos BOFU/MOFU faltantes** y auditar/consolidar la intención del sub-cluster de 3 posts de suelos (`tarima vs vinílico`).
- [ ] **Publicar 1 caso de éxito nuevo al mes** documentado con fotografía *Antes / Después* desde el inicio de cada obra destacada en Gijón, Oviedo, Siero y costa asturiana.
- [ ] **Construir activo citable «Guía del Contrato de Reforma Cerrado en Asturias»** (página de referencia + checklist descargable vinculada desde toda la web).

---

## 8. Puente con el SRS (Pendiente de aprobación)

*(Este bloque no modifica todavía ningún archivo de requisitos ni código en `src/`. Requiere confirmación del usuario para trasladar los bloques aprobados al SRS y desarrollo).*

- **Nuevos `RF` / `RNF` sugeridos para incorporar si se aprueban:**
  - `RF-TOOL-005`: Captura opcional de lead (envío por Email/WhatsApp de desglose PEM+ICIO+IRPF) integrada en los resultados de las 4 calculadoras interactivas.
  - `RF-SERV-004`: Ampliación del catálogo de servicios en `servicios` para cubrir **Rehabilitación de Fachadas, SATE y Tejados**, **Rehabilitación de Casas Antiguas/Piedra**, **Aislamiento/Ventanas/Humedades** y **Comunidades/Accesibilidad**.
  - `RF-LOC-002`: Ampliación de la colección `localidades` a **Siero**, **Villaviciosa** y **Llanera** (Fase 2 de SEO Local).
  - `RF-PROY-002`: Evolución de esquema Zod en `proyectos` para admitir galería pareada `antesDespues[]`, `inversionOrientativa` y `testimonioId`.
  - `RF-CORP-001`: Nueva página de autoridad institucional y garantías (`/sobre-nosotros-garantias/`) en reemplazo estratégico del antiguo componente `EquipoEEAT`.

- **Preguntas abiertas (`PA-NNN`) a consultar al cliente por `[DATO_CLIENTE]`:**
  1. **PA-019 (Prioridad Alta):** Confirmar si Construcciones MBL desea promocionar activamente como líneas comerciales dedicadas en portada y catálogo: (a) Rehabilitación de fachadas/SATE y cubiertas, (b) Rehabilitación de casas de pueblo/piedra, y (c) Obras en comunidades de propietarios (portales/accesibilidad).
  2. **PA-020 (Prioridad Alta):** Aportar datos reales de respaldo contractual para E-E-A-T en sustitución de `EquipoEEAT`: capital asegurado de la Póliza de Responsabilidad Civil (RC), si existe cláusula de penalización por demora o forma exacta de fraccionamiento de pagos por hitos, y fotografías reales de oficina técnica/directivos en obra (si se desean mostrar).
  3. **PA-021 (Prioridad Media):** Aportar fotografías del estado **Antes** y rangos de inversión orientativos reales (o permiso para mostrar horquillas equivalentes) para enriquecer las fichas en `/proyectos/[slug]/`.
  4. **PA-022 (Prioridad Media):** Confirmar nuevas fotografías propias terminadas para reemplazar las tarjetas genéricas de *Reformas Integrales* (mesa con planos) y *Locales Comerciales* (estructura pladur sin acabar) detectadas en [auditoria-imagenes.md](../../../auditoria-imagenes.md).
  5. **PA-023 (Prioridad Media):** Decidir si `/calcula-el-precio-de-tu-reforma-en-asturias/` y `/calculadora-presupuesto-reforma/` se unifican en una sola URL canónica (con `301` desde la otra) para evitar canibalización en buscadores.

- **Posibles `ADR` afectados:**
  - Actualización de `ADR-005` (Integración del simulador único de presupuesto y envío de desgloses de las 4 herramientas hacia `/api/lead`).
  - Actualización de `ADR-003` (Nuevas rutas locales/servicios y eventual redirección `301` de consolidación entre las dos URLs de calculadora de presupuesto).

- **Siguiente paso recomendado:** Revisar la Sección 6 y Sección 7 y confirmar qué bloque aprobar primero (`Quick Wins` de visibilidad/calculadoras/FAQs/`llms.txt`, creación de nuevas *Money Pages* o transformación de Casos de Éxito *Antes/Después*) para documentarlo en el SRS (`gestionar-srs` / `gestionar-pa`) y ejecutarlo cumpliendo `seo-geo-aeo-mbl` y `sistema-visual-mbl`.
