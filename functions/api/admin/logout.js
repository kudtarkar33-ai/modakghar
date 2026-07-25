import { json, readJsonBody, destroySession } from '../../_utils.js';

export async function onRequestPost(context) {
  const body = await readJsonBody(context.request);
  await destroySession(context.env.MODAK_KV, body.token);
  return json({ ok: true });
}
