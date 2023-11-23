document.addEventListener("mousemove", parallax2);
function parallax2(e){
document.querySelectorAll(".hijo").forEach(function(move){

    var movingValue = move.getAttribute("data-value");
     var x = (e.clientX * movingValue) /250;
     var y = (e.clientY * movingValue) /250;

    move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";

});

}

