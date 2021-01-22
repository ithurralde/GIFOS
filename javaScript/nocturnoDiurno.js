const changeTheme = document.querySelector(".nocturno");
const content = document.querySelector(".content");
let changeImgs = true;

changeTheme.addEventListener("click", () => {
    content.classList.toggle('dark-theme');

    /** Cambiar imagenes a darktheme */
    const logo = document.querySelector(".btn-changeTheme");
    const btnAgregar = document.querySelector(".btn-agregar");
    const lupa = document.querySelector(".img-lupa");
    const placeHolderInput = document.querySelector(".inputText");
    const imgLupaSuggestion = document.querySelectorAll(".lupaSuggestion");
    const imgCamara = document.querySelector(".imgCam");
    const imgCamLuz = document.querySelector(".imgCamLuz");
    const imgPelicula = document.querySelector(".pelicula");
    placeHolderInput.classList.toggle('dark-theme');
    if (changeImgs){
        changeTheme.textContent = "Modo Diurno";
        logo.setAttribute('src', "images/Logo-modo-noc.svg");
        btnAgregar.setAttribute('src', "images/CTA-crar-gifo-modo-noc.svg");
        btnAgregar.addEventListener("click", () => {
            btnAgregar.setAttribute('src', "images/CTA-crear-gifo-active-modo-noc.svg");
        });
        lupa.setAttribute('src', "images/icon-search-modo-noct.svg");
        imgLupaSuggestion.forEach(element => {
            element.setAttribute('src', "images/icon-search-modo-noct.svg");
        });
        imgCamara.setAttribute('src', "images/camara-modo-noc.svg");
        imgCamLuz.setAttribute('src', "images/Path 2.svg");
        imgPelicula.setAttribute('src', "images/pelicula-modo-noc.svg");
        changeImgs = false;
    }
    else{
        changeTheme.textContent = "Modo Nocturno";
        logo.setAttribute('src', "images/logo-desktop.svg");
        btnAgregar.setAttribute('src', "images/button-crear-gifo.svg");
        btnAgregar.addEventListener("click", () => {
            btnAgregar.setAttribute('src', "images/CTA-crear-gifo-hover.svg");
        });
        lupa.setAttribute('src', "images/icon-search.svg");
        imgLupaSuggestion.forEach(element => {
            element.setAttribute('src', "images/icon-search.svg");
        });
        imgCamara.setAttribute('src', "images/camara.svg");
        imgCamLuz.setAttribute('src', "images/element-luz-camara.svg");
        imgPelicula.setAttribute('src', "images/pelicula.svg");
        changeImgs = true;
    }
});