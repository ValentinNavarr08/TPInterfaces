const loader = document.querySelector(".paginaInicial");
  
setInterval(function(){
    loader.classList.add("cargada");
    window.location.replace("index.html");
  }, 5000);