const favs = document.querySelector(".btn-favs");
const loadHome = document.querySelector(".home");
const loadFav = document.querySelector(".favoritos");
const loadMisGifos = document.querySelector(".misGifos");
const gifsFavs = document.querySelector(".sectionGifsFav");
let limitFav = 12;
let contadorFavs = 0;
const verMasFav = document.querySelector(".verMasFavs");
const verMasFavP = document.querySelector(".verMasFavs p");

favs.addEventListener("click", () =>{
    loadHome.style.display = "none";
    loadMisGifos.style.display = "none";
    loadAgregarGifos.style.display = "none";
    loadTrendings.style.display = "block";
    loadFav.style.display = "block";
    gifsFavs.innerHTML = '';
    limitFav = 12;
    contadorFavs = 0;
    verMasFav.style.display = "none";

    let jsonLocalstorage = JSON.parse(localStorage.getItem("gifs"));
    if (jsonLocalstorage == null || jsonLocalstorage.list.length === 0){
      // todo: el html para el caso que no hay gifs guardados en fav
      gifsFavs.style.display = "block";
      gifsFavs.style.flexWrap = "nowrap";
      // gifsFavs.style.position = "relative";
      gifsFavs.style.left = "0%";
      gifsFavs.style.margin = "0%";

      gifsFavs.classList.add("img-favs");

      const imgFavSinContenido = document.createElement("img");
      imgFavSinContenido.setAttribute('src', "/images/icon-fav-sin-contenido.svg");
      gifsFavs.appendChild(imgFavSinContenido);
      const titleSinContenido = document.createElement("h1");
      titleSinContenido.textContent = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
      titleSinContenido.classList = "titleSinContenido";
      gifsFavs.appendChild(titleSinContenido);
    }
    else{

      // jsonLocalstorage.list.forEach(element => {
      //   console.log("el elemento viejita: " +element.images.original.url);
      //   console.log("el elemento viejita: " +element.username);
      //   console.log("el elemento viejita: " +element.title);
      //   addGifs(element, gifsFavs);
      // });
      gifsFavs.style.display = "flex";
      gifsFavs.style.flexWrap = "wrap";
      // gifsFavs.style.position = "relative";
      // gifsFavs.style.left = "6%";
      gifsFavs.style.margin = "0 6%";
  
      addFavs(jsonLocalstorage);
      if (jsonLocalstorage.list.length >= 12)
        verMasFav.style.display = "flex";
      // verMasFav.style.
    }


    
    // esto lo hago porque no te deja hacer click en los gifs en el modo mobile (no se ve el overlay)
    let gifContainer = document.querySelectorAll(".gifs .gifContainer");
    gifContainer[0].style.position = "relative";
    gifContainer[1].style.position = "relative";
    gifContainer[2].style.position = "relative";
    let overlay = document.querySelectorAll(".gifs .overlay");
    overlay[0].style.display = "flex";
    overlay[1].style.display = "flex";
    overlay[2].style.display = "flex";
    // justify-content: flex-end;
    const check = document.querySelector("#chkbox-menu");
    check.checked = false;
});


async function addFavs(jsonLocalstorage){
  for (contadorFavs; contadorFavs < limitFav && contadorFavs < jsonLocalstorage.list.length; contadorFavs++) {
    if (contadorFavs === jsonLocalstorage.list.length -1)
      verMasFav.style.display = "none";
      // console.log("entre al if contadorFavs = " + contadorFavs);
    const element = jsonLocalstorage.list[contadorFavs];
    await addGifs(element, gifsFavs, false);
  }
}

verMasFav.addEventListener("click", verMasFavoritos);

async function verMasFavoritos(){
  let jsonLocalstorage = JSON.parse(localStorage.getItem("gifs"));
  limitFav += 12;
  await addFavs(jsonLocalstorage);
}