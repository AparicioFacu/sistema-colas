const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

//Client tiene contiene toda la informacion de la conexion que se establecio(info de la pc)
//Aqui tambien es cuando el usuario se conecta
//Los on son para escuchar
io.on('connection', (client) => {
    //Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let siguienteTicket = ticketControl.siguienteTicket();
        console.log(siguienteTicket);
        callback(siguienteTicket);
    });
    //emit 
    client.emit('estadoActual', {
        actualTicket: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket); // se devuelve el ticker para poder ser trabajado en el frontEnd

        // actualizar/notificar cambios en los ultimos 4
        //emit 'ultimos4'
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });


    });


});