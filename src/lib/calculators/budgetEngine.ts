import { getConcejoBySlug, type ConcejoAsturias } from '../../data/asturiasConcejos';
import {
  BREAKDOWN_SHARES_INTEGRAL,
  OPTIONAL_PACKAGES,
  PATHOLOGY_COSTS,
  PEM_OVERHEAD_FACTOR,
  PROPERTY_MULTIPLIERS,
  QUALITY_MULTIPLIERS,
  REFORM_BASE_PRICING,
  type OptionalPackageKey,
  type PathologyKey,
  type PropertyType,
  type QualityLevel,
  type ReformType,
} from '../../data/budgetPricing';
import { IVA_RATES, type ClientType } from '../../data/taxRules';

export interface BudgetInput {
  concejoSlug: string;
  reformType: ReformType;
  areaM2: number;
  propertyType: PropertyType;
  quality: QualityLevel;
  pathologies?: PathologyKey[];
  roofAreaM2?: number;
  optionalPackages?: OptionalPackageKey[];
  clientType: ClientType;
  buildingOlderThan2Years: boolean;
  contractorMaterialsUnder40Pct: boolean;
}

export interface BudgetBreakdownItem {
  key: string;
  label: string;
  pct: number;
  minEur: number;
  maxEur: number;
}

export interface BudgetResult {
  concejo: ConcejoAsturias;
  areaM2: number;
  obraBaseMin: number;
  obraBaseMax: number;
  patologiasMin: number;
  patologiasMax: number;
  opcionalesObraMin: number;
  opcionalesObraMax: number;
  subtotalObraMin: number;
  subtotalObraMax: number;
  honorariosMin: number;
  honorariosMax: number;
  pemMin: number;
  pemMax: number;
  icioMin: number;
  icioMax: number;
  ivaObraRate: number;
  ivaObraMin: number;
  ivaObraMax: number;
  ivaHonorariosMin: number;
  ivaHonorariosMax: number;
  ivaTotalMin: number;
  ivaTotalMax: number;
  totalMin: number;
  totalMax: number;
  estimatedLicenseFeeRange: [number, number];
  estimatedWeeksMin: number;
  estimatedWeeksMax: number;
  breakdown: BudgetBreakdownItem[];
  hasEnergyUpgrade: boolean;
}

export function resolveIvaObraRate(input: {
  reformType: ReformType;
  clientType: ClientType;
  buildingOlderThan2Years: boolean;
  contractorMaterialsUnder40Pct: boolean;
}): number {
  if (input.clientType !== 'particular_vivienda_habitual') {
    return IVA_RATES.standard;
  }

  if (
    input.reformType === 'obra_nueva' ||
    input.reformType === 'rehabilitacion_casa_piedra'
  ) {
    return IVA_RATES.reduced;
  }

  if (
    (input.reformType === 'integral' || input.reformType === 'parcial_cocina_banos') &&
    input.buildingOlderThan2Years &&
    input.contractorMaterialsUnder40Pct
  ) {
    return IVA_RATES.reduced;
  }

  return IVA_RATES.standard;
}

export function calculateBudget(input: BudgetInput): BudgetResult {
  const concejo = getConcejoBySlug(input.concejoSlug);
  const areaM2 = Math.min(1000, Math.max(15, Number(input.areaM2) || 15));
  const base = REFORM_BASE_PRICING[input.reformType];
  const qualityMult = QUALITY_MULTIPLIERS[input.quality].mult;
  const propertyMult = PROPERTY_MULTIPLIERS[input.propertyType].mult;

  const obraBaseMinRaw =
    areaM2 * base.minEurM2 * qualityMult * propertyMult * concejo.logisticsFactor;
  const obraBaseMaxRaw =
    areaM2 * base.maxEurM2 * qualityMult * propertyMult * concejo.logisticsFactor;

  const pathologies = input.pathologies ?? [];
  let patologiasMin = 0;
  let patologiasMax = 0;

  for (const p of pathologies) {
    if (p === 'humedades_capilaridad') {
      patologiasMin += PATHOLOGY_COSTS.humedades_capilaridad.minEur;
      patologiasMax += PATHOLOGY_COSTS.humedades_capilaridad.maxEur;
    } else if (p === 'rehabilitacion_cubierta') {
      const roofArea =
        input.roofAreaM2 && input.roofAreaM2 > 0
          ? input.roofAreaM2
          : areaM2 * PATHOLOGY_COSTS.rehabilitacion_cubierta.defaultRoofRatio;
      patologiasMin += roofArea * PATHOLOGY_COSTS.rehabilitacion_cubierta.minEurM2;
      patologiasMax += roofArea * PATHOLOGY_COSTS.rehabilitacion_cubierta.maxEurM2;
    } else if (p === 'refuerzo_estructural') {
      patologiasMin += PATHOLOGY_COSTS.refuerzo_estructural.minEur;
      patologiasMax += PATHOLOGY_COSTS.refuerzo_estructural.maxEur;
    }
  }

  const optionalPackages = input.optionalPackages ?? [];
  let opcionalesObraMin = 0;
  let opcionalesObraMax = 0;
  let honorariosMin = 0;
  let honorariosMax = 0;

  for (const pkgKey of optionalPackages) {
    const pkg = OPTIONAL_PACKAGES[pkgKey];
    if (!pkg) continue;
    if (pkg.isTechnicalFee) {
      honorariosMin += pkg.minEur;
      honorariosMax += pkg.maxEur;
    } else {
      opcionalesObraMin += pkg.minEur;
      opcionalesObraMax += pkg.maxEur;
    }
  }

  const subtotalObraMin = Math.round(obraBaseMinRaw + patologiasMin + opcionalesObraMin);
  const subtotalObraMax = Math.round(obraBaseMaxRaw + patologiasMax + opcionalesObraMax);

  const pemMinRaw = subtotalObraMin / PEM_OVERHEAD_FACTOR;
  const pemMaxRaw = subtotalObraMax / PEM_OVERHEAD_FACTOR;
  const pemMin = Math.round(pemMinRaw);
  const pemMax = Math.round(pemMaxRaw);

  const icioMin = Math.round(pemMinRaw * concejo.icioRate);
  const icioMax = Math.round(pemMaxRaw * concejo.icioRate);

  const ivaObraRate = resolveIvaObraRate({
    reformType: input.reformType,
    clientType: input.clientType,
    buildingOlderThan2Years: input.buildingOlderThan2Years,
    contractorMaterialsUnder40Pct: input.contractorMaterialsUnder40Pct,
  });

  const ivaObraMin = Math.round(subtotalObraMin * ivaObraRate);
  const ivaObraMax = Math.round(subtotalObraMax * ivaObraRate);
  const ivaHonorariosMin = Math.round(honorariosMin * IVA_RATES.technicalFees);
  const ivaHonorariosMax = Math.round(honorariosMax * IVA_RATES.technicalFees);

  const ivaTotalMin = ivaObraMin + ivaHonorariosMin;
  const ivaTotalMax = ivaObraMax + ivaHonorariosMax;

  const totalMin = subtotalObraMin + honorariosMin + ivaTotalMin + icioMin;
  const totalMax = subtotalObraMax + honorariosMax + ivaTotalMax + icioMax;

  const extraSteps = Math.max(0, (areaM2 - 50) / 50);
  const estimatedWeeksMin = Math.max(
    base.baseWeeks,
    Math.round(base.baseWeeks + extraSteps * base.extraWeeksPer50M2),
  );
  const estimatedWeeksMax = Math.max(
    estimatedWeeksMin + 2,
    Math.round(estimatedWeeksMin * 1.25),
  );

  const breakdown: BudgetBreakdownItem[] = BREAKDOWN_SHARES_INTEGRAL.map((item) => ({
    key: item.key,
    label: item.label,
    pct: Math.round(item.pct * 100),
    minEur: Math.round(subtotalObraMin * item.pct),
    maxEur: Math.round(subtotalObraMax * item.pct),
  }));

  const hasEnergyUpgrade =
    optionalPackages.includes('aerotermia_recuperacion') ||
    input.reformType === 'rehabilitacion_casa_piedra';

  return {
    concejo,
    areaM2,
    obraBaseMin: Math.round(obraBaseMinRaw),
    obraBaseMax: Math.round(obraBaseMaxRaw),
    patologiasMin: Math.round(patologiasMin),
    patologiasMax: Math.round(patologiasMax),
    opcionalesObraMin,
    opcionalesObraMax,
    subtotalObraMin,
    subtotalObraMax,
    honorariosMin,
    honorariosMax,
    pemMin,
    pemMax,
    icioMin,
    icioMax,
    ivaObraRate,
    ivaObraMin,
    ivaObraMax,
    ivaHonorariosMin,
    ivaHonorariosMax,
    ivaTotalMin,
    ivaTotalMax,
    totalMin,
    totalMax,
    estimatedLicenseFeeRange: concejo.estimatedLicenseFeeRange,
    estimatedWeeksMin,
    estimatedWeeksMax,
    breakdown,
    hasEnergyUpgrade,
  };
}
