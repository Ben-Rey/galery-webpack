
self.addEventListener('sync', function (event) {
  if (event.tag == 'syncfav') {
    event.waitUntil(syncfav());
  }
});

function syncfav() {
  console.log('PROUT')
  return update({ url: "http://localhost:5000/favourites" })
    .then(refresh)
    .then((favs) => console.log(favs)))
}