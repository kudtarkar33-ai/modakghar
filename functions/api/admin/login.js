import { json, readJsonBody, createSession } from '../../_utils.js';

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await readJsonBody(request);

  // Prefer env vars set in the Cloudflare dashboard (Settings > Environment
  // variables). These fall-backs only apply if you haven't set them yet.
  const USERNAME = env.ADMIN_USERNAME || 'rasika.modakghar';
  const PASSWORD = env.ADMIN_PASSWORD || 'Modak@9172!Ghar';

  if (body.username === USERNAME && body.password === PASSWORD) {
    try {
      const token = await createSession(env.MODAK_KV);
      return json({ ok: true, token });
    } catch (e) {
      return json({ ok: false, error: 'Login storage (KV) is not set up yet on this deployment. Bind MODAK_KV in Cloudflare Pages > Settings > Functions, then redeploy.' }, 500);
    }
  }
  return json({ ok: false, error: 'Invalid username or password.' }, 401);
}
