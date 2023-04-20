function renderProductosCarrito() {
  const carrito = cargarProductosLS();
  let salida = '';

  if (carrito.length > 0) {
    salida = `
      <table class="table text-success">
        <thead>
          <tr>
            <th scope="col">Imagen</th>
            <th scope="col">Título</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
    `;

    carrito.forEach((producto) => {
      salida += `
        <tr>
          <td><img src="${producto.imagen}" alt="${producto.titulo}" width="80" /></td>
          <td>${producto.titulo}</td>
          <td>$${producto.precio}</td>
          <td>${producto.cantidad}</td>
          <td>$${producto.precio * producto.cantidad}</td>
          <td><button id="${producto.id}" data-id="${producto.id}" class="btn btn-success eliminar-producto" >Eliminar</button>
          </td>

        </tr>
      `;
    });

    salida += `
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="text-end">
              <button class="btn btn-success" onclick="vaciarCarrito()">Vaciar Carrito</button>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="text-end"><strong class="fw-bold">Total a Pagar:</td>
            <td colspan="1"><strong class="fw-bold">$${totalPagarCarrito()}</td>
          </tr>
        </tfoot>
      </table>
    `;
  } else {
    salida = `<div class="alert alert-success text-center" role="alert">No se agregaron productos al Carrito</div>`;
  }

  document.getElementById('carritoContainer').innerHTML = salida;
  botonBorrar(carrito);
}




function botonBorrar(carrito){
    const botonesBorrar = document.querySelectorAll('.eliminar-producto');
  botonesBorrar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const id = boton.dataset.id;
      borrarProductosDelCarrito(id);
    });
    
  });
}



function borrarProductosDelCarrito(id){
  const carrito = cargarProductosLS();
  const indexCarrito = carrito.findIndex((i) => i.id === id);
  if (indexCarrito !== -1) {
    carrito.splice(indexCarrito, 1);
    guardarProductosLS(carrito);
    renderProductosCarrito();
    actualizarNumero();
    Toastify({
      text: "Producto Eliminado",
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
          y: '1.5rem' 
        },
      onClick: function(){} 
    }).showToast();
  }
 console.log (carrito)
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  renderProductosCarrito();
  actualizarNumero();
} 


function totalProductosCarrito() {
  const productos = cargarProductosLS();

  return productos.reduce((total, item) => total += item.cantidad, 0);
}

function totalPagarCarrito() {
  const productos = cargarProductosLS();

  return productos.reduce((total, item) => total += item.cantidad * item.precio, 0);
}


renderProductosCarrito();