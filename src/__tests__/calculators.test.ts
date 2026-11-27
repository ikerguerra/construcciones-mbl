import { describe, expect, it } from 'vitest';
import { calculateBudget } from '../lib/calculators/budgetEngine';
import { simulateLicense } from '../lib/calculators/licenseEngine';
import { calculateIrpfDeduction } from '../lib/calculators/irpfEngine';
import { compareAerotermia } from '../lib/calculators/aerotermiaEngine';
import { buildToolUrl, parseToolQuery } from '../lib/calculators/urlState';

describe('Suite de Calculadoras Asturias 2026 (Sección 8)', () => {
  it('Test 1 — Presupuesto Integral + Aerotermia + Proyecto Técnico en Siero (IVA mixto)', () => {
    const res = calculateBudget({
      concejoSlug: 'siero',
      reformType: 'integral',
      areaM2: 100,
      propertyType: 'piso_con_ascensor',
      quality: 'media',
      pathologies: [],
      optionalPackages: ['aerotermia_recuperacion', 'proyecto_tecnico'],
      clientType: 'particular_vivienda_habitual',
      buildingOlderThan2Years: true,
      contractorMaterialsUnder40Pct: true,
    });

    expect(res.subtotalObraMin).toBe(86000);
    expect(res.subtotalObraMax).toBe(107500);
    expect(res.honorariosMin).toBe(12000);
    expect(res.honorariosMax).toBe(19500);
    expect(res.pemMin).toBe(72269);
    expect(res.pemMax).toBe(90336);
    expect(res.icioMin).toBe(2746);
    expect(res.icioMax).toBe(3433);
    expect(res.ivaObraRate).toBe(0.10);
    expect(res.ivaObraMin).toBe(8600);
    expect(res.ivaObraMax).toBe(10750);
    expect(res.ivaHonorariosMin).toBe(2520);
    expect(res.ivaHonorariosMax).toBe(4095);
    expect(res.totalMin).toBe(111866);
    expect(res.totalMax).toBe(145278);
  });

  it('Test 2 — Regla IVA 21% en Local Comercial', () => {
    const res = calculateBudget({
      concejoSlug: 'oviedo',
      reformType: 'local_comercial',
      areaM2: 80,
      propertyType: 'local',
      quality: 'media',
      clientType: 'inversor_alquiler_o_empresa',
      buildingOlderThan2Years: true,
      contractorMaterialsUnder40Pct: true,
    });

    expect(res.ivaObraRate).toBe(0.21);
  });

  it('Test 3A — Simulador de Licencias (TROTU Asturias): Declaración Responsable en Oviedo', () => {
    const res = simulateLicense({
      concejoSlug: 'oviedo',
      workCategory: 'reforma_sin_distribucion',
      isProtectedBuilding: false,
      occupiesPublicWay: false,
      estimatedBudgetNoVat: 23800,
    });

    expect(res.permitType).toBe('DECLARACION_RESPONSABLE');
    expect(res.requiresArchitectProject).toBe(false);
    expect(res.pemEstimated).toBe(20000);
    expect(res.icioAmount).toBe(800);
  });

  it('Test 3B — Simulador de Licencias (TROTU Asturias): Inmueble protegido requiere Obra Mayor y Cultura', () => {
    const res = simulateLicense({
      concejoSlug: 'oviedo',
      workCategory: 'reforma_sin_distribucion',
      isProtectedBuilding: true,
      occupiesPublicWay: false,
      estimatedBudgetNoVat: 23800,
    });

    expect(res.permitType).toBe('LICENCIA_OBRA_MAYOR');
    expect(res.requiresArchitectProject).toBe(true);
    expect(res.extraPermits.some((p) => p.includes('Patrimonio Cultural'))).toBe(true);
  });

  it('Test 4A — Deducciones IRPF: Tramo 40% con subvención pública descontada', () => {
    const res = calculateIrpfDeduction({
      investmentWithVat: 14000,
      publicSubsidies: 3000,
      deductionTier: 'energia_30_o_AB',
      paidByBankOrCard: true,
      includesFossilFuelBoiler: false,
    });

    expect(res.baseNeta).toBe(11000);
    expect(res.baseAplicable).toBe(7500);
    expect(res.deduccionTotal).toBe(3000);
    expect(res.costeNetoReal).toBe(8000);
  });

  it('Test 4B — Deducciones IRPF: Tramo 60% plurianual (3 años de 3.000 €)', () => {
    const res = calculateIrpfDeduction({
      investmentWithVat: 16000,
      publicSubsidies: 0,
      deductionTier: 'rehabilitacion_edificio_60',
      paidByBankOrCard: true,
      includesFossilFuelBoiler: false,
    });

    expect(res.baseAplicable).toBe(15000);
    expect(res.deduccionTotal).toBe(9000);
    expect(res.costeNetoReal).toBe(7000);
    expect(res.yearlySchedule).toEqual([3000, 3000, 3000]);
  });

  it('Test 4C — Deducciones IRPF: Pago en efectivo anula deducción', () => {
    const res = calculateIrpfDeduction({
      investmentWithVat: 14000,
      publicSubsidies: 0,
      deductionTier: 'energia_30_o_AB',
      paidByBankOrCard: false,
      includesFossilFuelBoiler: false,
    });

    expect(res.deduccionTotal).toBe(0);
    expect(res.isValid).toBe(false);
    expect(res.alerts.length).toBeGreaterThan(0);
  });

  it('Test 5 — Comparador Aerotermia en Oviedo (Zona D1) vs Gasóleo C', () => {
    const res = compareAerotermia({
      concejoSlug: 'oviedo',
      currentSystem: 'gasoil_convencional',
      annualSpendEur: 2000,
      emitterType: 'suelo_radiante',
      electricityPriceEurKwh: 0.18,
      investmentEur: 14250,
    });

    expect(Math.abs(res.usefulDemandKwh - 15871)).toBeLessThanOrEqual(2);
    expect(Math.abs(res.aerotermiaKwh - 4290)).toBeLessThanOrEqual(2);
    expect(Math.abs(res.aerotermiaAnnualCostEur - 772)).toBeLessThanOrEqual(2);
    expect(Math.abs(res.annualSavingsEur - 1228)).toBeLessThanOrEqual(2);
    expect(res.savingsPercent).toBeCloseTo(61.4, 1);
    expect(res.paybackYearsGross).not.toBeNull();
    expect(Math.abs((res.paybackYearsGross ?? 0) - 11.6)).toBeLessThanOrEqual(0.1);
    expect(res.paybackYearsWithIrpf40).not.toBeNull();
    expect(Math.abs((res.paybackYearsWithIrpf40 ?? 0) - 9.2)).toBeLessThanOrEqual(0.1);
  });

  it('Deep linking (urlState): serializa y parsea parámetros entre herramientas', () => {
    const url = buildToolUrl('presupuesto', {
      concejo: 'oviedo',
      m2: 120,
      opt: 'aerotermia_recuperacion',
    });
    expect(url).toBe('/calcula-el-precio-de-tu-reforma-en-asturias/?concejo=oviedo&m2=120&opt=aerotermia_recuperacion');
    const parsed = parseToolQuery('?concejo=oviedo&m2=120&opt=aerotermia_recuperacion');
    expect(parsed.concejo).toBe('oviedo');
    expect(parsed.m2).toBe(120);
    expect(parsed.opt).toBe('aerotermia_recuperacion');
  });
});
