const btnAgregar = document.querySelector(".btn-agregar");
const loadAgregarGifos = document.querySelector(".agregarGifos");
const loadTrendings = document.querySelector(".seccionTrendigs");
const btnComenzar = document.querySelector(".comenzar");
const recordActions = document.querySelector(".record-actions");
const video = document.querySelector("video");
const overlayVideo = document.querySelector(".overlayVideo");
const pasos = document.querySelector(".pasos");
const contenido = document.querySelector(".contenido");
const numero1 = document.querySelector(".n1");
const numero2 = document.querySelector(".n2");
const numero3 = document.querySelector(".n3");
const imgOverlayVideo = document.querySelector(".img-overlayVideo");
const iconDownloadOverlay = document.querySelector(".icon-download");
const iconLinkOverlay = document.querySelector(".icon-link-normal");



const btnStop = document.createElement('button');
btnStop.classList.add("record");
// btnComenzar.style.display = "none";
const textStop = document.createElement("p");
textStop.textContent = "FINALIZAR";
btnStop.appendChild(textStop);
btnStop.style.display = "none";

const btnSubirGifo = document.createElement("div");
btnSubirGifo.classList.add("subirGifo");
const pBtnSubirGifo = document.createElement("p");
pBtnSubirGifo.textContent = "SUBIR GIFO";
btnSubirGifo.appendChild(pBtnSubirGifo);
recordActions.appendChild(btnSubirGifo);

// const liRepetirCaptura = document.createElement("li");
// const pRepetirCaptura = document.createElement("p");
// pRepetirCaptura.textContent = "REPETIR CAPTURA";
// liRepetirCaptura.appendChild(pRepetirCaptura);
// liRepetirCaptura.classList.add("liRepetirCaptura");
// pasos.children[0].appendChild(liRepetirCaptura);

const liCronometro = document.createElement("li");
const pliCronometro = document.createElement("p");
liCronometro.appendChild(pliCronometro);
liCronometro.classList.add("liCronometro");
pasos.children[0].appendChild(liCronometro);
pliCronometro.textContent = "0:0:0";
let contador_segundos = 0;
let contador_minutos = 0;
let contador_horas = 0;
let cronometro;


let h1Up = contenido.children[0];
let h1Down = contenido.children[1];
let pUp = contenido.children[2];
let pDown = contenido.children[3];


btnComenzar.addEventListener("click", () => {
     if (numero1.className !== "numbers n1 numbersPhase")
    numero1.classList.toggle("numbersPhase");
    // const h1Up = contenido.children[0];
    // const h1Down = contenido.children[1];
    // const pUp = contenido.children[2];
    // const pDown = contenido.children[3];
    getVideo(h1Up, h1Down, pUp, pDown);
});

const getVideo = (h1Up, h1Down, pUp, pDown) => {
    h1Up.textContent = "¿Nos das acceso";
    h1Down.textContent = "a tu cámara?";
    pUp.textContent = "El acceso a tu camara será válido sólo";
    pDown.textContent = "por el tiempo en el que estés creando el GIFO.";
    btnComenzar.style.display = "none";
    
    resetRecord(h1Up, h1Down, pUp, pDown);
}

btnAgregar.addEventListener("click", ()  => {
    if (content.className === "content dark-theme")
        btnAgregar.setAttribute('src', "images/CTA-crar-gifo-modo-noc.svg");
    else
        btnAgregar.setAttribute('src', "images/CTA-crear-gifo-hover.svg");
    overlayVideo.style.display = "none";
    loadHome.style.display = "none";
    loadFav.style.display = "none";
    loadMisGifos.style.display = "none";
    loadTrendings.style.display = "none";
    // btnRecord.style.display = "none";
    btnStop.style.display = "none";
    btnSubirGifo.style.display = "none";
    // liRepetirCaptura.style.display = "none";
    loadAgregarGifos.style.display = "inline";

    h1Up.textContent = "Aquí podrás";
    h1Down.textContent = "crear tus propios";
    const h1DownSpan = document.createElement("span");
    h1DownSpan.textContent = " GIFOS";
    h1DownSpan.style.color = "#50E3C2"
    contenido.children[1].appendChild(h1DownSpan);
    pUp.textContent = "¡Crea tu GIFO en sólo 3 pasos!";
    pDown.textContent = "(sólo necesitas una cámara para grabar un video)";
    btnComenzar.style.display = "block";
    h1Up.style.display = "block";
    h1Down.style.display = "block";
    pUp.style.display = "block";
    pDown.style.display = "block";
    video.style.display = "none";

    gifsMisGifos.innerHTML = '';
    clearInterval(cronometro);
    liCronometro.style.display = "none";

    console.log("el class name de num2: " +numero2.className);
    console.log("el class name de num1: " +numero1.className);
    if (numero1.className === "numbers n1 numbersPhase")
        numero1.classList.toggle("numbersPhase");
    if (numero2.className === "numbers n2 numbersPhase")
        numero2.classList.toggle("numbersPhase");
    if (numero3.className === "numbers n3 numbersPhase")
        numero3.classList.toggle("numbersPhase");
    // if (video.className === "overlayVideo")
    //     video.classList.toggle("overlayVideo");

    imgOverlayVideo.setAttribute('src', "images/loader.svg");
    iconDownloadOverlay.style.display = "none";
    iconLinkOverlay.style.display = "none";
});

async function grabar(stream, video, h1Up, h1Down, pUp, pDown, liRepetirCaptura, btnRecord){
    if (numero1.className === "numbers n1 numbersPhase")
        numero1.classList.toggle("numbersPhase");
    btnRecord.style.display = "block";
    contador_segundos = 0;
    contador_minutos = 0;
    contador_horas = 0;

    const recorder = await RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        height: 240,
        onGifRecordingStarted: () => {
            console.log('GRABANDO....');
        }
    });

    h1Up.style.display = "none";
    h1Down.style.display = "none";
    pUp.style.display = "none";
    pDown.style.display = "none";
    video.style.display = "block";


    btnRecord.addEventListener("click", async () => {
        await recorder.startRecording();
        btnStop.style.display = "block";
        // btnRecord.style.display = "none";
        btnRecord.style.display = "none";
        // video.classList.toggle("overlayVideo");
        btnRecord.remove();

        //agregar cronometro
        liCronometro.style.display = "block";
            // para mostrar el tiempo 0:0:0
            pliCronometro.textContent = `${contador_horas}:${contador_minutos}:${contador_segundos}`;
            cronometro = setInterval(() => {
                // liCronometro.style.display = "block";
                if (contador_segundos === 60){
                    contador_segundos = 0;
                    contador_minutos++;
                    if (contador_minutos === 60){
                        contador_minutos = 0;
                        contador_horas++;
                    }
                }
                contador_segundos++;
                // para ir actualizando el cronometro a tiempo real
                pliCronometro.textContent = `${contador_horas}:${contador_minutos}:${contador_segundos}`;
                // liCronometro.style.display = "block";
                console.log("horas: " + contador_horas);
                console.log("minutos: " + contador_minutos);
                console.log("segundos: " + contador_segundos);
            }, 1000);
    });

    btnAgregar.addEventListener("click", () => {
        btnRecord.style.display = "none";
        // liRepetirCaptura.style.display = "none";
        liRepetirCaptura.remove();
    });

    stop(recorder, h1Up, h1Down, pUp, pDown, liRepetirCaptura);

}


// async function stop(btnStop, recorder, h1Up, h1Down, pUp, pDown, btnSubirGifo, liRepetirCaptura){
async function stop(recorder, h1Up, h1Down, pUp, pDown, liRepetirCaptura){
    btnStop.addEventListener('click', () => {
    // pasos.children[0].appendChild(cronometro);
    clearInterval(cronometro);
    console.log("a ver el cronometrito locura mistica: " + cronometro);
    liCronometro.style.display = "none";
    //stopear cronometro
    btnStop.style.display = "none";
    btnSubirGifo.style.display = "block";
    liRepetirCaptura.style.display = "block";
    recorder.stopRecording( () => {
        btnSubirGifo.addEventListener("click", async () => {
                overlayVideo.style.display = "flex";
                numero2.classList.toggle("numbersPhase");
                console.log("y numero 3 antes????: " + numero3.className);
                numero3.classList.toggle("numbersPhase");
                console.log("y numero 3????: " + numero3.className);
                let blob = recorder.getBlob();
                console.log(recorder);
                const data = new FormData();
                data.append('file', blob, 'ungif.gif');
                const response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    body: data
                })


                console.log(response);
                

                jsonLocalstorage = JSON.parse(localStorage.getItem("misGifos"));
                const response_json = await response.json();
                jsonLocalstorage.list.push(response_json.data.id);
                localStorage.setItem("misGifos", JSON.stringify(jsonLocalstorage));
                console.log("el json jeje: " +jsonLocalstorage.list[0]);
                console.log(response_json.data.id);
                console.log(response_json);
                imgOverlayVideo.setAttribute('src', "images/check.svg");
                overlayVideo.children[1].textContent = "GIFO subido con éxito";
                iconDownloadOverlay.style.display = "block";
                iconLinkOverlay.style.display = "block";
            
                iconDownloadOverlay.addEventListener("click", () => {
                    location.href = `https://giphy.com/gifs/${response_json.data.id}`;
                });
                iconLinkOverlay.addEventListener("click", () => {
                    location.href = `https://giphy.com/gifs/${response_json.data.id}`;
                });
        });
        
        liRepetirCaptura.addEventListener("click", async () =>{
            console.log(numero2.className);
            if (numero2.className === "numbers n2"){
                numero2.classList.toggle("numbersPhase");
                console.log("cambiaste n2 locura mistica?????? " +numero2.className);
            }
            numero1.classList.toggle("numbersPhase");
            if (numero3.className === "numbers n3 numbersPhase")
                numero3.classList.toggle("numbersPhase");
            btnSubirGifo.style.display = "none";
            liRepetirCaptura.style.display = "none";
            liRepetirCaptura.remove();
            imgOverlayVideo.setAttribute('src', "images/loader.svg");
            iconDownloadOverlay.style.display = "none";
            iconLinkOverlay.style.display = "none";
            overlayVideo.style.display = "none";
            overlayVideo.children[1].textContent = "Estamos subiendo tu GIFO";
            resetRecord(h1Up, h1Down, pUp, pDown);
        });
    });
});
}

function resetRecord(h1Up, h1Down, pUp, pDown){

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {
            max: 480
            }
        }
    })
    .then(stream => {
        video.srcObject = stream;
        video.play();
        numero1.classList.toggle("numbersPhase");
        // numero2.classList.toggle("numbersPhase");
        if (numero2.className === "numbers n2"){
            numero2.classList.toggle("numbersPhase");
            console.log("cambiaste n2 locura mistica?????? " +numero2.className);
        }

        // const btnStop = document.createElement('button');
        // btnStop.classList.add("record");
        // btnComenzar.style.display = "none";
        // const textStop = document.createElement("p");
        // textStop.textContent = "FINALIZAR";
        // btnStop.appendChild(textStop);
        // btnStop.style.display = "none";

        recordActions.appendChild(btnStop);

        // const btnSubirGifo = document.createElement("div");
        // btnSubirGifo.classList.add("subirGifo");
        // const pBtnSubirGifo = document.createElement("p");
        // pBtnSubirGifo.textContent = "SUBIR GIFO";
        const liRepetirCaptura = document.createElement("li");
        const pRepetirCaptura = document.createElement("p");
        pRepetirCaptura.textContent = "REPETIR CAPTURA";
        liRepetirCaptura.appendChild(pRepetirCaptura);
        liRepetirCaptura.classList.add("liRepetirCaptura");
        pasos.children[0].appendChild(liRepetirCaptura);
        // btnSubirGifo.appendChild(pBtnSubirGifo);
        // recordActions.appendChild(btnSubirGifo);

        btnSubirGifo.style.display = "none";
        liRepetirCaptura.style.display = "none";

        const btnRecord = document.createElement("div");
        btnRecord.classList.add("record");
        const pBtnRecord = document.createElement("p");
        pBtnRecord.textContent = "GRABAR";
        btnRecord.appendChild(pBtnRecord);
        recordActions.appendChild(btnRecord);

        btnRecord.style.display = "none";


        grabar(stream, video, h1Up, h1Down, pUp, pDown, liRepetirCaptura, btnRecord);
    })
    .catch( () => {
        h1Up.textContent = "Aquí podrás";
        h1Down.textContent = "crear tus propios";
        const h1DownSpan = document.createElement("span");
        h1DownSpan.textContent = " GIFOS";
        h1DownSpan.style.color = "#50E3C2"
        contenido.children[1].appendChild(h1DownSpan);
        pUp.textContent = "¡Crea tu GIFO en sólo 3 pasos!";
        pDown.textContent = "(sólo necesitas una cámara para grabar un video)";
        btnComenzar.style.display = "block";
    })  
}