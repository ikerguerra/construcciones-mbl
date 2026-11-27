import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { EMPRESA } from '../data/empresa';
import { buildOrganizationNode } from '../lib/schema';

const ROOT = path.resolve(import.meta.dirname, '..', '..');

function parseRedirectsLines(raw: string): Array<{ src: string; dst: string; code: number }> {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .map((line) => {
      const parts = line.split(/\s+/);
      return {
        src: parts[0] ?? '',
        dst: parts[1] ?? '',
        code: Number((parts[2] ?? '').replace(/!$/, '')),
      };
    });
}

describe('Datos corporativos y redirecciones 301 de migración', () => {
  it('mantiene sincronizadas las 32 reseñas verificadas entre EMPRESA y Schema.org', () => {
    expect(EMPRESA.googleBusiness.ratingValor).toBe(4.9);
    expect(EMPRESA.googleBusiness.totalResenas).toBe(32);

    const org = buildOrganizationNode();
    expect(org.aggregateRating).toEqual({
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '32',
      bestRating: '5',
      worstRating: '1',
    });
  });

  it('incluye las reglas 301 adicionales detectadas en vivo sin cadenas ni códigos inválidos', () => {
    const raw = fs.readFileSync(path.join(ROOT, 'public', '_redirects'), 'utf-8');
    const rules = parseRedirectsLines(raw);
    const bySource = new Map(rules.map((r) => [r.src, r]));

    expect(rules.length).toBeGreaterThan(0);
    for (const rule of rules) {
      expect(rule.code).toBe(301);
      if (!rule.src.includes('*')) {
        expect(bySource.has(rule.dst)).toBe(false);
      }
    }

    const expectedRedirects: Array<[string, string]> = [
      ['/reformas-de-ba%C3%B1os-en-asturias', '/reformas-de-banos-en-asturias/'],
      ['/reformas-de-ba%c3%b1os-en-asturias', '/reformas-de-banos-en-asturias/'],
      ['/reformas-de-baños-en-asturias', '/reformas-de-banos-en-asturias/'],
      ['/reformas-de-ba%C3%B1os-en-asturias/', '/reformas-de-banos-en-asturias/'],
      ['/reformas-de-baños-en-asturias/', '/reformas-de-banos-en-asturias/'],
      [
        '/reformas-de-banos/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles',
        '/vivienda-sostenible/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/',
      ],
      [
        '/reformas-de-banos/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/',
        '/vivienda-sostenible/reforma-de-banos-y-cocinas-en-asturias-como-evitar-condensaciones-y-humedades-con-soluciones-sostenibles/',
      ],
      ['/wp-sitemap.xml', '/sitemap-index.xml'],
      ['/calculadora-presupuesto-reforma', '/calcula-el-precio-de-tu-reforma-en-asturias/'],
      ['/calculadora-presupuesto-reforma/', '/calcula-el-precio-de-tu-reforma-en-asturias/'],
    ];

    for (const [src, dst] of expectedRedirects) {
      expect(bySource.get(src)).toEqual({ src, dst, code: 301 });
    }
  });
});
