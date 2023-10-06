const boton1 = document.querySelector("#iniciar");
const boton2 = document.querySelector("#registrarse");
const inciarform = document.querySelector("#inciarSection");
const regisform = document.querySelector("#registrarseSection");

boton1.addEventListener('click', ()=>{
    boton1.classList.add("botonActivo");
    boton2.classList.remove("botonActivo");
    regisform.classList.add("ocultarSection");
    inciarform.classList.remove("ocultarSection");
});

boton2.addEventListener('click', ()=>{
    boton1.classList.remove("botonActivo");
    boton2.classList.add("botonActivo");
    inciarform.classList.add("ocultarSection");
    regisform.classList.remove("ocultarSection");
});
