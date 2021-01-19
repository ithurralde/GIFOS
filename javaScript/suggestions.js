const line = document.querySelector(".line");

const searchSuggestions = async (suggestion) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${suggestion}&lang=Spanish`);
    const data = await response.json();
    console.log(data.data);
    return data.data;
  }
  
  const showSuggestions = suggestions =>{
    const ul = document.createElement("ul");
    const listSuggestions = document.querySelector(".suggest");
    listSuggestions.innerHTML = '';
    listSuggestions.appendChild(ul);
    // listSuggestions.classList.add("searchInput");
    line.style.display = "none";
    suggestions.forEach(element => {
      line.style.display = "block";
      const text = document.createElement("li");
      const p = document.createElement("p");
      const imgLupaInput = document.createElement("img");
      if (changeImgs)
        imgLupaInput.setAttribute('src', "images/icon-search.svg");
      else
        imgLupaInput.setAttribute('src', "images/icon-search-modo-noct.svg");
      imgLupaInput.classList = "lupaSuggestion";
      text.appendChild(imgLupaInput);
      text.appendChild(p);
      console.log("Nombre: " + element.name);
      // text.textContent = text.textContent + " " +element.name;
      p.textContent = element.name;
      ul.appendChild(text);
      text.addEventListener("click", () => {
        let newInput = document.querySelector(".inputText");
        newInput.value = text.textContent;
        searchGif();
        listSuggestions.innerHTML = '';
        line.style.display = "none";
      })
    })
  }
  
  inputSearch.addEventListener("keyup", async (event) => {
    const resultado = document.querySelector(".inputText").value;
    suggestions = await searchSuggestions(resultado);
    // este addEventListener lo agrego por si no quiere ninguna suggestion y
    // agrega la palabra entera a mano, y busca con la imagen de la lupa
    // Esto lo hago para borrar las suggestions anteriores

  
    // el if sirve para limpiar el suggestion una vez que presiona enter
    if (event.keyCode != 13)
      showSuggestions(suggestions);
    else{
       const listSuggestions = document.querySelector(".suggest");
       listSuggestions.innerHTML = '';
       line.style.display = "none";
    }
  
    // suggestions.forEach(element => {
    //   console.log("suggesions: "+ element.name);
    // });
  })
