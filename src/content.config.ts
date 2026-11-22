import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqSchema = z.object({
  pregunta: z.string().min(10),
  respuesta: z.string().min(20),
});

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string().regex(/^[a-z0-9-]+$/),
      titulo: z.string().min(4),
      tituloCorto: z.string().min(4),
      h1: z.string().min(10),
      metaTitle: z.string().min(35).max(65),
      metaDescription: z.string().min(120).max(165),
      resumenAeo: z.string().min(120).max(460),
      categoriaTab: z.enum(['reformas', 'banos-cocinas', 'obra-locales']),
      tarifaKey: z.enum([
        'reforma-integral',
        'reforma-cocina',
        'reforma-bano',
        'plato-ducha',
        'construccion-vivienda',
        'local-comercial',
        'reforma-parcial',
        'rehabilitacion-fachadas',
        'rehabilitacion-casas-pueblo',
      ]),
      plazoVisible: z.string(),
      precioDesde: z.string(),
      garantia: z.string(),
      imagen: image(),
      imagenAlt: z.string().min(10),
      orden: z.number().int().min(1),
      destacadoHome: z.boolean().default(true),
      incluye: z.array(z.string()).min(3),
      pasos: z
        .array(
          z.object({
            titulo: z.string(),
            detalle: z.string(),
          })
        )
        .min(3),
      tablaTarifas: z.object({
        caption: z.string(),
        columnas: z.array(z.string()).min(3),
        filas: z.array(z.array(z.string()).min(3)).min(2),
      }),
      faqs: z.array(faqSchema).min(3),
    }),
});

const localidades = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/localidades' }),
  schema: ({ image }) =>
    z.object({
      slug: z.enum([
        'reformas-en-gijon',
        'reformas-en-oviedo',
        'reformas-en-aviles',
        'reformas-en-siero',
        'reformas-en-villaviciosa',
        'reformas-en-llanera',
      ]),
      orden: z.number().int().min(1).default(99),
      municipio: z.string(),
      h1: z.string().min(10),
      metaTitle: z.string().min(35).max(65),
      metaDescription: z.string().min(120).max(165),
      resumenAeo: z.string().min(120).max(460),
      subtituloHero: z.string(),
      barrios: z.array(z.string()).min(4),
      ayuntamiento: z.string(),
      licenciasInfo: z.string().min(80),
      tipologias: z.array(z.string()).min(3),
      guiaRelacionadaUrl: z.string().optional(),
      guiaRelacionadaTitulo: z.string().optional(),
      imagen: image(),
      imagenAlt: z.string().min(10),
      tablaLocal: z.object({
        caption: z.string(),
        columnas: z.array(z.string()),
        filas: z.array(z.array(z.string())),
      }),
      faqs: z.array(faqSchema).min(3),
    }),
});

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string().regex(/^[a-z0-9-]+$/),
      titulo: z.string().min(8),
      categoria: z.enum(['integral', 'cocina', 'bano', 'local', 'vivienda']),
      categoriaEtiqueta: z.string(),
      municipio: z.string(),
      superficieM2: z.string(),
      plazo: z.string(),
      resumen: z.string().min(30),
      imagen: image(),
      imagenAlt: z.string().min(10),
      destacadoHome: z.boolean().default(false),
      orden: z.number().int().min(1),
      detalleActivo: z.boolean().default(true),
      servicioSlug: z.string().default('reformas-integrales-en-asturias'),
      tarifaKey: z
        .enum([
          'reforma-integral',
          'reforma-cocina',
          'reforma-bano',
          'plato-ducha',
          'construccion-vivienda',
          'local-comercial',
          'reforma-parcial',
        ])
        .default('reforma-integral'),
      desafio: z.string().optional(),
      solucion: z.string().optional(),
      inversionOrientativa: z.string().optional(),
      antesDespues: z
        .object({
          antes: image(),
          antesAlt: z.string().default('Estado previo antes de la reforma'),
          despues: image(),
          despuesAlt: z.string().default('Resultado tras la reforma'),
          etiquetaAntes: z.string().default('Estado previo'),
          etiquetaDespues: z.string().default('Resultado final'),
        })
        .optional(),
      trabajos: z.array(z.string()).default([]),
      galeria: z
        .array(
          z.object({
            imagen: image(),
            alt: z.string().min(10),
          })
        )
        .default([]),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string().regex(/^[a-z0-9-]+$/),
      categoria: z.enum([
        'reforma-integral',
        'vivienda-sostenible',
        'aislamiento-termico',
        'construccion-casa',
        'reformas-de-banos',
        'reformas-de-cocinas',
        'reformas-locales-comerciales',
        'ayudas-y-subvenciones',
        'tarimas-y-suelos',
        'consejos-practicos',
        'mantenimiento',
      ]),
      categoriaNombre: z.string(),
      urlHeredadaWp: z.string().optional(),
      titulo: z.string().min(15),
      metaTitle: z.string().min(35).max(65),
      metaDescription: z.string().min(120).max(165),
      resumenAeo: z.string().min(120).max(480),
      autor: z.enum(['direccion-mbl', 'equipo-tecnico']),
      servicioRelacionado: z.string(),
      servicioRelacionadoNombre: z.string(),
      datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      dateModified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      tiempoLectura: z.number().int().min(2).max(20),
      imagen: image(),
      imagenAlt: z.string().min(10),
      articulosRelacionados: z.array(z.string()).default([]),
      faqs: z.array(faqSchema).min(3).max(6),
    }),
});

const promociones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/promociones' }),
  schema: z
    .object({
      id: z.string(),
      titulo: z.string(),
      subtitulo: z.string(),
      precioDesde: z.string(),
      precioAntes: z.string().optional(),
      plazo: z.string(),
      activa: z.boolean(),
      fechaInicio: z.coerce.date(),
      fechaFin: z.coerce.date(),
      incluye: z.array(z.string()).min(3),
      condiciones: z.string(),
    })
    .refine(
      (data) => {
        if (!data.activa) return true;
        const hoy = new Date().toISOString().slice(0, 10);
        return data.fechaFin >= new Date(hoy);
      },
      {
        message: 'Una promoción activa no puede compilarse con fechaFin vencida (RF-SERV-003).',
      }
    ),
});

export const collections = {
  servicios,
  localidades,
  proyectos,
  blog,
  promociones,
};
