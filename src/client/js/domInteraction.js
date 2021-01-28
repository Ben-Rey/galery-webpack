import { addPictureToDb, getAllPictures, AddFavorite } from './db'
import '@fortawesome/fontawesome-free/js/all.js'

let mainContainer = document.getElementById("main-container");

export function handleFavorite(e) {
  // IndexedDB
  AddFavorite(e.target.getAttribute("url"))
  // FRONT
  const favorite = !e.target.getAttribute("favorite");
  console.log(favorite);
  const color = e.target.style.color;
  e.target.style.color = color == 'red' ? 'black' : 'red'; // color is set then clear it, otherwise set to 'red'
  e.target.setAttribute("favorite", favorite);
}


function addPicturesToDiv(div, picture, favorite) {
  favorite = picture.favorite ? picture.favorite : false
  div.innerHTML += `<div>
                      <div id="favorite-heart" style="color:${favorite ? 'red' : 'black'}" url=${picture.url} favorite=${favorite}>
                        <i class="fas fa-heart"  style="pointer-events: none;" ></i>                    
                      </div>
                      <img class="fit-picture "src="${picture.url}" alt="">
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