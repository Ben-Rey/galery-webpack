import { addPictureToDb, getAllPictures } from './db'
// import {} from '@fortawesome/fontawesome-free'
let mainContainer = document.getElementById("main-container");


function addPicturesToDiv(div, picture) {
  div.innerHTML += `<div>
  <i class="fas fa-user-circle fa-fw"></i>
                      <img class="fit-picture" src="${picture.url}" alt="">
                    </div>`;
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 100);
}

export function addRandomPicture() {
  console.log('here');
  if (window.fetch) {
    fetch("https://picsum.photos/1280/720").then(function (response) {
      addPicturesToDiv(mainContainer, response);
      addPictureToDb(response)
    });
  } else {
    console.error("Pas de fetch");
  }
}

export async function addPictureFromDb() {
  let pictures = await getAllPictures()

  for (const pic of pictures) {
    addPicturesToDiv(mainContainer, pic);
  }
}