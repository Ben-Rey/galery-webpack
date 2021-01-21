import './style.css';
import './sw'
import { addPictureFromDb, addRandomPicture } from './js/domInteraction'

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

let deferredPrompt;
let buttonAddPicture = document.getElementById("add-picture");
let buttonInstall = document.getElementById("install-app");

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
addPictureFromDb()

