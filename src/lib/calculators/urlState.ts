export type ToolRouteKey =
  | 'presupuesto'
  | 'licencia'
  | 'irpf'
  | 'aerotermia';

export interface ToolQueryState {
  concejo?: string;
  m2?: number;
  pem?: number;
  presupuesto?: number;
  inversion?: number;
  tipo?: string;
  opt?: string;
  ref?: string;
}

export function buildToolUrl(route: ToolRouteKey, state: ToolQueryState): string {
  const basePaths: Record<ToolRouteKey, string> = {
    presupuesto: '/calcula-el-precio-de-tu-reforma-en-asturias/',
    licencia: state.concejo
      ? `/licencia-obra-asturias/${encodeURIComponent(state.concejo)}/`
      : '/licencia-obra-asturias/',
    irpf: '/calculadora-deducciones-irpf-reforma/',
    aerotermia: '/comparador-aerotermia-asturias/',
  };

  const params = new URLSearchParams();
  if (state.concejo && route !== 'licencia') params.set('concejo', state.concejo);
  if (state.m2 && state.m2 > 0) params.set('m2', String(Math.round(state.m2)));
  if (state.pem && state.pem > 0) params.set('pem', String(Math.round(state.pem)));
  if (state.presupuesto && state.presupuesto > 0) {
    params.set('presupuesto', String(Math.round(state.presupuesto)));
  }
  if (state.inversion && state.inversion > 0) {
    params.set('inversion', String(Math.round(state.inversion)));
  }
  if (state.tipo) params.set('tipo', state.tipo);
  if (state.opt) params.set('opt', state.opt);
  if (state.ref) params.set('ref', state.ref);

  const qs = params.toString();
  return qs ? `${basePaths[route]}?${qs}` : basePaths[route];
}

export function parseToolQuery(search: string): ToolQueryState {
  const sp = new URLSearchParams(search);
  const num = (key: string): number | undefined => {
    const raw = sp.get(key);
    if (!raw) return undefined;
    const val = Number(raw);
    return Number.isFinite(val) && val > 0 ? val : undefined;
  };
  const str = (key: string): string | undefined => {
    const raw = sp.get(key)?.trim();
    return raw ? raw : undefined;
  };

  return {
    concejo: str('concejo'),
    m2: num('m2'),
    pem: num('pem'),
    presupuesto: num('presupuesto'),
    inversion: num('inversion'),
    tipo: str('tipo'),
    opt: str('opt'),
    ref: str('ref'),
  };
}
