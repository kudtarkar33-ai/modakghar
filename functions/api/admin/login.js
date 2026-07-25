import { json, readJsonBody, createSession } from '../../_utils.js';

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await readJsonBody(request);

  // Prefer env vars set in the Cloudflare dashboard (Settings > Environment
  // variables). These fall-backs only apply if you haven't set them yet.
  const USERNAME = env.ADMIN_USERNAME || 'rasika.modakghar';
  const PASSWORD = env.ADMIN_PASSWORD || 'Modak@9172!Ghar';

  if (body.username === USERNAME && body.password === PASSWORD) {
    const token = await createSession(env.MODAK_KV);
    return json({ ok: true, token });
  }
  return json({ ok: false, error: 'Invalid username or password.' }, 401);
}
