import './style.css';
import pictures from './pictures'
import './sw'

window.onload = start;
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

serviceWorker();

let mainPicturesContainer;
let deferredPrompt;
let mainContainer

function start() {
  mainContainer = document.getElementById("main-container");
  let buttonAddPicture = document.getElementById("add-picture");
  let buttonInstall = document.getElementById("install-app");
  // console.log(buttonInstall)
  buttonAddPicture.addEventListener("click", addRandomPicture);
  // pictures.forEach((picture) => {
  //   addPicturesToDiv(mainContainer, picture);
  // });

  buttonInstall.addEventListener("click", (e) => {
    // Show the install prompt
    console.log("Test Install")
    // deferredPrompt.prompt();
    // // Wait for the user to respond to the prompt
    // deferredPrompt.userChoice.then((choiceResult) => {
    //   if (choiceResult.outcome === "accepted") {
    //     console.log("User accepted the install prompt");
    //   } else {
    //     console.log("User dismissed the install prompt");
    //   }
    // });
  });

  // loadWebcam();
}

function addPicturesToDiv(div, picture) {
  div.innerHTML += `<img class="fit-picture" src="${picture.url}" alt="">`;
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 100);
}

function addRandomPicture() {
  if (window.fetch) {
    fetch("https://picsum.photos/1280/720").then(function (response) {
      addPicturesToDiv(mainContainer, response);
    });
  } else {
    console.error("Pas de fetch");
  }
}

function serviceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register('/sw.js').then(
        function (registration) {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }
}


// function loadWebcam() {
//   setTimeout(() => {
//     Webcam.set({
//       width: 1000,
//       height: 240,
//       image_format: "jpeg",
//       jpeg_quality: 90,
//     });
//     Webcam.attach("#my_camera");
//   }, 2000);
// }