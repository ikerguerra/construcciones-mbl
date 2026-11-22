export const TAX_RULES_LAST_VERIFIED = '2026-11';

export type ClientType = 'particular_vivienda_habitual' | 'inversor_alquiler_o_empresa';

export type IrpfDeductionTier =
  | 'demanda_7'
  | 'energia_30_o_AB'
  | 'rehabilitacion_edificio_60';

export const IVA_RATES = {
  reduced: 0.10, // Art. 91 Ley 37/1992 del IVA
  standard: 0.21,
  technicalFees: 0.21,
  materialsThresholdPct: 40,
} as const;

export interface IrpfTierConfig {
  key: IrpfDeductionTier;
  title: string;
  shortLabel: string;
  requirement: string;
  rate: number;
  maxAnnualBase: number;
  maxTotalBase: number;
  maxDeductionTotal: number;
  carryForwardYears: number; // Ejercicios totales permitidos cuando hay exceso (1 = solo ejercicio del CEE, 4 = año + 3 siguientes)
  workDeadline: string;
  ceeDeadline: string;
}

export const IRPF_TIERS: Record<IrpfDeductionTier, IrpfTierConfig> = {
  demanda_7: {
    key: 'demanda_7',
    title: 'Reducción ≥ 7 % demanda de calefacción y refrigeración',
    shortLabel: 'Tramo 20 % (Demanda ≥ 7 %)',
    requirement: 'Vivienda habitual o alquilada; ventanas RPT o aislamiento interior con CEE previo y posterior',
    rate: 0.20,
    maxAnnualBase: 5000,
    maxTotalBase: 5000,
    maxDeductionTotal: 1000,
    carryForwardYears: 1,
    workDeadline: '2026-12-31',
    ceeDeadline: '2027-01-01',
  },
  energia_30_o_AB: {
    key: 'energia_30_o_AB',
    title: 'Reducción ≥ 30 % energía primaria no renovable o clase A/B',
    shortLabel: 'Tramo 40 % (Energía ≥ 30 % o A/B)',
    requirement: 'Aerotermia, envolvente o solar térmica con CEE previo y posterior',
    rate: 0.40,
    maxAnnualBase: 7500,
    maxTotalBase: 7500,
    maxDeductionTotal: 3000,
    carryForwardYears: 1,
    workDeadline: '2026-12-31',
    ceeDeadline: '2027-01-01',
  },
  rehabilitacion_edificio_60: {
    key: 'rehabilitacion_edificio_60',
    title: 'Rehabilitación energética integral (edificio o vivienda unifamiliar)',
    shortLabel: 'Tramo 60 % (Rehabilitación integral)',
    requirement: 'Reducción ≥ 30 % energía primaria no renovable o calificación A/B del edificio completo o unifamiliar',
    rate: 0.60,
    maxAnnualBase: 5000,
    maxTotalBase: 15000,
    maxDeductionTotal: 9000,
    carryForwardYears: 4,
    workDeadline: '2027-12-31',
    ceeDeadline: '2028-01-01',
  },
};

export const IRPF_PROLONGATION_NOTICE =
  'Plazos vigentes según la Disposición Adicional 50ª de la LIRPF (hasta 31/12/2026 en tramos 20 % / 40 % y 31/12/2027 en 60 %), sujetos a posibles prórrogas por Real Decreto-ley.';
