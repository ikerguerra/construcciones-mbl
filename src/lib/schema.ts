import { EMPRESA } from '../data/empresa';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqSchemaItem {
  pregunta: string;
  respuesta: string;
}

export function buildOrganizationNode() {
  return {
    '@type': 'GeneralContractor',
    '@id': `${EMPRESA.dominio}/#organization`,
    name: EMPRESA.marca,
    alternateName: EMPRESA.alternateName,
    legalName: EMPRESA.razonSocial,
    url: `${EMPRESA.dominio}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${EMPRESA.dominio}/logo-mbl-schema.png`,
      width: 1024,
      height: 680,
    },
    image: `${EMPRESA.dominio}/og-default.jpg`,
    telephone: EMPRESA.telefono,
    email: EMPRESA.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: EMPRESA.direccion.calle,
      addressLocality: EMPRESA.direccion.localidad,
      addressRegion: EMPRESA.direccion.provincia,
      postalCode: EMPRESA.direccion.codigoPostal,
      addressCountry: EMPRESA.direccion.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: EMPRESA.geo.lat,
      longitude: EMPRESA.geo.lng,
    },
    hasMap: EMPRESA.googleBusiness.hasMap,
    openingHoursSpecification: EMPRESA.horario.schema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: EMPRESA.areasServidas.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    sameAs: [EMPRESA.redes.instagram, EMPRESA.redes.facebook],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: EMPRESA.googleBusiness.ratingValor.toFixed(1),
      reviewCount: String(EMPRESA.googleBusiness.totalResenas),
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function buildWebSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${EMPRESA.dominio}/#website`,
    url: `${EMPRESA.dominio}/`,
    name: EMPRESA.marca,
    inLanguage: 'es-ES',
    publisher: { '@id': `${EMPRESA.dominio}/#organization` },
  };
}

export function buildBreadcrumbNode(items: BreadcrumbItem[], pageUrl: string) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${EMPRESA.dominio}${item.url}`,
    })),
  };
}

export function buildFaqNode(faqs: ReadonlyArray<FaqSchemaItem>, pageUrl: string) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.respuesta,
      },
    })),
  };
}

export function buildServiceNode(opts: {
  name: string;
  description: string;
  url: string;
  priceText?: string;
  areaServed?: string[];
  serviceType?: string;
}) {
  return {
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    provider: { '@id': `${EMPRESA.dominio}/#organization` },
    areaServed: (opts.areaServed ?? ['Asturias', 'Gijón', 'Oviedo', 'Avilés']).map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    ...(opts.priceText
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            description: opts.priceText,
            availability: 'https://schema.org/InStock',
            url: `${EMPRESA.dominio}/calcula-el-precio-de-tu-reforma-en-asturias/`,
          },
        }
      : {}),
  };
}

export function buildWebApplicationNode(opts: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: 'FinanceApplication' | 'UtilitiesApplication';
}) {
  return {
    '@type': 'WebApplication',
    '@id': `${opts.url}#webapp`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: opts.applicationCategory ?? 'UtilitiesApplication',
    operatingSystem: 'All',
    inLanguage: 'es-ES',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    provider: { '@id': `${EMPRESA.dominio}/#organization` },
  };
}

export function buildBlogPostingNode(opts: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorRole: string;
  section: string;
}) {
  return {
    '@type': 'BlogPosting',
    '@id': `${opts.url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    headline: opts.title,
    description: opts.description,
    image: opts.imageUrl,
    inLanguage: 'es-ES',
    articleSection: opts.section,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: opts.authorName.toLowerCase().includes('borja')
      ? {
          '@type': 'Person',
          name: opts.authorName,
          jobTitle: opts.authorRole,
          worksFor: { '@id': `${EMPRESA.dominio}/#organization` },
        }
      : {
          '@type': 'Organization',
          name: opts.authorName,
          url: `${EMPRESA.dominio}/`,
        },
    publisher: { '@id': `${EMPRESA.dominio}/#organization` },
  };
}
