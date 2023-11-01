class Ficha{
    constructor(posX, posY, radius, imagen, context, jugador){
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.imagen = imagen;
        this.ctx = context;
        this.desfasajeX = -30.5;
        this.desfasajeY = -15;
        this.clickeable = true;
        this.jugador = jugador;
    }

esCasillaro(){
    return false;
}

setClickeable(valor){
    this.clickeable = valor;
}

isClickeable(){
    return this.clickeable;
}

setFill(fill){
    this.fill = fill
}

setPosition(x,y){
    if (this.clickeable){
        this.posX = x ;
        this.posY = y ;
    }
}

getPosition(){
    return {
        x: this.getPosx(),
        y: this.getPosy()
    };
}

getPosX(){
    return this.posX;
}

getPosY(){
    return this.posY;
}

getFill(){
    return this.fill;
}

draw(){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
            this.ctx.clip();
            this.ctx.drawImage(this.imagen, this.posX - this.radius, this.posY - this.radius , this.radius * 2, this.radius * 2);
            this.ctx.restore();
    if(this.resaltado === true) {
        this.ctx.strokeStyle = this.resaltadoEstilo;
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
    }
    this.ctx.closePath();
    
}

getRadius(){
    return this.radius;
}

setResaltado(resaltado){
    this.resaltado = resaltado;
}

isPointInside(x,y){
    let _x = this.posX - x;
    let _y = this.posY -y;
    
    return Math.sqrt(_x * _x + _y * _y) < this.radius;
}

getJugador(){
    return this.jugador;
}
}