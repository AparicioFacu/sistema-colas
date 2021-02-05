//Comando para establecer la conexion

var socket = io();

let searchParams = new URLSearchParams(window.location.search); //obtengo los parametros opcionales del url

if (!searchParams.has('escritorio')) { //aqui se obtiene si el url el parametro opciones existe escritorio
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let escritorio = searchParams.get('escritorio'); //aqui se obtiene del url el numero del escritorio
var label = $('small');
console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio }, function(resp) {
        console.log(resp);
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});