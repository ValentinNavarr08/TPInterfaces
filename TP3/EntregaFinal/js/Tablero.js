class Tablero{
    constructor(cantfilas,cantcolumnas,ctx){
        this.cantcolumnas = cantcolumnas;
        this.cantfilas = cantfilas;
        this.ctx = ctx;
        this.matriz = [];
        this.desfasajeX = -30.5;
        this.desfasajeY = -15;
        this.Xinicial = 130;
        this.Yinicial = 130;
        this.Xfinal = 930;
        this.Yfinal = 600;
        this.crear();
    }

    imprimir() {
        console.log(this.matriz);
    }

/*     crear(){
        let posYdefault = this.Yinicial;
        for(var j=0; j<this.cantfilas; j++) {
            var arr = new Array;
            let posXdefault = this.Xincicial;
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
    } */
     crear() {
        let anchoTablero = this.Xfinal - this.Xinicial;
        let altoTablero = this.Yfinal - this.Yinicial;

    
        let tamanoCasillero = Math.min(anchoTablero / this.cantcolumnas, altoTablero / this.cantfilas);
        let espaciado = tamanoCasillero;
        let  espacidonuevoX = tamanoCasillero + (anchoTablero - tamanoCasillero * this.cantcolumnas) % this.cantcolumnas;
        let espaciadoY
       

    
        for (let j = 0; j < this.cantfilas; j++) {
            let arr = new Array;
            for (let i = 0; i < this.cantcolumnas; i++) {
                let posX = this.Xinicial + i * espacidonuevoX;
                let posY = this.Yinicial + j * espaciado;
                let casillero = new Casillero(posX, posY, tamanoCasillero / 2, 'grey', this.ctx);
                arr.push(casillero);
            }
            this.matriz.push(arr);
        }
    }

    dibujar(){
        
        let casfin = new Casillero(this.Xfinal, this.Yfinal, 5, "red", this.ctx);
        casfin.draw();

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

                    return true;
                }


            }
                }
            }
            return false;
        }

    verificarVictoria(ficha) {
        const matriz = this.matriz;
        let jugador = ficha.getJugador();
            // Verificar victoria en horizontal
            for (let fila = 0; fila < this.cantfilas; fila++) {
                for (let columna = 0; columna <= this.cantcolumnas - 4; columna++) {
                    if (
                        !matriz[fila][columna].esCasillero && matriz[fila][columna].getJugador() === jugador &&
                        !matriz[fila][columna + 1].esCasillero && matriz[fila][columna + 1].getJugador() === jugador &&
                        !matriz[fila][columna + 2].esCasillero && matriz[fila][columna + 2].getJugador() === jugador &&
                        !matriz[fila][columna + 3].esCasillero && matriz[fila][columna + 3].getJugador() === jugador
                    ){
                            return jugador;
                        }
                }
            }
                // Verificar victoria en vertical
        for (let fila = 0; fila <= this.cantfilas - 4; fila++) {
            for (let columna = 0; columna < this.cantcolumnas; columna++) {
                if (
                    !matriz[fila][columna].esCasillero && matriz[fila][columna].getJugador() === jugador &&
                    !matriz[fila + 1][columna].esCasillero && matriz[fila + 1][columna].getJugador() === jugador &&
                    !matriz[fila + 2][columna].esCasillero && matriz[fila + 2][columna].getJugador() === jugador &&
                    !matriz[fila + 3][columna].esCasillero && matriz[fila + 3][columna].getJugador() === jugador
                ) {
                    return jugador;
                }
            }
        }

        // Verificar victoria en diagonal ascendente
        for (let fila = 3; fila < this.cantfilas; fila++) {
            for (let columna = 0; columna <= this.cantcolumnas - 4; columna++) {
                if (
                    !matriz[fila][columna].esCasillero && matriz[fila][columna].getJugador() === jugador &&
                    !matriz[fila - 1][columna + 1].esCasillero && matriz[fila - 1][columna + 1].getJugador() === jugador &&
                    !matriz[fila - 2][columna + 2].esCasillero && matriz[fila - 2][columna + 2].getJugador() === jugador &&
                    !matriz[fila - 3][columna + 3].esCasillero && matriz[fila - 3][columna + 3].getJugador() === jugador
                ) {
                    return jugador;
                }
            }
        }

        // Verificar victoria en diagonal descendente
        for (let fila = 0; fila <= this.cantfilas - 4; fila++) {
            for (let columna = 0; columna <= this.cantcolumnas - 4; columna++) {
                if (
                    !matriz[fila][columna].esCasillero && matriz[fila][columna].getJugador() === jugador &&
                    !matriz[fila + 1][columna + 1].esCasillero && matriz[fila + 1][columna + 1].getJugador() === jugador &&
                    !matriz[fila + 2][columna + 2].esCasillero && matriz[fila + 2][columna + 2].getJugador() === jugador &&
                    !matriz[fila + 3][columna + 3].esCasillero && matriz[fila + 3][columna + 3].getJugador() === jugador
                ) {
                    return jugador;
                }
            }
        }
    
    
            // (Verificaciones en vertical y diagonales como se mostró en la respuesta anterior)
    
            return null; 
        }
    
        colocarFicha(ficha) {
            // (coloca la ficha en la posición correspondiente en la matriz)
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
    
            // Verificar la victoria después de colocar una ficha
            const ganador = this.verificarVictoria(ficha);
            return ganador; // Devuelve el ganador si lo hay, de lo contrario, null
        }
    }

