# Modak Ghar — Cloudflare Pages version

This is the same website (bilingual EN/MR, WhatsApp + Instagram ordering,
warning ticker, admin photo gallery) rewritten so it runs correctly on
**Cloudflare Pages**. Nothing about how the site looks or works has changed —
only how the "server" part is built, since Cloudflare Pages can't run a
long-lived Node.js process like the localhost version could.

## Why the old code didn't work on Cloudflare Pages

Cloudflare Pages serves static files (HTML/CSS/JS/images) directly, but it
has no persistent server process — `server.js` never actually ran there.
The gallery, WhatsApp/Instagram links, and admin login all depend on that
server, so none of it worked once deployed.

This version replaces `server.js` with **Cloudflare Pages Functions**
(small serverless functions, one per API route, living in the `/functions`
folder) and stores the photo list, settings, and admin sessions in
**Cloudflare KV** (a small key-value store) instead of local files.

## One-time setup in the Cloudflare dashboard

You only need to do this once.

### 1. Create a KV namespace
- Go to **Workers & Pages > KV** in the Cloudflare dashboard.
- Click **Create namespace**, name it `modak-ghar-kv`, and create it.

### 2. Connect this repo as a Pages project
- Go to **Workers & Pages > Create > Pages > Connect to Git**.
- Select this GitHub repo.
- Build settings:
  - Framework preset: **None**
  - Build command: *(leave empty)*
  - Build output directory: `public`
- Click **Save and Deploy**. The first deploy will succeed, but the gallery
  and admin login won't work yet — that's expected, continue below.

### 3. Bind the KV namespace to the project
- Open your new Pages project > **Settings > Functions > KV namespace
  bindings**.
- Add a binding:
  - Variable name: `MODAK_KV`
  - KV namespace: `modak-ghar-kv` (the one you created in step 1)
- Save.

### 4. Set the admin username and password
- In the same project, go to **Settings > Environment variables**.
- Add two variables (for both **Production** and **Preview**):
  - `ADMIN_USERNAME` = your chosen username
  - `ADMIN_PASSWORD` = your chosen password (click **Encrypt** on this one)
- Save.
- If you skip this step, the site falls back to the default admin login
  provided separately in chat — it will still work, but setting your own
  here is more secure.

### 5. Redeploy
- Go to the **Deployments** tab and click **Retry deployment** on the latest
  one (binding and environment variable changes only take effect on a new
  deployment).
- Visit your `*.pages.dev` URL — the gallery, language toggle, WhatsApp/
  Instagram buttons, and admin login should all now work.

## Using the admin panel

Same as before: click **Admin** in the footer, log in, then you can add or
delete gallery photos and set your Instagram link once you have it.

One difference worth knowing: photos you upload through the admin panel are
stored in Cloudflare KV (not as files in your GitHub repo), so they won't
show up in your GitHub repo itself — but they persist on the live site
across visits and redeploys, exactly like before.

## Local preview (optional)

If you want to test on your own computer before relying on the dashboard:

```
npm install -g wrangler
npx wrangler pages dev public
```

This needs a KV namespace id filled into `wrangler.toml` for local testing
only — the deployed site on Cloudflare uses the dashboard binding from step
3 above instead.

## Everything else

`public/index.html`, `public/css/style.css`, and `public/js/main.js` are
unchanged from the localhost version — same design, same bilingual content,
same WhatsApp number, same fraud warning ticker.
