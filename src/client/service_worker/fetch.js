const cacheName = "galerie-v1";

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(cacheName)
      .then((cache) => {
        return cache.match(event.request)
          .then(response => {
            const fetchPromise =
              fetch(event.request)
                .then(networkResponse => {
                  // if (event.request.url.includes("picsum")) {
                  //   cache.put('photo',
                  //     networkResponse.clone());
                  // }
                  return networkResponse;
                })
            return response || fetchPromise;
          })
      })
  )

})
