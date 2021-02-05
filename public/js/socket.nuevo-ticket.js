//Comando para establecer la conexion

var socket = io();

var label = $('#lblNuevoTicket'); //seleciona el span de la nuevo-ticket.html

socket.on('connect', function() {
    console.log('Conectado al Servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del Servidor');
});

//on 'estadoActual'
socket.on('estadoActual', function(respuesta) {
    console.log(respuesta);
    label.text(respuesta.actualTicket);
});

$('button').on('click', function() { //selecciona el button y cambia el span por el nuevo ticket
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});