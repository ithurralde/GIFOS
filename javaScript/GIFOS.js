/*
* Levantar trendings gifs de la api de giphy y mostrarlos por pantalla
*/

const apiKey = 'iJENEEGEFcnWiM62EZFbZtlc2G3yIW2z';
const gifs = document.querySelector(".gifs");
const btnSliderLeft = document.querySelector(".left");
const btnSliderRight = document.querySelector(".right");
let onClickGif = document.querySelectorAll(".gif");
let contador = 0;
let jsonLocalstorage = {"list" : []};
if (JSON.parse(localStorage.getItem("gifs")) == null){
  localStorage.setItem("gifs", JSON.stringify(jsonLocalstorage));
}
if (JSON.parse(localStorage.getItem("misGifos")) == null){
  localStorage.setItem("misGifos", JSON.stringify(jsonLocalstorage));
}



const getGifs = async () => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
  const data = await response.json();
  return data.data;
}

// showTrendings muestra 3 gifs
showTrendings = async (trendings, bool) => {
  let fin = 0;
  // si no es bool, es porque se activo el evento del boton de la derecha de los gifs
  if (!bool){
    fin = contador+3;
    gifs.innerHTML = '';
    for (contador; contador < fin; contador++)
      await addGifs(trendings[contador], gifs, false);
  }
  else{
    fin = contador-3;
    contador= contador - 6;
    if (contador >= 0){
      gifs.innerHTML = '';
      for (contador; contador < fin; contador++){
        await addGifs(trendings[contador], gifs, false);
      }
    }
    else {
      contador = 3;
      alert("No hay más gifs anteriores!");
    }
  }
}


// agrega y elimina de favs un gif
function cambiarFavsLocalStorage(gifApi, gif){
  // esta variable la creo para agregar elementos a la lista que ya tenia
  let jsonLocalstorage = JSON.parse(localStorage.getItem("gifs"));
  const imgFav = gif.nextSibling.firstChild; // corazon del gif normal
  const imgFavMaximizado = document.querySelector(".fav"); // corazon del gif en maximizado
  if (jsonLocalstorage === null){
    jsonLocalstorage = {"list" : []};
  }
  // si existe el gif en favs
  if (jsonLocalstorage.list.find(unGif => unGif.id === gifApi.id)){
    // de la lista borro a partir del indice, un elemento
    jsonLocalstorage.list = jsonLocalstorage.list.filter(element => element.id !== gifApi.id);
    // este remove (gifRemove) lo hago para sacarlo de inmediato de la seccion de favoritos
    // sin la necesidad de tener que recargar la pagina
    const gifRemove = gif.parentNode; // parentNode seria el gifContainer
    if (gif.parentNode.parentNode.className === "sectionGifsFav")
      gifRemove.remove();
    if (imgFav != null){
      imgFav.setAttribute('src', "images/icon-fav.svg");
    }
    else{
      imgFavMaximizado.setAttribute('src', "images/icon-fav.svg");
    }
  }
  else{
    jsonLocalstorage.list.push(gifApi);
    if (imgFav != null){
      imgFav.setAttribute('src', "images/icon-fav-active.svg");
    }
    else{
      imgFavMaximizado.setAttribute('src', "images/icon-fav-active.svg");
    }
  }
  localStorage.setItem("gifs", JSON.stringify(jsonLocalstorage));
}

function completarFav(btnFav, gifApi){
  const isFav = JSON.parse(localStorage.getItem("gifs"));
  if (isFav.list.find(element => element.id === gifApi.id)){
    btnFav.setAttribute('src', "images/icon-fav-active.svg");
  }
  else{
    btnFav.setAttribute('src', "images/icon-fav.svg");
  }

}

function isActivoMenuHamburguesa(){
  const isActivo = document.querySelector("#chkbox-menu");
  if (isActivo.checked)
    return true;
  return false;
}

function cambiarEstilos(overlay, gifContainer){
  if (isActivoMenuHamburguesa()){
    const bool = isActivoMenuHamburguesa();
    overlay.style.display = "flex";
    gifContainer.style.position = "relative";
  }
  else {
    const bool = isActivoMenuHamburguesa();
    overlay.style.display = "none";
    gifContainer.style.position = "unset";  
  }
}

function completarOverlay(overlay, gifApi, gif, gifContainer, isMisGifos){
  const btnDownload = document.createElement("img");
  const btnFav = document.createElement("img");
  const btnMax = document.createElement("img");
  btnDownload.setAttribute('src', "images/icon-download.svg")
  btnDownload.classList.add("insideOverlay");
  btnDownload.classList.add("btn-download");

  const menuHamburguesa1 = document.querySelector(".span1-menu");
  const menuHamburguesa3 = document.querySelector(".span3-menu");
  menuHamburguesa1.addEventListener("click", () => {
    // cambiarEstilos es una funcion que cambia los estilos al overlay y gifContainer
    // solo para la parte mobile. Sin esta funcion, cuando abrimos el menu hamburguesa
    // el gif aparece por delante del listado del menu, y no te deja tocar los botones
    cambiarEstilos(overlay, gifContainer)
  });
  menuHamburguesa3.addEventListener("click", () => {
    cambiarEstilos(overlay, gifContainer)
  });



  btnFav.classList.add("insideOverlay");
  btnFav.classList.add("btn-fav");

  btnMax.setAttribute('src', "images/icon-max-normal.svg");
  btnMax.classList.add("insideOverlay");
  
  const title = document.createElement("p");
  title.textContent = gifApi.title;
  const userName = document.createElement("h1");
  userName.textContent = gifApi.username;
  // este if es para el caso mobile, al no tener overlay, le saco los botones de
  // favoritos, download y maximizar. Para activar estos eventos en mobile,
  // se hace click sobre el gif para que se agrande a pantalla completa, y ahi
  // estan los botones
  if (content.clientWidth >= 1220){
    overlay.appendChild(btnFav);
    overlay.appendChild(btnDownload);
    overlay.appendChild(btnMax);
  }
  overlay.appendChild(title);
  overlay.appendChild(userName);

  if (!isMisGifos)
    completarFav(btnFav, gifApi);
  else
    btnFav.setAttribute('src', "images/icon-trash-normal.svg");

  btnDownload.addEventListener("click", async () => {
    const ref = document.createElement("a");
    ref.setAttribute('href', gifApi.images.original.url);
    location.href = gifApi.images.original.url;
  });
  if (!isMisGifos){
    btnFav.addEventListener("click", () => {
      cambiarFavsLocalStorage(gifApi, gif);
    });
  }
  else{
    // si isMisGifos, btnFav es el boton DELETE 
    btnFav.addEventListener("click", () => {
      console.log(gifApi.id);
      let jsonLocalstorage = JSON.parse(localStorage.getItem("misGifos"));
      jsonLocalstorage.list = jsonLocalstorage.list.filter(element => element.id !== gifApi.id);

      const i = jsonLocalstorage.list.indexOf(gifApi.id);
      jsonLocalstorage.list.splice( i, 1 );
      gifContainer.remove();
      
      console.log(jsonLocalstorage.list.length);
      localStorage.setItem("misGifos", JSON.stringify(jsonLocalstorage));
      // el if saca los estilos de la seccion "sectionGifsMisGifos", para acomodar esa seccion en caso 
      // que haya borrado todos los gifs grabados por camara
      if (jsonLocalstorage.list.length === 0){
        const gifsMisGifos = document.querySelector(".sectionGifsMisGifos");
        gifsMisGifos.style.display = "block";
        gifsMisGifos.style.left = "0%"; 
      }
    });
  }

  let widthMaximo = content.clientWidth;
  if (widthMaximo < 1220){
    gifContainer.addEventListener("click", () => {
      maxBtnGif(gif, gifContainer, gifApi, btnFav);
    });
  }
  else{
    btnMax.addEventListener("click", () => {
      maxBtnGif(gif, gifContainer, gifApi, btnFav);
    });
  }
}


function maxBtnGif(gif, gifContainer, gifApi, btnFavMinimizado){
  gif.classList.add("maxGif");
  const content = document.querySelector(".content");
  const cruz = document.createElement("img");
  const div = document.createElement("div");
  const overlayGif = gifContainer.lastChild;
  const fav = document.createElement("img");
  const download = document.createElement("img");;

  const title = document.createElement("p");
  title.textContent = gifApi.title;
  title.classList = "maxGifTitle";
  const userName = document.createElement("h1");
  userName.textContent = gifApi.username;
  userName.classList = "maxGifUser";

  completarFav(fav, gifApi);

  fav.classList = "fav";
  download.setAttribute('src', "images/icon-download.svg");
  download.classList = "download";
  cruz.classList = "cruzMax";
  div.classList.add("maxGifBackground");
  if (content.className === "content dark-theme")
    cruz.setAttribute('src', "images/close-modo-noct.svg");
  else
    cruz.setAttribute('src', "images/close.svg");
  div.appendChild(gif);
  div.appendChild(cruz);
  div.appendChild(userName);
  div.appendChild(title);
  div.appendChild(fav);
  div.appendChild(download);


  content.appendChild(div);




  cruz.addEventListener("click", () => {
    div.classList.remove("maxGifBackground");
    gif.classList.remove("maxGif");
    gifContainer.insertBefore(gif, overlayGif);
    div.remove(cruz);
    if (gifContainer.parentNode.className !== "sectionGifsMisGifos"){
      completarFav(btnFavMinimizado, gifApi);
    }
  });

  fav.addEventListener("click", () =>{
    cambiarFavsLocalStorage(gifApi, gif);
  });

  download.addEventListener("click", () => {
    location.href = gifApi.images.original.url;
  });
}

async function addGifs(newGif, clasePadre, isMisGifos){
  gif = document.createElement('img');
  gif.setAttribute('src', newGif.images.original.url);
  gif.classList.add("gif");
  // estos divs son para el overlay
  overlay = document.createElement("div");
  overlay.style.display = "flex"; // estos estilos es para que se vean las imagenes del lado derecho
  overlay.style.justifyContent = "flex-end";// estos estilos es para que se vean las imagenes del lado derecho
  overlay.classList.add("overlay"); //esto para que pase el over, y no el click
  // si tiene que ser solo con el over, sacar comentario a esto y borrar la funcion recorrer(gif)
  // y agregarle al CSS el :hover al que dice top: 0%;
  gifContainer = document.createElement("div");
  gifContainer.classList.add("gifContainer");
  completarOverlay(overlay, newGif, gif, gifContainer, isMisGifos);
  await gifContainer.appendChild(gif);
  await gifContainer.appendChild(overlay);
  await clasePadre.appendChild(gifContainer);
}

// // eventos para el boton slider de la izquierda
// btnSliderLeft.addEventListener("click", () => {
//   getGifs()
//     .then(response => showTrendings(response, true))
//     .catch(error => console.error("Ups! Hubo un problema: "+ error));
// });

// // eventos para el boton slider de la derecha
// btnSliderRight.addEventListener("click", () => {
//   getGifs()
//     .then(response => showTrendings(response, false))
//     .catch(error => console.error("Ups! Hubo un problema: "+ error));
// });

getGifs()
  .then(response => showTrendings(response, false))
  .catch(error => console.error("Ups! Hubo un problema: "+ error));

/*
* Fin: Levantar gifs de la api de giphy y mostrarlos por pantalla 
*/

/**
 * Buscar gifs
 */

let limitSearch = 12;
const imgLupa = document.querySelector(".buscar");
const sectionSearch = document.querySelector(".sectionGifs")
let inputSearch = document.querySelector(".inputText");


const searchApiGif = async (input) => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input}&lang=Spanish&limit=${limitSearch}`);
  const data = await response.json();
  return data.data;
}

async function showSearch(search){
  sectionSearch.innerHTML = '';
  sectionSearch.appendChild(lineSectionGif);

  if (search.length !== 0){
    const nameSearch = document.createElement("h1");
    nameSearch.textContent = document.querySelector(".inputText").value;
    sectionSearch.appendChild(nameSearch);
    for (let i = 0; i < search.length; i++){
      await addGifs(search[i], sectionSearch, false);
    }
    // este if es para que se vaya el boton de ver mas cuando ya hay 50 mostrandose
    if (search.length === 50)
      verMas.style.display = "none";
  }
  else{
    const nameSearch = document.createElement("h1");
    const noSearch = document.createElement("img");
    const textNoSearch = document.createElement("p");
    nameSearch.textContent = document.querySelector(".inputText").value;
    noSearch.classList = "noSearch";
    noSearch.setAttribute('src', "images/icon-busqueda-sin-resultado.svg");
    textNoSearch.textContent = "Intenta con otra búsqueda.";
    sectionSearch.appendChild(nameSearch);
    sectionSearch.appendChild(noSearch);
    sectionSearch.appendChild(textNoSearch);
    verMas.style.display = "none";
  }
}
const lineSectionGif = document.querySelector(".lineSectionGif");
//boton de ver mas gifs en la busqueda de 12 gifs
const verMasP = document.querySelector(".verMas p");
// container mas grande del boton verMas. Esto lo hago para usar flex y centrarlo en pantalla
const verMas = document.querySelector(".verMas");

function searchGif(){
  inputSearch = document.querySelector(".inputText").value;
  const listSuggestions = document.querySelector(".suggest");
  listSuggestions.innerHTML = '';
  if (inputSearch === ''){
    lineSectionGif.style.display = "none";
    limitSearch = 12;
    verMas.style.display = "none";
  }
  else{
    lineSectionGif.style.display = "block";
    verMas.style.display = "flex";
  }
  searchApiGif(inputSearch)
    .then(response => showSearch(response))
    .catch(error => console.error("Ups! Hubo un error: " + error));
}

// Esto lo creo para que cambie el icono de busqueda por una X cada vez que haya una
// letra distinto de " ".
const inputChange = document.querySelector(".inputText");
inputChange.addEventListener("keyup", () => {
  if (inputChange.value === ''){
    if (changeImgs)
      imgLupa.firstChild.setAttribute('src', "/images/icon-search.svg");
    else 
      imgLupa.firstChild.setAttribute('src', "images/icon-search-modo-noct.svg");
  }
  else{
    if (changeImgs)
      imgLupa.firstChild.setAttribute('src', "/images/close.svg");
    else
      imgLupa.firstChild.setAttribute('src', "images/close-modo-noct.svg");
  }
})


verMasP.addEventListener("click", () =>{
  limitSearch += 12;
  searchGif();
})

imgLupa.addEventListener("click", () => {
  limitSearch = 12;
  inputSearch = document.querySelector(".inputText");
  const listSuggestions = document.querySelector(".suggest");
  listSuggestions.innerHTML = '';
  sectionSearch.innerHTML = '';
  inputSearch.value = '';
  // este if para volver a poner la lupita, y no quede la X
  // tanto en normal como en el modo nocturno
  if (changeImgs)
      imgLupa.firstChild.setAttribute('src', "/images/icon-search.svg");
  else 
    imgLupa.firstChild.setAttribute('src', "images/icon-search-modo-noct.svg");
  line.style.display = "none";
  verMas.style.display = "none";
})

inputSearch.addEventListener("keydown", event => {
  if (event.keyCode == 13){
    limitSearch = 12;
    searchGif();
  }
})

 /**
  * Fin Buscar gifs
  */