const misGifos = document.querySelector(".btn-misGifos");
const gifsMisGifos = document.querySelector(".sectionGifsMisGifos");


misGifos.addEventListener("click", async () =>{
  if (content.className === "content dark-theme")
    btnAgregar.setAttribute('src', "images/CTA-crar-gifo-modo-noc.svg");
  else
    btnAgregar.setAttribute('src', "images/button-crear-gifo.svg");
  loadHome.style.display = "none";
  loadFav.style.display = "none";
  loadAgregarGifos.style.display = "none";
  loadTrendings.style.display = "block";
  loadMisGifos.style.display = "block";
  gifsMisGifos.innerHTML = '';

  jsonLocalstorage = JSON.parse(localStorage.getItem("misGifos"));

  

  if (jsonLocalstorage == null || jsonLocalstorage.list.length === 0){

    const imgMisGifosSinContenido = document.createElement("img");
    imgMisGifosSinContenido.setAttribute('src', "/images/icon-mis-gifos-sin-contenido.svg");
    gifsMisGifos.appendChild(imgMisGifosSinContenido);
    const titleSinContenido = document.createElement("h1");
    titleSinContenido.textContent = "¡Anímate a crear tu primer GIFO!";
    titleSinContenido.classList = "titleSinContenido";
    gifsMisGifos.appendChild(titleSinContenido);
  }
  else{

    reccorer(jsonLocalstorage);
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

  const check = document.querySelector("#chkbox-menu");
  check.checked = false;
});


async function reccorer(jsonLocalstorage){
  for (let i = 0; i < jsonLocalstorage.list.length; i++) {
    let id = jsonLocalstorage.list[i];
    await fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${id}`)
      .then(async response => {
        const miGifJson = await response.json();
        gifsMisGifos.style.display = "flex";
        gifsMisGifos.style.flexWrap = "wrap";

        gifsMisGifos.style.marginLeft = "6%";
        await addGifs(miGifJson.data[0], gifsMisGifos, true);
      })
      .catch( error => {
        console.log(`¡El gif con el id="${id}" ya no existe en giphy.com porque se ha eliminado! Error: ${error}`);
        let jsonLocalstorage = JSON.parse(localStorage.getItem("misGifos"));
        const indice = jsonLocalstorage.list.indexOf(id);
        jsonLocalstorage.list.splice(indice, 1);
        if (jsonLocalstorage.list.length === 0){
          const gifsMisGifos = document.querySelector(".sectionGifsMisGifos");
          gifsMisGifos.style.display = "block";
          gifsMisGifos.style.left = "0%"; 
        }
        localStorage.setItem("misGifos", JSON.stringify(jsonLocalstorage));
      });
  }
}
