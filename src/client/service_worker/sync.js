
self.addEventListener('sync', function (event) {
  if (event.tag == 'syncfav') {
    event.waitUntil(syncfav());
  }
});

function syncfav() {
  console.log('PROUT')
  return update({ url: `http://localhost:5000/subscribe` })
    .then(refresh)
    .then((favs) => self.registration.showNotification(
      `${favs.length} images ajoutées aux favoris`
    ))
}