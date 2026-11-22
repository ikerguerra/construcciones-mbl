export const BUDGET_PRICING_LAST_VERIFIED = '2026-11';

export type ReformType =
  | 'integral'
  | 'parcial_cocina_banos'
  | 'rehabilitacion_casa_piedra'
  | 'obra_nueva'
  | 'local_comercial';

export type PropertyType =
  | 'piso_con_ascensor'
  | 'piso_sin_ascensor'
  | 'casa_pueblo'
  | 'chalet_independiente'
  | 'local';

export type QualityLevel = 'basica' | 'media' | 'alta_premium';

export type PathologyKey =
  | 'humedades_capilaridad'
  | 'rehabilitacion_cubierta'
  | 'refuerzo_estructural';

export type OptionalPackageKey =
  | 'proyecto_tecnico'
  | 'aerotermia_recuperacion'
  | 'cierre_solera_porche';

export interface ReformBaseConfig {
  key: ReformType;
  label: string;
  description: string;
  minEurM2: number;
  maxEurM2: number;
  baseWeeks: number;
  extraWeeksPer50M2: number;
}

export const REFORM_BASE_PRICING: Record<ReformType, ReformBaseConfig> = {
  parcial_cocina_banos: {
    key: 'parcial_cocina_banos',
    label: 'Reforma parcial (cocina y/o baños)',
    description: 'Renovación de estancias húmedas, fontanería, alicatados y mobiliario',
    minEurM2: 420,
    maxEurM2: 560,
    baseWeeks: 4,
    extraWeeksPer50M2: 1.0,
  },
  integral: {
    key: 'integral',
    label: 'Reforma integral de vivienda',
    description: 'Redistribución, instalaciones completas, carpinterías, aislamiento y acabados',
    minEurM2: 750,
    maxEurM2: 900,
    baseWeeks: 8,
    extraWeeksPer50M2: 2.0,
  },
  rehabilitacion_casa_piedra: {
    key: 'rehabilitacion_casa_piedra',
    label: 'Rehabilitación de casa de piedra',
    description: 'Consolidación tradicional, envolvente térmica y puesta al día en medio rural',
    minEurM2: 950,
    maxEurM2: 1250,
    baseWeeks: 14,
    extraWeeksPer50M2: 3.0,
  },
  obra_nueva: {
    key: 'obra_nueva',
    label: 'Construcción de vivienda (obra nueva)',
    description: 'Vivienda unifamiliar llave en mano sobre parcela en Asturias',
    minEurM2: 1350,
    maxEurM2: 1650,
    baseWeeks: 24,
    extraWeeksPer50M2: 4.0,
  },
  local_comercial: {
    key: 'local_comercial',
    label: 'Acondicionamiento de local comercial',
    description: 'Adecuación normativa, accesibilidad, climatización e imagen comercial',
    minEurM2: 550,
    maxEurM2: 780,
    baseWeeks: 6,
    extraWeeksPer50M2: 1.5,
  },
};

export const QUALITY_MULTIPLIERS: Record<QualityLevel, { label: string; mult: number; hint: string }> = {
  basica: { label: 'Funcional / Básica', mult: 0.88, hint: 'Materiales resistentes y funcionales con excelente relación calidad-precio' },
  media: { label: 'Media / Confort MBL', mult: 1.00, hint: 'Porcelánico rectificado, PVC con rotura térmica e instalaciones completas' },
  alta_premium: { label: 'Alta / Premium', mult: 1.22, hint: 'Acabados de diseño, carpintería a medida y máxima eficiencia energética' },
};

export const PROPERTY_MULTIPLIERS: Record<PropertyType, { label: string; mult: number }> = {
  piso_con_ascensor: { label: 'Piso con ascensor', mult: 1.00 },
  piso_sin_ascensor: { label: 'Piso sin ascensor', mult: 1.06 },
  casa_pueblo: { label: 'Casa de pueblo / rural', mult: 1.08 },
  chalet_independiente: { label: 'Chalet independiente', mult: 1.03 },
  local: { label: 'Local comercial a pie de calle', mult: 0.98 },
};

export const PATHOLOGY_COSTS = {
  humedades_capilaridad: {
    label: 'Tratamiento de humedades por capilaridad',
    description: 'Barrera de inyecciones/mortero macroporoso y drenaje perimetral',
    minEur: 2500,
    maxEur: 5500,
  },
  rehabilitacion_cubierta: {
    label: 'Rehabilitación de cubierta / tejado',
    description: 'Estimado sobre superficie de cubierta (75 % de la superficie si no se indica otra)',
    minEurM2: 120,
    maxEurM2: 190,
    defaultRoofRatio: 0.75,
  },
  refuerzo_estructural: {
    label: 'Refuerzo estructural',
    description: 'Consolidación de vigas, forjados o muros de carga',
    minEur: 4500,
    maxEur: 11000,
  },
} as const;

export const OPTIONAL_PACKAGES: Record<
  OptionalPackageKey,
  {
    key: OptionalPackageKey;
    label: string;
    description: string;
    minEur: number;
    maxEur: number;
    isTechnicalFee: boolean;
  }
> = {
  proyecto_tecnico: {
    key: 'proyecto_tecnico',
    label: 'Proyecto arquitectónico, geotécnico y dirección técnica',
    description: 'Honorarios técnicos independientes (tributan siempre al 21 % de IVA)',
    minEur: 12000,
    maxEur: 19500,
    isTechnicalFee: true,
  },
  aerotermia_recuperacion: {
    key: 'aerotermia_recuperacion',
    label: 'Climatización aerotérmica + recuperación de calor',
    description: 'Bomba de calor aerotérmica de alta eficiencia y ventilación controlada',
    minEur: 11000,
    maxEur: 17500,
    isTechnicalFee: false,
  },
  cierre_solera_porche: {
    key: 'cierre_solera_porche',
    label: 'Cierre de parcela, solera exterior y porche',
    description: 'Urbanización perimetral exterior y zona cubierta',
    minEur: 9500,
    maxEur: 18000,
    isTechnicalFee: false,
  },
};

export const BREAKDOWN_SHARES_INTEGRAL = [
  { key: 'albanileria', label: 'Albañilería y demoliciones', pct: 0.30 },
  { key: 'instalaciones', label: 'Instalaciones (fontanería, electricidad y clima)', pct: 0.24 },
  { key: 'carpinteria', label: 'Carpintería interior y ventanas', pct: 0.18 },
  { key: 'revestimientos', label: 'Revestimientos, suelos y pintura', pct: 0.18 },
  { key: 'cocina_banos', label: 'Cocina, baños y sanitarios', pct: 0.10 },
] as const;

export const PEM_OVERHEAD_FACTOR = 1.19; // 13 % Gastos Generales + 6 % Beneficio Industrial
