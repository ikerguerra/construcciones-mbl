/**
 * Fuente única de verdad corporativa (NAP, métricas, garantías, autoría E-E-A-T,
 * reseñas reales y conmutadores de configuración) para Construcciones MBL.
 *
 * Pre-producción (PA-001): confirmar CIF definitivo y datos del Registro Mercantil
 * antes del corte DNS a producción.
 */

export const EMPRESA = {
  marca: 'Construcciones MBL',
  alternateName: 'MBL Construcciones',
  razonSocial: 'MBL CONSTRUCCIONES S.L.',
  dominio: 'https://construccionesmbl.com',
  cif: 'Pendiente de confirmación definitiva antes de publicación en producción (PA-001)',
  cifPendiente: true,
  registroMercantil: 'Pendiente de inscripción / confirmación registral (PA-001)',
  direccion: {
    calle: 'Av. Argentina 132 (Cristasa of. 221)',
    codigoPostal: '33213',
    localidad: 'Gijón',
    provincia: 'Asturias',
    pais: 'España',
    countryCode: 'ES',
    completa: 'Av. Argentina 132 (Cristasa of. 221), 33213 Gijón, Asturias, España',
  },
  geo: {
    lat: 43.5357,
    lng: -5.6615,
  },
  telefono: '+34 684 675 898',
  telefonoE164: '+34684675898',
  telefonoVisible: '684 675 898',
  whatsappUrl:
    'https://wa.me/34684675898?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20presupuesto%20para%20una%20reforma%20en%20Asturias.',
  email: 'info@construccionesmbl.com',
  horario: {
    resumen: 'Lunes a Viernes de 10:00 a 14:00 y de 16:00 a 19:00',
    schema: [
      {
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '14:00',
      },
      {
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '16:00',
        closes: '19:00',
      },
    ],
  },
  googleBusiness: {
    placeId: 'ChIJN_H9_Jyih2MRXyPsrrG4cWg',
    hasMap: 'https://www.google.com/maps/place/?q=place_id:ChIJN_H9_Jyih2MRXyPsrrG4cWg',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJN_H9_Jyih2MRXyPsrrG4cWg',
    ratingValor: 4.9,
    totalResenas: 29,
  },
  redes: {
    instagram: 'https://www.instagram.com/construccionesmbl',
    facebook: 'https://www.facebook.com/profile.php?id=61578248503214',
  },
  areasServidas: [
    'Asturias',
    'Gijón',
    'Oviedo',
    'Avilés',
    'Siero',
    'Villaviciosa',
    'Llanera',
    'Castrillón',
    'Langreo',
    'Mieres',
  ],
  metricas: [
    { valor: '+20', etiqueta: 'Años de experiencia en Asturias' },
    { valor: '+260', etiqueta: 'Proyectos finalizados' },
    { valor: '48 h', etiqueta: 'Cambio exprés de plato de ducha' },
    { valor: 'Hasta 10 años', etiqueta: 'Garantía por escrito' },
  ],
  marcasAgua: {
    bloqueOscuro: 'ASTURIAS',
    footer: 'CONSTRUCCIONES MBL',
  },
  garantias: {
    reformaIntegral: 'Hasta 3 años de garantía por escrito en acabados e instalaciones.',
    construccionVivienda: '10 años de garantía estructural conforme a la Ley de Ordenación de la Edificación (LOE).',
    financiacion: 'Estudio de financiación a medida sin compromiso junto a entidades colaboradoras.',
  },
} as const;

export interface AutorInfo {
  id: 'borja-direccion' | 'equipo-tecnico';
  nombre: string;
  rol: string;
  bio: string;
  especialidades: string[];
}

export const AUTORES: Record<AutorInfo['id'], AutorInfo> = {
  'borja-direccion': {
    id: 'borja-direccion',
    nombre: 'Borja — Dirección de Construcciones MBL',
    rol: 'Dirección general y coordinación técnica de obra en Asturias',
    bio: 'Responsable de la planificación de obra, elaboración de presupuestos cerrados por partidas y seguimiento diario junto al cliente en Gijón, Oviedo, Avilés y resto del Principado.',
    especialidades: [
      'Reformas integrales llave en mano',
      'Presupuestos cerrados y licencias en Asturias',
      'Construcción de vivienda unifamiliar',
    ],
  },
  'equipo-tecnico': {
    id: 'equipo-tecnico',
    nombre: 'Equipo Técnico de Construcciones MBL',
    rol: 'Albañilería, fontanería, electricidad, carpintería y eficiencia energética',
    bio: 'Equipo multidisciplinar con más de 20 años ejecutando reformas en viviendas, baños, cocinas y locales comerciales en Asturias, adaptado al clima húmedo atlántico y normativa municipal.',
    especialidades: [
      'Aislamiento térmico, ventilación y control de humedades',
      'Baños, platos de ducha 48 h y cocinas a medida',
      'Revestimientos, pavimentos SPC/tarima y locales comerciales',
    ],
  },
};

export interface TestimonioItem {
  id: string;
  autor: string;
  tipoObra: string;
  municipio: string;
  titulo: string;
  cita: string;
  imagenKey: 'integral' | 'local' | 'bano' | 'cocina';
}

export const TESTIMONIOS_REALES: TestimonioItem[] = [
  {
    id: 'ana-siero',
    autor: 'Ana',
    tipoObra: 'Reforma integral de vivienda',
    municipio: 'Pola de Siero',
    titulo: 'Cumplimiento estricto de plazos y presupuesto acordado',
    cita: 'Profesionalidad y buen gusto. Nos realizaron la reforma integral de nuestra vivienda en Pola de Siero y no podemos estar más satisfechos con el resultado. Cumplieron con todos los plazos previstos y se adaptaron perfectamente al presupuesto acordado, con Borja siempre pendiente de cada detalle.',
    imagenKey: 'integral',
  },
  {
    id: 'victor-local',
    autor: 'Víctor Del Coz',
    tipoObra: 'Reforma de local comercial',
    municipio: 'Asturias',
    titulo: 'Agilidad y soluciones reales en locales comerciales',
    cita: 'Me hicieron la reforma de un local comercial y todo ha salido genial. Cero impedimentos, rápidos y siempre dispuestos a resolver cada detalle de la obra. Sin duda volvería a repetir.',
    imagenKey: 'local',
  },
  {
    id: 'andrea-cocina-bano',
    autor: 'Andrea Ferrero',
    tipoObra: 'Reforma de cocina y baños',
    municipio: 'Asturias',
    titulo: 'Asesoramiento cercano en distribución y materiales',
    cita: 'He cambiado con ellos cocina y baños y sin duda alguna volvería a hacerlo con ellos. Te aconsejan en todo momento lo que mejor puede quedar y son muy atentos. Antes de decidir miré varias empresas y no me arrepiento de haber elegido Construcciones MBL.',
    imagenKey: 'cocina',
  },
  {
    id: 'paula-bano',
    autor: 'Paula Gómez Sánchez',
    tipoObra: 'Reforma de baño',
    municipio: 'Asturias',
    titulo: 'Cuidado del detalle y acabados limpios en el baño',
    cita: 'Muy buena experiencia. Me hicieron una reforma en el baño y el resultado ha sido justo lo que pedía. Han cuidado mucho los detalles, los materiales son de muy buena calidad y los acabados han quedado impecables.',
    imagenKey: 'bano',
  },
  {
    id: 'maria-c',
    autor: 'María C.',
    tipoObra: 'Proyecto de reforma',
    municipio: 'Asturias',
    titulo: 'Confianza y seriedad de principio a fin',
    cita: 'Buena experiencia con ellos. Confianza y seriedad, la base para que nuestro proyecto saliera perfecto. Muy agradecida a Borja y a todo el equipo durante toda la ejecución.',
    imagenKey: 'integral',
  },
  {
    id: 'ramon-menendez',
    autor: 'Ramón Menéndez',
    tipoObra: 'Reforma integral',
    municipio: 'Asturias',
    titulo: 'Trabajo fino recomendado al cien por cien',
    cita: 'Confiamos en la empresa a través de un amigo y la experiencia ha sido muy buena. Muy profesionales tanto el jefe de obra como todo su equipo, trabajo fino y muy bien ejecutado.',
    imagenKey: 'integral',
  },
];

export const FAQS_GENERALES = [
  {
    pregunta: '¿Cómo calculáis el presupuesto de una reforma en Asturias?',
    respuesta:
      'Realizamos una visita técnica gratuita en Gijón, Oviedo, Avilés o cualquier concejo de Asturias para tomar medidas, revisar instalaciones y elegir calidades. En 48 horas recibes un presupuesto cerrado y desglosado por partidas, sin sorpresas ni costes ocultos.',
  },
  {
    pregunta: '¿Qué plazos manejáis en reformas de cocina, baño y vivienda integral?',
    respuesta:
      'Un cambio de bañera por plato de ducha se ejecuta en 48 horas; una reforma completa de baño dura entre 1 y 2 semanas; una cocina completa entre 2 y 4 semanas; y una reforma integral entre 8 y 14 semanas, según superficie y redistribución.',
  },
  {
    pregunta: '¿Os encargáis de las licencias municipales y gestiones con la comunidad?',
    respuesta:
      'Sí. Gestionamos la declaración responsable o licencia de obra ante el Ayuntamiento correspondiente (Gijón, Oviedo, Avilés, Siero, etc.), las tasas municipales, la documentación técnica si se requiere proyecto y el aviso previo a la comunidad de propietarios.',
  },
  {
    pregunta: '¿Qué garantías ofrecéis por escrito?',
    respuesta:
      'Entregamos garantía por escrito en todos los trabajos: hasta 3 años en acabados e instalaciones de reformas integrales, cocinas, baños y locales, y 10 años de garantía estructural en construcción de viviendas nuevas conforme a la normativa vigente.',
  },
  {
    pregunta: '¿Cómo gestionáis los imprevistos que puedan aparecer al picar o abrir paredes?',
    respuesta:
      'Nuestro responsable técnico supervisa la obra a diario. Si aparece una patología oculta (humedades previas, bajantes comunitarias antiguas o regatas deterioradas), te mostramos el problema en obra antes de actuar y pactamos la solución técnica y su coste por escrito.',
  },
  {
    pregunta: '¿Ofrecéis estudio de financiación para la reforma?',
    respuesta:
      'Sí, podemos facilitarte un estudio de financiación a medida sin compromiso adaptado al importe y plazo de tu reforma o vivienda nueva.',
  },
] as const;

/**
 * Interruptor configurable de la campaña Oferta Exprés 48h plato de ducha (PA-009).
 * La página permanente /cambio-de-banera-por-plato-de-ducha-en-asturias-oferta-expres-48-horas/
 * siempre permanece activa como servicio; este flag controla únicamente mostrar u ocultar
 * el reclamo promocional y su banda destacada en portada/cabeceras.
 */
export function isPromoDuchaActive(collectionFlag = true): boolean {
  const envVal = import.meta.env.PUBLIC_SHOW_PROMO_DUCHA;
  if (envVal === 'false' || envVal === '0') return false;
  return collectionFlag;
}
