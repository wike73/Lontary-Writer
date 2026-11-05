const CACHE_NAME = "lontary-v2";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/docx.js",
  "/html-docx.js",
  "/jszip.min.js",
  "/mammoth.browser.min.js",
  "/manifest.json",
  "/icon/icon-192.png",
  "/icon/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
                  .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
