import type { ClimateZoneCTE } from './asturiasConcejos';

export const ENERGY_RATES_LAST_VERIFIED = '2026-11';

export type HeatingSystemKey =
  | 'gasoil_convencional'
  | 'gas_natural_condensacion'
  | 'gas_natural_estandar'
  | 'radiadores_electricos'
  | 'pellets';

export type EmitterType =
  | 'suelo_radiante'
  | 'radiadores_baja_temp'
  | 'radiadores_alta_temp';

export type InsulationLevel =
  | 'mal_aislada'
  | 'aislamiento_medio'
  | 'bien_aislada';

export interface HeatingSystemConfig {
  label: string;
  fuelPrice: number;
  unitLabel: string;
  kwhPerUnit: number;
  efficiency: number;
  fixedAnnualCostEur: number;
  co2KgPerKwhFuel: number;
}

export const ENERGY_DEFAULTS_2026: {
  electricityPriceEurKwh: number;
  electricityCo2KgPerKwh: number;
  systems: Record<HeatingSystemKey, HeatingSystemConfig>;
  aerotermiaSCOP: Record<EmitterType, Record<ClimateZoneCTE, number>>;
  demandKwhM2Year: Record<InsulationLevel, Record<ClimateZoneCTE, number>>;
  aerotermiaAvgInvestmentEur: number;
} = {
  electricityPriceEurKwh: 0.18, // Media doméstica 2026 con impuestos (€/kWh)
  electricityCo2KgPerKwh: 0.200,
  systems: {
    gasoil_convencional: {
      label: 'Caldera de gasóleo C (convencional)',
      fuelPrice: 1.15, // €/litro (media anual 2026; rango 0.85–1.41 €/L)
      unitLabel: '€/litro',
      kwhPerUnit: 10.14, // Poder calorífico gasóleo C (kWh/litro)
      efficiency: 0.90,
      fixedAnnualCostEur: 0,
      co2KgPerKwhFuel: 0.311, // Factor emisión oficial IDAE (kg CO2/kWh)
    },
    gas_natural_condensacion: {
      label: 'Caldera de gas natural (condensación)',
      fuelPrice: 0.08, // €/kWh con impuestos (referencia 2026)
      unitLabel: '€/kWh',
      kwhPerUnit: 1,
      efficiency: 0.95,
      fixedAnnualCostEur: 75, // Término fijo anual aproximado (RL.2)
      co2KgPerKwhFuel: 0.252,
    },
    gas_natural_estandar: {
      label: 'Caldera de gas natural (>15 años)',
      fuelPrice: 0.08,
      unitLabel: '€/kWh',
      kwhPerUnit: 1,
      efficiency: 0.85,
      fixedAnnualCostEur: 75,
      co2KgPerKwhFuel: 0.252,
    },
    radiadores_electricos: {
      label: 'Radiadores / emisores eléctricos',
      fuelPrice: 0.18,
      unitLabel: '€/kWh',
      kwhPerUnit: 1,
      efficiency: 1.00,
      fixedAnnualCostEur: 0,
      co2KgPerKwhFuel: 0.200,
    },
    pellets: {
      label: 'Caldera o estufa de pellets',
      fuelPrice: 0.080, // ~5.67 €/saco 15kg @ 4.76 kWh/kg
      unitLabel: '€/kWh',
      kwhPerUnit: 1,
      efficiency: 0.88,
      fixedAnnualCostEur: 0,
      co2KgPerKwhFuel: 0.018,
    },
  },
  aerotermiaSCOP: {
    suelo_radiante: { C1: 4.0, D1: 3.7, E1: 3.3 },
    radiadores_baja_temp: { C1: 3.5, D1: 3.2, E1: 2.9 },
    radiadores_alta_temp: { C1: 3.0, D1: 2.7, E1: 2.5 },
  },
  demandKwhM2Year: {
    mal_aislada: { C1: 85, D1: 110, E1: 140 },
    aislamiento_medio: { C1: 55, D1: 70, E1: 90 },
    bien_aislada: { C1: 30, D1: 40, E1: 50 },
  },
  aerotermiaAvgInvestmentEur: 14250, // Punto medio de la horquilla 11.000 € - 17.500 €
};

export const EMITTER_LABELS: Record<EmitterType, string> = {
  suelo_radiante: 'Suelo radiante',
  radiadores_baja_temp: 'Radiadores de baja temperatura / fancoils',
  radiadores_alta_temp: 'Radiadores convencionales (alta temperatura)',
};

export const INSULATION_LABELS: Record<InsulationLevel, string> = {
  mal_aislada: 'Vivienda antigua sin aislar',
  aislamiento_medio: 'Aislamiento medio (doble acristalamiento básico)',
  bien_aislada: 'Bien aislada (SATE / ventanas RPT)',
};
