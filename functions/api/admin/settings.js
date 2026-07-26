import { json, readJsonBody, isValidSession, getSettings, saveSettings } from '../../_utils.js';

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await readJsonBody(request);

  const valid = await isValidSession(env.MODAK_KV, body.token);
  if (!valid) return json({ ok: false, error: 'Session expired. Please log in again.' }, 401);

  const settings = await getSettings(env.MODAK_KV);
  if (typeof body.instagramUrl === 'string') settings.instagramUrl = body.instagramUrl.trim();
  await saveSettings(env.MODAK_KV, settings);

  return json({ ok: true, settings });
}
