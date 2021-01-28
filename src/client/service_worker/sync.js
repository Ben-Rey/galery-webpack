
self.addEventListener('sync', function (event) {
  if (event.tag == 'POST') {
    event.waitUntil(favoriteUpdate('POST'));
  }
  else if (event.tag == 'DELETE'){
    event.waitUntil(favoriteUpdate('DELETE'));

  }
});

function favoriteUpdate(verb) {
  console.log('In Sync')

  const obj = {"title": "ede"}

  return fetch("http://localhost:5000/subscribe", {
    method: verb,
    body: JSON.stringify(obj),
    headers: {
      "content-type": "application/json"
    }
  })
    .then((result) => {
      console.log(result);
    })
  // .then((favs) => console.log(favs))
}
