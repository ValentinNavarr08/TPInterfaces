class Tablero{
    constructor(cantfilas,cantcolumnas,cantGanar1,ctx){
        this.cantcolumnas = cantcolumnas;
        this.cantfilas = cantfilas;
        this.cantGanar = cantGanar1;
        this.ctx = ctx;
        this.matriz = [];
        this.desfasajeX = -30.5;
        this.desfasajeY = -15;
        this.Xinicial = 190;
        this.Yinicial = 130;
        this.Xfinal = 950;
        this.Yfinal = 600;
        this.crear();
        this.tamanoCasilleros;
    }

    //Solo para fines de debug
    imprimir() {
        console.log(this.matriz);
    }

    //Crea la matriz 
    crear() {
        //Determina el ancho y el alto con posiciones estaticas predefinidas en el constructor
        let anchoTablero = this.Xfinal - this.Xinicial;
        let altoTablero = this.Yfinal - this.Yinicial;

        //calcula en base al alto y ancho el tamaño y el espaciado de los casilleros
        let tamanoCasillero = Math.min(anchoTablero / this.cantcolumnas, altoTablero / this.cantfilas);
        let espaciadoX = anchoTablero / this.cantcolumnas;
        let espaciadoY = altoTablero / this.cantfilas;
       

        //Llena la matriz vacia de casilleros 
        for (let j = 0; j < this.cantfilas; j++) {
            let arr = new Array;
            for (let i = 0; i < this.cantcolumnas; i++) {
                let posX = this.Xinicial + i * espaciadoX;
                let posY = this.Yinicial + j * espaciadoY;
                let casillero = new Casillero(posX, posY, tamanoCasillero / 2, "grey", this.ctx);
                arr.push(casillero);
            }
            this.matriz.push(arr);
            this.tamanoCasilleros = tamanoCasillero / 2;
        }
    }

    //Recorre y hace .draw a todo lo que tiene, sea fichas o casilleros
    dibujar(){
         for(var j=0; j<this.cantfilas; j++) {
            for(var i=0; i<this.cantcolumnas; i++){
                this.matriz[j][i].draw();
            }
        }
       
    }

    // Determina si la ficha esta encima de una casillero 
     estaencimacasillero(ficha){
        let posXFicha = ficha.getPosX();
        let posYFicha = ficha.getPosY();

        for(var j=0; j<this.cantfilas; j++) {
            for(var i=0; i<this.cantcolumnas; i++){
            if (this.matriz[j][i].esCasillero){
                let casillero = this.matriz[j][i];
                const range = 0.5;
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


    //Se recoree la matriz y devuelve ganador si lo hay
    verificarVictoria(ficha) {
            const matriz = this.matriz;
            const jugador = ficha.getJugador();
            const cantGanar = this.cantGanar;
         
            //Cuenta la cantidad de fichas 
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

                let Col = 0; 
                let encontro = false;

            while(!encontro && Col<this.cantcolumnas){
                let posCol = this.getPosCol(Col);
                if  (
                    posXFicha >= posCol &&
                    posXFicha <= posCol + this.matriz[0][0].getRadius() * 2){
                        encontro = true;
                    }
                    else {
                        Col++;}

            }
                let FilDis = this.buscarFiladisponible(Col);

                console.log(FilDis);
                let casilleroDis = this.matriz[FilDis][Col];

                let posXnueva = casilleroDis.getPosX() + 0;
                let posYnueva = casilleroDis.getPosY() + 0;
                ficha.setPosition(posXnueva, posYnueva);

                this.matriz[FilDis][Col] = ficha; 
                
            this.imprimir();
            // Verificar la victoria después de colocar una ficha
            const ganador = this.verificarVictoria(ficha);
            return ganador; // Devuelve el ganador si lo hay, de lo contrario, null
        }

        getTamanoCasilleros(){
            return this.tamanoCasilleros;
        }

        getPosCol(col){
          let cas1  = this.matriz[0][col];
           return cas1.getPosX();
        }

        buscarFiladisponible(Col){
    
            for(var i=this.cantfilas - 1; i>=0; i--){
                if (this.matriz[i][Col].esCasillero){
                    return i;
                }
            }
            return null;
        }

    }


