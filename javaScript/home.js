const home = document.querySelector(".logo");

const inputGifs = document.querySelector(".inputText");
const verMasMG = document.querySelector(".verMas");
const iconLupa = document.querySelector(".img-lupa");


home.addEventListener("click", () => {
    if (content.className === "content dark-theme")
        btnAgregar.setAttribute('src', "images/CTA-crar-gifo-modo-noc.svg");
     else
        btnAgregar.setAttribute('src', "images/button-crear-gifo.svg");
    loadHome.style.display = "block";
    loadTrendings.style.display = "block";
    loadFav.style.display = "none";
    loadMisGifos.style.display = "none";
    loadAgregarGifos.style.display = "none";
    inputGifs.value = '';
    sectionSearch.innerHTML = '';
    verMasMG.style.display = "none";
    if (content.className === "content dark-theme") 
        iconLupa.setAttribute('src', "images/icon-search-modo-noct.svg");
    else
        iconLupa.setAttribute('src', "images/icon-search.svg");

});