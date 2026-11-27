import { TAG_GONE_HEADERS, TAG_GONE_HTML } from '../src/lib/server/tagHandler.js';

export default {
  fetch(): Response {
    return new Response(TAG_GONE_HTML, {
      status: 410,
      statusText: 'Gone',
      headers: TAG_GONE_HEADERS,
    });
  },
};
