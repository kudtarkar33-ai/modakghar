# Modak Ghar — local website

A bilingual (English / Marathi) website for Rasika Patil's chocolate modak
business, with a photo gallery the owner can update herself, and WhatsApp /
Instagram ordering.

No npm packages are required — it runs on plain Node.js.

## Run it

1. Make sure [Node.js](https://nodejs.org) (v14 or newer) is installed.
2. Open a terminal in this folder.
3. Run:

   ```
   node server.js
   ```

4. Open **http://localhost:3000** in your browser.

That's it — no `npm install` needed.

## What's inside

- `server.js` — the local server (plain Node.js, no dependencies)
- `public/` — the website itself (HTML/CSS/JS) and uploaded photos
- `data/photos.json` — the list of gallery photos (edited automatically by the admin panel)
- `data/settings.json` — site settings such as the Instagram link

## Using the admin panel

Scroll to the bottom of the site and click the small **Admin** link in the
footer. Log in with the username and password provided separately (see the
chat where this site was built — for security they are not written in this
file or anywhere on the site itself).

From the admin panel you can:
- Add a new gallery photo (with an optional English/Marathi caption)
- Delete any existing photo
- Add your Instagram profile link once you have it — the Instagram buttons
  across the site will automatically switch on and point to it

## Changing the admin password later

Open `server.js` and edit these two lines near the top:

```js
const ADMIN_USERNAME = '...';
const ADMIN_PASSWORD = '...';
```

Save the file and restart the server.

## Putting this online (optional, later)

This is currently set up to run on your own computer ("localhost"). If you
later want it reachable from anywhere (not just your computer), it can be
deployed to a small hosting service — just ask and this can be adapted.
