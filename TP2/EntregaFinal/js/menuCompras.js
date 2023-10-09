 let boton = document.querySelector("#botonheader");
 let menudesplegable = document.querySelector("#menuPersonal");
 let carrito = document.querySelector("#carrito");
 let compras = document.querySelector("#compras");

boton.addEventListener('click', ()=>{
    menudesplegable.classList.remove("ocultarSection");
});

carrito.addEventListener('click', function(){
    compras.classList.toggle("ocultarSection");
} 
);

console.log(carrito, compras);