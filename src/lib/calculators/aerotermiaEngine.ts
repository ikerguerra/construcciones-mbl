import {
  getConcejoBySlug,
  type ClimateZoneCTE,
  type ConcejoAsturias,
} from '../../data/asturiasConcejos';
import {
  ENERGY_DEFAULTS_2026,
  type EmitterType,
  type HeatingSystemKey,
  type InsulationLevel,
} from '../../data/energyRates';
import { calculateIrpfDeduction } from './irpfEngine';

export interface AerotermiaInput {
  concejoSlug: string;
  highAltitudeMountain?: boolean;
  currentSystem: HeatingSystemKey;
  annualSpendEur?: number;
  areaM2?: number;
  insulation?: InsulationLevel;
  emitterType: EmitterType;
  electricityPriceEurKwh?: number;
  customFuelPrice?: number;
  investmentEur?: number;
}

export interface AerotermiaResult {
  concejo: ConcejoAsturias;
  climateZone: ClimateZoneCTE;
  scop: number;
  usefulDemandKwh: number;
  currentAnnualCostEur: number;
  aerotermiaKwh: number;
  aerotermiaAnnualCostEur: number;
  annualSavingsEur: number;
  savingsPercent: number;
  investmentEur: number;
  paybackYearsGross: number | null;
  irpf40DeductionEur: number;
  paybackYearsWithIrpf40: number | null;
  irpf60DeductionEur: number;
  paybackYearsWithIrpf60: number | null;
  co2CurrentKgYear: number;
  co2AeroKgYear: number;
  co2SavedKgYear: number;
}

export function compareAerotermia(input: AerotermiaInput): AerotermiaResult {
  const concejo = getConcejoBySlug(input.concejoSlug);
  const climateZone: ClimateZoneCTE = input.highAltitudeMountain
    ? 'E1'
    : concejo.climateZone;

  const sys = ENERGY_DEFAULTS_2026.systems[input.currentSystem];
  const electricityPrice =
    input.electricityPriceEurKwh && input.electricityPriceEurKwh > 0
      ? input.electricityPriceEurKwh
      : ENERGY_DEFAULTS_2026.electricityPriceEurKwh;
  const fuelPrice =
    input.customFuelPrice && input.customFuelPrice > 0
      ? input.customFuelPrice
      : sys.fuelPrice;
  const investmentEur =
    input.investmentEur && input.investmentEur > 0
      ? input.investmentEur
      : ENERGY_DEFAULTS_2026.aerotermiaAvgInvestmentEur;

  const precioKwhBruto = fuelPrice / sys.kwhPerUnit;

  let usefulDemandKwhRaw: number;
  let currentAnnualCostRaw: number;

  if (input.annualSpendEur !== undefined && input.annualSpendEur > 0) {
    currentAnnualCostRaw = input.annualSpendEur;
    const energyCost = Math.max(0, currentAnnualCostRaw - sys.fixedAnnualCostEur);
    usefulDemandKwhRaw = (energyCost / precioKwhBruto) * sys.efficiency;
  } else {
    const areaM2 = Math.max(15, input.areaM2 ?? 100);
    const insulation: InsulationLevel = input.insulation ?? 'aislamiento_medio';
    const demandPerM2 = ENERGY_DEFAULTS_2026.demandKwhM2Year[insulation][climateZone];
    usefulDemandKwhRaw = areaM2 * demandPerM2;
    currentAnnualCostRaw =
      (usefulDemandKwhRaw / sys.efficiency) * precioKwhBruto + sys.fixedAnnualCostEur;
  }

  const scop = ENERGY_DEFAULTS_2026.aerotermiaSCOP[input.emitterType][climateZone];
  const aerotermiaKwhRaw = usefulDemandKwhRaw / scop;
  const aerotermiaAnnualCostRaw = aerotermiaKwhRaw * electricityPrice;

  const annualSavingsRaw = currentAnnualCostRaw - aerotermiaAnnualCostRaw;
  const savingsPercent =
    currentAnnualCostRaw > 0
      ? Number(((annualSavingsRaw / currentAnnualCostRaw) * 100).toFixed(1))
      : 0;

  const irpf40 = calculateIrpfDeduction({
    investmentWithVat: investmentEur,
    publicSubsidies: 0,
    deductionTier: 'energia_30_o_AB',
    paidByBankOrCard: true,
    includesFossilFuelBoiler: false,
  });

  const irpf60 = calculateIrpfDeduction({
    investmentWithVat: investmentEur,
    publicSubsidies: 0,
    deductionTier: 'rehabilitacion_edificio_60',
    paidByBankOrCard: true,
    includesFossilFuelBoiler: false,
  });

  const paybackYearsGross =
    annualSavingsRaw > 0 ? Number((investmentEur / annualSavingsRaw).toFixed(1)) : null;
  const paybackYearsWithIrpf40 =
    annualSavingsRaw > 0
      ? Number((irpf40.costeNetoReal / annualSavingsRaw).toFixed(1))
      : null;
  const paybackYearsWithIrpf60 =
    annualSavingsRaw > 0
      ? Number((irpf60.costeNetoReal / annualSavingsRaw).toFixed(1))
      : null;

  const co2CurrentRaw = (usefulDemandKwhRaw / sys.efficiency) * sys.co2KgPerKwhFuel;
  const co2AeroRaw = aerotermiaKwhRaw * ENERGY_DEFAULTS_2026.electricityCo2KgPerKwh;
  const co2SavedRaw = Math.max(0, co2CurrentRaw - co2AeroRaw);

  return {
    concejo,
    climateZone,
    scop,
    usefulDemandKwh: Math.round(usefulDemandKwhRaw),
    currentAnnualCostEur: Math.round(currentAnnualCostRaw),
    aerotermiaKwh: Math.round(aerotermiaKwhRaw),
    aerotermiaAnnualCostEur: Math.round(aerotermiaAnnualCostRaw),
    annualSavingsEur: Math.round(annualSavingsRaw),
    savingsPercent,
    investmentEur: Math.round(investmentEur),
    paybackYearsGross,
    irpf40DeductionEur: irpf40.deduccionTotal,
    paybackYearsWithIrpf40,
    irpf60DeductionEur: irpf60.deduccionTotal,
    paybackYearsWithIrpf60,
    co2CurrentKgYear: Math.round(co2CurrentRaw),
    co2AeroKgYear: Math.round(co2AeroRaw),
    co2SavedKgYear: Math.round(co2SavedRaw),
  };
}
