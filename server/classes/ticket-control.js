const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl {

    constructor() {

        this.ultimo = 0; //ultimo ticket
        this.hoy = new Date().getDate(); //fecha del dia
        this.tickets = []; //esto serian todos los tickets que no han sido pedidos por nadie
        this.ultimos4 = [];
        let data = require('../data/data.json');

        if (data.hoy === this.hoy) { // esto es para ver si hoy es el mismo dia que cuando empezaron a hacer los ticket. si es un distinto dia se reinician los ticket
            this.ultimo = data.ultimo; // aqui se queda guardado el ultimo ticket entregado
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() { // se obtiene el siguiente ticket
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket); //agreso los ticket que voy creando en el arreglo de tickets

        this.grabarArchivo();

        return ` Ticket ${this.ultimo}`;
    }

    getUltimoTicket() { // se obtiene el ultimo ticket, es decir el ticket en uso
        return ` Ticket ${this.ultimo}`;
    }
    getUltimos4() { //funcion que muestra los ultimos 4 ticket q estan por ser usados 
        return this.ultimos4;
    }
    atenderTicket(escritorio) { //para saber cual escritorio atiende el ticket siguiente
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero; //obtiene el numero del primer ticket del arreglo donde estaran todos los tickets
        this.tickets.shift(); //elimina el primer ticket que ya esta siendo usado

        let atenderTicket = new Ticket(numeroTicket, escritorio); //aqui se tiene un ticket listo para ser atendido
        this.ultimos4.unshift(atenderTicket); //esto lo agrega al inicio del arreglo
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento
        }
        console.log('Ultimos 4', this.ultimos4);

        this.grabarArchivo(); //

        return atenderTicket;
    }

    reiniciarConteo() { // esta funcion es para reiniciar los ticket 
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() { // grabar los cambios en el archivo o base de dato
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4 // este ultimos4 son los que se estaran viendo en la pantalla de public. lo que estan a la espera de ser atendidos
        };
        let jsonDataString = JSON.stringify(jsonData); //se lo pasa a formato json
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}


module.exports = {
    TicketControl
}