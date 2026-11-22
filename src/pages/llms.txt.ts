import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { EMPRESA } from '../data/empresa';
import { TARIFAS } from '../data/tarifas';

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
    '## Páginas principales y servicios',
    `- [Portada Construcciones MBL](${EMPRESA.dominio}/)`,
    `- [Catálogo de Servicios en Asturias](${EMPRESA.dominio}/servicios/)`,
    `- [Simulador Interactivo de Presupuesto de Reforma](${EMPRESA.dominio}/calcula-el-precio-de-tu-reforma-en-asturias/)`,
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
