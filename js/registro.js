const clientes = [];


const formularioRegistro = document.getElementById('formRegistroCliente');
const nombreCliente = document.getElementById('nombreCliente');
const direccionCliente = document.getElementById('direccionCliente');
const emailCliente = document.getElementById('emailCliente');
const btnFinalizar = document.getElementById('finalizar');


function registroCliente(){
    const nuevoCliente = new Cliente(nombreCliente.value, direccionCliente.value, emailCliente.value);
    clientes.push(nuevoCliente);
}

function limpiarformulario(){
    formularioRegistro.reset();
}

btnFinalizar.addEventListener('click', (e) => {
    e.preventDefault();
    registroCliente();
    Swal.fire({
        title: `${nombreCliente.value} su compra ha finalizado con éxito. En breve recibirá un correo en su casilla ${emailCliente.value} con el detalle de la compra. El pedido está siendo preparado y lo recibirá en ${direccionCliente.value} dentro de los próximos 60 minutos. Muchas gracias por elegirnos.`,
        width: '44em',
        color: 'black',
        icon: 'success',
        iconColor : 'black',
        background: '#EA6032',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'black',
});
    limpiarformulario();
})