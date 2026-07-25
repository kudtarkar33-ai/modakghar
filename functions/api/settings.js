import { getSettings, json } from '../_utils.js';

export async function onRequestGet(context) {
  const settings = await getSettings(context.env.MODAK_KV);
  return json(settings);
}
