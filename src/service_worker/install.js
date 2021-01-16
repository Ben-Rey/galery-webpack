const cacheName = "galerie-v1";
const files = [
  "/",
  "/bundle.js",
  "/manifest.json",
  "/image.json",
  "images"
];


self.addEventListener("install", e => {
  caches.open(cacheName).then(cache => {
    cache.addAll(files);
  });
});