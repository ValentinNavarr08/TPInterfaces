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

    
if(posScroll > 150) {
        let logonav = document.getElementById('logonav');
        logonav.classList.remove("noseve");
        logo.classList.add("noseve");
    }
    else{
        logo.style.scale = 1 - posScroll / 200;
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
    
    spider2.classList.add("blur");
    spider3.classList.add("blur");

    
    bgspider1.classList.remove("noesta");

});

/* TODO : centrar spidermans */
