const reactions = document.querySelector(".reactions");
const entertainment = document.querySelector(".entertainment");
const sports = document.querySelector(".sports");
const stickers = document.querySelector(".stickers");
const artists = document.querySelector(".artists");
let contadorSugerenciasTrendings = 0;
let busqueda = '';

const getBusquedaTrendings = async (busqueda) => {
    if (busqueda === ''){
        const data = getGifs()
        return data;
    }
    else{   
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${busqueda}`)
        const data = await response.json();
        return data.data;
    }
}

function capturarBusquedaTrendings(busqueda, bool){
    getBusquedaTrendings(busqueda)
        .then(response => showTrendings(response, bool))
        .catch(error => console.error("Ups! Hubo un problema: "+ error));
  }
  
reactions.addEventListener("click", () => {
    contador = 0;
    busqueda = "reactions";
    capturarBusquedaTrendings(busqueda, false);
});

entertainment.addEventListener("click", () => {
    contador = 0;
    busqueda = "entertainment";
    capturarBusquedaTrendings(busqueda, false);
});

sports.addEventListener("click", () => {
    contador = 0;
    busqueda = "sport";
    capturarBusquedaTrendings(busqueda, false);
})

stickers.addEventListener("click", () => {
    contador = 0;
    busqueda = "stickers";
    capturarBusquedaTrendings(busqueda, false);
});

artists.addEventListener("click", () => {
    contador = 0;
    busqueda = "artists";
    capturarBusquedaTrendings(busqueda, false);
});


// eventos para el boton slider de la izquierda
btnSliderLeft.addEventListener("click", function(){capturarBusquedaTrendings(busqueda, true)});
    
// eventos para el boton slider de la derecha
btnSliderRight.addEventListener("click", function(){capturarBusquedaTrendings(busqueda, false)});