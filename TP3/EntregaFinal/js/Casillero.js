class Casillero{
    constructor(posX, posY, radius, fill, context){
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.fill = fill;
        this.ctx = context;
        this.desfasajeX = -30.5;
        this.desfasajeY = -15;
    }



esCasillero(){
     return true;
}

setFill(fill){
    this.fill = fill
}

setPosition(x,y){
    this.posX = x ;
    this.posY = y ;
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
    this.ctx.fillStyle = this.fill;
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 0,2 * Math.PI);
    this.ctx.fill();
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

} 
