self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push recu");
  body = data.favorite ? "Votre image a été - enregistrée - en favori": "Votre image a été - supprimé - des favoris"
  self.registration.showNotification(data.title, {
    body: body
  });
});