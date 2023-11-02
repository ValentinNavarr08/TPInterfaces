/* TODO: 
hacer que la ficha se devualva
hacer los menus iniciales
setear la imagen del fondo
logica del tablero dinamico
*/


let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = 1080;
let canvasHeight = 650;
let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;
let desfasajeX = -30.5;
let desfasajeY = -15 ;
const timerElement = document.getElementById('timer');
const reiniciar = document.getElementById('reset');

const fichablue = document.querySelector('#fichablue');
const fichared = document.querySelector('#fichared');


const img = new Image();
img.src = "images/fondo.png";
img.height = canvasHeight;
img.width = canvasWidth;

img.onload = () => {
    canvas.width = img.width;  // Establecer el ancho del canvas al ancho de la imagen
    canvas.height = img.height; // Establecer el alto del canvas al alto de la imagen
    const pattern = ctx.createPattern(img, "no-repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Usar canvas.width y canvas.height
    drawfichas(fichasblue);
    drawfichas(fichasred);
    tablero.dibujar();
};

var fichasblue = crearfichas(fichablue);


var fichasred = crearfichas(fichared);


var jugadoractivo = "jugador1";

var tablero = new Tablero(10,10,ctx);
tablero.imprimir();
tablero.dibujar();

function drawfichas(arreglo){
    let max= arreglo.length;
    for(let i=0; i < max; i++){
        arreglo[i].draw();
    } 
}


function crearfichas(estilo) {
    if(estilo == fichared) {
        var posinicialx = 60;
        var posinicialy = 60;
        let fichas = [];
    for(let i = 0;i < 18;i++){
        let ficha = new Ficha(posinicialx, posinicialy, 40, estilo, ctx, "jugador1");
        fichas.push(ficha);
    }
    return fichas;
    } 
    else if (estilo == fichablue){
        var posinicialx = 1000;
        var posinicialy = 60;
        let fichas = [];
        for(let i = 0;i <18;i++){
        let ficha = new Ficha(posinicialx, posinicialy, 40, estilo, ctx, "jugador2");
        fichas.push(ficha);
    }
    return fichas;
    }
}


function onmousedown(e){
isMouseDown = true;
if(lastClickedFigure != null) {
    lastClickedFigure.setResaltado(false);
    lastClickedFigure = null;
}

/* console.log(e);
let casillero1= new Casillero(e.layerX, e.layerY,5,"green", ctx);
let casillero2= new Casillero(e.clientX -30.5 *2 , e.clientY -15,5,"red", ctx);
let casillero3= new Casillero(e.clientX, e.clientY ,5,"blue", ctx);
drawFigure();
casillero1.draw();
casillero2.draw();
casillero3.draw(); */
// TODO : preguntar sobre el offset


let clickFig = findClickedFigure(e.layerX, e.layerY);//coordenadas de x e y dentro del canvas
if(clickFig != null) {
    clickFig.setResaltado(true);
    lastClickedFigure = clickFig;
}
}

function onmouseup(e){
    isMouseDown = false;
    if(lastClickedFigure != null && lastClickedFigure.isClickeable() && tablero.estaencimacasillero(lastClickedFigure)){
        let ganador = tablero.colocarFicha(lastClickedFigure);
        sacarFicha();
        lastClickedFigure.setClickeable(false);
        tablero.dibujar();
        drawFigure();
        
        // logica para cambiar turnos
        cambiarTurno();
        if(ganador != null){
            alert(ganador);
            timer.stop();
        }
      
    }

}

function onmousemove(e){
    if(isMouseDown && lastClickedFigure != null ) {
    lastClickedFigure.setPosition(e.layerX, e.layerY);
    drawFigure();
}
}



 function drawFigure(){
    clearCanvas();
    drawfichas(fichasblue);
    drawfichas(fichasred);
} 

function clearCanvas(){
    const pattern = ctx.createPattern(img, "no-repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0,0, canvasWidth,canvasHeight);
    tablero.dibujar();
}

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

function sacarFicha() {
    if (jugadoractivo == "jugador1"){
        fichasred.splice(0,1);
    }
    else{
        fichasblue.pop(0);
    } 
}

function actualizarTemporizador(tiempoRestanteEnMilisegundos) {
    const segundos = Math.floor(tiempoRestanteEnMilisegundos / 1000);
    const milisegundos = Math.floor((tiempoRestanteEnMilisegundos % 1000) / 100);

    timerElement.textContent = `Tiempo restante: ${segundos}.${milisegundos} segundos`;

    if (tiempoRestanteEnMilisegundos === 0) {
        // Cambia el turno automáticamente
        cambiarTurno();
    }
}

const timer = new Timer(actualizarTemporizador, 30); // 30 segundos
timer.start();

function cambiarTurno(){
    // Detener el temporizador actual si está en funcionamiento
    if (timer) {
        timer.stop();
        drawFigure();
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

function resetearJuego(){
    if(lastClickedFigure != null) {
        lastClickedFigure.setResaltado(false);
    }
    fichasblue = [];
    fichasblue = crearfichas(fichablue);
    fichasred = [];
    fichasred = crearfichas(fichared);

    
    drawfichas(fichasblue);
    drawfichas(fichasred);
    
    jugadoractivo = "jugador2";
    cambiarTurno();

    tablero = new Tablero(5,8,ctx);
    tablero.imprimir();
    tablero.dibujar();

}

reiniciar.addEventListener('click', resetearJuego);

canvas.addEventListener('mousedown', onmousedown,false);
canvas.addEventListener('mousemove', onmousemove,false);
canvas.addEventListener('mouseup', onmouseup,false);