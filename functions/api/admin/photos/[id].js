import { json, readJsonBody, isValidSession, getPhotos, savePhotos } from '../../../_utils.js';

export async function onRequestDelete(context) {
  const { request, env, params } = context;
  const body = await readJsonBody(request);

  const valid = await isValidSession(env.MODAK_KV, body.token);
  if (!valid) return json({ ok: false, error: 'Session expired. Please log in again.' }, 401);

  const id = params.id;
  const photos = await getPhotos(env.MODAK_KV);
  const idx = photos.findIndex((p) => p.id === id);
  if (idx === -1) return json({ ok: false, error: 'Photo not found.' }, 404);

  const [removed] = photos.splice(idx, 1);
  await savePhotos(env.MODAK_KV, photos);

  // Best-effort: only uploaded photos live in KV; seed photos shipped with
  // the site are static files and simply won't match any img: key here.
  try {
    await env.MODAK_KV.delete('img:' + removed.filename);
  } catch (e) {
    /* ignore */
  }

  return json({ ok: true, photos });
}
