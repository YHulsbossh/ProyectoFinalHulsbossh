const formulario = document.getElementById ('formulario');
const botonBusqueda = document.getElementById('boton-busqueda');
const container = document.getElementById('buscador-container');


const filtrar = () => {
    let salida = "";

  const texto = formulario.value.toLowerCase();

  for (let producto of productos){
    let nombreProducto = producto.titulo.toLowerCase();
    if(nombreProducto.indexOf(texto) !== -1){
        salida +=`
        
        <li data-id="${producto.id}">${producto.titulo}</li>
        
        `
    }
    else if (nombreProducto.includes(texto)) {
        producto.style.display = 'block';
  }
  
  document.getElementById("resultado").innerHTML=salida
    
  }
}

botonBusqueda.addEventListener('click', filtrar);
formulario.addEventListener('keyup', filtrar);


  

filtrar ();