const cacheName = "galerie-v1";

// self.addEventListener("activate", e => {
//   e.waitUntil(
//     caches.keys().then(function(keyList) {
//       return Promise.all(
//         keyList.map(function(key) {
//           if (key !== cacheName) {
//             return caches.delete(key);
//           }
//         })
//       );
//     })
//   );
// });

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