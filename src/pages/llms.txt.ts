import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { EMPRESA } from '../data/empresa';
import { TARIFAS } from '../data/tarifas';
import { CONCEJOS_PROGRAMATICOS } from '../data/asturiasConcejos';

export const GET: APIRoute = async () => {
  const servicios = (await getCollection('servicios')).sort((a, b) => a.data.orden - b.data.orden);
  const localidades = (await getCollection('localidades')).sort((a, b) => a.data.orden - b.data.orden);
  const blog = (await getCollection('blog')).sort((a, b) =>
    b.data.datePublished.localeCompare(a.data.datePublished)
  );

  const lines: string[] = [
    `# ${EMPRESA.marca} (${EMPRESA.razonSocial})`,
    '',
    `> Empresa de reformas integrales, cocinas, baños, cambio de bañera por plato de ducha en 48 horas, locales comerciales y construcción de viviendas unifamiliares en Asturias (Gijón, Oviedo, Avilés y resto del Principado).`,
    '',
    '## Datos verificados de la empresa (NAP)',
    `- Marca comercial: ${EMPRESA.marca} (${EMPRESA.alternateName})`,
    `- Razón social: ${EMPRESA.razonSocial}`,
    `- Oficina técnica: ${EMPRESA.direccion.completa}`,
    `- Teléfono y WhatsApp: ${EMPRESA.telefono} (${EMPRESA.telefonoVisible})`,
    `- Correo electrónico: ${EMPRESA.email}`,
    `- Horario: ${EMPRESA.horario.resumen}`,
    `- Valoración verificada en Google Maps: ${EMPRESA.googleBusiness.ratingValor}/5 (${EMPRESA.googleBusiness.totalResenas} reseñas)`,
    `- Garantías por escrito: ${EMPRESA.garantias.reformaIntegral} ${EMPRESA.garantias.construccionVivienda}`,
    '',
    '## Tarifas y plazos orientativos en Asturias (2026)',
    ...Object.values(TARIFAS).map(
      (t) =>
        `- **${t.nombre}**: ${t.rangoVisible} · Plazo medio: ${t.plazoEstimado} · Garantía: ${t.garantia} (${EMPRESA.dominio}${t.servicioUrl})`
    ),
    '',
    '## Suite de herramientas interactivas y calculadoras fiscales (Asturias 2026)',
    `- [Simulador Rápido de Presupuesto](${EMPRESA.dominio}/calcula-el-precio-de-tu-reforma-en-asturias/): Cálculo orientativo por m² y calidades en 2 minutos con visita gratuita.`,
    `- [Calculadora de Presupuesto con PEM, ICIO e IVA](${EMPRESA.dominio}/calculadora-presupuesto-reforma/): Desglose integral con cálculo del Presupuesto de Ejecución Material (PEM), tipo de ICIO de 18 concejos e IVA (10 % o 21 %).`,
    `- [Asistente de Licencias de Obra e ICIO en Asturias](${EMPRESA.dominio}/licencia-obra-asturias/): Determina si una obra requiere Declaración Responsable (TROTU art. 228 bis), Obra Menor u Obra Mayor en concejos asturianos.`,
    `- [Calculadora Deducciones IRPF por Reforma Energética](${EMPRESA.dominio}/calculadora-deducciones-irpf-reforma/): Cálculo exacto de deducción fiscal del 20 %, 40 % o 60 % (DA 50ª LIRPF) y ahorro neto en renta.`,
    `- [Comparador de Aerotermia vs Caldera](${EMPRESA.dominio}/comparador-aerotermia-asturias/): Comparativa de gasto y amortización según zona climática CTE en Asturias (C1, D1 y E1).`,
    '',
    '## Páginas principales y servicios',
    `- [Portada Construcciones MBL](${EMPRESA.dominio}/)`,
    `- [Quiénes Somos y Empresa](${EMPRESA.dominio}/empresa/): Más de 20 años de experiencia, dirección técnica propia en Cristasa (Gijón), presupuesto cerrado y garantías LOE.`,
    `- [Catálogo de Servicios en Asturias](${EMPRESA.dominio}/servicios/)`,
    `- [Galería de Proyectos Realizados](${EMPRESA.dominio}/proyectos/)`,
    `- [Cambio de Bañera por Plato de Ducha en 48 Horas](${EMPRESA.dominio}/cambio-de-banera-por-plato-de-ducha-en-asturias-oferta-expres-48-horas/)`,
    ...servicios.map(
      (s) => `- [${s.data.titulo}](${EMPRESA.dominio}/${s.data.slug}/): ${s.data.resumenAeo}`
    ),
    '',
    '## Cobertura local por concejos en Asturias',
    ...localidades.map(
      (l) =>
        `- [Reformas en ${l.data.municipio}](${EMPRESA.dominio}/${l.data.slug}/): ${l.data.resumenAeo}`
    ),
    '',
    '## Licencias e ICIO por concejo en Asturias (TROTU 2026)',
    ...CONCEJOS_PROGRAMATICOS.map(
      (c) =>
        `- [Licencia de Obra e ICIO en ${c.name}](${EMPRESA.dominio}/licencia-obra-asturias/${c.slug}/): Tramitación municipal, tipo de ICIO (${(c.icioRate * 100).toFixed(2).replace(/\.00$/, '')}%) y zona climática CTE ${c.climateZone} en ${c.name}, Asturias.`
    ),
    '',
    '## Guías técnicas de Innovación Sostenible (Asturias 2026)',
    ...blog.map(
      (p) =>
        `- [${p.data.titulo}](${EMPRESA.dominio}/${p.data.categoria}/${p.data.slug}/): ${p.data.resumenAeo}`
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
