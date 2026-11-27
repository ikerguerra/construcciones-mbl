import fs from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import vercelLeadHandler from '../../api/lead';
import vercelTagHandler from '../../api/tag';
import { onRequest as cfTagOnRequest } from '../../functions/tag/[[path]]';
import { onRequestPost as cfLeadOnRequestPost } from '../../functions/api/lead';

const ROOT = path.resolve(import.meta.dirname, '..', '..');

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_FROM_EMAIL;
  delete process.env.LEADS_TO_EMAIL;
  delete process.env.SEND_AUTO_REPLY;
  delete process.env.SHEETS_WEBHOOK_URL;
});

function makeLeadRequest(payload: unknown, method = 'POST'): Request {
  return new Request('https://construccionesmbl.com/api/lead', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: method === 'POST' ? JSON.stringify(payload) : undefined,
  });
}

describe('Endpoints serverless /api/lead y /tag/* (Cloudflare Pages + Vercel)', () => {
  it('rechaza métodos distintos de POST en Vercel /api/lead con HTTP 405 y cabecera Allow', async () => {
    const res = await vercelLeadHandler.fetch(makeLeadRequest(null, 'GET'));
    expect(res.status).toBe(405);
    expect(res.headers.get('Allow')).toBe('POST');
    const data = (await res.json()) as { ok: boolean };
    expect(data.ok).toBe(false);
  });

  it('devuelve 400 ante JSON malformado en ambos adaptadores', async () => {
    const req1 = new Request('https://construccionesmbl.com/api/lead', {
      method: 'POST',
      body: '{bad-json',
    });
    const req2 = new Request('https://construccionesmbl.com/api/lead', {
      method: 'POST',
      body: '{bad-json',
    });

    const vercelRes = await vercelLeadHandler.fetch(req1);
    const cfRes = await cfLeadOnRequestPost({
      request: req2,
      env: {},
    } as Parameters<typeof cfLeadOnRequestPost>[0]);

    expect(vercelRes.status).toBe(400);
    expect(cfRes.status).toBe(400);
  });

  it('valida privacidad, nombre, teléfono y email devolviendo HTTP 422', async () => {
    const invalidPayload = {
      origen: 'contacto',
      nombre: 'Ana',
      telefono: '684675898',
      email: 'ana@ejemplo.es',
      privacidad: false,
    };

    const res = await vercelLeadHandler.fetch(makeLeadRequest(invalidPayload));
    expect(res.status).toBe(422);
    const data = (await res.json()) as { ok: boolean; error: string };
    expect(data.ok).toBe(false);
    expect(data.error).toContain('Política de Privacidad');
  });

  it('silencia envíos honeypot sin disparar llamadas externas', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    process.env.RESEND_API_KEY = 're_test_key';

    const res = await vercelLeadHandler.fetch(
      makeLeadRequest({
        nombre: 'Bot',
        telefono: '600000000',
        email: 'bot@spam.invalid',
        privacidad: true,
        empresa_web: 'https://spam.example',
      })
    );

    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('envía notificación comercial y auto-respuesta vía Resend y webhook opcional en Vercel y Cloudflare', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ id: 'ok' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    process.env.RESEND_API_KEY = 're_test_key';
    process.env.SEND_AUTO_REPLY = 'true';
    process.env.SHEETS_WEBHOOK_URL = 'https://sheets.example/hook';

    const validPayload = {
      origen: 'simulador' as const,
      nombre: 'Lucía Fernández',
      telefono: '684675898',
      email: 'lucia@ejemplo.es',
      zona: 'Gijón',
      mensaje: 'Reforma integral de 90 m2',
      privacidad: true,
      simulacion: {
        tipoObra: 'reforma-integral',
        nombreObra: 'Reforma integral',
        m2: 90,
        calidad: 'Media',
        extras: ['Licencias'],
        estimacionMin: 58500,
        estimacionMax: 78000,
        plazoEstimado: '8 – 12 semanas',
      },
    };

    const vercelRes = await vercelLeadHandler.fetch(makeLeadRequest(validPayload));
    expect(vercelRes.status).toBe(200);
    expect(await vercelRes.json()).toMatchObject({ ok: true, autoReplySent: true });
    expect(fetchMock).toHaveBeenCalledTimes(3);

    fetchMock.mockClear();
    const cfRes = await cfLeadOnRequestPost({
      request: makeLeadRequest(validPayload),
      env: {
        RESEND_API_KEY: 're_test_key',
        SEND_AUTO_REPLY: 'false',
      },
    } as Parameters<typeof cfLeadOnRequestPost>[0]);

    expect(cfRes.status).toBe(200);
    expect(await cfRes.json()).toMatchObject({ ok: true, autoReplySent: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(cfLeadOnRequestPost).toBeTypeOf('function');

    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('Resend error', { status: 500 }))
    );
    const errRes = await vercelLeadHandler.fetch(makeLeadRequest(validPayload));
    expect(errRes.status).toBe(502);
    expect(await errRes.json()).toMatchObject({ ok: false });
  });

  it('sirve HTTP 410 Gone con X-Robots-Tag noindex, nofollow en /tag/* para Cloudflare y Vercel', async () => {
    const vercelRes = vercelTagHandler.fetch();
    const cfRes = await cfTagOnRequest({} as Parameters<typeof cfTagOnRequest>[0]);

    for (const res of [vercelRes, cfRes]) {
      expect(res.status).toBe(410);
      expect(res.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(res.headers.get('Content-Type')).toContain('text/html');
      const body = await res.text();
      expect(body).toContain('Etiqueta archivada (410)');
      expect(body).toContain('/innovacion-sostenible/');
    }
  });
});

describe('Paridad entre vercel.json y public/_redirects + public/_headers', () => {
  it('mantiene todas las reglas 301 de _redirects, rewrite de /tag/* y cabeceras de seguridad sin trailingSlash conflictivo', () => {
    const redirectsRaw = fs.readFileSync(path.join(ROOT, 'public', '_redirects'), 'utf-8');
    const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf-8')) as {
      trailingSlash?: boolean;
      redirects?: Array<{ source: string; destination: string; statusCode?: number }>;
      rewrites?: Array<{ source: string; destination: string }>;
      headers?: Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
    };

    expect(vercel.trailingSlash).toBeUndefined();

    const cfRules = redirectsRaw
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'))
      .map((l) => l.split(/\s+/));

    const vercelMap = new Map(
      (vercel.redirects ?? []).map((r) => [r.source, { dst: r.destination, code: r.statusCode }])
    );

    for (const [src, dst, code] of cfRules) {
      const vercelSrc = src === '/author/*' ? '/author/:path*' : src;
      expect(vercelMap.get(vercelSrc)).toEqual({ dst, code: Number(code) });
    }

    expect(vercel.rewrites).toContainEqual({
      source: '/tag/:path*',
      destination: '/api/tag',
    });

    const globalHeaders = vercel.headers?.find((h) => h.source === '/(.*)')?.headers ?? [];
    const headerKeys = new Set(globalHeaders.map((h) => h.key));
    expect(headerKeys.has('Strict-Transport-Security')).toBe(true);
    expect(headerKeys.has('X-Content-Type-Options')).toBe(true);
    expect(headerKeys.has('Content-Security-Policy')).toBe(true);
  });
});
