console.log("fichier push");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push recu");
  self.registration.showNotification(data.title, {
    body: "Votre image a été enregistrée en favori"
  });
});