interface Env {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  LEADS_TO_EMAIL?: string;
  SEND_AUTO_REPLY?: string;
  SHEETS_WEBHOOK_URL?: string;
}

interface SimulacionPayload {
  tipoObra: string;
  nombreObra: string;
  m2: number;
  calidad: string;
  extras: string[];
  estimacionMin: number;
  estimacionMax: number;
  plazoEstimado: string;
}

interface LeadPayload {
  origen?: 'contacto' | 'simulador' | 'promocion';
  nombre?: string;
  telefono?: string;
  email?: string;
  zona?: string;
  mensaje?: string;
  privacidad?: boolean;
  empresa_web?: string;
  simulacion?: SimulacionPayload;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return jsonResponse({ ok: false, error: 'Formato de solicitud inválido.' }, 400);
  }

  // Honeypot anti-spam: si trae contenido, devolvemos éxito silencioso sin enviar correos
  if (body.empresa_web && String(body.empresa_web).trim().length > 0) {
    return jsonResponse({
      ok: true,
      autoReplySent: false,
      message: 'Solicitud registrada correctamente.',
    });
  }

  const origen = body.origen === 'simulador' ? 'simulador' : 'contacto';
  const nombre = String(body.nombre ?? '').trim();
  const telefono = String(body.telefono ?? '').trim();
  const email = String(body.email ?? '').trim();
  const zona = String(body.zona ?? 'Asturias').trim();
  const mensaje = String(body.mensaje ?? '').trim();
  const privacidad = Boolean(body.privacidad);

  if (!privacidad) {
    return jsonResponse(
      { ok: false, error: 'Debes aceptar la Política de Privacidad para enviar tu solicitud.' },
      422
    );
  }

  if (nombre.length < 2 || nombre.length > 120) {
    return jsonResponse({ ok: false, error: 'Por favor, indica un nombre válido.' }, 422);
  }

  if (telefono.length < 9 || telefono.length > 25) {
    return jsonResponse({ ok: false, error: 'Por favor, indica un teléfono de contacto válido.' }, 422);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return jsonResponse({ ok: false, error: 'Por favor, indica un correo electrónico válido.' }, 422);
  }

  const toEmail = env.LEADS_TO_EMAIL || 'info@construccionesmbl.com';
  const fromEmail = env.RESEND_FROM_EMAIL || 'Construcciones MBL <web@construccionesmbl.com>';
  const sendAutoReply = (env.SEND_AUTO_REPLY ?? 'true').toLowerCase() === 'true';

  const sim = body.simulacion;
  const simHtml = sim
    ? `
      <h3 style="margin:18px 0 8px">Datos calculados en el Simulador</h3>
      <ul>
        <li><strong>Tipo de obra:</strong> ${escapeHtml(String(sim.nombreObra || sim.tipoObra))}</li>
        <li><strong>Superficie / Unidades:</strong> ${Number(sim.m2) || 0}</li>
        <li><strong>Nivel de calidades:</strong> ${escapeHtml(String(sim.calidad))}</li>
        <li><strong>Extras marcados:</strong> ${
          Array.isArray(sim.extras) && sim.extras.length > 0
            ? escapeHtml(sim.extras.join(', '))
            : 'Ninguno'
        }</li>
        <li><strong>Horquilla orientativa:</strong> ${Number(sim.estimacionMin).toLocaleString('es-ES')} € – ${Number(sim.estimacionMax).toLocaleString('es-ES')} €</li>
        <li><strong>Plazo estimado:</strong> ${escapeHtml(String(sim.plazoEstimado))}</li>
      </ul>
    `
    : '';

  const leadSubject =
    origen === 'simulador'
      ? `[Web MBL · Simulador] ${nombre} (${zona}) — ${sim?.nombreObra ?? 'Reforma'}`
      : `[Web MBL · Contacto] ${nombre} (${zona})`;

  const leadHtml = `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.55">
      <h2 style="margin-bottom:8px">Nueva solicitud recibida en construccionesmbl.com</h2>
      <p><strong>Canal:</strong> ${origen === 'simulador' ? 'Simulador de presupuestos' : 'Formulario de contacto'}</p>
      <ul>
        <li><strong>Nombre:</strong> ${escapeHtml(nombre)}</li>
        <li><strong>Teléfono:</strong> <a href="tel:${escapeHtml(telefono)}">${escapeHtml(telefono)}</a></li>
        <li><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></li>
        <li><strong>Concejo / Zona:</strong> ${escapeHtml(zona)}</li>
      </ul>
      ${mensaje ? `<p><strong>Mensaje del cliente:</strong><br/>${escapeHtml(mensaje)}</p>` : ''}
      ${simHtml}
    </div>
  `;

  let autoReplySent = false;

  if (env.RESEND_API_KEY) {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: leadSubject,
        html: leadHtml,
      }),
    });

    if (!resendRes.ok) {
      return jsonResponse(
        {
          ok: false,
          error:
            'No se pudo entregar la notificación por correo. Puedes llamarnos directamente al 684 675 898.',
        },
        502
      );
    }

    // Correo automático de confirmación al cliente (configurable con SEND_AUTO_REPLY=true|false)
    if (sendAutoReply) {
      const clientHtml = `
        <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.6;max-width:600px">
          <h2>Hola, ${escapeHtml(nombre)}:</h2>
          <p>Hemos recibido correctamente tu solicitud en <strong>Construcciones MBL</strong> (${escapeHtml(zona)}).</p>
          <p>Nuestro equipo técnico en Gijón revisará los detalles y se pondrá en contacto contigo en menos de 24 a 48 horas laborables para resolver tus dudas o concertar una visita técnica gratuita sin compromiso.</p>
          ${simHtml}
          <p style="margin-top:20px">
            Si necesitas atención inmediata, puedes llamarnos o escribirnos por WhatsApp al <strong>684 675 898</strong> (Lunes a Viernes de 10:00 a 14:00 y de 16:00 a 19:00).
          </p>
          <hr style="border:0;border-top:1px solid #e4e4e4;margin:20px 0"/>
          <p style="font-size:12px;color:#666">
            Construcciones MBL · MBL CONSTRUCCIONES S.L.<br/>
            Av. Argentina 132 (Cristasa of. 221), 33213 Gijón, Asturias · https://construccionesmbl.com
          </p>
        </div>
      `;

      const autoRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [email],
          reply_to: toEmail,
          subject: 'Hemos recibido tu solicitud en Construcciones MBL (Asturias)',
          html: clientHtml,
        }),
      }).catch(() => null);

      autoReplySent = Boolean(autoRes && autoRes.ok);
    }
  }

  // Volcado opcional a webhook propio de Google Sheets sin bloquear la respuesta
  if (env.SHEETS_WEBHOOK_URL) {
    await fetch(env.SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fecha: new Date().toISOString(),
        origen,
        nombre,
        telefono,
        email,
        zona,
        mensaje,
        simulacion: sim ?? null,
      }),
    }).catch(() => null);
  }

  return jsonResponse({
    ok: true,
    autoReplySent,
    message:
      '¡Solicitud enviada con éxito! Nuestro equipo técnico en Asturias se pondrá en contacto contigo en menos de 24-48 h laborables.',
  });
};
