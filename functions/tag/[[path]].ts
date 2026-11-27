/**
 * Cloudflare Pages Function para devolver HTTP 410 Gone en todas las rutas
 * heredadas /tag/* (340 etiquetas de WordPress dadas de baja según ADR-003 y PA-002).
 *
 * Nota técnica: el fichero _redirects de Cloudflare Pages solo admite códigos
 * 200, 301, 302, 303, 307 y 308 (no admite 410). Esta función en el borde sirve
 * el código HTTP 410 real con cabecera X-Robots-Tag: noindex, nofollow.
 */

import { TAG_GONE_HEADERS, TAG_GONE_HTML } from '../../src/lib/server/tagHandler';

export const onRequest: PagesFunction = async () => {
  return new Response(TAG_GONE_HTML, {
    status: 410,
    statusText: 'Gone',
    headers: TAG_GONE_HEADERS,
  });
};
