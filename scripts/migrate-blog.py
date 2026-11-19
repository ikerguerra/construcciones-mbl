#!/usr/bin/env python3
"""
Extrae, sanea y enriquece (AEO/GEO/SEO) los 23 artículos de WordPress
generando los archivos Markdown en src/content/blog/<slug>.md.
"""

from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRATCH = Path(r"C:\Users\ikerg\.gemini\antigravity\brain\cda17336-24f2-4897-b772-4141c89a26ac\scratch")
BLOG_DIR = ROOT / "src" / "content" / "blog"

CAT_NAMES = {
    "reforma-integral": "Reforma Integral",
    "vivienda-sostenible": "Vivienda Sostenible",
    "aislamiento-termico": "Aislamiento Térmico",
    "construccion-casa": "Construcción de Casas",
    "reformas-de-banos": "Reformas de Baños",
    "reformas-de-cocinas": "Reformas de Cocinas",
    "reformas-locales-comerciales": "Locales Comerciales",
    "ayudas-y-subvenciones": "Ayudas y Subvenciones",
    "tarimas-y-suelos": "Tarimas y Suelos",
    "consejos-practicos": "Consejos Prácticos",
    "mantenimiento": "Mantenimiento",
}

POST_META: dict[int, dict] = {
    2587: {
        "slug": "reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles",
        "categoria": "vivienda-sostenible",
        "urlHeredadaWp": "/uncategorized/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/",
        "titulo": "Reforma de baños y cocinas en Asturias: cómo evitar condensaciones y humedades con soluciones sostenibles",
        "metaTitle": "Humedades y Condensación en Baños y Cocinas en Asturias | MBL",
        "metaDescription": "Cómo eliminar el moho y la condensación al reformar baños y cocinas en Asturias: ventilación higrorregulable, aislamiento de puentes térmicos y materiales.",
        "resumenAeo": "Para erradicar la condensación y el moho en baños y cocinas de Asturias no basta con pintar: hay que mantener la humedad relativa entre el 45 % y el 60 % mediante extractores higrorregulables o VMC, eliminar puentes térmicos con trasdosado aislado e instalar revestimientos y morteros transpirables.",
        "autor": "equipo-tecnico",
        "servicioRelacionado": "/reformas-de-banos-en-asturias/",
        "servicioRelacionadoNombre": "Reformas de Baños en Asturias",
        "imagen": "../../assets/images/blog/humedades-condensacion-banos-cocinas.webp",
        "imagenAlt": "Baño reformado en Asturias con ventilación eficiente y materiales resistentes a la humedad",
        "rel": [
            "/reformas-de-banos/5-materiales-sostenibles-que-estan-revolucionando-la-reforma-de-banos/",
            "/aislamiento-termico/aislamiento-termico-en-asturias-2026-guia-definitiva-para-ahorrar-energia/",
        ],
        "tabla": """| Solución antihumedad | Coste orientativo | Reducción de moho | Aplicación recomendada en Asturias |
| --- | --- | --- | --- |
| Extractor higrorregulable silencioso | 180 – 380 € | Alta (70 %) | Baños interiores o con ventana pequeña |
| Trasdosado térmico con barrera de vapor | 55 – 85 €/m² | Muy alta (90 %) | Paredes frías orientadas al norte o fachadas |
| Pintura mineral al silicato / cal transpirable | 14 – 24 €/m² | Media-alta | Techos de baños y cocinas propensos a vapor |
| Ventilación mecánica con recuperación (VMC) | 2.800 – 5.200 € | Total (98 %) | Reforma integral de vivienda húmeda |""",
        "faqs": [
            {
                "pregunta": "¿Por qué sale moho negro en el techo del baño en Asturias aunque ventile?",
                "respuesta": "Porque en invierno el aire exterior asturiano ya supera el 80 % de humedad relativa. Si el techo o encuentro con la fachada está frío (puente térmico), el vapor de la ducha condensa al instante sobre la superficie fría.",
            },
            {
                "pregunta": "¿Qué es mejor en un baño sin ventana: extractor con interruptor o higrostato?",
                "respuesta": "Un extractor con higrostato (higrorregulable) y temporizador: sigue evacuando vapor automáticamente después de salir de la ducha hasta bajar la humedad por debajo del umbral de condensación.",
            },
            {
                "pregunta": "¿Qué junta cerámica resiste mejor la humedad en duchas?",
                "respuesta": "El mortero de juntas epoxi o cementoso aditivado hidrófugo y antifúngico evita que el poro absorba agua y ennegrezca con el uso diario.",
            },
        ],
    },
    2437: {
        "slug": "suelo-vinilico-en-asturias-ventajas-tipos-y-por-que-debes-confiar-en-un-profesional",
        "categoria": "vivienda-sostenible",
        "urlHeredadaWp": "/vivienda-sostenible/suelo-vinlico-en-asturias-ventajas-tipos-y-por-qu-debes-confiar-en-un-profesional/",
        "titulo": "Suelo vinílico en Asturias: ventajas, tipos SPC/LVT y claves de instalación profesional",
        "metaTitle": "Suelo Vinílico SPC en Asturias: Ventajas, Tipos e Instalación",
        "metaDescription": "Guía técnica sobre suelo vinílico SPC y LVT en Asturias: resistencia 100 % al agua, nivelación de subsuelo, precios por m² y por qué exige montaje experto.",
        "resumenAeo": "El suelo vinílico rígido SPC es 100 % impermeable e inmune a la humedad ambiental de Asturias. Su instalación profesional oscila entre 45 y 78 €/m² (material, manta acústica y mano de obra incluidos) y exige nivelar el soporte a menos de 2 mm para evitar que los clics cedan o marquen juntas.",
        "autor": "equipo-tecnico",
        "servicioRelacionado": "/reformas-parciales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Parciales y Suelos en Asturias",
        "imagen": "../../assets/images/blog/suelo-vinilico-asturias.webp",
        "imagenAlt": "Instalación profesional de suelo vinílico SPC con acabado madera en vivienda de Asturias",
        "rel": [
            "/vivienda-sostenible/tarima-flotante-o-suelo-vinilico-guia-definitiva-para-elegir-el-mejor-suelo-para-tu-casa-en-asturias/",
            "/reforma-integral/como-elegir-suelo-para-tu-reforma-en-asturias-tipos-durabilidad-y-precio-por-m2-guia-2026/",
        ],
        "tabla": """| Tipo de vinílico | Núcleo y grosor | Precio instalado en Asturias | Uso ideal |
| --- | --- | --- | --- |
| Vinílico flexible LVT encolado | PVC flexible (2 – 3 mm) | 40 – 60 €/m² | Suelos perfectamente nivelados con pasta |
| Vinílico LVT clic estándar | PVC multicapa (4 – 5 mm) | 45 – 65 €/m² | Dormitorios y salones residenciales |
| Vinílico rígido SPC con base IXPE | Carbonato cálcico (5,5 – 7 mm) | 52 – 78 €/m² | Toda la vivienda incluyendo cocina, baño y suelo radiante |""",
        "faqs": [
            {
                "pregunta": "¿Se puede colocar suelo vinílico SPC encima del azulejo antiguo en Asturias?",
                "respuesta": "Sí, siempre que las baldosas estén firmes y se regularicen las juntas profundas con pasta niveladora para que no se telegrafíen con el paso del tiempo.",
            },
            {
                "pregunta": "¿Qué capa de uso necesita un suelo vinílico para vivienda o local?",
                "respuesta": "Recomendamos capa de uso mínima de 0,55 mm (Clase 33/42), que soporta mascotas, sillas con ruedas y tránsito comercial sin desgastar el dibujo.",
            },
            {
                "pregunta": "¿El suelo vinílico SPC funciona con suelo radiante?",
                "respuesta": "Sí. Por su alta densidad mineral tiene una resistencia térmica muy baja, transmitiendo el calor mejor que una tarima laminada gruesa.",
            },
        ],
    },
    2422: {
        "slug": "tarima-flotante-o-suelo-vinilico-guia-definitiva-para-elegir-el-mejor-suelo-para-tu-casa-en-asturias",
        "categoria": "vivienda-sostenible",
        "urlHeredadaWp": "/vivienda-sostenible/tarima-flotante-o-suelo-vinlico-guia-definitiva-para-elegir-el-mejor-suelo-para-tu-casa-en-asturias/",
        "titulo": "Tarima flotante o suelo vinílico: comparativa definitiva para viviendas en Asturias",
        "metaTitle": "Tarima Flotante o Suelo Vinílico en Asturias: Comparativa 2026",
        "metaDescription": "¿Tarima laminada AC5 o suelo vinílico SPC para una casa en Asturias? Comparamos comportamiento frente a humedad, calidez, precio por m² y durabilidad.",
        "resumenAeo": "En Asturias, el suelo vinílico SPC gana en pisos continuos sin cortes en cocina y baño gracias a su impermeabilidad total (50–78 €/m² instalado), mientras que la tarima flotante laminada AC5 hidrófuga ofrece mayor calidez térmica a la pisada y precio más contenido (35–58 €/m² instalado) en salones y dormitorios.",
        "autor": "equipo-tecnico",
        "servicioRelacionado": "/reformas-parciales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Parciales en Asturias",
        "imagen": "../../assets/images/blog/tarima-o-suelo-vinilico.webp",
        "imagenAlt": "Comparativa de muestras de tarima flotante y suelo vinílico SPC en reforma en Asturias",
        "rel": [
            "/vivienda-sostenible/suelo-vinilico-en-asturias-ventajas-tipos-y-por-que-debes-confiar-en-un-profesional/",
            "/reforma-integral/como-elegir-suelo-para-tu-reforma-en-asturias-tipos-durabilidad-y-precio-por-m2-guia-2026/",
        ],
        "tabla": "",
        "faqs": [
            {
                "pregunta": "¿Se hincha la tarima flotante con la humedad de Asturias?",
                "respuesta": "Una tarima AC5 de tablero HDF hidrófugo con cantos sellados no se hincha por la humedad ambiental normal, pero sí sufre si hay fugas de agua estancada, por lo que en baños y cocinas es preferible vinílico SPC o porcelánico.",
            },
            {
                "pregunta": "¿Cuál hace menos ruido al pisar: la tarima o el vinílico?",
                "respuesta": "El suelo vinílico SPC con base acústica IXPE integrada produce un sonido más sordo y silencioso al caminar con calzado o mascotas que la tarima laminada tradicional.",
            },
            {
                "pregunta": "¿Puedo poner el mismo suelo continuo en toda la casa sin juntas en las puertas?",
                "respuesta": "Con suelo vinílico SPC de gama alta es posible cubrir paños continuos amplios incluyendo cocina y baño; en tarima flotante es obligatorio respetar juntas de dilatación perimetrales y en pasos de puerta según fabricante.",
            },
        ],
    },
    2383: {
        "slug": "como-afecta-una-reforma-al-seguro-del-hogar-en-asturias-lo-que-debes-saber-guia-2026",
        "categoria": "reforma-integral",
        "titulo": "Cómo afecta una reforma al seguro del hogar en Asturias: guía práctica 2026",
        "metaTitle": "Cómo Afecta una Reforma al Seguro del Hogar en Asturias (2026)",
        "metaDescription": "Descubre qué cubre tu seguro de hogar durante una reforma en Asturias, qué póliza de Responsabilidad Civil exigir a la empresa constructora y cómo actualizarlo.",
        "resumenAeo": "Antes de iniciar una reforma en Asturias debes exigir a la constructora su póliza de Responsabilidad Civil en vigor (mínimo 300.000–600.000 €) y recibo al día, notificar la obra a tu aseguradora si supera el umbral de tu póliza y actualizar el capital de continente al terminar para evitar infraseguro.",
        "autor": "borja-direccion",
        "servicioRelacionado": "/reformas-integrales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Integrales en Asturias",
        "imagen": "../../assets/images/blog/reforma-seguro-hogar-asturias.webp",
        "imagenAlt": "Revisión de póliza de seguro de hogar y contrato de obra en reforma en Asturias",
        "rel": [
            "/reforma-integral/10-errores-a-evitar-en-una-reforma-integral-de-vivienda/",
            "/reforma-integral/reformas-integrales-en-gijon-guia-definitiva-antes-de-empezar/",
        ],
        "tabla": """| Situación durante o tras la reforma | Quién responde | Documentación necesaria en Asturias |
| --- | --- | --- |
| Rotura accidental de tubería durante la obra con daño al vecino | Seguro RC de la empresa constructora | Contrato de obra, factura y póliza RC vigente de la empresa |
| Robo por andamio exterior o puerta sin cerrar en obra | Póliza hogar (si se notificó) / RC constructora | Denuncia y comunicación previa de obra a la aseguradora |
| Siniestro un año después tras revalorizar vivienda un 30 % | Seguro de hogar del propietario | Capital de continente actualizado tras el fin de obra |""",
        "faqs": [],
    },
    2359: {
        "slug": "como-elegir-suelo-para-tu-reforma-en-asturias-tipos-durabilidad-y-precio-por-m2-guia-2026",
        "categoria": "reforma-integral",
        "urlHeredadaWp": "/reforma-integral/cmo-elegir-suelo-para-tu-reforma-en-asturias-tipos-durabilidad-y-precio-por-m-gua-2026/",
        "titulo": "Cómo elegir suelo para tu reforma en Asturias: tipos, durabilidad y precio por m² (Guía 2026)",
        "metaTitle": "Cómo Elegir Suelo para tu Reforma en Asturias: Precios €/m²",
        "metaDescription": "Comparativa de suelos para reformas en Asturias (porcelánico, vinílico SPC, tarima AC5 y madera natural): precios reales instalados por m² y durabilidad.",
        "resumenAeo": "Elegir pavimento en Asturias depende de la humedad y el sistema de calefacción: la tarima laminada AC5 cuesta entre 35 y 58 €/m² instalada, el vinílico rígido SPC entre 50 y 78 €/m², el gres porcelánico entre 65 y 105 €/m² y el parquet multicapa de madera natural entre 85 y 140 €/m².",
        "autor": "equipo-tecnico",
        "servicioRelacionado": "/reformas-integrales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Integrales en Asturias",
        "imagen": "../../assets/images/blog/como-elegir-suelo-reforma.webp",
        "imagenAlt": "Muestrario de suelos porcelánicos, vinílicos y laminados para reforma en Asturias",
        "rel": [
            "/vivienda-sostenible/tarima-flotante-o-suelo-vinilico-guia-definitiva-para-elegir-el-mejor-suelo-para-tu-casa-en-asturias/",
            "/vivienda-sostenible/suelo-vinilico-en-asturias-ventajas-tipos-y-por-que-debes-confiar-en-un-profesional/",
        ],
        "tabla": "",
        "faqs": [],
    },
    2340: {
        "slug": "casas-prefabricadas-y-minicasas-en-asturias-es-legal-donde-se-pueden-instalar-guia-2026",
        "categoria": "construccion-casa",
        "urlHeredadaWp": "/construccion-casa/casas-prefabricadas-y-minicasas-en-asturias-es-legal-dnde-se-pueden-instalar-gua-2026/",
        "titulo": "Casas prefabricadas y minicasas en Asturias: ¿es legal y dónde se pueden instalar? (Guía 2026)",
        "metaTitle": "Casas Prefabricadas y Minicasas en Asturias: Normativa 2026",
        "metaDescription": "¿Dónde es legal instalar una casa prefabricada o minicasa en Asturias? Normativa CUOTA, tipos de suelo urbanizable o núcleo rural, licencias y costes reales.",
        "resumenAeo": "En Asturias una casa prefabricada o modular destinada a vivienda requiere exactamente los mismos requisitos legales que una casa tradicional (suelo urbano o de núcleo rural edificable, proyecto visado por arquitecto, cumplimiento del CTE y licencia municipal), con un coste real llave en mano de 1.350 a 1.950 €/m².",
        "autor": "borja-direccion",
        "servicioRelacionado": "/construccion-de-viviendas-en-asturias/",
        "servicioRelacionadoNombre": "Construcción de Viviendas en Asturias",
        "imagen": "../../assets/images/blog/casas-prefabricadas-minicasas-asturias.webp",
        "imagenAlt": "Vivienda modular eficiente integrada en parcela rural edificable en Asturias",
        "rel": [
            "/construccion-casa/cuanto-cuesta-construir-una-casa-en-asturias-precios-reales-por-m2/",
            "/construccion-casa/vivienda-sostenible-en-asturias-2026-como-construir-y-reformar-con-futuro/",
        ],
        "tabla": "",
        "faqs": [
            {
                "pregunta": "¿Puedo poner una minicasa o casa prefabricada en una finca rústica no urbanizable en Asturias?",
                "respuesta": "No para uso residencial permanente. En suelo no urbanizable la normativa asturiana (CUOTA) prohíbe el uso de vivienda salvo vinculación acreditada a explotación agraria prioritaria autorizada.",
            },
            {
                "pregunta": "¿Si la minicasa tiene ruedas o no lleva cimentación evita pedir licencia en Asturias?",
                "respuesta": "No. Si tiene vocación de permanencia o conexión a suministros (agua, fosa séptica, electricidad) en una finca, los ayuntamientos asturianos y el SEPRONA la consideran implantación residencial sujeta a licencia urbanística.",
            },
            {
                "pregunta": "¿Qué tipo de terreno debo buscar en Asturias para instalar una vivienda modular legal?",
                "respuesta": "Debes buscar una parcela calificada como Suelo Urbano o Suelo de Núcleo Rural con edificabilidad residencial permitida en la cédula urbanística del Ayuntamiento correspondiente.",
            },
        ],
    },
    2312: {
        "slug": "como-convivir-con-las-obras-en-casa-guia-de-supervivencia-para-reformas-en-asturias",
        "categoria": "consejos-practicos",
        "titulo": "Cómo convivir con las obras en casa: guía práctica para reformas en Asturias",
        "metaTitle": "Cómo Convivir con las Obras en Casa Durante una Reforma | MBL",
        "metaDescription": "Consejos prácticos para organizar tu casa, proteger muebles, niños y mascotas y reducir el estrés durante una reforma parcial o de baño/cocina en Asturias.",
        "resumenAeo": "Convivir con una reforma en casa es viable en obras parciales, de baño (1–2 semanas) o cocina (2–4 semanas) si se sectoriza la vivienda con cortinas antipolvo con cremallera, se pactan horarios cerrados (8:30–18:00) y se habilita una zona temporal de microondas y baño alternativo.",
        "autor": "borja-direccion",
        "servicioRelacionado": "/reformas-parciales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Parciales en Asturias",
        "imagen": "../../assets/images/blog/convivir-con-obras-casa.webp",
        "imagenAlt": "Protección profesional de suelos y mobiliario durante reforma en vivienda habitada",
        "rel": [
            "/reforma-integral/10-errores-a-evitar-en-una-reforma-integral-de-vivienda/",
            "/reformas-de-banos/cambio-de-banera-por-plato-de-ducha-en-asturias-2026-guia-completa/",
        ],
        "tabla": "",
        "faqs": [
            {
                "pregunta": "¿En qué reformas se puede seguir viviendo en casa y en cuáles es mejor mudarse?",
                "respuesta": "Puedes quedarte en cambios de plato de ducha (48 h), reforma de baño si tienes un segundo aseo, cocinas y reformas parciales por estancias. En una reforma integral con demolición completa y corte de suministros es necesario alojarse fuera.",
            },
            {
                "pregunta": "¿Cómo evitáis que el polvo del picado pase al resto de habitaciones?",
                "respuesta": "Instalamos pantallas plásticas con cierre de cremallera, sellamos rejillas, protegemos el suelo de pasillos con cartón prensado y aspiramos a diario al finalizar la jornada.",
            },
            {
                "pregunta": "¿Qué horario de ruidos se respeta en las comunidades de propietarios en Asturias?",
                "respuesta": "Respetamos estrictamente las ordenanzas municipales de Gijón, Oviedo y Avilés, concentrando trabajos de percusión en días laborables entre las 9:00 y las 18:00 horas.",
            },
        ],
    },
    2196: {
        "slug": "guia-de-mantenimiento-para-tu-nuevo-plato-de-ducha-cuidalo-y-durara-toda-la-vida",
        "categoria": "mantenimiento",
        "titulo": "Guía de mantenimiento para tu nuevo plato de ducha de resina o carga mineral",
        "metaTitle": "Cómo Limpiar y Mantener tu Plato de Ducha de Resina | Guía MBL",
        "metaDescription": "Aprende a cuidar tu plato de ducha de carga mineral y mampara antical en Asturias: rutina diaria de 2 minutos, productos prohibidos y cuándo renovar silicona.",
        "resumenAeo": "Un plato de ducha de resina con carga mineral y gel coat dura más de 20 años intacto si se aclara tras cada uso, se limpia semanalmente con jabón pH neutro y paño de microfibra (evitando lejía pura, amoniaco o estropajos metálicos) y se revisa el cordón de silicona antifúngica una vez al año.",
        "autor": "equipo-tecnico",
        "servicioRelacionado": "/cambio-de-banera-por-plato-de-ducha-en-asturias-oferta-expres-48-horas/",
        "servicioRelacionadoNombre": "Cambio de Bañera por Plato de Ducha en 48 h",
        "imagen": "../../assets/images/blog/mantenimiento-plato-ducha.webp",
        "imagenAlt": "Plato de ducha de carga mineral y mampara de vidrio impecables tras mantenimiento",
        "rel": [
            "/reformas-de-banos/cambio-de-banera-por-plato-de-ducha-en-asturias-2026-guia-completa/",
            "/vivienda-sostenible/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/",
        ],
        "tabla": "",
        "faqs": [
            {
                "pregunta": "¿Puedo usar lejía o antical agresivo sobre un plato de ducha de resina?",
                "respuesta": "No se recomienda usar lejía pura, salfumán ni disolventes dejados en reposo, ya que pueden matizar la capa protectora de gel coat. Para manchas de cal usa vinagre blanco diluido en agua tibia y aclara bien.",
            },
            {
                "pregunta": "¿Cada cuánto tiempo hay que limpiar el sifón o válvula del plato de ducha?",
                "respuesta": "Conviene levantar la rejilla embellecedora y extraer el cestillo retenedor de cabellos cada 3 o 4 semanas para mantener el caudal máximo de evacuación.",
            },
            {
                "pregunta": "¿Cuándo debo renovar la silicona perimetral del plato de ducha?",
                "respuesta": "En cuanto observes que algún tramo pierde adherencia o presenta puntos oscuros permanentes (normalmente cada 3 a 5 años), aplicando siempre silicona neutra sanitaria antifúngica.",
            },
        ],
    },
    2179: {
        "slug": "como-elegir-ventanas-para-tu-casa-en-asturias-materiales-acristalamiento-e-instalacion-guia-2026",
        "categoria": "aislamiento-termico",
        "urlHeredadaWp": "/aislamiento-termico/cmo-elegir-ventanas-para-tu-casa-en-asturias-materiales-acristalamiento-e-instalacin-gua-2026/",
        "titulo": "Cómo elegir ventanas para tu casa en Asturias: PVC o aluminio RPT, vidrio e instalación (Guía 2026)",
        "metaTitle": "Cómo Elegir Ventanas en Asturias: PVC vs Aluminio RPT (2026)",
        "metaDescription": "Guía para cambiar ventanas en Asturias: diferencias entre PVC y aluminio con rotura de puente térmico, vidrio bajo emisivo, control solar y precios por ventana.",
        "resumenAeo": "Para el clima húmedo y ventoso de Asturias la configuración óptima combina carpintería de PVC (5–7 cámaras) o aluminio con rotura de puente térmico (RPT), apertura oscilobatiente, vidrio doble bajo emisivo con gas argón y cajón de persiana aislado, con un coste medio instalado de 480 a 950 € por ventana.",
        "autor": "equipo-tecnico",
        "servicioRelacionado": "/reformas-parciales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Parciales y Ventanas en Asturias",
        "imagen": "../../assets/images/blog/como-elegir-ventanas-asturias.webp",
        "imagenAlt": "Instalación de ventana eficiente con rotura de puente térmico en vivienda de Asturias",
        "rel": [
            "/aislamiento-termico/aislamiento-termico-en-asturias-2026-guia-definitiva-para-ahorrar-energia/",
            "/ayudas-y-subvenciones/ayudas-y-subvenciones-para-reformas-en-asturias-2026-guia-definitiva/",
        ],
        "tabla": "",
        "faqs": [],
    },
    2172: {
        "slug": "reformas-de-locales-comerciales-en-asturias-2026-de-la-idea-a-la-apertura",
        "categoria": "reformas-locales-comerciales",
        "titulo": "Reformas de locales comerciales en Asturias (2026): de la idea a la apertura",
        "metaTitle": "Reformas de Locales Comerciales en Asturias 2026 | Guía MBL",
        "metaDescription": "Guía paso a paso para reformar y abrir un local comercial en Asturias: estudio previo del bajo, licencia de actividad, accesibilidad PMR, plazos y costes €/m².",
        "resumenAeo": "Abrir y reformar un local comercial en Asturias requiere un presupuesto medio de 550 a 1.100 €/m² y un plazo de 4 a 10 semanas. Revisar la viabilidad técnica del bajo (salida de humos, altura libre, accesibilidad PMR y aislamiento acústico) antes de firmar el alquiler ahorra hasta un 30 % en imprevistos.",
        "autor": "borja-direccion",
        "servicioRelacionado": "/reforma-de-locales-comerciales-en-asturias/",
        "servicioRelacionadoNombre": "Reforma de Locales Comerciales en Asturias",
        "imagen": "../../assets/images/blog/reformas-locales-comerciales-asturias.webp",
        "imagenAlt": "Local comercial reformado y listo para apertura al público en Asturias",
        "rel": [
            "/reforma-integral/como-afecta-una-reforma-al-seguro-del-hogar-en-asturias-lo-que-debes-saber-guia-2026/",
            "/reforma-integral/10-errores-a-evitar-en-una-reforma-integral-de-vivienda/",
        ],
        "tabla": "",
        "faqs": [],
    },
    2154: {
        "slug": "cambio-de-banera-por-plato-de-ducha-en-asturias-2026-guia-completa",
        "categoria": "reformas-de-banos",
        "urlHeredadaWp": "/reformas-de-banos/cambio-de-baera-por-plato-de-ducha-en-asturias-2026-gua-completa/",
        "titulo": "Cambio de bañera por plato de ducha en Asturias (2026): guía completa de precios y materiales",
        "metaTitle": "Cambio de Bañera por Plato de Ducha en Asturias | Guía 2026",
        "metaDescription": "Todo sobre el cambio de bañera por plato de ducha en Asturias en 48 horas: precios reales, platos de carga mineral antideslizantes Grado 3, mamparas y ayudas.",
        "resumenAeo": "El cambio de bañera por plato de ducha en Asturias se ejecuta en 24 a 48 horas con un coste desde 1.190 € (base) hasta 2.300 € en paquete completo todo incluido con plato de carga mineral antideslizante Clase 3, alicatado de la zona descubierta, mampara de cristal templado y grifería.",
        "autor": "equipo-tecnico",
        "servicioRelacionado": "/cambio-de-banera-por-plato-de-ducha-en-asturias-oferta-expres-48-horas/",
        "servicioRelacionadoNombre": "Cambio de Bañera por Plato de Ducha en 48 Horas",
        "imagen": "../../assets/images/blog/cambio-banera-plato-ducha.webp",
        "imagenAlt": "Resultado de cambio de bañera por plato de ducha antideslizante en baño de Asturias",
        "rel": [
            "/mantenimiento/guia-de-mantenimiento-para-tu-nuevo-plato-de-ducha-cuidalo-y-durara-toda-la-vida/",
            "/reformas-de-banos/5-materiales-sostenibles-que-estan-revolucionando-la-reforma-de-banos/",
        ],
        "tabla": """| Opción de cambio en 48 h | Rango orientativo | Plazo | Qué incluye |
| --- | --- | --- | --- |
| Sustitución base (plato + obra) | 1.190 – 1.550 € | 24 – 48 h | Retirada bañera, desagüe, plato carga mineral C3 y azulejo zona bañera |
|Cambio con mampara antical | 1.580 – 2.050 € | 48 h | Sustitución base + mampara cristal templado 6/8 mm |
| Pack completo Todo Incluido MBL | 1.850 – 2.300 € | 48 h | Plato C3 + alicatado hasta 2 m² + mampara + columna termostática |""",
        "faqs": [],
    },
    2138: {
        "slug": "rehabilitacion-de-fachadas-y-tejados-en-asturias-2026-soluciones-definitivas",
        "categoria": "aislamiento-termico",
        "urlHeredadaWp": "/aislamiento-termico/rehabilitacin-de-fachadas-y-tejados-en-asturias-2026-soluciones-definitivas/",
        "titulo": "Rehabilitación de fachadas y tejados en Asturias (2026): soluciones definitivas frente a la lluvia",
        "metaTitle": "Rehabilitación de Fachadas y Tejados en Asturias | Guía 2026",
        "metaDescription": "Soluciones duraderas para rehabilitar fachadas SATE, fachadas ventiladas y cubiertas en Asturias: diagnóstico de filtraciones, materiales y subvenciones 2026.",
        "resumenAeo": "Rehabilitar una fachada o cubierta en Asturias con sistema SATE o cubierta ventilada impermeable elimina filtraciones y reduce entre un 35 % y un 55 % la demanda de calefacción. Además, las actuaciones que mejoran la envolvente térmica pueden acogerse a subvenciones autonómicas y deducciones IRPF de hasta el 60 %.",
        "autor": "equipo-tecnico",
        "servicioRelacionado": "/construccion-de-viviendas-en-asturias/",
        "servicioRelacionadoNombre": "Rehabilitación y Construcción de Viviendas en Asturias",
        "imagen": "../../assets/images/blog/rehabilitacion-fachadas-tejados.webp",
        "imagenAlt": "Rehabilitación térmica de fachada y cubierta en vivienda de Asturias",
        "rel": [
            "/aislamiento-termico/aislamiento-termico-en-asturias-2026-guia-definitiva-para-ahorrar-energia/",
            "/ayudas-y-subvenciones/ayudas-y-subvenciones-para-reformas-en-asturias-2026-guia-definitiva/",
        ],
        "tabla": """| Actuación en envolvente | Coste orientativo en Asturias | Vida útil estimada | Ahorro energético medio |
| --- | --- | --- | --- |
| Fachada SATE (8 – 10 cm aislamiento) | 75 – 115 €/m² | +30 años | 35 % – 45 % en calefacción |
| Fachada ventilada cerámica / composite | 125 – 185 €/m² | +40 años | 40 % – 50 % + máxima resistencia costera |
| Rehabilitación cubierta con panel/lámina | 95 – 160 €/m² | +35 años | 25 % – 35 % (evita pérdidas por techo) |""",
        "faqs": [],
    },
    2132: {
        "slug": "reforma-integral-en-asturias-cuando-merece-la-pena-hacerla-guia-2026",
        "categoria": "reforma-integral",
        "urlHeredadaWp": "/reforma-integral/reforma-integral-en-asturias-cundo-merece-la-pena-hacerla-gua-2026/",
        "titulo": "Reforma integral en Asturias: ¿cuándo merece la pena hacerla? (Guía 2026)",
        "metaTitle": "Reforma Integral en Asturias: ¿Cuándo Merece la Pena? (2026)",
        "metaDescription": "5 señales claras de que tu vivienda en Asturias necesita una reforma integral en vez de parches: instalaciones de más de 25 años, ahorro y revalorización.",
        "resumenAeo": "Hacer una reforma integral en Asturias (650–1.050 €/m²) es más rentable que encadenar reformas parciales cuando la vivienda supera los 25–30 años con tuberías de hierro/plomo, cuadro eléctrico antiguo o mala distribución, ahorrando hasta un 25 % respecto a reformar estancia por estancia en años distintos.",
        "autor": "borja-direccion",
        "servicioRelacionado": "/reformas-integrales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Integrales en Asturias",
        "imagen": "../../assets/images/blog/cuando-merece-pena-reforma-integral.webp",
        "imagenAlt": "Salón luminoso de piso en Asturias tras reforma integral completa",
        "rel": [
            "/reforma-integral/reformas-integrales-en-gijon-guia-definitiva-antes-de-empezar/",
            "/reforma-integral/10-errores-a-evitar-en-una-reforma-integral-de-vivienda/",
        ],
        "tabla": """| Comparativa de estrategia | Reforma integral de una vez (85 m²) | Reformar por partes en 4 años |
| --- | --- | --- |
| Presupuesto total acumulado | 55.250 – 89.250 € | 68.000 – 108.000 € (+20 % en duplicidades) |
| Plazo total de molestias | 10 – 12 semanas concentradas | 4 periodos de obra distintos viviendo dentro |
| Coherencia de suelos e instalaciones | 100 % continua y garantizada | Empalmes parciales y distintos lotes de material |""",
        "faqs": [],
    },
    2120: {
        "slug": "aislamiento-termico-en-asturias-2026-guia-definitiva-para-ahorrar-energia",
        "categoria": "aislamiento-termico",
        "urlHeredadaWp": "/aislamiento-termico/aislamiento-termico-en-asturias-2026-gua-definitiva-para-ahorrar-energia/",
        "titulo": "Aislamiento térmico en Asturias (2026): guía definitiva para ahorrar energía y eliminar humedad",
        "metaTitle": "Aislamiento Térmico en Asturias 2026: Soluciones y Precios",
        "metaDescription": "Cómo aislar un piso o casa en Asturias contra el frío y la humedad: insuflado en cámara, trasdosado con lana de roca, SATE, ventanas y subvenciones vigentes.",
        "resumenAeo": "Un buen aislamiento térmico en Asturias reduce la factura de calefacción entre un 35 % y un 60 % y evita las condensaciones interiores. En pisos, el trasdosado interior con lana mineral (48–78 €/m²) o el insuflado en cámara son las opciones más rápidas; en chalets y comunidades destaca el SATE exterior.",
        "autor": "equipo-tecnico",
        "servicioRelacionado": "/reformas-parciales-en-asturias/",
        "servicioRelacionadoNombre": "Aislamiento y Reformas Parciales en Asturias",
        "imagen": "../../assets/images/blog/aislamiento-termico-asturias.webp",
        "imagenAlt": "Instalación de aislamiento térmico interior en vivienda de Asturias",
        "rel": [
            "/aislamiento-termico/como-elegir-ventanas-para-tu-casa-en-asturias-materiales-acristalamiento-e-instalacion-guia-2026/",
            "/ayudas-y-subvenciones/ayudas-y-subvenciones-para-reformas-en-asturias-2026-guia-definitiva/",
        ],
        "tabla": """| Sistema de aislamiento | Precio orientativo en Asturias | Pérdida de espacio interior | Ahorro térmico estimado |
| --- | --- | --- | --- |
| Insuflado en cámara de aire existente | 22 – 38 €/m² | 0 cm (rellena cámara) | 20 % – 30 % |
| Trasdosado autoportante Pladur + lana mineral | 48 – 78 €/m² | 6 – 8 cm en muros exteriores | 35 % – 45 % + mejora acústica |
| Sistema SATE por el exterior | 75 – 115 €/m² | 0 cm interiores | 40 % – 55 % (elimina puentes térmicos) |""",
        "faqs": [
            {
                "pregunta": "¿Cuántos centímetros quita un trasdosado térmico interior en un piso de Gijón u Oviedo?",
                "respuesta": "Normalmente entre 6 y 8 cm únicamente en las paredes que dan a la fachada exterior o patios fríos, manteniendo intacta la superficie en los tabiques interiores.",
            },
            {
                "pregunta": "¿Qué aislante funciona mejor frente a la humedad de Asturias: lana de roca, XPS o poliuretano?",
                "respuesta": "La lana mineral de roca aporta excelente aislamiento térmico, absorción acústica y comportamiento incombustible; el poliestireno extruido (XPS) destaca en zócalos, cubiertas y zonas con riesgo de contacto con humedad.",
            },
            {
                "pregunta": "¿Sirve de algo aislar las paredes si mantengo ventanas antiguas de aluminio simple?",
                "respuesta": "El resultado queda incompleto: el calor se escapará por el vidrio y el marco metálico, donde además se concentrará toda la condensación. Conviene combinar trasdosado en muros fríos con ventanas RPT.",
            },
        ],
    },
    2114: {
        "slug": "vivienda-sostenible-en-asturias-2026-como-construir-y-reformar-con-futuro",
        "categoria": "construccion-casa",
        "titulo": "Vivienda sostenible en Asturias (2026): cómo construir y reformar con eficiencia real",
        "metaTitle": "Vivienda Sostenible en Asturias 2026: Aerotermia y Aislamiento",
        "metaDescription": "Cómo diseñar o reformar una vivienda sostenible y eficiente en Asturias en 2026: envolvente térmica, aerotermia con suelo radiante, VMC y retorno de inversión.",
        "resumenAeo": "Construir o rehabilitar una vivienda sostenible en Asturias se basa en tres pilares adaptados al clima norteño: envolvente continua sin puentes térmicos, ventilación mecánica con recuperación de calor (VMC) y aerotermia con suelo radiante, logrando consumos de climatización inferiores a 35–50 €/mes.",
        "autor": "borja-direccion",
        "servicioRelacionado": "/construccion-de-viviendas-en-asturias/",
        "servicioRelacionadoNombre": "Construcción de Viviendas en Asturias",
        "imagen": "../../assets/images/blog/vivienda-sostenible-asturias.webp",
        "imagenAlt": "Vivienda unifamiliar sostenible de alta eficiencia energética en Asturias",
        "rel": [
            "/construccion-casa/cuanto-cuesta-construir-una-casa-en-asturias-precios-reales-por-m2/",
            "/aislamiento-termico/aislamiento-termico-en-asturias-2026-guia-definitiva-para-ahorrar-energia/",
        ],
        "tabla": """| Tecnología sostenible en Asturias | Inversión orientativa (vivienda 130 m²) | Ahorro anual estimado | Amortización media |
| --- | --- | --- | --- |
| Envolvente SATE + carpintería triple vidrio RPT | 16.000 – 24.000 € | 700 – 1.100 €/año | 8 – 11 años (más confort inmediato) |
| Aerotermia + suelo radiante | 11.500 – 17.500 € | 600 – 950 €/año frente a gasóleo/eléctrica | 6 – 9 años |
| Ventilación VMC con recuperador de calor | 3.800 – 6.200 € | 250 – 400 €/año + 0 % condensación | 7 – 10 años |""",
        "faqs": [
            {
                "pregunta": "¿Funciona bien la aerotermia con el clima húmedo e invernal de Asturias?",
                "respuesta": "Funciona de forma excelente: Asturias tiene inviernos suaves en la franja central y costera (raramente bajo 0 °C), lo que permite que las bombas de calor aerotérmicas trabajen con un rendimiento (COP) superior a 4.",
            },
            {
                "pregunta": "¿Merece la pena poner placas solares fotovoltaicas en Asturias con tantos días nublados?",
                "respuesta": "Sí, como apoyo a la aerotermia. Aunque la radiación es menor que en el sur, los paneles actuales producen con radiación difusa y cubren gran parte del consumo diurno entre marzo y octubre.",
            },
            {
                "pregunta": "¿Cuánto encarece hacer una casa altamente eficiente frente a una básica?",
                "respuesta": "Entre un 8 % y un 14 % en la inversión inicial, que se recupera mediante facturas energéticas mínimas, subvenciones disponibles y mayor valor de tasación.",
            },
        ],
    },
    2103: {
        "slug": "ayudas-y-subvenciones-para-reformas-en-asturias-2026-guia-definitiva",
        "categoria": "ayudas-y-subvenciones",
        "titulo": "Ayudas y subvenciones para reformas en Asturias (2026): guía práctica de requisitos",
        "metaTitle": "Ayudas y Subvenciones para Reformas en Asturias 2026 | Guía",
        "metaDescription": "Qué ayudas, subvenciones y deducciones de IRPF (20 %, 40 % y 60 %) puedes solicitar al reformar tu vivienda en Asturias en 2026: eficiencia y accesibilidad.",
        "resumenAeo": "En 2026 las reformas en Asturias que mejoren la eficiencia energética (ventanas, aislamiento, aerotermia) o la accesibilidad (cambio a plato de ducha, rampas) pueden combinar ayudas autonómicas/municipales con deducciones en el IRPF del 20 % al 60 %, exigiendo siempre certificado energético previo y posterior a la obra.",
        "autor": "borja-direccion",
        "servicioRelacionado": "/reformas-integrales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Integrales en Asturias",
        "imagen": "../../assets/images/blog/ayudas-subvenciones-reformas-asturias.webp",
        "imagenAlt": "Documentación técnica y certificado energético para ayudas a la reforma en Asturias",
        "rel": [
            "/aislamiento-termico/aislamiento-termico-en-asturias-2026-guia-definitiva-para-ahorrar-energia/",
            "/aislamiento-termico/como-elegir-ventanas-para-tu-casa-en-asturias-materiales-acristalamiento-e-instalacion-guia-2026/",
        ],
        "tabla": """| Línea de incentivo / deducción en Asturias | Porcentaje de apoyo | Requisito técnico principal |
| --- | --- | --- |
| Deducción IRPF reducción demanda (ventanas / aislamiento) | 20 % (base máx. 5.000 €) | Reducir al menos un 7 % la demanda de calefacción y refrigeración |
| Deducción IRPF ahorro energía primaria no renovable | 40 % (base máx. 7.500 €) | Reducir un 30 % el consumo de energía primaria o alcanzar clase A/B |
| Rehabilitación energética de edificio / vivienda | Hasta 60 % (deducción plurianual) | Actuación en conjunto edificatorio con certificado energético previo y final |
| Ayudas de accesibilidad municipal / Principado | 30 % – 50 % según convocatoria | Supresión de barreras arquitectónicas, bañera por ducha a mayores o PMR |""",
        "faqs": [
            {
                "pregunta": "¿Por qué es obligatorio hacer un certificado energético ANTES de empezar la reforma?",
                "respuesta": "Porque tanto Hacienda como el Principado exigen comparar el certificado energético registrado antes del inicio de las obras con el emitido al finalizar para demostrar objetivamente el porcentaje de ahorro conseguido.",
            },
            {
                "pregunta": "¿Se puede pagar en efectivo una reforma si quiero pedir subvención o deducción en el IRPF?",
                "respuesta": "Nunca. Todas las facturas deben abonarse exclusivamente mediante transferencia bancaria, tarjeta o cheque nominativo al contratista que ejecuta la obra.",
            },
            {
                "pregunta": "¿Construcciones MBL entrega las facturas desglosadas para presentar a ayudas?",
                "respuesta": "Sí. Emitimos presupuesto y facturación desglosada especificando materiales, transmitancias térmicas o partidas subvencionables conforme exigen las bases técnicas.",
            },
        ],
    },
    2090: {
        "slug": "reformas-integrales-en-gijon-guia-definitiva-antes-de-empezar",
        "categoria": "reforma-integral",
        "titulo": "Reformas integrales en Gijón: guía definitiva de precios, barrios y licencias antes de empezar",
        "metaTitle": "Reformas Integrales en Gijón: Precios, Licencias y Guía 2026",
        "metaDescription": "Guía práctica antes de hacer una reforma integral en Gijón: precios reales por m², declaración responsable en el Ayuntamiento de Gijón y claves por barrio.",
        "resumenAeo": "Una reforma integral en Gijón cuesta entre 650 y 1.050 €/m² (unos 55.250–89.250 € para un piso estándar de 85 m²) y tarda de 10 a 12 semanas. En barrios costeros como La Arena, Cimadevilla o Poniente es vital priorizar ventanas de PVC o aluminio RPT con herraje anticorrosión frente al salitre.",
        "autor": "borja-direccion",
        "servicioRelacionado": "/reformas-en-gijon/",
        "servicioRelacionadoNombre": "Empresa de Reformas en Gijón",
        "imagen": "../../assets/images/blog/reformas-integrales-gijon.webp",
        "imagenAlt": "Costa de San Lorenzo y edificios residenciales para reformas integrales en Gijón",
        "rel": [
            "/reforma-integral/reforma-integral-en-asturias-cuando-merece-la-pena-hacerla-guia-2026/",
            "/reforma-integral/10-errores-a-evitar-en-una-reforma-integral-de-vivienda/",
        ],
        "tabla": "",
        "faqs": [],
    },
    2036: {
        "slug": "cuanto-cuesta-construir-una-casa-en-asturias-precios-reales-por-m2",
        "categoria": "construccion-casa",
        "urlHeredadaWp": "/construccion-casa/cuanto-cuesta-construir-una-casa-en-asturias-precios-reales-por-m%c2%b2/",
        "titulo": "Cuánto cuesta construir una casa en Asturias en 2026: precios reales por m² y gastos ocultos",
        "metaTitle": "Cuánto Cuesta Construir una Casa en Asturias: Precio m² 2026",
        "metaDescription": "Desglose real de cuánto cuesta construir una casa unifamiliar en Asturias en 2026: precio de construcción por m², arquitecto, licencias, geotécnico e impuestos.",
        "resumenAeo": "En 2026 el coste de ejecución constructiva de una vivienda unifamiliar en Asturias se sitúa entre 1.450 y 2.100 €/m² según calidades y pendiente de la parcela. Al presupuesto de obra hay que sumar un 18 %–22 % adicional en honorarios técnicos (arquitecto y aparejador), licencia municipal (ICIO), geotécnico e IVA (10 %).",
        "autor": "borja-direccion",
        "servicioRelacionado": "/construccion-de-viviendas-en-asturias/",
        "servicioRelacionadoNombre": "Construcción de Viviendas en Asturias",
        "imagen": "../../assets/images/blog/cuanto-cuesta-construir-casa-asturias.webp",
        "imagenAlt": "Vivienda unifamiliar de nueva construcción en parcela de Asturias",
        "rel": [
            "/construccion-casa/casas-prefabricadas-y-minicasas-en-asturias-es-legal-donde-se-pueden-instalar-guia-2026/",
            "/construccion-casa/vivienda-sostenible-en-asturias-2026-como-construir-y-reformar-con-futuro/",
        ],
        "tabla": """| Capítulo de inversión (casa 140 m² en Asturias) | Rango orientativo 2026 | % sobre el total (sin terreno) |
| --- | --- | --- |
| Construcción llave en mano (1.450 – 2.100 €/m²) | 203.000 – 294.000 € | 80 % – 83 % |
| Proyecto arquitectónico, dirección y estudio geotécnico | 14.000 – 21.000 € | 6 % – 7 % |
| Licencia municipal (ICIO + tasas) y acometidas | 9.500 – 15.000 € | 4 % – 5 % |
| Escritura obra nueva, registro e IVA (10 % autopromoción) | 22.000 – 32.000 € | ~10 % |""",
        "faqs": [],
    },
    2029: {
        "slug": "como-reformar-una-casa-antigua-en-asturias-paso-a-paso",
        "categoria": "reforma-integral",
        "titulo": "Cómo reformar una casa antigua o de piedra en Asturias paso a paso",
        "metaTitle": "Cómo Reformar una Casa Antigua en Asturias Paso a Paso | MBL",
        "metaDescription": "Guía técnica para rehabilitar una casa antigua o de aldea en Asturias: diagnóstico de cubierta y estructura, drenaje de capilaridad, aislamiento y presupuesto.",
        "resumenAeo": "Para reformar con éxito una casa antigua o de piedra en Asturias hay que actuar de fuera hacia dentro: primero asegurar estructura, cubierta e impermeabilización frente a capilaridad; después renovar instalaciones y aislar con materiales transpirables; y por último ejecutar distribución y acabados (800–1.350 €/m²).",
        "autor": "borja-direccion",
        "servicioRelacionado": "/reformas-integrales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Integrales y Rehabilitación en Asturias",
        "imagen": "../../assets/images/blog/reformar-casa-antigua-asturias.webp",
        "imagenAlt": "Rehabilitación interior y estructural de casa antigua en Asturias",
        "rel": [
            "/aislamiento-termico/rehabilitacion-de-fachadas-y-tejados-en-asturias-2026-soluciones-definitivas/",
            "/reforma-integral/reforma-integral-en-asturias-cuando-merece-la-pena-hacerla-guia-2026/",
        ],
        "tabla": """| Fase crítica en casa antigua asturiana | Qué se resuelve | Peso medio en presupuesto |
| --- | --- | --- |
| 1. Cubierta, forjados y consolidación estructural | Goteras, vigas dañadas y estabilidad | 25 % – 35 % |
| 2. Drenaje perimetral, solera ventilada y capilaridad | Humedad que sube del terreno a los muros de piedra | 12 % – 18 % |
| 3. Aislamiento térmico, ventanas RPT e instalaciones | Confort invernal, fontanería, electricidad y aerotermia | 28 % – 35 % |
| 4. Distribución interior, baños, cocina y acabados | Estética, conservación de piedra/madera vista y equipamiento | 20 % – 28 % |""",
        "faqs": [],
    },
    1718: {
        "slug": "10-errores-a-evitar-en-una-reforma-integral-de-vivienda",
        "categoria": "reforma-integral",
        "titulo": "10 errores a evitar en una reforma integral de vivienda en Asturias",
        "metaTitle": "10 Errores a Evitar en una Reforma Integral en Asturias | MBL",
        "metaDescription": "Evita sobrecostes y retrasos en tu reforma integral en Asturias: los 10 errores más frecuentes en presupuestos, materiales, instalaciones y elección de empresa.",
        "resumenAeo": "Los tres errores que más encarecen una reforma integral en Asturias son aceptar presupuestos sin mediciones desglosadas por partidas (generan desviaciones del 20 %–35 %), comprar materiales por cuenta propia sin coordinar plazos de obra y no renovar instalaciones ocultas ni aislamiento térmico al levantar suelos y paredes.",
        "autor": "borja-direccion",
        "servicioRelacionado": "/reformas-integrales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Integrales en Asturias",
        "imagen": "../../assets/images/blog/errores-evitar-reforma-integral.webp",
        "imagenAlt": "Planificación técnica en obra para evitar errores en reforma integral en Asturias",
        "rel": [
            "/reforma-integral/reforma-integral-en-asturias-cuando-merece-la-pena-hacerla-guia-2026/",
            "/reforma-integral/como-afecta-una-reforma-al-seguro-del-hogar-en-asturias-lo-que-debes-saber-guia-2026/",
        ],
        "tabla": """| Error frecuente en la reforma | Consecuencia habitual | Cómo lo evitamos en Construcciones MBL |
| --- | --- | --- |
| Presupuesto genérico de 1 página | Sobrecostes del 20 % al 35 % a mitad de obra | Presupuesto cerrado y desglosado partida a partida |
| No definir enchufes e iluminación antes de rozas | Regatas repetidas y cables vistos | Plano eléctrico validado contigo en obra antes de cerrar tabiques |
| Esccatimar en aislamiento y ventanas en Asturias | Piso bonito pero frío y con condensación | Estudio de puentes térmicos y carpintería RPT desde el inicio |""",
        "faqs": [],
    },
    1688: {
        "slug": "casos-de-exito-asi-ahorran-nuestros-clientes-con-sus-hogares-sostenibles",
        "categoria": "reforma-integral",
        "titulo": "Casos reales en Asturias: cuánto ahorran nuestros clientes tras una reforma eficiente",
        "metaTitle": "Casos de Éxito: Ahorro Energético en Reformas en Asturias",
        "metaDescription": "Ejemplos reales en Gijón, Oviedo y Avilés: cuánto se reduce la factura de luz, calefacción y agua al incorporar aislamiento, ventanas RPT y grifería eficiente.",
        "resumenAeo": "Incorporar criterios de eficiencia al reformar una vivienda en Gijón, Oviedo o Avilés reduce entre un 35 % y un 45 % el gasto anual en calefacción (unos 550–850 €/año de ahorro en un piso de 85 m²) y hasta un 35 % el consumo de agua caliente mediante grifería termostática y electrodomésticos eficientes.",
        "autor": "borja-direccion",
        "servicioRelacionado": "/reformas-integrales-en-asturias/",
        "servicioRelacionadoNombre": "Reformas Integrales Eficientes en Asturias",
        "imagen": "../../assets/images/blog/casos-exito-hogares-sostenibles.webp",
        "imagenAlt": "Vivienda reformada en Asturias con alto confort térmico e iluminación LED",
        "rel": [
            "/aislamiento-termico/aislamiento-termico-en-asturias-2026-guia-definitiva-para-ahorrar-energia/",
            "/ayudas-y-subvenciones/ayudas-y-subvenciones-para-reformas-en-asturias-2026-guia-definitiva/",
        ],
        "tabla": "",
        "faqs": [],
    },
    1583: {
        "slug": "cuanto-cuesta-reformar-una-cocina-en-asturias-2026-guia-actualizada",
        "categoria": "reformas-de-cocinas",
        "titulo": "¿Cuánto cuesta reformar una cocina en Asturias en 2026? Desglose real por partidas",
        "metaTitle": "¿Cuánto Cuesta Reformar una Cocina en Asturias? Precios 2026",
        "metaDescription": "Precios reales para reformar una cocina en Asturias en 2026: desglose de albañilería, fontanería, electricidad, muebles, encimera y cómo optimizar tu inversión.",
        "resumenAeo": "Reformar una cocina completa en Asturias en 2026 cuesta entre 6.500 y 14.500 € para una superficie estándar de 8 a 12 m² con plazo de 2 a 4 semanas. Aproximadamente el 35 %–40 % corresponde a albañilería e instalaciones nuevas y el 60 %–65 % a mobiliario, encimera y equipamiento.",
        "autor": "borja-direccion",
        "servicioRelacionado": "/reformas-de-cocinas-en-asturias/",
        "servicioRelacionadoNombre": "Reformas de Cocinas en Asturias",
        "imagen": "../../assets/images/blog/cuanto-cuesta-reformar-cocina.webp",
        "imagenAlt": "Cocina reformada a medida en Asturias con isla y acabados de alta durabilidad",
        "rel": [
            "/vivienda-sostenible/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/",
            "/reforma-integral/como-elegir-suelo-para-tu-reforma-en-asturias-tipos-durabilidad-y-precio-por-m2-guia-2026/",
        ],
        "tabla": "",
        "faqs": [],
    },
    1544: {
        "slug": "5-materiales-sostenibles-que-estan-revolucionando-la-reforma-de-banos",
        "categoria": "reformas-de-banos",
        "titulo": "5 materiales sostenibles y duraderos que transforman la reforma de baños en Asturias",
        "metaTitle": "5 Materiales Sostenibles para Reformas de Baños en Asturias",
        "metaDescription": "Descubre los 5 materiales sostenibles más resistentes a la humedad para reformar tu baño en Asturias: porcelánico reciclado, grifería eco y pinturas minerales.",
        "resumenAeo": "Los materiales sostenibles más eficaces para reformar un baño en Asturias combinan resistencia a la humedad atlántica y ahorro diario: cerámica y vidrio con alto porcentaje reciclado, pinturas minerales transpirables antihongo, platos de carga mineral, grifería termostática con limitador de caudal (ahorra un 35 % de agua) y suelos SPC libres de ftalatos.",
        "autor": "equipo-tecnico",
        "servicioRelacionado": "/reformas-de-banos-en-asturias/",
        "servicioRelacionadoNombre": "Reformas de Baños en Asturias",
        "imagen": "../../assets/images/blog/materiales-sostenibles-banos.webp",
        "imagenAlt": "Baño moderno en Asturias diseñado con materiales sostenibles y grifería eficiente",
        "rel": [
            "/reformas-de-banos/cambio-de-banera-por-plato-de-ducha-en-asturias-2026-guia-completa/",
            "/vivienda-sostenible/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/",
        ],
        "tabla": """| Material o solución sostenible | Ventaja principal en baños de Asturias | Impacto en consumo / mantenimiento |
| --- | --- | --- |
| Grifería termostática con aireador eco | Temperatura instantánea sin desperdiciar agua | Ahorro del 30 % – 40 % en agua y energía |
| Pintura mineral al silicato en techo | Transpirable y alcalina (inhibe moho de forma natural) | Durabilidad x3 frente a plástica convencional |
| Porcelánico rectificado de contenido reciclado | Nula absorción de agua (<0,1 %) y juntas mínimas | Limpieza rápida sin productos químicos agresivos |
| Plato de ducha de carga mineral C3 | Tacto cálido, antibacteriano y reparable | Máxima seguridad antideslizante |""",
        "faqs": [],
    },
}

BODY_2587 = """## Por qué los baños y cocinas en Asturias sufren más condensación que en otras regiones

En Gijón, Oviedo, Avilés y toda la franja costera y central de Asturias convivimos durante gran parte del año con una **humedad relativa exterior superior al 75 %–85 %**. Cuando nos duchamos con agua caliente o cocinamos sin una extracción bien dimensionada, el vapor busca las superficies más frías de la estancia (techos, esquinas de fachada norte, encuentros de ventana o cajas de persiana) y se transforma en gotas de agua líquida.

Si el revestimiento o la pintura forman una película plástica impermeable sin transpiración y el aire húmedo no se renueva, en pocas semanas aparecen las manchas negras de moho (*Aspergillus* y *Cladosporium*), malos olores y desconchados.

## Las 4 causas técnicas que debemos corregir durante la reforma

1. **Puentes térmicos en muros y techos exteriores**: paredes que dan a la calle o a patios de luces sin aislamiento térmico enfrían la cara interior por debajo del punto de rocío (12–14 °C).
2. **Extractores subdimensionados o conductos obstruidos**: ventiladores antiguos que hacen ruido pero apenas mueven caudal porque el conducto comunitario (shunt) tiene pérdidas o carece de válvula antirretorno.
3. **Pinturas plásticas cerradas en techos**: atrapan la humedad detrás de la película de látex en lugar de permitir que el soporte regule el vapor.
4. **Falta de entrada de aire de reemplazo**: si la puerta del baño ajusta herméticamente contra el suelo, el extractor trabaja en vacío y no consigue barrer el vapor.

## Soluciones sostenibles que aplicamos en Construcciones MBL

### 1. Ventilación higrorregulable silenciosa o recuperación de calor

Al reformar un baño o cocina sustituimos los extractores básicos por **equipos higrorregulables de bajo consumo y presión reforzada** que detectan automáticamente el pico de humedad al ducharse o cocinar y permanecen funcionando en modo silencioso hasta devolver la estancia al 55 % de humedad relativa. En reformas integrales, la **Ventilación Mecánica Controlada (VMC) con recuperador de calor** renueva el aire las 24 horas sin perder la calefacción interior.

### 2. Rotura de puentes térmicos en paredes frías y falsos techos

Antes de alicatar o cerrar el falso techo de un baño o cocina colindante con el exterior, incorporamos **lana mineral hidrófuga o poliestireno extruido (XPS)** con barrera de vapor en la cara caliente. Así la superficie interior se mantiene templada y el vapor deja de condensar.

### 3. Pinturas minerales transpirables y juntas antifúngicas

En los techos de baños y cocinas empleamos **pinturas minerales al silicato o a la cal natural**, cuya alcalinidad impide de forma natural la proliferación de hongos sin biocidas tóxicos. Para el alicatado, sellamos las zonas de agua con lámina impermeable continua y morteros de junta hidrófugos o epoxi que no ennegrecen.
"""


def strip_tags(s: str) -> str:
    txt = html.unescape(re.sub(r"<[^>]+>", " ", s))
    return re.sub(r"\s+", " ", txt).strip()


def clean_heading_text(s: str) -> str:
    t = strip_tags(s)
    # Remove leading decorative emojis / symbols while preserving letters, numbers and ¿¡
    t = re.sub(r"^[^\w¿¡A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+", "", t).strip()
    t = t.replace("(2024-2025)", "(2026)").replace("2024-2025", "2026")
    return t


def extract_details_faqs(raw_html: str) -> tuple[str, list[dict[str, str]]]:
    faqs: list[dict[str, str]] = []

    def repl(match: re.Match) -> str:
        block = match.group(1)
        sum_m = re.search(r"<summary[^>]*>(.*?)</summary>", block, re.S | re.I)
        if not sum_m:
            return ""
        q = clean_heading_text(sum_m.group(1))
        rest = block[: sum_m.start()] + block[sum_m.end() :]
        a = strip_tags(rest)
        if len(q) >= 10 and len(a) >= 20:
            faqs.append({"pregunta": q, "respuesta": a})
        return ""

    cleaned = re.sub(r"<details[^>]*>(.*?)</details>", repl, raw_html, flags=re.S | re.I)
    return cleaned, faqs


def convert_table(table_html: str) -> str:
    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", table_html, re.S | re.I)
    parsed_rows: list[list[str]] = []
    for r in rows:
        cells = re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", r, re.S | re.I)
        if cells:
            parsed_rows.append([strip_tags(c).replace("|", "/") for c in cells])
    if not parsed_rows:
        return ""
    col_count = max(len(r) for r in parsed_rows)
    norm_rows = [r + [""] * (col_count - len(r)) for r in parsed_rows]
    header = norm_rows[0]
    sep = ["---"] * col_count
    lines = [
        "| " + " | ".join(header) + " |",
        "| " + " | ".join(sep) + " |",
    ]
    for r in norm_rows[1:]:
        lines.append("| " + " | ".join(r) + " |")
    return "\n\n" + "\n".join(lines) + "\n\n"


def inline_html_to_md(fragment: str) -> str:
    s = fragment
    s = re.sub(r"<br\s*/?>", " ", s, flags=re.I)

    def link_repl(m: re.Match) -> str:
        href = m.group(1).strip()
        label = strip_tags(m.group(2))
        if not label:
            return ""
        if href in ("#", "/#estimacion", "#estimacion"):
            href = "/calcula-el-precio-de-tu-reforma-en-asturias/"
        elif href.startswith("https://construccionesmbl.com"):
            href = href.replace("https://construccionesmbl.com", "") or "/"
        return f"[{label}]({href})"

    s = re.sub(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', link_repl, s, flags=re.S | re.I)
    s = re.sub(r"<(strong|b)[^>]*>(.*?)</\1>", lambda m: f"**{strip_tags(m.group(2))}**", s, flags=re.S | re.I)
    s = re.sub(r"<(em|i)[^>]*>(.*?)</\1>", lambda m: f"*{strip_tags(m.group(2))}*" if strip_tags(m.group(2)) else "", s, flags=re.S | re.I)
    s = html.unescape(re.sub(r"<[^>]+>", " ", s))
    s = re.sub(r"\s+", " ", s).strip()
    s = s.replace("** **", " ").replace("****", "")
    s = s.replace("precios REALES de 2024", "precios reales de 2026")
    s = s.replace("(2024-2025)", "(2026)")
    return s


def html_to_markdown(raw_html: str, post_title: str) -> str:
    cleaned, _ = extract_details_faqs(raw_html)
    # Remove any script/style
    cleaned = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", cleaned, flags=re.S | re.I)

    # Tokenize major blocks in order: table, h2, h3, h4, ul, ol, blockquote, p
    pattern = re.compile(
        r"(<table[^>]*>.*?</table>|<h2[^>]*>.*?</h2>|<h3[^>]*>.*?</h3>|<h4[^>]*>.*?</h4>|<ul[^>]*>.*?</ul>|<ol[^>]*>.*?</ol>|<blockquote[^>]*>.*?</blockquote>|<p[^>]*>.*?</p>)",
        re.S | re.I,
    )

    out: list[str] = []
    norm_title = clean_heading_text(post_title).lower()

    for m in pattern.finditer(cleaned):
        blk = m.group(1)
        low = blk[:15].lower()
        if low.startswith("<table"):
            md_tbl = convert_table(blk).strip()
            if md_tbl:
                out.append(md_tbl)
        elif low.startswith("<h2"):
            h = clean_heading_text(blk)
            if not h:
                continue
            # Avoid duplicating the H1 title as the first H2
            if h.lower() == norm_title:
                continue
            if "preguntas que todos hacen" in h.lower() or "preguntas frecuentes" in h.lower():
                continue
            out.append(f"## {h}")
        elif low.startswith("<h3"):
            h = clean_heading_text(blk)
            if h:
                out.append(f"### {h}")
        elif low.startswith("<h4"):
            h = clean_heading_text(blk)
            if h:
                out.append(f"#### {h}")
        elif low.startswith("<ul") or low.startswith("<ol"):
            is_ol = low.startswith("<ol")
            items = re.findall(r"<li[^>]*>(.*?)</li>", blk, re.S | re.I)
            lines = []
            for idx, it in enumerate(items, 1):
                txt = inline_html_to_md(it)
                if txt:
                    prefix = f"{idx}. " if is_ol else "- "
                    lines.append(prefix + txt)
            if lines:
                out.append("\n".join(lines))
        elif low.startswith("<blockquote"):
            txt = inline_html_to_md(blk)
            if txt:
                out.append(f"> {txt}")
        elif low.startswith("<p"):
            txt = inline_html_to_md(blk)
            if not txt:
                continue
            # Drop boilerplate broken WP CTA button lines
            if txt in ("SOLICITAR PRESUPUESTO GRATIS", "CALCULAR MI REFORMA AHORA", "Hablar por WhatsApp"):
                continue
            out.append(txt)

    md = "\n\n".join(out)
    md = re.sub(r"\n{3,}", "\n\n", md).strip()
    return md


def yaml_escape(val: str) -> str:
    return json.dumps(val, ensure_ascii=False)


def main() -> None:
    BLOG_DIR.mkdir(parents=True, exist_ok=True)
    posts = json.loads((SCRATCH / "wp-posts.json").read_text(encoding="utf-8"))
    by_id = {p["id"]: p for p in posts}

    count = 0
    for pid, cfg in POST_META.items():
        wp = by_id[pid]
        raw_html = wp["content"]["rendered"]
        _, extracted_faqs = extract_details_faqs(raw_html)
        faqs = cfg["faqs"] if cfg["faqs"] else extracted_faqs[:5]

        if pid == 2587:
            body_md = BODY_2587.strip()
        else:
            body_md = html_to_markdown(raw_html, cfg["titulo"])

        if cfg["tabla"]:
            body_md += "\n\n## Tabla comparativa y precios orientativos en Asturias\n\n" + cfg["tabla"].strip()

        # Enlazado interno obligatorio contextual (servicio + simulador + guías)
        body_md += (
            f"\n\n## Planifica tu proyecto en Asturias con presupuesto cerrado\n\n"
            f"Si estás valorando llevar a cabo esta actuación en Gijón, Oviedo, Avilés o cualquier concejo del Principado, "
            f"consulta nuestro servicio especializado de [{cfg['servicioRelacionadoNombre']}]({cfg['servicioRelacionado']}) "
            f"o obtén una horquilla orientativa inmediata en nuestro "
            f"[simulador de presupuestos de reforma en Asturias](/calcula-el-precio-de-tu-reforma-en-asturias/)."
        )

        words = len(body_md.split())
        tiempo_lectura = max(3, min(15, round(words / 180)))
        date_pub = wp["date"][:10]
        date_mod = max(wp["modified"][:10], "2026-01-15")

        # Validate meta lengths strictly
        mt_len = len(cfg["metaTitle"])
        md_len = len(cfg["metaDescription"])
        ra_len = len(cfg["resumenAeo"])
        assert 35 <= mt_len <= 65, f"metaTitle len {mt_len} invalid for {pid}: {cfg['metaTitle']}"
        assert 120 <= md_len <= 165, f"metaDescription len {md_len} invalid for {pid}: {cfg['metaDescription']}"
        assert 120 <= ra_len <= 480, f"resumenAeo len {ra_len} invalid for {pid}"
        assert len(faqs) >= 3, f"faqs count {len(faqs)} < 3 for {pid}"

        fm_lines = [
            "---",
            f"slug: {cfg['slug']}",
            f"categoria: {cfg['categoria']}",
            f"categoriaNombre: {yaml_escape(CAT_NAMES[cfg['categoria']])}",
        ]
        if cfg.get("urlHeredadaWp"):
            fm_lines.append(f"urlHeredadaWp: {yaml_escape(cfg['urlHeredadaWp'])}")
        fm_lines.extend(
            [
                f"titulo: {yaml_escape(cfg['titulo'])}",
                f"metaTitle: {yaml_escape(cfg['metaTitle'])}",
                f"metaDescription: {yaml_escape(cfg['metaDescription'])}",
                f"resumenAeo: {yaml_escape(cfg['resumenAeo'])}",
                f"autor: {cfg['autor']}",
                f"servicioRelacionado: {yaml_escape(cfg['servicioRelacionado'])}",
                f"servicioRelacionadoNombre: {yaml_escape(cfg['servicioRelacionadoNombre'])}",
                f"datePublished: {yaml_escape(date_pub)}",
                f"dateModified: {yaml_escape(date_mod)}",
                f"tiempoLectura: {tiempo_lectura}",
                f"imagen: {cfg['imagen']}",
                f"imagenAlt: {yaml_escape(cfg['imagenAlt'])}",
                "articulosRelacionados:",
            ]
        )
        for r_url in cfg["rel"]:
            fm_lines.append(f"  - {yaml_escape(r_url)}")
        fm_lines.append("faqs:")
        for faq in faqs[:5]:
            fm_lines.append(f"  - pregunta: {yaml_escape(faq['pregunta'])}")
            fm_lines.append(f"    respuesta: {yaml_escape(faq['respuesta'])}")
        fm_lines.append("---")

        full_text = "\n".join(fm_lines) + "\n\n" + body_md + "\n"
        out_path = BLOG_DIR / f"{cfg['slug']}.md"
        out_path.write_text(full_text, encoding="utf-8", newline="\n")
        count += 1
        print(f"  [OK] {cfg['categoria']}/{cfg['slug']} ({words} palabras, {len(faqs[:5])} FAQs)")

    print(f"Migrados {count} artículos a {BLOG_DIR.relative_to(ROOT)}.")


if __name__ == "__main__":
    main()
