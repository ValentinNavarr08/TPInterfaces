
// Logica general
form.addEventListener("submit", function(event){
event.preventDefault();
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = 1080;
let canvasHeight = 650;
let lastClickedFigure = null;
let isMouseDown = false;
const timerElement = document.getElementById('timer');
const reiniciar = document.getElementById('reset');
const boton = document.getElementById('jugar');
const form = document.getElementById('form');
const menu = document.getElementById("menu");

var imgAzul = new Image()
imgAzul.src = document.querySelector('input[name="imgAzul"]:checked').value;
const fichablue = imgAzul;

var imgRojo = new Image()
imgRojo.src = document.querySelector('input[name="imgRojo"]:checked').value;
const fichared = imgRojo;

var CantF = 5;
var CantC = 8;
const cantGan = parseInt(document.querySelector('input[name="modo"]:checked').value);
const img = new Image();

// Dependiendo de que modo se elige se cambian las dimensiones
switch(cantGan){
    case 5:
        CantF = 7;
        CantC = 8;
        break;
    case 6:
        CantF = 8;
        CantC = 9;
        break;
    case 7:
        CantF = 10;
        CantC = 11;
        break;
}
console.log(CantF);
console.log(CantC);



console.log(cantGan);
menu.classList.add("ocultarSection");

// creamos tablero
var tablero = new Tablero(CantF,CantC,cantGan,ctx);
tablero.imprimir();
tablero.dibujar();
const Tficha = tablero.getTamanoCasilleros();

var fichasblue = crearfichas(fichablue, Tficha);
console.log(fichasblue);
drawfichas(fichasblue);
var fichasred = crearfichas(fichared, Tficha);
drawfichas(fichasred);

console.log(fichasblue);
console.log(fichasred);

var jugadoractivo = "jugador1";

img.src = "images/fondo.png";
img.height = canvasHeight;
img.width = canvasWidth;

// Seteamos la imagen del fondo
img.onload = () => {
    canvas.width = img.width;  
    canvas.height = img.height; 
    const pattern = ctx.createPattern(img, "no-repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    tablero.dibujar();
    drawfichas(fichasblue);
    drawfichas(fichasred);
}

// Dibuja las fichas
function drawfichas(arreglo){
    let max= arreglo.length;
    for(let i=0; i <max; i++){
        arreglo[i].draw();
    } 
}

// Crea las fichas con el estilo y tamaño deseado
function crearfichas(estilo, Tam) {
    if(estilo == fichared) {
        var posinicialx = 60;
        var posinicialy = 60;
        let fichas = [];
    for(let i = 0;i < 18;i++){
        let ficha = new Ficha(posinicialx, posinicialy, Tam, estilo, ctx, "jugador1");
        fichas.push(ficha);
    }
    return fichas;
    } 
    else{
        var posinicialx = 1000;
        var posinicialy = 60;
        let fichas = [];
        for(let i = 0;i <18;i++){
        let ficha = new Ficha(posinicialx, posinicialy, Tam, estilo, ctx, "jugador2");
        fichas.push(ficha);
    }
    return fichas;
    }
}

// handlers de eventos
function onmousedown(e){
isMouseDown = true;
if(lastClickedFigure != null) {
    lastClickedFigure.setResaltado(false);
    lastClickedFigure = null;
}


let clickFig = findClickedFigure(e.layerX, e.layerY);//coordenadas de x e y dentro del canvas
if(clickFig != null) {
    clickFig.setResaltado(true);
    lastClickedFigure = clickFig;
}
}
// cuando suelta el mouse
function onmouseup(e){
    isMouseDown = false;
    if(lastClickedFigure != null && lastClickedFigure.isClickeable() && tablero.estaencimacasillero(lastClickedFigure)){
        // llama a colocar ficha que devuelve si hay un ganador o no
        let ganador = tablero.colocarFicha(lastClickedFigure);
        lastClickedFigure.setClickeable(false);
        // Sacamos la ficha de la mano del jugador para que no pueda acceder (del array).
        sacarFicha();
        //se redibuja todo
        drawFigure();

        // logica para cambiar turnos
        cambiarTurno();
        //se pregunta si hay ganador
        if(ganador != null){
            //logica de ganar
            mostrarMensaje(ganador + " WIN");
            canvas.style.opacity = 0.7;
            canvas.classList.add("rotate");
            console.log("win");
            timer.stop();
        }
      
    }

}



function mostrarMensaje(mensaje) {
    // Obtenemos el elemento con id "mensaje"
    let mensajeElement = document.getElementById("mensaje");

    // Si no existe, crearlo
    if (!mensajeElement) {
        mensajeElement = document.createElement("div");
        mensajeElement.id = "mensaje";
        document.body.appendChild(mensajeElement);
    }

    // Asignar el mensaje al contenido del elemento
    mensajeElement.textContent = mensaje;
}

function onmousemove(e){
    //mientras se va moviendo 
    if(isMouseDown && lastClickedFigure != null ) {
    lastClickedFigure.setPosition(e.layerX, e.layerY);
    //se va redibujando
    drawFigure();
}
}


//redibuja todo el canvass 
 function drawFigure(){
    clearCanvas();
    tablero.dibujar();
    drawfichas(fichasblue);
    drawfichas(fichasred);
} 

//clarea todo el canvass
function clearCanvas(){
    const pattern = ctx.createPattern(img, "no-repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0,0, canvasWidth,canvasHeight);
    tablero.dibujar();
}

//trata de encontrar la figura sobre la que se hace click
function findClickedFigure(x,y){
    /* ----------- OPTIMIZAR------------*/

    if (jugadoractivo == "jugador1"){
        for(let i = 0; i < fichasred.length; i++){
            const element = fichasred[i];
            if(element.isPointInside(x,y)){
                return element;  
            }
         }
    }
    else {
        for(let i = 0; i <fichasblue.length; i++){
            const element = fichasblue[i];
            if(element.isPointInside(x,y)){
                return element;
            }
         }
    } 
    return null; 
}

//Una vez la ficha está en el tablero se la saca la ficha de la mano
function sacarFicha() {
    if (jugadoractivo == "jugador1"){
        fichasred.splice(0,1);
    }
    else{
        fichasblue.splice(0,1);
    } 
}

//Actualiza el reloj
function actualizarTemporizador(tiempoRestanteEnMilisegundos) {
    const segundos = Math.floor(tiempoRestanteEnMilisegundos / 1000);
    const milisegundos = Math.floor((tiempoRestanteEnMilisegundos % 1000) / 100);

    //Actualiza el timer en pantalla
    timerElement.textContent = `${segundos}.${milisegundos}`;

    if (tiempoRestanteEnMilisegundos === 0) {
        // Cambia el turno automáticamente
        cambiarTurno();
    }
}

const timer = new Timer(actualizarTemporizador, 30);
timer.start();

//Cambia el turno del jugador
function cambiarTurno(){
    // Detener el temporizador actual si está en funcionamiento
    if (timer) {
        timer.stop();
        drawFigure();

        //Cambia el jugador activo
        if (jugadoractivo == "jugador1"){
            jugadoractivo = "jugador2";
        }
        else{
            jugadoractivo = "jugador1";
        }
        
    }
    

    // Iniciar un nuevo temporizador para el nuevo turno
    timer.start();
}

//Funcion de boton Reinicio
function resetearJuego(){
    document.getElementById("mensaje").textContent = "";
    document.getElementById("canvas").style.opacity = 1;
    if(lastClickedFigure != null) {
        lastClickedFigure.setResaltado(false);
    }
    //Se vuelve a crear todo de nuevo
    fichasblue = [];
    fichasblue = crearfichas(fichablue, Tficha);
    drawfichas(fichasblue);
    fichasred = [];
    fichasred = crearfichas(fichared, Tficha);
    drawfichas(fichasred);
    
    jugadoractivo = "jugador2";
    cambiarTurno();

    tablero = new Tablero(CantF,CantC,cantGan, ctx);
    tablero.imprimir();
    tablero.dibujar();

}

//Listeners
reiniciar.addEventListener('click', resetearJuego);

canvas.addEventListener('mousedown', onmousedown,false);
canvas.addEventListener('mousemove', onmousemove,false);
canvas.addEventListener('mouseup', onmouseup,false);
});