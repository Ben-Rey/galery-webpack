import './style.css';
import './sw'
import { addPictureFromDb, addRandomPicture, handleFavorite} from './js/domInteraction'

const publicKey = "BJUZgBWz1ctYaCXtxs8ks2TgFfR9ehswDHDjS-kIRQ4suyy247IOHJ8skbFZLtZNIreJUevpyvi9p4QYFag-MpU"
if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
} else {
  console.warn("Service workers are not supported.");
}


async function send() {
  const register = navigator.serviceWorker
    .register("/sw.js",{updateViaCache: 'none'})
    .then((reg) => {
      console.log("Votre service worker a été enregistré!");
      reg.addEventListener('updatefound', () => { 
          const installing = reg.installing;
          installing.addEventListener('statechange', () => { 
          if(installing.state === 'installed'){ 
               // Afficher un message aux utilisateurs 
               console.log("Votre service worker a été mis à jour! Veuillez rafraichir la page"); 
          } 
      }); 
      });
    
    })
    .catch((error) => {
      console.error(error);
    });
  console.log("Enregistrement du push");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  });
  console.log("Votre push a été enregistré");

  console.log("Envoi de push");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push envoyé");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

let deferredPrompt;
let buttonAddPicture = document.getElementById("add-picture");
let buttonInstall = document.getElementById("install-app");
let buttonFavorite = document.getElementById("favorite-heart");


buttonAddPicture.addEventListener("click", addRandomPicture);

buttonInstall.addEventListener("click", (e) => {
  console.log(deferredPrompt);
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  }
});


document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'favorite-heart'){
    e.preventDefault()
        handleFavorite(e)
   }
});

addPictureFromDb()

