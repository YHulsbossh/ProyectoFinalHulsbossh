let productos = [];

fetch("/js/array.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        renderProductosDestacados(productos);
    })



const main = document.getElementById('main');
const numero = document.getElementById('numero');
let carrito = [];


function renderProductosDestacados() {
let salida = "";
productos.forEach((producto) => {
     salida += `<div class="col-md-4 text-center text-success">
         <div class="card border-success" >
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo} ;">
           <div class="card-body">
              <h2>${producto.titulo}</h3>
              <p class="card-text">$${producto.precio}</p>
              <button id='agregar${producto.id}' class="btn btn-success agregar-producto">Agregar al carrito</button>
            </div>
          </div>
        </div>`  
              
    }
  );
  
  document.getElementById("destacados").innerHTML=salida ;
  boton()
}

function boton(){
  const boton= document.querySelectorAll('.agregar-producto');
  boton.forEach(element => {
    element.addEventListener('click', () => {
      const id = element.id.slice(7); 
      agregarAlCarrito(id); 
      renderProductosCarrito(); 
    });
  });
}
   
   
const agregarAlCarrito = (id) => {
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #16453f,#59a87d)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    offset: {
        x: '1.5rem',
        y: '3.5rem' 
      },
    onClick: function(){} 
  }).showToast();

  const existe = carrito.some(prod => prod.id === id);

  if (existe) {
    carrito = carrito.map(prod => {
      if (prod.id === id) {
        return {...prod, cantidad: prod.cantidad + 1};
      } else {
        return prod;
      }
    });
  } else {
    const item = productos.find(prod => prod.id === id);
    carrito.push({...item, cantidad: 1});
  }

  actualizarNumero();
  guardarProductosLS(carrito);
  renderProductosCarrito();

}

function guardarProductosLS(carrito) {
  return localStorage.setItem("carrito", JSON.stringify(carrito));
}

  
function cargarProductosLS() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

function actualizarNumero(){
  const nuevoNumero= carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numero.innerText = nuevoNumero;
  let numeroActualizado = localStorage.setItem('cantidadProductos', JSON.stringify("nuevoNumero"));
}


renderProductosDestacados()




