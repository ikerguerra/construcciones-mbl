import {
  IRPF_PROLONGATION_NOTICE,
  IRPF_TIERS,
  type IrpfDeductionTier,
  type IrpfTierConfig,
} from '../../data/taxRules';

export interface IrpfInput {
  investmentWithVat: number;
  publicSubsidies: number;
  deductionTier: IrpfDeductionTier;
  paidByBankOrCard: boolean;
  includesFossilFuelBoiler: boolean;
}

export interface IrpfResult {
  tier: IrpfTierConfig;
  investmentWithVat: number;
  publicSubsidies: number;
  baseNeta: number;
  baseAplicable: number;
  deduccionTotal: number;
  costeNetoReal: number;
  yearlySchedule: number[];
  isValid: boolean;
  alerts: string[];
  prolongationNotice: string;
}

export function calculateIrpfDeduction(input: IrpfInput): IrpfResult {
  const tier = IRPF_TIERS[input.deductionTier];
  const investmentWithVat = Math.max(0, Number(input.investmentWithVat) || 0);
  const publicSubsidies = Math.max(0, Number(input.publicSubsidies) || 0);
  const baseNeta = Math.max(0, investmentWithVat - publicSubsidies);

  const alerts: string[] = [];

  if (!input.paidByBankOrCard) {
    alerts.push(
      'Pago no deducible: la AEAT exige abono mediante transferencia bancaria, tarjeta, cheque nominativo o ingreso en cuenta. Los pagos en efectivo generan 0 € de deducción.',
    );
    return {
      tier,
      investmentWithVat,
      publicSubsidies,
      baseNeta,
      baseAplicable: 0,
      deduccionTotal: 0,
      costeNetoReal: Math.round(baseNeta),
      yearlySchedule: [],
      isValid: false,
      alerts,
      prolongationNotice: IRPF_PROLONGATION_NOTICE,
    };
  }

  if (input.includesFossilFuelBoiler) {
    alerts.push(
      'Aviso AEAT: los equipos e instalaciones que utilicen combustibles fósiles (calderas de gas natural o gasóleo) no son deducibles en el tramo de eficiencia energética.',
    );
  }

  const baseAplicable = Math.min(baseNeta, tier.maxTotalBase);
  const deduccionTotal = Math.round(baseAplicable * tier.rate);

  const yearlySchedule: number[] = [];
  if (deduccionTotal > 0) {
    if (input.deductionTier === 'rehabilitacion_edificio_60') {
      let remaining = baseAplicable;
      for (let i = 0; i < tier.carryForwardYears && remaining > 0; i++) {
        const baseYear = Math.min(remaining, tier.maxAnnualBase);
        yearlySchedule.push(Math.round(baseYear * tier.rate));
        remaining -= baseYear;
      }
    } else {
      yearlySchedule.push(deduccionTotal);
    }
  }

  const costeNetoReal = Math.max(0, Math.round(baseNeta - deduccionTotal));

  return {
    tier,
    investmentWithVat,
    publicSubsidies,
    baseNeta: Math.round(baseNeta),
    baseAplicable: Math.round(baseAplicable),
    deduccionTotal,
    costeNetoReal,
    yearlySchedule,
    isValid: true,
    alerts,
    prolongationNotice: IRPF_PROLONGATION_NOTICE,
  };
}
