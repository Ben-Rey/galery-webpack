import './style.css';
import './sw'
import { addSyncTask} from './js/db'

import { addPictureFromDb, addRandomPicture, handleFavorite } from './js/domInteraction'

const publicKey = "BJUZgBWz1ctYaCXtxs8ks2TgFfR9ehswDHDjS-kIRQ4suyy247IOHJ8skbFZLtZNIreJUevpyvi9p4QYFag-MpU"

let offlineDiv = document.getElementById("offline");
let navigatorOnline = true
if (!navigator.onLine) {
    navigatorOnline = false
    offlineDiv.style.height = '2rem';
    offlineDiv.innerHTML = "You are offline"
  }
  window.addEventListener("online", () => {
    navigatorOnline = true
    offlineDiv.style.height = '0rem';
    offlineDiv.innerHTML = ""
  });
  window.addEventListener("offline", () => {
    navigatorOnline = false
    offlineDiv.style.height = '2rem';
    offlineDiv.innerHTML = "You are offline"
  });

let deferredPrompt;
let buttonAddPicture = document.getElementById("add-picture");
let buttonInstall = document.getElementById("install-app");

const register = await navigator.serviceWorker.register("/sw.js", {
  scope: "/"
});

async function sendFavorite(url, favorite) {
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  });

  const verb = favorite ? 'POST' : 'DELETE'

  navigator.serviceWorker.ready 
  .then(reg => reg.sync.register(verb))

  const obj = {
    url: url,
    favorite: favorite,
    subscription: subscription
  }
  if (navigatorOnline) {
    await fetch("http://localhost:5000/subscribe", {
      method: verb,
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json"
      }
    });
  }else{
    // Save in index db the object
    addSyncTask( {
      url: url,
      favorite: favorite,
    })

  }

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




buttonAddPicture.addEventListener("click", addRandomPicture);

buttonInstall.addEventListener("click", (e) => {
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


document.addEventListener('click', function (e) {
  favorite = (e.target.getAttribute("favorite") == 'true')
  if (e.target && e.target.getAttribute("class") == 'favorite-heart') {
    e.preventDefault()
    // console.log(e.target.getAttribute("favorite"));
    if ("serviceWorker" in navigator) {

      sendFavorite(e.target.getAttribute("url"), !favorite).catch(err => console.error(err));
      
    } else {
      console.warn("Service workers are not supported.");
    }
    handleFavorite(e);
  }
});

addPictureFromDb()
