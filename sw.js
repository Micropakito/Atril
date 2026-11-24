// Atril service worker: keeps the app available offline.
// Bump VERSION whenever any file changes so every device picks up the new version.
const VERSION = "atril-v3";
const SHELL = [
  "./",
  "index.html",
  "jszip.min.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png"
];
const FONTS = "atril-fonts";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== FONTS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: keep a copy after the first online visit
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open(FONTS).then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        try { const res = await fetch(req); c.put(req, res.clone()); return res; }
        catch (err) { return new Response("", { status: 504 }); }
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // App files: answer from the cache at once, refresh it in the background
  e.respondWith(
    caches.open(VERSION).then(async (c) => {
      const key = req.mode === "navigate" ? "index.html" : req;
      const hit = await c.match(key, { ignoreSearch: true });
      const net = fetch(req).then((res) => {
        if (res.ok && res.type === "basic") c.put(key, res.clone());
        return res;
      }).catch(() => null);
      if (hit) { e.waitUntil(net); return hit; }
      return (await net) || new Response("Sin conexión", { status: 503 });
    })
  );
});
