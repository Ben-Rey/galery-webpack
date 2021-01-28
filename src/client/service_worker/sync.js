console.log("fichier sync");

self.addEventListener('sync', function(event) {
    if (event.tag == 'syncfav') {
      event.waitUntil(prout());
    }
  });