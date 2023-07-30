///Elementos del DOM
let stockBurguers = document.getElementById('burguers');
let tabla = document.getElementById('tabla');
let tablaHeader = document.getElementById('tablaHeader');
let tablaBody = document.getElementById('tablaBody');
let tablaFooter = document.getElementById('tablaFooter');
let offCarrito = document.getElementById('offCarrito');

let carrito = [];
let burguers = [];



///Primero me traigo las burguers para el array. Es una promesa
async function traerBurguers() {
const response = await fetch('./burguers.json');
if (response.ok) {
    burguers = await response.json();
    console.log(burguers);
}else{
    Toastify({
        text: `Hubo un problema al cargar los productos, por favor intente de nuevo más tarde. Error: ' + response.status`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        className: "info",
        style: {
          background: "linear-gradient(to right, #dc1a1a, #dcddece5)",
        }
      }).showToast();
}
}

function crearTarjeta(){
    burguers.forEach((burguer) => {
        stockBurguers.innerHTML += `
        <div class="tarjeta">
            <div class="tarjetaHeader">
                <h4>N°${burguer.id}. ${burguer.nombre}</h4> 
            </div>
            <div class="tarjetaBody">
                <img src="${burguer.imagen}" class="img-fluid">
                <p>${burguer.descripción}</p>
            </div>
            <div class="tarjetaFooter">
                <p>$${burguer.precio}</p>
                <button type="button" id="btn${burguer.id}" class="btn btn-success">Agregar al carrito</button>
            </div>
        </div>`;   
})
}

function btnAgregar(){
    burguers.forEach((burguer) => stockBurguers.querySelector(`#btn${burguer.id}`).addEventListener('click', () => {
        const indiceCarrito = carrito.findIndex((item) => item.producto.nombre === burguer.nombre);
        if (indiceCarrito !== -1){
            carrito[indiceCarrito].cantidad++;
        }else{
            carrito.push(new Item(burguer,1))
        }
        Toastify({
            text: `El item ${burguer.nombre} se ha incorporado al carrito`,
            duration: 2000,
            gravity: "bottom",
            position: "right",
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
        almacenarCarrito();
        modificoTablaCarrito();
    }) 
    )
}

function btnEliminar(){
    carrito.forEach((item, index) => tablaBody.querySelector(`#eliminarItem-${item.producto.id}`).addEventListener('click', () => {
        if(item.cantidad > 1){
            carrito[index].cantidad--;
        }else{
          carrito.splice(index, 1);  
        }
        if(carrito.length > 0) {
            Toastify({
            text: `El item burguer ${item.producto.nombre} ha sido eliminado del carrito`,
            duration: 2000,
            stopOnFocus: false,
            gravity: "bottom",
            position: "right",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
        }else{
            Toastify({
                text: `El carrito no contiene ningún item`,
                duration: 3000,
                stopOnFocus: false,
                gravity: "bottom",
                position: "right",
                style: {
                  background: "linear-gradient(to right, #dc1a1a, #dcddece5)",
                }
              }).showToast();}
        almacenarCarrito();
        modificoTablaCarrito();
    })
    )
}
    



function modificoTablaCarrito(){
carrito = JSON.parse(localStorage.getItem('carrito')) || [];
dibujarTabla();
dibujoButtonsTabla();
}

function dibujoButtonsTabla(){
    if(carrito.length > 0){
    offCarrito.classList.add('d-flex', 'flex-row', 'justify-content-around')
    offCarrito.innerHTML = `
    <button id = "confirmarCompra" class = "btn btn-success mt-4">Confirmar compra</button>
    <button id = "vaciarCarrito" class = "btn btn-danger mt-4">Vaciar el carrito</button>
    `
    offCarrito.querySelector('#confirmarCompra').addEventListener('click', () => {
        console.log('hola')
        
    })
    offCarrito.querySelector('#vaciarCarrito').addEventListener('click', () => {
        carrito = [];
        dibujarTabla();
        offCarrito.innerHTML = '';
        Toastify({
            text: `El carrito no contiene ningún item`,
            duration: 3000,
            stopOnFocus: false,
            gravity: "bottom",
            position: "right",
            style: {
              background: "linear-gradient(to right, #dc1a1a, #dcddece5)",
            }
          }).showToast();
          almacenarCarrito();

    })}else{
        offCarrito.innerHTML = '';
    }
    
    
}

function dibujarTabla(){
    if(carrito.length > 0){
        tablaHeader.innerHTML = '';
        tablaBody.innerHTML = '';
        tablaFooter.innerHTML = '';
        tablaHeader.classList.add('text-white', 'text-center');
        tablaBody.classList.add('text-white', 'text-center');
        tablaFooter.classList.add('text-white', 'text-center');
        tablaHeader.innerHTML=`<tr>
        <th>Burguer</th>
        <th>Precio unitario</th>
        <th>Cantidad</th>
        <th>Subtotal</th>
        <th></th>
        </tr>`
        carrito.forEach((item) => {
            tablaBody.innerHTML += `
            <tr>
            <td>${item.producto.nombre}</td>
            <td>$${item.producto.precio}</td>
            <td>${item.cantidad}</td>
            <td>$${item.producto.precio * item.cantidad}</td>
            <td id="eliminarItem-${item.producto.id}"><button class="btn"><box-icon type='solid' name='trash' color='#dc3545'></box-icon></button></td>
            </tr>`
        })
            tablaFooter.classList.add('bg-secondary');
            tablaFooter.innerHTML=`<tr>
            <td>TOTAL</td>
            <td></td>
            <td></td>
            <td>$${carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0)}</td>
            <td></td>
            </tr>`
        
        btnEliminar();
    }else{
        tablaHeader.innerHTML = '';
        tablaBody.innerHTML = '';
        tablaFooter.innerHTML = '';
    }
    }

    
    
    function almacenarCarrito(){
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    async function cargarTarjetas(){
    await traerBurguers(); 
    crearTarjeta(); 
    btnAgregar(); 
    }
    
    /* cargarTarjetas(); */
   
    
    
   function allEventListener(){
    document.addEventListener('DOMContentLoaded', (e) => {
        e.preventDefault();
        modificoTablaCarrito();
        cargarTarjetas();
   })
   }

   
   allEventListener();
