document.addEventListener("mousemove", parallax2);
function parallax2(e){
document.querySelectorAll(".hijo").forEach(function(move){

    var movingValue = move.getAttribute("data-value");
     var x = (e.clientX * movingValue) /250;
     var y = (e.clientY * movingValue) /250;

    move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";

});

}

document.addEventListener("scroll", () => {
    let posScroll = window.scrollY;

    let duende = document.getElementById('duende');
    duende.style.transform = "translateY("+ posScroll*0.03 +"px)";

    const getStyle = id => document.getElementById(id).style;


    getStyle('cardjuego1').transform = new DOMMatrix("translateY("+ posScroll*0.02 +"px)  perspective(300px) rotateY(25deg) rotate(-15deg) scale(.9)");
    getStyle('cardjuego2').transform = new DOMMatrix("translateY("+ posScroll*0.02 +"px)  perspective(300px) rotateY(25deg) rotate(-15deg) scale(.9)");
    getStyle('cardjuego3').transform = new DOMMatrix("translateY("+ posScroll*0.02 +"px)  perspective(300px) rotateY(25deg) rotate(-15deg) scale(.9)");


})

    let card1 = document.getElementById("cardjuego1");
    let card2 = document.getElementById("cardjuego2");
    let card3 = document.getElementById("cardjuego3");

    card1.addEventListener("mouseenter", function() {


/*  TODO:terminar  */


    })




document.addEventListener("scroll", () => {
    let posScroll = window.scrollY;

    //Cuando aparece la seccion aparecen las 3 cards desde abajo a diferentes
    //velocidades, las velocidades las hice con distinto tiempo de transition
    //en cada card en el css.
    if(posScroll > 1300) {
        let card1 = document.getElementById('card1');
        let card2 = document.getElementById('card2');
        let card3 = document.getElementById('card3');
        card1.classList.add('entrada');
        card2.classList.add('entrada');
        card3.classList.add('entrada');
    }
})


document.addEventListener("scroll", () => {
    let posScroll = window.scrollY;
    let logo = document.getElementById('logo');

    
if (!(posScroll>= 0 && posScroll < 160)) {
        let logonav = document.getElementById('logonav');
        logonav.classList.remove("noseve");
        logo.classList.add("noseve");
    }
    else{
        logonav.classList.add("noseve");
        logo.classList.remove("noseve");
        logo.style.scale = 1 - posScroll / 800;
    }
 
}) 

let spider1 = document.getElementById("heroe1seccion7");
let spider2 = document.getElementById("heroe2seccion7");
let spider3 = document.getElementById("heroe3seccion7");

let bgDefault = document.getElementById("bg7"); 
let bgspider1 = document.getElementById("bg7-1"); 
let bgspider2 = document.getElementById("bg7-2"); 
let bgspider3 = document.getElementById("bg7-3");

let contenedor = document.getElementById("fondo7");


spider1.addEventListener("mouseenter", function() {
    contenedor.classList.add("arribade8");
    
    spider1.classList.add("selected");
    spider2.classList.remove("selected");
    spider3.classList.remove("selected");



    spider1.classList.remove("blur");
    spider2.classList.add("blur");
    spider3.classList.add("blur");

    bgspider2.classList.add("noesta");
    bgspider3.classList.add("noesta");
    bgspider1.classList.remove("noesta");
    bgspider1.classList.add("esta");

});
spider2.addEventListener("mouseenter", function() {
    contenedor.classList.add("arribade8");
    
    spider2.classList.add("selected");
    spider1.classList.remove("selected");
    spider3.classList.remove("selected");


    spider2.classList.remove("blur");
    spider1.classList.add("blur");
    spider3.classList.add("blur");

    bgspider1.classList.add("noesta");
    bgspider3.classList.add("noesta");
    bgspider2.classList.remove("noesta");
    bgspider2.classList.add("esta");

});
spider3.addEventListener("mouseenter", function() {
    contenedor.classList.add("arribade8");

    spider3.classList.add("selected");
    spider1.classList.remove("selected");
    spider2.classList.remove("selected");


    spider3.classList.remove("blur");
    spider1.classList.add("blur");
    spider2.classList.add("blur");

    bgspider1.classList.add("noesta");
    bgspider2.classList.add("noesta");
    bgspider3.classList.remove("noesta");
    bgspider3.classList.add("esta");

});



document.addEventListener("scroll", () => {
    let posScroll = window.scrollY;

    let contenedorImgAmigos = document.getElementById("contenedorImgAmigos");
    let img1 = "img/image21.png";
    let img2 = "img/image9.png";
    let img3 = "img/image10.png";
    let img4 = "img/image6.png";


    let txt1 = document.querySelector(".texto1");
    let txt2 = document.querySelector(".texto2");
    let txt3 = document.querySelector(".texto3");
    let txt4 = document.querySelector(".texto4");

    contenedorImgAmigos.innerHTML= "<img src="+img1+">";

    if (posScroll>3910 && posScroll<5300){
        contenedorImgAmigos.classList.add("Estatico");
    }
    else{
        contenedorImgAmigos.classList.remove("Estatico");
    }

    if(posScroll>3910 && posScroll< 4200){
        contenedorImgAmigos.innerHTML= "<img src="+img1+">";
        txt1.style.opacity = 1;
        txt2.style.opacity = 0;
        txt3.style.opacity = 0;
        txt4.style.opacity = 0;
    }
    if(posScroll>4200 && posScroll< 4600){
        contenedorImgAmigos.innerHTML= "<img src="+img2+">";
        txt1.style.opacity = 0;
        txt2.style.opacity = 1;
        txt3.style.opacity = 0;
        txt4.style.opacity = 0;
    }
    if(posScroll>4600 && posScroll< 5000){
        contenedorImgAmigos.innerHTML= "<img src="+img3+">";
        txt1.style.opacity = 0;
        txt2.style.opacity = 0;
        txt3.style.opacity = 1;
        txt4.style.opacity = 0;
    }
    if(posScroll>5000){
        contenedorImgAmigos.innerHTML= "<img src="+img4+">";
        txt1.style.opacity = 0;
        txt2.style.opacity = 0;
        txt3.style.opacity = 0;
        txt4.style.opacity = 1;
    }

  
    
 
}) 

