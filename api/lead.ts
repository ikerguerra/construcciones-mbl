import { handleLeadPost, jsonLeadResponse } from '../src/lib/server/leadHandler.js';

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ ok: false, error: 'Método no permitido. Usa POST.' }),
        {
          status: 405,
          headers: {
            Allow: 'POST',
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    const result = await handleLeadPost(request, {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
      LEADS_TO_EMAIL: process.env.LEADS_TO_EMAIL,
      SEND_AUTO_REPLY: process.env.SEND_AUTO_REPLY,
      SHEETS_WEBHOOK_URL: process.env.SHEETS_WEBHOOK_URL,
    });

    return jsonLeadResponse(result);
  },
};
