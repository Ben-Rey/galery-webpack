
self.addEventListener('sync', function(event) {
    if (event.tag == 'syncfav') {
      event.waitUntil(prout());
    }
  });