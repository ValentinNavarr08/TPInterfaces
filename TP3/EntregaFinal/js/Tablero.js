class Tablero{
    constructor(cantfilas,cantcolumnas,ctx){
        this.cantcolumnas = cantcolumnas;
        this.cantfilas = cantfilas;
        this.ctx = ctx;
        this.matriz = [];
        this.crear();
        this.desfasajeX = -30.5;
        this.desfasajeY = -15;
    }

    imprimir() {
        console.log(this.matriz.length);
        console.log(this.matriz);
    }

    crear(){
        let posYdefault = 130;
        for(var j=0; j<this.cantfilas; j++) {
            var arr = new Array;
            let posXdefault = 200;
            for(var i=0; i<this.cantcolumnas; i++){
                if (i==0){
                    let circulo = new Casillero(posXdefault, posYdefault ,40 , 'grey', ctx);
                    arr.push(circulo);}
                else{
                    let circulo = new Casillero(posXdefault, posYdefault , 40, 'grey', ctx);
                    arr.push(circulo);
                    }
                posXdefault += 100;
            }
            this.matriz.push(arr);
            posYdefault += 100;
        }
    }

    dibujar(){
        for(var j=0; j<this.cantfilas; j++) {
            for(var i=0; i<this.cantcolumnas; i++){
                this.matriz[j][i].draw();
            }
        }
    }


    estaencimacasillero(ficha){
        let posXFicha = ficha.getPosX();
        let posYFicha = ficha.getPosY();

        for(var j=0; j<this.cantfilas; j++) {
            for(var i=0; i<this.cantcolumnas; i++){
            if (this.matriz[j][i].esCasillero){
                let casillero = this.matriz[j][i];
                const range = 5;
                if (
                    posXFicha >= casillero.getPosX() - range &&
                    posXFicha <= casillero.getPosX() + casillero.getRadius() * 2 + range &&
                    posYFicha >= casillero.getPosY() - range &&
                    posYFicha <= casillero.getPosY() + casillero.getRadius() * 2 + range
                ){
                    console.log(ficha);
                    return true;
                }


            }
                }
            }
            return false;
        }
    

    colocarFicha(ficha){
        let posXFicha = ficha.getPosX();
        let posYFicha = ficha.getPosY();

        for(var j=0; j<this.cantfilas; j++) {
            for(var i=0; i<this.cantcolumnas; i++){
                let casillero = this.matriz[j][i];
                const range = 5;
            if (
                posXFicha >= casillero.getPosX() - range &&
                posXFicha <= casillero.getPosX() + casillero.getRadius() * 2 + range &&
                posYFicha >= casillero.getPosY() - range &&
                posYFicha <= casillero.getPosY() + casillero.getRadius() * 2 + range
            ){
                let posXnueva = casillero.getPosX() + 0;
                let posYnueva = casillero.getPosY() + 0;
                ficha.setPosition(posXnueva, posYnueva);
                this.matriz[j][i] = ficha;
            }
                }
            }
            console.log(this.matriz);
         }
    
}
