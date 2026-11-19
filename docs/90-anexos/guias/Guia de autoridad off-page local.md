---
id: DOC-GUI-002
tipo: guia
titulo: Guía de autoridad off-page local y seguimiento SEO/GEO
estado: vigente
creado: 2026-11-19
actualizado: 2026-11-19
---

# Guía de autoridad off-page local y seguimiento SEO/GEO

> Estrategia práctica de autoridad externa y medición para **Construcciones MBL** (`MBL CONSTRUCCIONES S.L.`) orientada a Asturias, diseñada para obtener señales reales en Google y motores generativos (ChatGPT, Perplexity, AI Overviews) **sin recurrir a redes automáticas de intercambio de backlinks**.

---

## 1. Por qué descartamos redes automáticas de intercambio de enlaces
Las plataformas basadas en intercambio automatizado de enlaces por créditos (estilo *BabyLoveGrowth*) intercambian enlaces contextuales dentro de blogs de usuarios de la propia red. Para una empresa constructora local en Asturias esto presenta tres desventajas claras:
1. **Riesgo de esquema de enlaces (*link schemes*)**: los intercambios recíprocos o circulares automatizados contravienen las directrices antispam de Google y pueden devaluarse de golpe en futuras actualizaciones.
2. **Degradación de marca**: obliga a incrustar enlaces salientes hacia negocios ajenos dentro del blog propio, rompiendo la coherencia editorial y la estética cuidada de [[mbl-maqueta.html]].
3. **Baja relevancia geográfica**: la mayoría de dominios participantes pertenecen a nichos SaaS globales o en otros idiomas, aportando poca o ninguna señal local para búsquedas en Gijón, Oviedo y Avilés.

En su lugar, se aplican **cuatro pilares locales seguros y sostenibles**.

---

## 2. Pilar 1 — Google Business Profile (GBP) como eje de autoridad local
Ficha asociada: **`Place ID: ChIJN_H9_Jyih2MRXyPsrrG4cWg`** ([[IE-004]]).

1. **Consistencia NAP absoluta (`RNF-SEO-005`)**:
   - Nombre comercial unificado (según decisión de [[PA-014]]).
   - Dirección: `Av. Argentina 132 (Cristasa of. 221), 33213 Gijón, Asturias`.
   - Teléfono: `+34 684 675 898` · Web: `https://construccionesmbl.com/`.
   - Horario: Lunes a Viernes `10:00–14:00` y `16:00–19:00`.
2. **Categorías y servicios en ficha**: alinear la categoría principal (*Empresa de reformas / Contratista general*) y secundarias (*Reformas de cocinas*, *Reformas de baños*, *Constructor de viviendas*, *Reformas de locales comerciales*) con las 6 páginas de servicio de la web.
3. **Cadencia visual y publicaciones**: subir al menos **2 fotografías reales de obra terminada** y **1 novedad mensual** en GBP enlazando al artículo o servicio correspondiente.
4. **Protocolo de reseñas tras cada fin de obra**:
   - Enviar al cliente al entregar la obra el enlace directo de reseña de Google Maps.
   - Responder el **100 % de las reseñas** en menos de 72 horas mencionando de forma natural el tipo de reforma y el municipio (p. ej. *«Gracias por confiar en nosotros para la reforma integral de tu piso en Gijón»*), evitando respuestas robotizadas.
   - Mantener la coherencia entre el conteo real en GBP y el `aggregateRating` del JSON-LD ([[PA-013]]).

---

## 3. Pilar 2 — Citaciones locales y directorios sectoriales en España/Asturias
Mantener exactamente los mismos datos **NAP** en directorios de alto peso sectorial y local que los modelos de IA y Google consultan para validar entidades locales:

| Prioridad | Plataforma / Directorio | Objetivo principal |
|---|---|---|
| Alta | **Google Business Profile** + **Apple Business Connect** + **Bing Places** | Mapas, asistentes de voz (Siri/Apple, Copilot/Bing) y búsquedas locales |
| Alta | **Habitissimo** · **Houzz España** · **Cronoshare** · **Homify** | Citación sectorial de reformas, portfolio visual y señales de confianza |
| Alta | **Instagram** (`@construccionesmbl`) y **Facebook** oficiales | Coherencia `sameAs` en Schema.org y prueba social activa |
| Media | **Páginas Amarillas** · **QDQ** · **Europages** · **Axesor/Informa** (tras corregir CIF en [[PA-001]]) | Validación societaria y consistencia NAP española |
| Media | **Cámara de Comercio de Gijón** / **FADE** / **CAC-Asprocon** (si la empresa es socia o participa en eventos) | Autoridad institucional y citación local en el Principado de Asturias |

---

## 4. Pilar 3 — Enlaces editoriales genuinos y activos enlazables
1. **Activos enlazables locales (*linkable assets*)**: mantener actualizadas anualmente dos guías de referencia con datos reales de Asturias que medios regionales, blogs inmobiliarios o arquitectos puedan citar:
   - *Ayudas y Subvenciones para Reformas y Eficiencia Energética en Asturias*.
   - *Precios reales por m² de reformas y construcción de viviendas en Asturias*.
2. **Alianzas reales locales**: intercambiar menciones legítimas (colaboraciones de obra, reseñas de proveedores de materiales, estudios de arquitectura o inmobiliarias de Gijón, Oviedo y Avilés con los que exista relación real de trabajo).

---

## 5. Pilar 4 — Seguimiento mensual SEO y GEO sin software de pago
Una revisión mensual de 30 minutos sustituye los paneles de seguimiento externos:

1. **Google Search Console (propiedad propia nueva, [[PA-015]])**:
   - Comprobar cobertura sin errores `404` tras las redirecciones `301`/`410` de WordPress.
   - Revisar evolución de clics e impresiones por ciudad (*Gijón*, *Oviedo*, *Avilés*, *Asturias*) y detectar artículos candidatos a refresco trimestral.
2. **Google Analytics 4 propio ([[PA-012]])**:
   - Crear un filtro/segmento de tráfico de referencia desde buscadores IA (`chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com`) y medir sus conversiones (`submit_contacto`, `submit_simulador`, `click_telefono`, `click_whatsapp`).
3. **Auditoría manual mensual de 15 prompts GEO en Asturias**:
   - Consultar en modo incógnito en Google AI Overviews, ChatGPT Search y Perplexity un listado fijo de preguntas reales (ej.: *«¿Cuánto cuesta reformar una cocina en Asturias?»*, *«Mejores empresas de reformas integrales en Gijón»*, *«Cuánto cuesta cambiar bañera por plato de ducha en Asturias»*).
   - Registrar si **Construcciones MBL** aparece citada o enlazada, qué fuentes cita la IA en su lugar y qué datos concretos (tablas de precios, garantías, reseñas o licencias locales) conviene reforzar en la siguiente actualización de [[Flujo editorial SEO GEO AEO]].
