import { json, readJsonBody, isValidSession, getPhotos, savePhotos } from '../../_utils.js';

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await readJsonBody(request);

  const valid = await isValidSession(env.MODAK_KV, body.token);
  if (!valid) return json({ ok: false, error: 'Session expired. Please log in again.' }, 401);

  const { dataUrl, captionEn, captionMr } = body;
  const match = typeof dataUrl === 'string' && dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!match) return json({ ok: false, error: 'No valid image received.' }, 400);

  let ext = match[1].toLowerCase();
  if (ext === 'jpeg') ext = 'jpg';
  const base64 = match[2];

  let bytes;
  try {
    bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  } catch (e) {
    return json({ ok: false, error: 'Could not read image data.' }, 400);
  }

  const id = 'ph_' + Date.now() + '_' + crypto.randomUUID().slice(0, 8);
  const filename = `${id}.${ext}`;

  try {
    await env.MODAK_KV.put('img:' + filename, bytes.buffer);
  } catch (e) {
    return json({ ok: false, error: 'Could not save the image. It may be too large.' }, 500);
  }

  const photos = await getPhotos(env.MODAK_KV);
  const entry = {
    id,
    filename,
    captionEn: captionEn || 'Modak Ghar',
    captionMr: captionMr || 'मोदक घर',
  };
  photos.unshift(entry);
  await savePhotos(env.MODAK_KV, photos);

  return json({ ok: true, photo: entry, photos });
}
