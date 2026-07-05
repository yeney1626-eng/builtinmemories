// BIM Service Worker — offline cache & PWA support
const CACHE = "bim-v2";
const PRECACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/apple-touch-icon.png",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);

  // Fully bypass service worker for Google Apps Script sync calls —
  // no respondWith at all, so there's zero chance of response body races
  if (url.hostname.includes("script.google.com") || url.hostname.includes("googleusercontent.com")) {
    return;
  }

  if (e.request.mode === "navigate") {
    e.respondWith(
      (async () => {
        try {
          const res = await fetch(e.request);
          const resClone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, resClone)).catch(() => {});
          return res;
        } catch (err) {
          const cached = await caches.match("/index.html");
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  e.respondWith(
    (async () => {
      const cached = await caches.match(e.request);
      if (cached) return cached;
      try {
        const res = await fetch(e.request);
        if (res && res.status === 200 && res.type !== "opaque") {
          const resClone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, resClone)).catch(() => {});
        }
        return res;
      } catch (err) {
        return Response.error();
      }
    })()
  );
});
