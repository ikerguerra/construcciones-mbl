import { getConcejoBySlug, type ConcejoAsturias } from '../../data/asturiasConcejos';
import { PEM_OVERHEAD_FACTOR } from '../../data/budgetPricing';

export type WorkCategory =
  | 'estetica_interior'
  | 'reforma_sin_distribucion'
  | 'reforma_con_tabiques'
  | 'fachada_cubierta_estructura'
  | 'cierre_parcela'
  | 'obra_nueva_ampliacion';

export type PermitType =
  | 'DECLARACION_RESPONSABLE'
  | 'LICENCIA_OBRA_MENOR'
  | 'LICENCIA_OBRA_MAYOR';

export interface LicenseInput {
  concejoSlug: string;
  workCategory: WorkCategory;
  isProtectedBuilding: boolean;
  occupiesPublicWay: boolean;
  estimatedBudgetNoVat: number;
  alreadyPem?: boolean;
  isPublicDomainAdjacent?: boolean;
}

export interface LicenseResult {
  concejo: ConcejoAsturias;
  permitType: PermitType;
  permitLabel: string;
  requiresArchitectProject: boolean;
  requiresSiteManagement: boolean;
  estimatedResolutionDays: string;
  pemEstimated: number;
  icioAmount: number;
  icioRatePercent: number;
  estimatedFeeRange: [number, number];
  extraPermits: string[];
  requiredDocuments: string[];
  legalNote: string;
}

export const WORK_CATEGORY_LABELS: Record<WorkCategory, { label: string; description: string }> = {
  estetica_interior: {
    label: 'Estética interior sin instalaciones ni tabiques',
    description: 'Pintura, acuchillado de parqué, cambio de sanitarios o muebles de cocina',
  },
  reforma_sin_distribucion: {
    label: 'Reforma interior sin modificar tabiques ni fachada',
    description: 'Suelos, alicatados, renovación de fontanería/electricidad o ventanas en mismo hueco',
  },
  reforma_con_tabiques: {
    label: 'Reforma interior modificando tabiquería',
    description: 'Tirar o levantar tabiques de distribución interior sin afectar estructura',
  },
  fachada_cubierta_estructura: {
    label: 'Fachada, cubierta / tejado o refuerzo estructural',
    description: 'SATE en fachada, cambio estructural de cubierta, apertura de huecos o vigas',
  },
  cierre_parcela: {
    label: 'Cierre o vallado de parcela',
    description: 'Cerramiento perimetral de finca o vivienda unifamiliar',
  },
  obra_nueva_ampliacion: {
    label: 'Obra nueva o ampliación de volumen',
    description: 'Vivienda unifamiliar de nueva planta, porche cerrado o ampliación edificada',
  },
};

export function simulateLicense(input: LicenseInput): LicenseResult {
  const concejo = getConcejoBySlug(input.concejoSlug);
  const rawBudget = Math.max(0, Number(input.estimatedBudgetNoVat) || 0);
  const pemRaw = input.alreadyPem ? rawBudget : rawBudget / PEM_OVERHEAD_FACTOR;
  const pemEstimated = Math.round(pemRaw);
  const icioAmount = Math.round(pemRaw * concejo.icioRate);
  const icioRatePercent = Number((concejo.icioRate * 100).toFixed(2));

  let permitType: PermitType;
  let permitLabel: string;
  let requiresArchitectProject = false;
  let requiresSiteManagement = false;
  let estimatedResolutionDays: string;
  let legalNote: string;

  const requiredDocuments: string[] = [
    `Impreso normalizado del Ayuntamiento de ${concejo.name}`,
    'Presupuesto detallado por partidas (PEM) y autoliquidación de ICIO / tasa',
  ];

  const isMajorWork =
    input.isProtectedBuilding ||
    input.workCategory === 'obra_nueva_ampliacion' ||
    input.workCategory === 'fachada_cubierta_estructura';

  if (isMajorWork) {
    permitType = 'LICENCIA_OBRA_MAYOR';
    permitLabel = 'Licencia Urbanística de Obra Mayor';
    requiresArchitectProject = true;
    requiresSiteManagement = true;
    estimatedResolutionDays =
      'Hasta 3 meses (art. 21.3 Ley 39/2015); en la práctica 2–5 meses según concejo';
    legalNote =
      'Conforme al TROTU (Decreto Legislativo 1/2004, art. 228), las actuaciones con afección estructural, ampliación de volumen, fachada/cubierta o sobre inmuebles protegidos requieren proyecto visado y licencia expresa previa.';
    requiredDocuments.push(
      'Proyecto técnico visado suscrito por arquitecto/arquitecto técnico',
      'Nombramiento de Dirección Facultativa y Coordinación de Seguridad y Salud',
    );
  } else if (
    input.workCategory === 'reforma_con_tabiques' ||
    (input.workCategory === 'cierre_parcela' && Boolean(input.isPublicDomainAdjacent))
  ) {
    permitType = 'LICENCIA_OBRA_MENOR';
    permitLabel = 'Licencia de Obra Menor / Comunicación con memoria técnica';
    requiresArchitectProject = false;
    requiresSiteManagement = false;
    estimatedResolutionDays = '15–45 días hábiles según concejo';
    legalNote =
      'La modificación de tabiquería interior o cierres colindantes con dominio público exige memoria técnica o certificado de no afección estructural según la ordenanza municipal vigente.';
    requiredDocuments.push(
      'Plano de estado actual y reformado + memoria descriptiva de obra',
      'Certificado técnico de no afección estructural (si se modifican tabiques)',
    );
  } else {
    permitType = 'DECLARACION_RESPONSABLE';
    permitLabel = 'Declaración Responsable Urbanística (Art. 228 bis TROTU)';
    requiresArchitectProject = false;
    requiresSiteManagement = false;
    estimatedResolutionDays =
      'Inicio inmediato desde el registro de entrada y pago de autoliquidación';
    legalNote =
      'Según el art. 228 bis del TROTU en el Principado de Asturias, las reformas interiores sin modificación de distribución ni afección estructural o patrimonial pueden iniciarse mediante Declaración Responsable.';
    requiredDocuments.push(
      'Declaración Responsable firmada por el promotor o representante',
      'Descripción sucinta de los trabajos y referencia catastral del inmueble',
    );
  }

  const extraPermits: string[] = [];

  if (input.occupiesPublicWay) {
    extraPermits.push(
      'Permiso y tasa de ocupación de vía pública (contenedor de escombros / andamio)',
    );
  }

  if (input.isProtectedBuilding) {
    extraPermits.push(
      'Informe favorable de la Consejería de Cultura / Patrimonio Cultural del Principado de Asturias',
    );
  }

  if (input.workCategory === 'cierre_parcela' && input.isPublicDomainAdjacent) {
    extraPermits.push(
      'Autorización de retranqueo y colindancia de Carreteras / Dominio Público',
    );
  }

  if (input.workCategory !== 'estetica_interior') {
    extraPermits.push(
      'Estudio y gestión de residuos de construcción y demolición (RCD) + fianza municipal si aplica',
    );
  }

  return {
    concejo,
    permitType,
    permitLabel,
    requiresArchitectProject,
    requiresSiteManagement,
    estimatedResolutionDays,
    pemEstimated,
    icioAmount,
    icioRatePercent,
    estimatedFeeRange: concejo.estimatedLicenseFeeRange,
    extraPermits,
    requiredDocuments,
    legalNote,
  };
}
