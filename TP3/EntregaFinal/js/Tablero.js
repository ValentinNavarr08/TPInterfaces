class Tablero{
    constructor(cantfilas,cantcolumnas,cantGanar,ctx){
        this.cantcolumnas = cantcolumnas;
        this.cantfilas = cantfilas;
        this.cantGanar = cantGanar;
        this.ctx = ctx;
        this.matriz = [];
        this.desfasajeX = -30.5;
        this.desfasajeY = -15;
        this.Xinicial = 150;
        this.Yinicial = 130;
        this.Xfinal = 950;
        this.Yfinal = 600;
        this.crear();
        this.tamanoCasilleros;
    }

    imprimir() {
        console.log(this.matriz);
    }

     crear() {
        let anchoTablero = this.Xfinal - this.Xinicial;
        let altoTablero = this.Yfinal - this.Yinicial;

    
        let tamanoCasillero = Math.min(anchoTablero / this.cantcolumnas, altoTablero / this.cantfilas);
        let espaciadoX = anchoTablero / this.cantcolumnas;
        let espaciadoY = altoTablero / this.cantfilas;
       

    
        for (let j = 0; j < this.cantfilas; j++) {
            let arr = new Array;
            for (let i = 0; i < this.cantcolumnas; i++) {
                let posX = this.Xinicial + i * espaciadoX;
                let posY = this.Yinicial + j * espaciadoY;
                let casillero = new Casillero(posX, posY, tamanoCasillero / 2, 'grey', this.ctx);
                arr.push(casillero);
            }
            this.matriz.push(arr);
            this.tamanoCasilleros = tamanoCasillero / 2;
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
                const range = 1;
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



        insertarFichaEnCasillero(ficha) {
            let mejorCasillero = null;
            let maxPixelesDentro = 0;
        
            for (let j = 0; j < this.cantfilas; j++) {
                for (let i = 0; i < this.cantcolumnas; i++) {
                    if (this.matriz[j][i].esCasillero) {
                        let casillero = this.matriz[j][i];
                        let pixelesDentro = calcularPixelesDentro(ficha, casillero);
                        
                        if (pixelesDentro > maxPixelesDentro) {
                            maxPixelesDentro = pixelesDentro;
                            mejorCasillero = casillero;
                        }
                    }
                }
            }
            
            if (mejorCasillero) {
                // Inserta la ficha en el mejor casillero.
                ficha.setPosition(mejorCasillero.getPosX(), mejorCasillero.getPosY());
                mejorCasillero.insertarFicha(ficha);
            }
        }

        calcularPixelesDentro(ficha, casillero) {
            const fichaPosX = ficha.getPosX();
            const fichaPosY = ficha.getPosY();
            const casilleroPosX = casillero.getPosX();
            const casilleroPosY = casillero.getPosY();
            const fichaRadio = ficha.getRadius();
            const casilleroRadio = casillero.getRadius();
        
            // Calcula la distancia entre el centro de la ficha y el centro del casillero.
            const distanciaCentros = Math.sqrt(Math.pow(fichaPosX - casilleroPosX, 2) + Math.pow(fichaPosY - casilleroPosY, 2));
        
            // Comprueba si el centro de la ficha está dentro del casillero.
            if (distanciaCentros + fichaRadio <= casilleroRadio) {
                // Toda la ficha está dentro del casillero.
                return Math.PI * Math.pow(fichaRadio, 2);
            } else if (distanciaCentros >= casilleroRadio + fichaRadio) {
                // La ficha está completamente fuera del casillero.
                return 0;
            } else {
                // La ficha está parcialmente dentro del casillero.
                // Calcula el área del segmento circular.
                const angulo = 2 * Math.acos((Math.pow(casilleroRadio, 2) + Math.pow(distanciaCentros, 2) - Math.pow(fichaRadio, 2)) / (2 * casilleroRadio * distanciaCentros));
                const areaSegmento = 0.5 * Math.pow(casilleroRadio, 2) * (angulo - Math.sin(angulo));
        
                return areaSegmento;
            }
        }





    verificarVictoria(ficha) {
            const matriz = this.matriz;
            const jugador = ficha.getJugador();
            const cantGanar = this.cantGanar;
        
            const verificarLinea = (arr) => {
                let contador = 0;
                for (let i = 0; i < arr.length; i++) {
                    if (!arr[i].esCasillero && arr[i].getJugador() === jugador) {
                        contador++;
                        if (contador === cantGanar) {
                            return true;
                        }
                    } else {
                        contador = 0; // Reinicia el contador si no se encuentra una ficha del jugador actual.
                    }
                }
                return false;
            };
        
            // Verificar victoria en horizontal
            for (let fila = 0; fila < this.cantfilas; fila++) {
                if (verificarLinea(matriz[fila])) {
                    return jugador;
                }
            }
        
            // Verificar victoria en vertical
            for (let columna = 0; columna < this.cantcolumnas; columna++) {
                const columnaArr = [];
                for (let fila = 0; fila < this.cantfilas; fila++) {
                    columnaArr.push(matriz[fila][columna]);
                }
                if (verificarLinea(columnaArr)) {
                    return jugador;
                }
            }
        
            // Verificar victoria en diagonal ascendente
            for (let fila = cantGanar - 1; fila < this.cantfilas; fila++) {
                for (let columna = 0; columna <= this.cantcolumnas - cantGanar; columna++) {
                    const diagonalArr = [];
                    for (let i = 0; i < cantGanar; i++) {
                        diagonalArr.push(matriz[fila - i][columna + i]);
                    }
                    if (verificarLinea(diagonalArr)) {
                        return jugador;
                    }
                }
            }
        
            // Verificar victoria en diagonal descendente
            for (let fila = 0; fila <= this.cantfilas - cantGanar; fila++) {
                for (let columna = 0; columna <= this.cantcolumnas - cantGanar; columna++) {
                    const diagonalArr = [];
                    for (let i = 0; i < cantGanar; i++) {
                        diagonalArr.push(matriz[fila + i][columna + i]);
                    }
                    if (verificarLinea(diagonalArr)) {
                        return jugador;
                    }
                }
            }
        
            return null;
        }
    
        colocarFicha(ficha) {
            // (coloca la ficha en la posición correspondiente en la matriz)
            let posXFicha = ficha.getPosX();
            let posYFicha = ficha.getPosY();

        for(var j=0; j<this.cantfilas; j++) {
            for(var i=0; i<this.cantcolumnas; i++){
                let casillero = this.matriz[j][i];
                const range = 1;
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

        getTamanoCasilleros(){
            return this.tamanoCasilleros;
        }


    }

