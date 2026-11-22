/**
 * Fuente única de verdad para rangos orientativos de precios y cálculo del simulador
 * en Asturias (2026). Valores orientativos validados como punto de partida técnico
 * sujetos a visita técnica gratuita y revisión comercial de Construcciones MBL.
 */

export type TipoObraKey =
  | 'reforma-integral'
  | 'reforma-cocina'
  | 'reforma-bano'
  | 'plato-ducha'
  | 'construccion-vivienda'
  | 'local-comercial'
  | 'reforma-parcial'
  | 'rehabilitacion-fachadas'
  | 'rehabilitacion-casas-pueblo';

export type CalidadKey = 'funcional' | 'estandar' | 'premium';

export interface ExtraObra {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface ConfigTarifa {
  key: TipoObraKey;
  nombre: string;
  nombreCorto: string;
  servicioUrl: string;
  usaSuperficie: boolean;
  etiquetaSuperficie: string;
  minM2: number;
  maxM2: number;
  defaultM2: number;
  baseFijaMin: number;
  baseFijaMax: number;
  precioM2Min: number;
  precioM2Max: number;
  rangoVisible: string;
  plazoEstimado: string;
  garantia: string;
  extras: ExtraObra[];
}

export const CALIDADES: Record<
  CalidadKey,
  { key: CalidadKey; label: string; factor: number; descripcion: string }
> = {
  funcional: {
    key: 'funcional',
    label: 'Funcional',
    factor: 0.88,
    descripcion: 'Acabados resistentes y prácticos ideales para alquiler o presupuesto ajustado.',
  },
  estandar: {
    key: 'estandar',
    label: 'Estándar MBL',
    factor: 1.0,
    descripcion: 'Materiales porcelánicos, eficiencia energética y grifería de primera marca.',
  },
  premium: {
    key: 'premium',
    label: 'Alta Gama',
    factor: 1.24,
    descripcion: 'Carpintería a medida, domótica básica, aislamientos superiores y gran formato.',
  },
};

export const ZONAS_ASTURIAS = [
  'Gijón',
  'Oviedo',
  'Avilés',
  'Siero / Lugones',
  'Centro de Asturias (otros)',
  'Oriente / Occidente de Asturias',
] as const;

export const TARIFAS: Record<TipoObraKey, ConfigTarifa> = {
  'reforma-integral': {
    key: 'reforma-integral',
    nombre: 'Reforma integral de vivienda',
    nombreCorto: 'Reforma integral',
    servicioUrl: '/reformas-integrales-en-asturias/',
    usaSuperficie: true,
    etiquetaSuperficie: 'Superficie total de la vivienda (m²)',
    minM2: 35,
    maxM2: 260,
    defaultM2: 85,
    baseFijaMin: 0,
    baseFijaMax: 0,
    precioM2Min: 650,
    precioM2Max: 1050,
    rangoVisible: '650 – 1.050 €/m²',
    plazoEstimado: '8 – 14 semanas',
    garantia: 'Hasta 3 años por escrito',
    extras: [
      { id: 'ventanas', label: 'Cambio completo de ventanas PVC/aluminio RPT', min: 4500, max: 8200 },
      { id: 'aerotermia', label: 'Aerotermia / suelo radiante eficiente', min: 6800, max: 11500 },
      { id: 'redistribucion', label: 'Redistribución de tabiquería y licencia técnica', min: 2200, max: 3900 },
    ],
  },
  'reforma-cocina': {
    key: 'reforma-cocina',
    nombre: 'Reforma completa de cocina',
    nombreCorto: 'Reforma de cocina',
    servicioUrl: '/reformas-de-cocinas-en-asturias/',
    usaSuperficie: true,
    etiquetaSuperficie: 'Superficie de tu cocina (m²)',
    minM2: 5,
    maxM2: 35,
    defaultM2: 10,
    baseFijaMin: 2800,
    baseFijaMax: 4800,
    precioM2Min: 370,
    precioM2Max: 970,
    rangoVisible: '6.500 – 14.500 €',
    plazoEstimado: '2 – 4 semanas',
    garantia: 'Hasta 3 años por escrito',
    extras: [
      { id: 'mobiliario', label: 'Mobiliario a medida y encimera porcelánica/cuarzo', min: 4200, max: 7800 },
      { id: 'electrodomesticos', label: 'Pack electrodomésticos integrados (clase A)', min: 2400, max: 4500 },
      { id: 'tirar-tabique', label: 'Apertura al salón (cocina americana)', min: 1300, max: 2400 },
    ],
  },
  'reforma-bano': {
    key: 'reforma-bano',
    nombre: 'Reforma completa de baño',
    nombreCorto: 'Reforma de baño',
    servicioUrl: '/reformas-de-banos-en-asturias/',
    usaSuperficie: true,
    etiquetaSuperficie: 'Superficie de tu baño (m²)',
    minM2: 3,
    maxM2: 18,
    defaultM2: 5,
    baseFijaMin: 1800,
    baseFijaMax: 3500,
    precioM2Min: 400,
    precioM2Max: 800,
    rangoVisible: '3.800 – 7.500 €',
    plazoEstimado: '1 – 2 semanas',
    garantia: 'Hasta 3 años por escrito',
    extras: [
      { id: 'mampara', label: 'Mampara de vidrio templado antical a medida', min: 450, max: 850 },
      { id: 'mueble', label: 'Mueble suspendido, espejo LED y radiador toallero', min: 650, max: 1300 },
      { id: 'ventilacion', label: 'Extractor silencioso anti-humedad y falso techo', min: 380, max: 690 },
    ],
  },
  'plato-ducha': {
    key: 'plato-ducha',
    nombre: 'Cambio de bañera por plato de ducha (48 h)',
    nombreCorto: 'Plato de ducha 48 h',
    servicioUrl: '/cambio-de-banera-por-plato-de-ducha-en-asturias-oferta-expres-48-horas/',
    usaSuperficie: false,
    etiquetaSuperficie: 'Número de baños a adaptar',
    minM2: 1,
    maxM2: 3,
    defaultM2: 1,
    baseFijaMin: 1190,
    baseFijaMax: 1850,
    precioM2Min: 0,
    precioM2Max: 0,
    rangoVisible: '1.190 – 1.850 €',
    plazoEstimado: '48 horas',
    garantia: 'Hasta 3 años por escrito',
    extras: [
      { id: 'mampara-fijo', label: 'Mampara fija o corredera con tratamiento antical', min: 390, max: 690 },
      { id: 'termostatica', label: 'Columna de ducha termostática negra/cromo', min: 220, max: 420 },
      { id: 'asideros', label: 'Asideros de seguridad y asiento abatible accesibilidad', min: 180, max: 320 },
    ],
  },
  'construccion-vivienda': {
    key: 'construccion-vivienda',
    nombre: 'Construcción de vivienda unifamiliar llave en mano',
    nombreCorto: 'Construcción de vivienda',
    servicioUrl: '/construccion-de-viviendas-en-asturias/',
    usaSuperficie: true,
    etiquetaSuperficie: 'Superficie construida prevista (m²)',
    minM2: 75,
    maxM2: 380,
    defaultM2: 140,
    baseFijaMin: 0,
    baseFijaMax: 0,
    precioM2Min: 1450,
    precioM2Max: 2100,
    rangoVisible: '1.450 – 2.100 €/m²',
    plazoEstimado: '9 – 14 meses',
    garantia: '10 años garantía estructural',
    extras: [
      { id: 'proyecto-visado', label: 'Proyecto arquitectónico, geotécnico y dirección técnica', min: 12000, max: 19500 },
      { id: 'aerotermia-casa', label: 'Climatización aerotérmica + recuperación de calor', min: 11000, max: 17500 },
      { id: 'urbanizacion', label: 'Cierre de parcela, solera exterior y porche', min: 9500, max: 18000 },
    ],
  },
  'local-comercial': {
    key: 'local-comercial',
    nombre: 'Reforma y habilitación de local comercial',
    nombreCorto: 'Local comercial',
    servicioUrl: '/reforma-de-locales-comerciales-en-asturias/',
    usaSuperficie: true,
    etiquetaSuperficie: 'Superficie del local comercial (m²)',
    minM2: 20,
    maxM2: 450,
    defaultM2: 80,
    baseFijaMin: 0,
    baseFijaMax: 0,
    precioM2Min: 550,
    precioM2Max: 1100,
    rangoVisible: '550 – 1.100 €/m²',
    plazoEstimado: '4 – 10 semanas',
    garantia: 'Hasta 3 años por escrito',
    extras: [
      { id: 'fachada-rotulo', label: 'Escaparate en aluminio, cristalería y carpintería acceso PMR', min: 3500, max: 7500 },
      { id: 'clima-extraccion', label: 'Climatización por conductos y renovación de aire RITE', min: 4200, max: 8900 },
      { id: 'acustica', label: 'Aislamiento acústico y protección pasiva contra incendios', min: 2800, max: 6200 },
    ],
  },
  'reforma-parcial': {
    key: 'reforma-parcial',
    nombre: 'Reforma parcial y mejora de estancias',
    nombreCorto: 'Reforma parcial',
    servicioUrl: '/reformas-parciales-en-asturias/',
    usaSuperficie: true,
    etiquetaSuperficie: 'Superficie aproximada de actuación (m²)',
    minM2: 10,
    maxM2: 180,
    defaultM2: 40,
    baseFijaMin: 1200,
    baseFijaMax: 2400,
    precioM2Min: 130,
    precioM2Max: 240,
    rangoVisible: '2.500 – 12.000 €',
    plazoEstimado: '1 – 4 semanas',
    garantia: 'Hasta 3 años por escrito',
    extras: [
      { id: 'suelo-vinilico', label: 'Suelo vinílico SPC / tarima AC5 con rodapié lacado', min: 1600, max: 3400 },
      { id: 'pintura-alisado', label: 'Alisado de gotelé y pintura plástica lavable', min: 1400, max: 2900 },
      { id: 'trasdosado-aislamiento', label: 'Trasdosado térmico-acústico en fachadas interiores', min: 1200, max: 2600 },
    ],
  },
  'rehabilitacion-fachadas': {
    key: 'rehabilitacion-fachadas',
    nombre: 'Rehabilitación de fachadas, SATE y tejados',
    nombreCorto: 'Fachadas y tejados',
    servicioUrl: '/rehabilitacion-de-fachadas-y-tejados-en-asturias/',
    usaSuperficie: true,
    etiquetaSuperficie: 'Superficie de fachada o cubierta (m²)',
    minM2: 40,
    maxM2: 600,
    defaultM2: 120,
    baseFijaMin: 2500,
    baseFijaMax: 4800,
    precioM2Min: 75,
    precioM2Max: 145,
    rangoVisible: '85 – 160 €/m²',
    plazoEstimado: '3 – 8 semanas',
    garantia: 'Hasta 10 años en estanqueidad',
    extras: [
      { id: 'sate-grafito', label: 'Aislamiento SATE grafito 80–100 mm de alta resistencia', min: 3800, max: 8200 },
      { id: 'cubierta-impermeable', label: 'Lámina transpirable bajo teja y canalones de zinc', min: 2400, max: 5600 },
      { id: 'andamio-seguridad', label: 'Montaje de andamio homologado y plan de seguridad', min: 1800, max: 3900 },
    ],
  },
  'rehabilitacion-casas-pueblo': {
    key: 'rehabilitacion-casas-pueblo',
    nombre: 'Rehabilitación de casas de pueblo y casonas de piedra',
    nombreCorto: 'Casas de pueblo y piedra',
    servicioUrl: '/rehabilitacion-de-casas-de-pueblo-en-asturias/',
    usaSuperficie: true,
    etiquetaSuperficie: 'Superficie construida de la edificación (m²)',
    minM2: 60,
    maxM2: 400,
    defaultM2: 140,
    baseFijaMin: 8000,
    baseFijaMax: 16000,
    precioM2Min: 720,
    precioM2Max: 1250,
    rangoVisible: '800 – 1.350 €/m²',
    plazoEstimado: '12 – 24 semanas',
    garantia: '10 años estructural LOE',
    extras: [
      { id: 'mamposteria-cal', label: 'Encintado de piedra con mortero de cal hidráulica natural', min: 4200, max: 9500 },
      { id: 'drenaje-capilaridad', label: 'Zanja drenante perimetral y barrera anticarcoma', min: 3100, max: 6800 },
      { id: 'madera-estructural', label: 'Consolidación de vigas y forjado de madera laminada', min: 5400, max: 12800 },
    ],
  },
};

export interface SimulacionInput {
  tipo: TipoObraKey;
  m2: number;
  calidad: CalidadKey;
  extrasIds: string[];
}

export interface DesglosePartida {
  concepto: string;
  min: number;
  max: number;
}

export interface SimulacionResultado {
  min: number;
  max: number;
  plazo: string;
  garantia: string;
  desglose: DesglosePartida[];
}

export function formatearEuros(valor: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(Math.round(valor / 10) * 10);
}

export function calcularPresupuesto(input: SimulacionInput): SimulacionResultado {
  const cfg = TARIFAS[input.tipo] ?? TARIFAS['reforma-integral'];
  const cal = CALIDADES[input.calidad] ?? CALIDADES.estandar;
  const medida = Math.max(cfg.minM2, Math.min(cfg.maxM2, Number(input.m2) || cfg.defaultM2));

  let baseMin: number;
  let baseMax: number;

  if (cfg.key === 'plato-ducha') {
    baseMin = cfg.baseFijaMin * medida * cal.factor;
    baseMax = cfg.baseFijaMax * medida * cal.factor;
  } else {
    baseMin = (cfg.baseFijaMin + cfg.precioM2Min * medida) * cal.factor;
    baseMax = (cfg.baseFijaMax + cfg.precioM2Max * medida) * cal.factor;
  }

  const desglose: DesglosePartida[] = [
    {
      concepto: `Ejecución base (${cfg.nombreCorto} · acabado ${cal.label})`,
      min: Math.round(baseMin / 10) * 10,
      max: Math.round(baseMax / 10) * 10,
    },
  ];

  let extrasMin = 0;
  let extrasMax = 0;
  for (const extraId of input.extrasIds) {
    const extra = cfg.extras.find((e) => e.id === extraId);
    if (extra) {
      extrasMin += extra.min;
      extrasMax += extra.max;
      desglose.push({
        concepto: extra.label,
        min: extra.min,
        max: extra.max,
      });
    }
  }

  return {
    min: Math.round((baseMin + extrasMin) / 10) * 10,
    max: Math.round((baseMax + extrasMax) / 10) * 10,
    plazo: cfg.plazoEstimado,
    garantia: cfg.garantia,
    desglose,
  };
}
