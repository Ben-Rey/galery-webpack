const cacheName = "galerie-v1";
const files = [
  "/",
  "/bundle.js",
  "/manifest.webmanifest",
  "/image.json",
];

self.addEventListener("install", e => {
  caches.open(cacheName).then(cache => {
    cache.addAll(files);
  });
});