let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;
let desfasajeX = -30.5;
let desfasajeY = -15 ;
const img = document.querySelector('#tablero');
const pat = ctx.createPattern(img, "no-repeat");


const fichablue = document.querySelector('#fichablue');
const fichared = document.querySelector('#fichared');


let fichasblue = crearfichas(fichablue);
let fichasred = crearfichas(fichared);

console.log(fichasred);
drawfichas(fichasblue);
drawfichas(fichasred);

var jugadoractivo = "jugador1";






var tablero = new Tablero(5,8,ctx);
tablero.imprimir();
tablero.dibujar();

function drawfichas(arreglo){
    for(let i=0; i < arreglo.length; i++){
        arreglo[i].draw();
    } 
}


function crearfichas(estilo) {
    if(estilo == fichared) {
        var posinicialx = 60;
        var posinicialy = 60;
    } else {
        var posinicialx = 1000;
        var posinicialy = 60;
    }
    let fichas = [];
    for(let i = 0;i < 18;i++){
        let ficha = new Ficha(posinicialx, posinicialy, 40, estilo, ctx);
        fichas.push(ficha);
    }
    return fichas;
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
        tablero.colocarFicha(lastClickedFigure);
        sacarFicha();
        lastClickedFigure.setClickeable(false);
        tablero.dibujar();
        drawFigure();

        // logica para cambiar turnos
        if (jugadoractivo == "jugador1"){
            jugadoractivo = "jugador2";
        }
        else{
            jugadoractivo = "jugador1";
        }
        
    }

}

function onmousemove(e){
    if(isMouseDown && lastClickedFigure != null ) {
    lastClickedFigure.setPosition(e.layerX, e.layerY);
    // if(tablero.estaencima(e.layerX,e.layerY)){
    //     console.log(tablero.estaencima(e.layerX,e.layerY));
    //     var casillero = tablero.encontrarcasillero(e.layerX,e.layerY) 
    // }
    drawFigure();
}
}



 function drawFigure(){
    /* ----------- OPTIMIZAR------------*/ 
    clearCanvas();
    for(let i=0; i < fichasblue.length; i++){
        if (fichasblue[i].isClickeable()){
            fichasblue[i].draw();
        }
    
    } 
    for(let i=0; i < fichasred.length; i++){
        if ( fichasred[i].isClickeable()){
            fichasred[i].draw();
        }
    } 
} 

function clearCanvas(){
    ctx.fillStyle = 'purple';
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
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
        console.log(fichasred);
    }
    else{
        fichasblue.pop(0);
    } 
}
canvas.addEventListener('mousedown', onmousedown,false);
canvas.addEventListener('mousemove', onmousemove,false);
canvas.addEventListener('mouseup', onmouseup,false);