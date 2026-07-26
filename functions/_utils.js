// Shared helpers for Modak Ghar's Cloudflare Pages Functions.
// Files starting with "_" are never treated as routes by Cloudflare Pages,
// so this file is safe to import from the function files around it.

export const DEFAULT_PHOTOS = [
  { id: 'ph1', filename: 'modak-01.jpg', captionEn: 'Assorted dark chocolate modaks, hand-moulded', captionMr: 'विविध डार्क चॉकलेट मोदक, हाताने साचेबद्ध' },
  { id: 'ph2', filename: 'modak-02.jpg', captionEn: 'Milk chocolate modaks in shell and heart moulds', captionMr: 'शेल आणि हार्ट साच्यातील मिल्क चॉकलेट मोदक' },
  { id: 'ph3', filename: 'modak-03.jpg', captionEn: 'Festive gift tray, ready for Ganpati', captionMr: 'गणपतीसाठी सजवलेला गिफ्ट ट्रे' },
  { id: 'ph4', filename: 'modak-04.jpg', captionEn: 'Foil-wrapped modaks packed for gifting', captionMr: 'भेटवस्तूसाठी फॉईलमध्ये गुंडाळलेले मोदक' },
  { id: 'ph5', filename: 'modak-05.jpg', captionEn: 'Fresh batch, set and ready to pack', captionMr: 'ताजी बॅच, पॅक करण्यासाठी तयार' },
];

export const DEFAULT_SETTINGS = { instagramUrl: '' };

export const SESSION_TTL_SECONDS = 60 * 60 * 6; // 6 hours

export const MIME = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
};

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export async function readJsonBody(request) {
  try {
    return await request.json();
  } catch (e) {
    return {};
  }
}

export async function getPhotos(kv) {
  if (!kv) return DEFAULT_PHOTOS;
  try {
    const list = await kv.get('photos:list', 'json');
    if (list) return list;
    await kv.put('photos:list', JSON.stringify(DEFAULT_PHOTOS));
    return DEFAULT_PHOTOS;
  } catch (e) {
    return DEFAULT_PHOTOS;
  }
}

export async function savePhotos(kv, photos) {
  if (!kv) return;
  await kv.put('photos:list', JSON.stringify(photos));
}

export async function getSettings(kv) {
  if (!kv) return DEFAULT_SETTINGS;
  try {
    const s = await kv.get('settings', 'json');
    if (s) return s;
    await kv.put('settings', JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(kv, settings) {
  if (!kv) return;
  await kv.put('settings', JSON.stringify(settings));
}

export async function createSession(kv) {
  if (!kv) throw new Error('MODAK_KV_NOT_BOUND');
  const token = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
  await kv.put('session:' + token, '1', { expirationTtl: SESSION_TTL_SECONDS });
  return token;
}

export async function isValidSession(kv, token) {
  if (!kv || !token) return false;
  try {
    const v = await kv.get('session:' + token);
    return v !== null;
  } catch (e) {
    return false;
  }
}

export async function destroySession(kv, token) {
  if (!kv || !token) return;
  try {
    await kv.delete('session:' + token);
  } catch (e) {
    /* ignore */
  }
}
