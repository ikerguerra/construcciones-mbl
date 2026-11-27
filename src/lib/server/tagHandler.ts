export const TAG_GONE_HTML = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Contenido dado de baja (410) | Construcciones MBL</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    body{font-family:Inter,system-ui,-apple-system,sans-serif;background:#f2f2f2;color:#0a0a0a;margin:0;padding:24px;display:grid;place-items:center;min-height:90vh}
    .box{max-width:600px;background:#fff;border-radius:36px;padding:44px 36px;box-shadow:0 20px 60px rgba(0,0,0,.08);text-align:center}
    h1{font-size:32px;margin:0 0 12px;text-transform:uppercase;letter-spacing:.02em}
    p{color:#444;line-height:1.6;margin:0 0 24px;font-size:15px}
    .links{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
    a{display:inline-block;padding:11px 22px;border-radius:999px;text-decoration:none;font-weight:500;font-size:14px;border:1px solid #000}
    a.primary{background:#000;color:#fff}
    a.secondary{background:#fff;color:#000;border-color:#ccc}
  </style>
</head>
<body>
  <main class="box">
    <h1>Etiqueta archivada (410)</h1>
    <p>Este archivo de etiquetas del antiguo blog ha sido retirado de forma permanente para facilitar una navegación más directa por nuestras guías técnicas y servicios de reforma en Asturias.</p>
    <div class="links">
      <a class="primary" href="/innovacion-sostenible/">Ver guías de Innovación Sostenible</a>
      <a class="secondary" href="/servicios/">Servicios en Asturias</a>
      <a class="secondary" href="/calcula-el-precio-de-tu-reforma-en-asturias/">Simulador de reforma</a>
    </div>
  </main>
</body>
</html>`;

export const TAG_GONE_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
  'Cache-Control': 'public, max-age=86400',
} as const;

export function buildTagGoneResponseInit() {
  return {
    status: 410,
    statusText: 'Gone',
    headers: TAG_GONE_HEADERS,
  };
}
