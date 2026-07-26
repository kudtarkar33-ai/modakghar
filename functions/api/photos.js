import { getPhotos, json } from '../_utils.js';

export async function onRequestGet(context) {
  const photos = await getPhotos(context.env.MODAK_KV);
  return json({ photos });
}
