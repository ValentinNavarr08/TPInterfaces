const loader = document.querySelector(".paginaInicial");
  
setInterval(function(){
    loader.classList.add("cargada");
    document.body.removeChild(loader);
  }, 5000);