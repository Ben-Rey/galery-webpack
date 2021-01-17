import './style.css';
import './sw'
import { addPictureFromDb, addRandomPicture } from './js/domInteraction'

let deferredPrompt;
window.onload = function() {
  init();
};

window.addEventListener("beforeinstallprompt", function (e) {
  // log the platforms provided as options in an install prompt
  console.log(e.platforms); // e.g., ["web", "android", "windows"]
  e.userChoice.then(function (choiceResult) {
    console.log(choiceResult.outcome); // either "accepted" or "dismissed"
  }, handleError);
});

function init(){
console.log('init');
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
  
}
