import { json, readJsonBody, isValidSession } from '../../_utils.js';

export async function onRequestPost(context) {
  const body = await readJsonBody(context.request);
  const ok = await isValidSession(context.env.MODAK_KV, body.token);
  return json({ ok });
}
