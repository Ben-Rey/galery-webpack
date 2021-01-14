import { precacheAndRoute } from 'workbox-precaching';
precacheAndRoute(self.__WB_MANIFEST || [])

const cacheName = "Gallery-app";

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(cacheName)
      .then((cache) => {
        return cache.match(event.request)
          .then(response => {
            const fetchPromise =
              fetch(event.request)
                .then(networkResponse => {
                  cache.put(event.request,
                    networkResponse.clone());
                  return networkResponse;
                })
            return response || fetchPromise;
          })
      })
  )
})

// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll(["/"]).then(() => self.skipWaiting());
//     })
//   );
// });

// self.addEventListener('install', function (event) {
//   event.waitUntil(
//     caches.open(cacheName).then(function (cache) {
//       return cache.addAll(
//         [
//           'index.html',
//           'index.css'
//         ]
//       );
//     })
//   );
// });
