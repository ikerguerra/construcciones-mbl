export const CONCEJOS_LAST_VERIFIED = '2026-11';

export type ClimateZoneCTE = 'C1' | 'D1' | 'E1';

export interface ConcejoAsturias {
  slug: string;
  name: string;
  icioRate: number; // Porcentaje en decimal (ej. 0.04 = 4.00%)
  climateZone: ClimateZoneCTE;
  avgAltitudeM: number; // Altitud orientativa de la capital del concejo
  estimatedLicenseFeeRange: [number, number]; // Tasa administrativa orientativa (€)
  allowsSolarIcioBonus: boolean; // Posible bonificación potestativa art. 103.2 TRLRHL
  logisticsFactor: number; // Factor logístico obra (1.00 área central, 1.04-1.08 alas/montaña)
}

export const ASTURIAS_CONCEJOS: ConcejoAsturias[] = [
  { slug: 'oviedo', name: 'Oviedo', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 231, estimatedLicenseFeeRange: [60, 450], allowsSolarIcioBonus: true, logisticsFactor: 1.00 },
  { slug: 'gijon', name: 'Gijón', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 10, estimatedLicenseFeeRange: [65, 480], allowsSolarIcioBonus: true, logisticsFactor: 1.00 },
  { slug: 'aviles', name: 'Avilés', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 20, estimatedLicenseFeeRange: [55, 400], allowsSolarIcioBonus: true, logisticsFactor: 1.00 },
  { slug: 'siero', name: 'Siero', icioRate: 0.038, climateZone: 'D1', avgAltitudeM: 217, estimatedLicenseFeeRange: [50, 380], allowsSolarIcioBonus: true, logisticsFactor: 1.00 },
  { slug: 'langreo', name: 'Langreo', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 212, estimatedLicenseFeeRange: [50, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.02 },
  { slug: 'mieres', name: 'Mieres', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 206, estimatedLicenseFeeRange: [50, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.02 },
  { slug: 'castrillon', name: 'Castrillón', icioRate: 0.0399, climateZone: 'C1', avgAltitudeM: 35, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.01 },
  { slug: 'san-martin-del-rey-aurelio', name: 'San Martín del Rey Aurelio', icioRate: 0.0329, climateZone: 'D1', avgAltitudeM: 250, estimatedLicenseFeeRange: [45, 300], allowsSolarIcioBonus: true, logisticsFactor: 1.03 },
  { slug: 'corvera-de-asturias', name: 'Corvera de Asturias', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 67, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.01 },
  { slug: 'villaviciosa', name: 'Villaviciosa', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 10, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.03 },
  { slug: 'llanes', name: 'Llanes', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 11, estimatedLicenseFeeRange: [50, 400], allowsSolarIcioBonus: true, logisticsFactor: 1.06 },
  { slug: 'llanera', name: 'Llanera', icioRate: 0.0364, climateZone: 'D1', avgAltitudeM: 175, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.00 },
  { slug: 'carreno', name: 'Carreño', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 12, estimatedLicenseFeeRange: [45, 320], allowsSolarIcioBonus: true, logisticsFactor: 1.02 },
  { slug: 'gozon', name: 'Gozón', icioRate: 0.04, climateZone: 'C1', avgAltitudeM: 12, estimatedLicenseFeeRange: [45, 320], allowsSolarIcioBonus: true, logisticsFactor: 1.02 },
  { slug: 'grado', name: 'Grado', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 62, estimatedLicenseFeeRange: [40, 300], allowsSolarIcioBonus: true, logisticsFactor: 1.03 },
  { slug: 'navia', name: 'Navia', icioRate: 0.032, climateZone: 'C1', avgAltitudeM: 12, estimatedLicenseFeeRange: [40, 300], allowsSolarIcioBonus: true, logisticsFactor: 1.07 },
  { slug: 'cangas-de-onis', name: 'Cangas de Onís', icioRate: 0.04, climateZone: 'D1', avgAltitudeM: 64, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.05 },
  { slug: 'cangas-del-narcea', name: 'Cangas del Narcea', icioRate: 0.03, climateZone: 'D1', avgAltitudeM: 376, estimatedLicenseFeeRange: [40, 300], allowsSolarIcioBonus: true, logisticsFactor: 1.08 },
  { slug: 'otro-asturias', name: 'Otro concejo de Asturias', icioRate: 0.035, climateZone: 'D1', avgAltitudeM: 250, estimatedLicenseFeeRange: [45, 350], allowsSolarIcioBonus: true, logisticsFactor: 1.04 },
];

export const CONCEJOS_PROGRAMATICOS = ASTURIAS_CONCEJOS.filter(
  (c) => c.slug !== 'otro-asturias',
);

export function getConcejoBySlug(slug?: string | null): ConcejoAsturias {
  const found = ASTURIAS_CONCEJOS.find((c) => c.slug === slug);
  return found ?? ASTURIAS_CONCEJOS[ASTURIAS_CONCEJOS.length - 1];
}
