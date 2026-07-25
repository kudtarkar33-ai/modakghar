import { MIME } from '../_utils.js';

export async function onRequestGet(context) {
  const { env, params, next } = context;
  const filename = params.filename;

  const bytes = await env.MODAK_KV.get('img:' + filename, 'arrayBuffer');
  if (bytes === null) {
    // Not an admin-uploaded photo — let Cloudflare serve it as a normal
    // static file instead (this is how the seed photos shipped with the
    // site, e.g. modak-01.jpg, are served).
    return next();
  }

  const ext = (filename.split('.').pop() || '').toLowerCase();
  return new Response(bytes, {
    headers: {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
